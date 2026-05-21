import type { ReactElement } from "react";
import { db, type Note } from "../../db";
import { useLiveQuery } from "dexie-react-hooks";
import "./NotesTable.css";
import { Link } from "react-router-dom";

// async function changePin(noteID: number, pinStatus: boolean) {
//   await db.notes.update(noteID, { pinned: !pinStatus });
// }

async function deleteNote(noteID: number) {
  await db.notes.delete(noteID);
}

function* generateRows(notes: Note[]): Generator<ReactElement> {
  for (const note of notes) {
    const createdAt = new Date(note.createdTime).toLocaleString();
    const modifiedAt = new Date(note.modifiedTime).toLocaleString();
    yield (
      <tr key={note.id}>
        <td>
          <Link to={`/dashboard/${note.id}`}>{note.title}</Link>
        </td>
        <td>{createdAt}</td>
        <td>{modifiedAt}</td>
        <td>{note.priority}</td>
        <td>
          <button onClick={() => deleteNote(note.id ? note.id : 0)}>
            Delete
          </button>
        </td>
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
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Created at</th>
          <th>Modified at</th>
          <th>Priority</th>
          <th>Button</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default NotesTable;
