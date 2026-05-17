import Dexie, { type Table } from "dexie";

export interface Note {
  id?: number;
  title: string;
  createdTime: number;
  modifiedTime: number;
  content: string;
}

class NotesDatabase extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super("NotesDB");
    this.version(1).stores({
      notes: "++id, title, createdTime, modifiedTime, content",
    });
  }
}

const db = new NotesDatabase();

export { db };
