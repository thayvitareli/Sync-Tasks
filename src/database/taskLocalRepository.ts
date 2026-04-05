import { db } from './database'
import { TaskRepository } from '../model/task/taskRepository'
import { Task } from '../model/task/task'

export const taskLocalRepository: TaskRepository = {
  create(task: Task) {
    db.runSync(
      `INSERT INTO tasks (id, title, completed, updated_at, synced)
       VALUES (?, ?, ?, ?, ?)`,
      [
        task.id,
        task.title,
        task.completed ? 1 : 0,
        task.updated_at,
        task.synced ? 1 : 0
      ]
    )
  },

  getAll() {
    return db.getAllSync(`SELECT * FROM tasks`)
  },

  update(task: Task) {
    db.runSync(
      `UPDATE tasks 
       SET title = ?, completed = ?, updated_at = ?, synced = 0
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
    db.runSync(`DELETE FROM tasks WHERE id = ?`, [id])
  },

  getUnsynced() {
    return db.getAllSync(`SELECT * FROM tasks WHERE synced = 0`)
  },

  markAsSynced(id: string) {
    db.runSync(`UPDATE tasks SET synced = 1 WHERE id = ?`, [id])
  }
}