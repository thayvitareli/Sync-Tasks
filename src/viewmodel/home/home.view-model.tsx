import { useState, useEffect, useCallback } from "react"
import { Task } from "../../model/task/task"
import { taskLocalRepository } from "../../database/taskLocalRepository"
import { isSupabaseConfigured } from "../../services/supabaseClient"
import { syncTasksWithSupabase } from "../../services/taskSyncService"

export interface HomeViewModel {
  tasks: Task[]
  task: string
  setTask: (value: string) => void
  handleAddTask: () => void
  isLoadingTasks: boolean
  handleToggleTask: (id: string) => void
  handleDeleteTask: (id: string) => void
}

export const useHomeViewModel = (): HomeViewModel => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [task, setTask] = useState('')
  const [isLoadingTasks, setIsLoadingTasks] = useState(true)


  const fetchTasks = useCallback(() => {
    try {
      setIsLoadingTasks(true)
      const allTasks = taskLocalRepository.getAll()
      setTasks(allTasks)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setIsLoadingTasks(false)
    }
  }, [])

  const syncTasks = useCallback(async () => {
    if (!isSupabaseConfigured) {
      return
    }
    const didSync = await syncTasksWithSupabase()

    if (didSync) {
      fetchTasks()
    }
  }, [fetchTasks])

  useEffect(() => {
    fetchTasks()
    void syncTasks()
  }, [fetchTasks, syncTasks])

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: task.trim(),
        completed: false,
        updated_at: Date.now(),
        synced: false,
        deleted: false
      }

      try {
        taskLocalRepository.create(newTask)
        fetchTasks()
        setTask('')
        void syncTasks()
      } catch (error) {
        console.error("Error creating task:", error)
      }
    }
  }

  const handleToggleTask = (id: string) => {
    try {
      const task = tasks.find((task) => task.id === id)
      if (task) {
        taskLocalRepository.update({
          ...task,
          completed: !task.completed,
          updated_at: Date.now(),
          synced: false
        })

        fetchTasks()
        void syncTasks()
      }
    } catch (error) {
      console.error("Error toggling task:", error)
    }
  }

  const handleDeleteTask = (id: string) => {
    try {
      taskLocalRepository.delete(id)
      fetchTasks()
      void syncTasks()
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  return {
    tasks,
    task,
    setTask,
    handleAddTask,
    isLoadingTasks,
    handleToggleTask,
    handleDeleteTask,
  }
}
