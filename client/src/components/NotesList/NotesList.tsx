import type { ReactElement } from "react";
import { db, type Note } from "../../db";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";

function* generateColumn(notes: Note[]) {
  for (const note of notes) {
    yield (
      <li>
        <Link to={`/dashboard/${note.id}`}>
          {note.pinned ? "📌 " : ""}
          {note.title}
        </Link>
      </li>
    );
  }
}

function NotesList() {
  return;
}

export default NotesList;
