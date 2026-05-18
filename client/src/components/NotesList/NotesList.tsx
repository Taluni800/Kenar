import { db, type Note } from "../../db";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";

function* generateColumn(notes: Note[]) {
  for (const note of notes) {
    yield (
      <li className="nav-item">
        <Link to={`/dashboard/${note.id}`}>
          {note.pinned ? "📌 " : ""}
          {note.title}
        </Link>
      </li>
    );
  }
}

function NotesList() {
  const notes = useLiveQuery(() => db.notes.toArray());

  if (!notes) return <p>Loading...</p>;
  if (notes.length === 0) return <p>No notes yet</p>;

  const list = [...generateColumn(notes)];

  return list;
}

export default NotesList;
