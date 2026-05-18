import { db } from "../../db";
import { useRef } from "react";

function CreateNote() {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const TDLInputRef = useRef<HTMLInputElement>(null); // Till DeadLine
  const DITInputRef = useRef<HTMLInputElement>(null); //Days It Takes

  async function addNote(title: string, priority: number) {
    try {
      await db.notes.add({
        title: title,
        pinned: false,
        priority: priority,
        createdTime: Date.now(),
        modifiedTime: Date.now(),
        content: "",
      });
      alert(`note with title ${title} is created`);
    } catch (error) {
      alert(`Failed to create note: ${error}`);
    }
  }

  function plusBtn() {
    if (titleInputRef.current && TDLInputRef.current && DITInputRef.current) {
      const curInputText = titleInputRef.current.value;
      const TDLDaysCount: number = Number(TDLInputRef.current.value);
      const DITCount: number = Number(DITInputRef.current.value);
      if (
        titleInputRef.current.value &&
        TDLInputRef.current.value &&
        DITInputRef.current.value
      ) {
        const priority: number = -1 * (TDLDaysCount - DITCount);

        addNote(curInputText, priority);
      } else {
        alert("Fill the fields");
      }
    }
  }

  return (
    <div className="form-container">
      <h1>Create note</h1>
      <div className="inputs">
        <input type="text" ref={titleInputRef} placeholder="Title" />
        <input type="text" ref={TDLInputRef} placeholder="Days till deadline" />
        <input
          type="text"
          ref={DITInputRef}
          placeholder="How much days you need"
        />
        <button onClick={plusBtn}>+</button>
      </div>
    </div>
  );
}

export default CreateNote;
