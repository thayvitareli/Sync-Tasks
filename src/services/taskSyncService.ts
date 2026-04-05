import { taskLocalRepository } from '../database/taskLocalRepository'
import { Task } from '../model/task/task'
import { isSupabaseConfigured, supabase } from './supabaseClient'

type SupabaseTaskRow = {
  id: string
  title: string
  completed: boolean
  updated_at: number
  deleted: boolean
}

let isSyncingInProgress = false

const mapRemoteToTask = (row: SupabaseTaskRow): Task => ({
  id: row.id,
  title: row.title,
  completed: Boolean(row.completed),
  updated_at: Number(row.updated_at),
  deleted: Boolean(row.deleted),
  synced: true
})

const mapTaskToRemote = (task: Task): SupabaseTaskRow => ({
  id: task.id,
  title: task.title,
  completed: task.completed,
  updated_at: task.updated_at,
  deleted: task.deleted
})

export const syncTasksWithSupabase = async (): Promise<boolean> => {
  if (!supabase || !isSupabaseConfigured) {
    return false
  }

  if (isSyncingInProgress) {
    return true
  }

  isSyncingInProgress = true

  try {
    const { data: remoteRows, error: remoteError } = await supabase
      .from('tasks')
      .select('id, title, completed, updated_at, deleted')

    if (remoteError) {
      throw remoteError
    }

    const remoteTasks = (remoteRows ?? []).map((row) => mapRemoteToTask(row as SupabaseTaskRow))
    const remoteById = new Map(remoteTasks.map((task) => [task.id, task]))
    const localById = new Map(taskLocalRepository.getAllForSync().map((task) => [task.id, task]))

    for (const remoteTask of remoteTasks) {
      const localTask = localById.get(remoteTask.id)

      if (!localTask || remoteTask.updated_at > localTask.updated_at) {
        taskLocalRepository.upsertFromSync(remoteTask)
      }
    }

    const mergedLocalTasks = taskLocalRepository.getAllForSync()
    const tasksToPush = mergedLocalTasks.filter((localTask) => {
      const remoteTask = remoteById.get(localTask.id)
      return !remoteTask || localTask.updated_at > remoteTask.updated_at
    })

    if (tasksToPush.length > 0) {
      const { error: pushError } = await supabase
        .from('tasks')
        .upsert(tasksToPush.map(mapTaskToRemote), { onConflict: 'id' })

      if (pushError) {
        throw pushError
      }

      tasksToPush.forEach((task) => {
        taskLocalRepository.markAsSynced(task.id)
      })
    }

    return true
  } catch (error) {
    console.error('Error syncing tasks with Supabase:', error)
    return false
  } finally {
    isSyncingInProgress = false
  }
}
