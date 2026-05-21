import { useParams } from "react-router-dom";
import { db } from "../../db";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { useLiveQuery } from "dexie-react-hooks";
import "./NotePage.css";
import { useEffect, useRef } from "react";

function NotePage() {
  const params = useParams<{ noteID: string }>();
  const id: number = Number(params.noteID);
  const note = useLiveQuery(() => db.notes.get(id), [id]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function saveNote() {
    const now = Date.now();
    try {
      if (inputRef.current) {
        await db.notes.update(id, { content: inputRef.current.value });
        await db.notes.update(id, { modifiedTime: now });
      }
    } catch {
      console.error("Problem with updating");
    }
  }

  useEffect(() => {
    if (inputRef.current && note) {
      inputRef.current.value = note.content;
    }
  }, [note]);

  if (!note) return <NotFoundPage />;

  return (
    <div>
      <h1>{note.title}</h1>
      <div className="inputs">
        <textarea
          name=""
          id="textarea"
          ref={inputRef}
          placeholder="No content yet. Start writing!"
        ></textarea>
        <button onClick={saveNote} id="saveBtn">
          Save
        </button>
      </div>
    </div>
  );
}

export default NotePage;
