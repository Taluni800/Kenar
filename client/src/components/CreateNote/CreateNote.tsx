import { db } from "../../db";
import { useRef, useState } from "react";

function CreateNote() {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const TDLInputRef = useRef<HTMLInputElement>(null); // Till DeadLine
  const DITInputRef = useRef<HTMLInputElement>(null); //Days It Takes
  const ToDoCheckRef = useRef<HTMLInputElement>(null);
  const [showToDo, setShowToDo] = useState<boolean>(false);

  async function addToDo(title: string, priority: number, ToDo: boolean) {
    try {
      await db.notes.add({
        title: title,
        pinned: false,
        priority: priority,
        ToDo: ToDo,
        createdTime: Date.now(),
        modifiedTime: Date.now(),
        content: "",
      });
      alert(`note with title ${title} is created`);
    } catch (error) {
      alert(`Failed to create note: ${error}`);
    }
  }

  async function addNote(title: string) {
    try {
      await db.notes.add({
        title: title,
        pinned: false,
        priority: -100,
        ToDo: false,
        createdTime: Date.now(),
        modifiedTime: Date.now(),
        content: "",
      });
    } catch (error) {
      alert(`Failed to create note: ${error}`);
    }
  }

  function plusBtn() {
    if (titleInputRef.current) {
      const curInputText = titleInputRef.current.value;
      if (TDLInputRef.current && DITInputRef.current && ToDoCheckRef.current) {
        if (TDLInputRef.current.value && DITInputRef.current.value) {
          const TDLDaysCount: number = Number(TDLInputRef.current.value);
          const DITCount: number = Number(DITInputRef.current.value);
          const ToDoCheck: boolean = ToDoCheckRef.current.checked;
          let priority: number = -100; // = -1 * (TDLDaysCount - DITCount);

          if (TDLDaysCount - DITCount < 0) {
            priority = 0;
          } else {
            priority = TDLDaysCount - DITCount;
          }

          addToDo(curInputText, priority, ToDoCheck);
        } else {
          alert("Fill priority fields");
        }
      } else {
        addNote(curInputText);
      }
    }
  }

  return (
    <div className="form-container">
      <h1>Create</h1>
      <div className="inputs">
        <input type="text" ref={titleInputRef} placeholder="Title" />

        <div className="ToDo-container">
          <h3>ToDo</h3>
          <input
            type="checkbox"
            ref={ToDoCheckRef}
            onClick={() => setShowToDo((prev) => !prev)}
          />
          {showToDo && (
            <input
              type="text"
              ref={TDLInputRef}
              placeholder="Days till deadline"
            />
          )}
          {showToDo && (
            <input
              type="text"
              ref={DITInputRef}
              placeholder="How much days you need"
            />
          )}
        </div>
      </div>
      <button onClick={plusBtn}>+</button>
    </div>
  );
}

export default CreateNote;
