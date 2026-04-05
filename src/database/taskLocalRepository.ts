import { db } from './database'
import { TaskRepository } from '../model/task/taskRepository'
import { Task } from '../model/task/task'

interface TaskRow {
  id: string
  title: string
  completed: number
  updated_at: number
  synced: number
  deleted: number
}

const mapRowToTask = (row: TaskRow): Task => ({
  id: row.id,
  title: row.title,
  completed: Boolean(row.completed),
  updated_at: Number(row.updated_at),
  synced: Boolean(row.synced),
  deleted: Boolean(row.deleted)
})

export const taskLocalRepository: TaskRepository = {
  create(task: Task) {
    db.runSync(
      `INSERT INTO tasks (id, title, completed, updated_at, synced, deleted)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        task.id,
        task.title,
        task.completed ? 1 : 0,
        task.updated_at,
        task.synced ? 1 : 0,
        task.deleted ? 1 : 0
      ]
    )
  },

  getAll() {
    const rows = db.getAllSync(
      `SELECT * FROM tasks WHERE deleted = 0 ORDER BY updated_at DESC`
    ) as TaskRow[]

    return rows.map(mapRowToTask)
  },

  getAllForSync() {
    const rows = db.getAllSync(`SELECT * FROM tasks`) as TaskRow[]
    return rows.map(mapRowToTask)
  },

  update(task: Task) {
    db.runSync(
      `UPDATE tasks 
       SET title = ?, completed = ?, updated_at = ?, synced = 0, deleted = 0
       WHERE id = ?`,
      [
        task.title,
        task.completed ? 1 : 0,
        Date.now(),
        task.id
      ]
    )
  },

  delete(id: string) {
    db.runSync(
      `UPDATE tasks
       SET deleted = 1, synced = 0, updated_at = ?
       WHERE id = ?`,
      [Date.now(), id]
    )
  },

  getUnsynced() {
    const rows = db.getAllSync(`SELECT * FROM tasks WHERE synced = 0`) as TaskRow[]
    return rows.map(mapRowToTask)
  },

  markAsSynced(id: string) {
    db.runSync(`UPDATE tasks SET synced = 1 WHERE id = ?`, [id])
  },

  upsertFromSync(task: Task) {
    db.runSync(
      `INSERT INTO tasks (id, title, completed, updated_at, synced, deleted)
       VALUES (?, ?, ?, ?, 1, ?)
       ON CONFLICT(id) DO UPDATE SET
         title = excluded.title,
         completed = excluded.completed,
         updated_at = excluded.updated_at,
         deleted = excluded.deleted,
         synced = 1`,
      [
        task.id,
        task.title,
        task.completed ? 1 : 0,
        task.updated_at,
        task.deleted ? 1 : 0
      ]
    )
  }
}
