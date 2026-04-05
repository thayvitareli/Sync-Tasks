import { db } from './database'

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      updated_at INTEGER NOT NULL,
      synced INTEGER DEFAULT 0
    );
  `)
}