import { useParams } from "react-router-dom";
import { db } from "../../db";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { useLiveQuery } from "dexie-react-hooks";

function NotePage() {
  const params = useParams<{ noteID: string }>();
  const id: number = Number(params.noteID);
  const note = useLiveQuery(() => db.notes.get(id));
  if (!note) return <NotFoundPage />;

  return (
    <div>
      <h1>{note.title}</h1>
    </div>
  );
}

export default NotePage;
