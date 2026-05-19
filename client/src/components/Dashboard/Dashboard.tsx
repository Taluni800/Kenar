import NotesTable from "../NotesTable/NotesTable";
import NotesList from "../NotesList/NotesList";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Table</h2>
      <NotesTable />
      <h2>ToDo list</h2>
      <NotesList />
    </div>
  );
}

export default Dashboard;
