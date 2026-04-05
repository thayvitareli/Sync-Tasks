import { useState, useEffect, useCallback } from "react"
import { Task } from "../../model/task/task"
import { taskLocalRepository } from "../../database/taskLocalRepository"

export interface HomeViewModel {
  tasks: Task[]
  task: string
  setTask: (value: string) => void
  handleAddTask: () => void
}

export const useHomeViewModel = (): HomeViewModel => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [task, setTask] = useState('')

  const fetchTasks = useCallback(() => {
    try {
      const rawTasks = taskLocalRepository.getAll() as any[];
      const allTasks: Task[] = rawTasks.map(task => ({
        ...task,
        completed: Boolean(task.completed),
        synced: Boolean(task.synced)
      }));
      setTasks(allTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: task.trim(),
        completed: false, 
        updated_at: Date.now(),
        synced: false
      }
      
      try {
        taskLocalRepository.create(newTask)
        fetchTasks()
        setTask('')
      } catch (error) {
         console.error("Error creating task:", error);
      }
    }
  }

  return {
    tasks,
    task,
    setTask,
    handleAddTask
  }
}