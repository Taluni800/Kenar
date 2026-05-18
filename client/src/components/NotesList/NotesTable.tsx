import type { ReactElement } from "react";
import { db, type Note } from "../../db";

function NotesTable() {
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
}

export default NotesTable;
