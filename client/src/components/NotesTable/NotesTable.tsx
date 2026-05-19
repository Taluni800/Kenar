import type { ReactElement } from "react";
import { db, type Note } from "../../db";
import { useLiveQuery } from "dexie-react-hooks";
import "./NotesTable.css";
import { Link } from "react-router-dom";

async function changePin(noteID: number, pinStatus: boolean) {
  await db.notes.update(noteID, { pinned: !pinStatus });
}

function* generateRows(notes: Note[]): Generator<ReactElement> {
  for (const note of notes) {
    const createdAt = new Date(note.createdTime).toLocaleString();
    const modifiedAt = new Date(note.modifiedTime).toLocaleString();
    yield (
      <tr key={note.id}>
        <td>
          <div className="ID-section">
            {/* <button onClick={() => changePin(note.id ?? NaN, note.pinned)}>
              {note.pinned ? "Unpin" : "Pin"}
            </button> */}
            <Link to={`/dashboard/${note.id}`}>{note.id}</Link>
          </div>
        </td>
        <td>{note.title}</td>
        <td>{createdAt}</td>
        <td>{modifiedAt}</td>
        <td>{note.priority}</td>
      </tr>
    );
  }
}

function NotesTable() {
  const notes = useLiveQuery(() => db.notes.toArray());

  if (!notes) return <p>Loading...</p>;
  if (notes.length === 0) return <p>No notes yet</p>;

  const rows = [...generateRows(notes)];
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Created at</th>
          <th>Modified at</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default NotesTable;
