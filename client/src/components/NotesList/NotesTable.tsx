import type { ReactElement } from "react";
import { db, type Note } from "../../db";
import { useLiveQuery } from "dexie-react-hooks";

function* generateRows(notes: Note[]): Generator<ReactElement> {
  for (const note of notes) {
    const createdAt = new Date(note.createdTime).toLocaleString();
    const modifiedAt = new Date(note.modifiedTime).toLocaleString();
    yield (
      <tr key={note.id}>
        <td>{note.title}</td>
        <td>{createdAt}</td>
        <td>{modifiedAt}</td>
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
          <th>Title</th>
          <th>Created at</th>
          <th>Modified at</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default NotesTable;
