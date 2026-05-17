import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";
import { db } from "../../db";

function Topbar() {
  const [showCreation, setCreation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function addNote(title: string) {
    try {
      await db.notes.add({
        title: title,
        content: "",
        createdTime: Date.now(),
        modifiedTime: Date.now(),
      });
      alert(`note with title ${title} is created`);
    } catch (error) {
      alert(`Failed to create note: ${error}`);
    }
  }

  function plusBtn() {
    if (inputRef.current) {
      const curInputText = inputRef.current.value;
      addNote(curInputText);
    }
    setCreation((prev) => !prev);
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <Link to={"/"}>
          <h3>Home</h3>
        </Link>
      </div>
      <div className="topbar-center">
        <h1 className="topbar-title">Kenar</h1>
      </div>
      <div className="topbar-right">
        {showCreation && (
          <div className="noteCreation">
            <input
              type="text"
              ref={inputRef}
              id="title-input"
              placeholder="Title..."
            />
            <button onClick={plusBtn}>+</button>
          </div>
        )}

        {!showCreation && (
          <button onClick={() => setCreation((prev) => !prev)}>Add note</button>
        )}
      </div>
    </header>
  );
}

export default Topbar;
