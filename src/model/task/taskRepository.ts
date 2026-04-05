import { Task } from "./task"

export interface TaskRepository {
  create(task: Task): void
  getAll(): Task[]
  getAllForSync(): Task[]
  update(task: Task): void
  delete(id: string): void
  getUnsynced(): Task[]
  markAsSynced(id: string): void
  upsertFromSync(task: Task): void
}
