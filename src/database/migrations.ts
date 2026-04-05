import { db } from './database'

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      updated_at INTEGER NOT NULL,
      synced INTEGER DEFAULT 0,
      deleted INTEGER DEFAULT 0
    );
  `)

  const columns = db.getAllSync(`PRAGMA table_info(tasks)`) as Array<{ name: string }>
  const hasDeletedColumn = columns.some((column) => column.name === 'deleted')

  if (!hasDeletedColumn) {
    db.execSync(`ALTER TABLE tasks ADD COLUMN deleted INTEGER DEFAULT 0;`)
  }
}
