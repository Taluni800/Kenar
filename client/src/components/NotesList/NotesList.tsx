import { db, type Note } from "../../db";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";

interface Cache {
  value: unknown;
  lastUsed: number;
  useCount: number;
  createdAt: number;
}

function memoization(
  fun: Function,
  maxSize = Infinity,
  strategy: string | Function = "LRU",
  ttl = 0,
) {
  const cache: { [key: string]: Cache } = {};
  let cacheSize = 0;

  function evict() {
    if (cacheSize < maxSize) {
      return;
    }

    const entries = Object.entries(cache);
    let keyToRm = entries[0][0];

    if (strategy === "LRU") {
      for (const [key, entry] of entries) {
        if (entry.lastUsed < cache[keyToRm].lastUsed) keyToRm = key;
      }
    } else if (strategy === "LFU") {
      for (const [key, entry] of entries) {
        if (entry.useCount < cache[keyToRm].lastUsed) keyToRm = key;
      }
    } else if (strategy === "TTL") {
      for (const [key, entry] of entries) {
        if (entry.createdAt < cache[keyToRm].createdAt) keyToRm = key;
      }
    } else if (typeof strategy === "function") {
      keyToRm = strategy(cache);
    }

    delete cache[keyToRm];
    cacheSize--;
  }

  return function (...args: unknown[]) {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (strategy === "TTL" && ttl > 0) {
      for (const k in cache) {
        if (now - cache[k].createdAt > ttl) {
          delete cache[k];
          cacheSize--;
        }
      }
    }
    if (cache[key]) {
      cache[key].lastUsed = now;
      cache[key].useCount++;
      return cache[key].value;
    }

    evict();

    const result = fun(...args);
    cache[key] = { value: result, lastUsed: now, useCount: 1, createdAt: now };
    cacheSize++;
    return result;
  };
}

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
        <Link to={`/dashboard/${value.id}`}>
          {/* {value.pinned ? "📌 " : ""} */}
          {value.title}
        </Link>
      </li>
    );
  }
}

function buildQueue(notes: Note[]) {
  const queue = new Queue<Note>();
  notes.forEach((note) => {
    if (note.priority !== -100) queue.addNote(note, note.priority);
  });
  const queueArr = queue.toArray();

  const list = [...generateColumn(queueArr)];

  return list;
}

const buildQueueMemo = memoization(buildQueue, 5, "LRU");

function NotesList() {
  const notes = useLiveQuery(() => db.notes.toArray());

  if (!notes) return <p>Loading...</p>;
  if (notes.length === 0) return <p>No notes yet</p>;

  const list = buildQueueMemo(notes);

  return list;
}

export default NotesList;
