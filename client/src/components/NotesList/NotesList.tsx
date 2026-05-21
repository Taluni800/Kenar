import { db, type Note } from "../../db";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";
import { log } from "utils";

class Queue<T> {
  private items: { value: T; priority: number }[] = [];

  addNote(value: T, priority: number): void {
    this.items.push({ value, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  toArray(): { value: T; priority: number }[] {
    return [...this.items];
  }

  rmMax(): T | undefined {
    return this.items.pop()?.value;
  }

  rmMin(): T | undefined {
    return this.items.shift()?.value;
  }

  getMax(): T | undefined {
    return this.items[this.items.length - 1]?.value;
  }

  getMin(): T | undefined {
    return this.items[0]?.value;
  }

  size(): number {
    return this.items.length;
  }
}

function* generateColumn(notes: { value: Note; priority: number }[]) {
  for (const note of notes) {
    const value = note.value;
    yield (
      <li className="nav-item" key={value.id}>
        <Link to={`/dashboard/${value.id}`}>{value.title}</Link>
      </li>
    );
  }
}

const buildQueue = log({ level: "INFO" })(function buildQueue(notes: Note[]) {
  const queue = new Queue<Note>();
  notes.forEach((note) => {
    if (note.priority !== -100) queue.addNote(note, note.priority);
  });
  const queueArr = queue.toArray();
  const list = [...generateColumn(queueArr)];
  return list;
});

function NotesList() {
  const notes = useLiveQuery(() => db.notes.toArray());

  if (!notes) return <p>Loading...</p>;
  if (notes.length === 0) return <p>No notes yet</p>;

  const list = buildQueue(notes);

  return list;
}

export default NotesList;
