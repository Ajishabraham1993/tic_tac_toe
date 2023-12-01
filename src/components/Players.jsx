import { useState } from "react";

export default function Players({ initialName, symbol }) {
  const [editName, SetName] = useState(initialName);
  const [isEditing, SetisEditing] = useState(false);
  function SetPlayername() {
    SetisEditing((Editing) => !Editing);
  }
  function handleNameChange(event) {
    console.log(event.target);
    SetName(event.target.value);
  }
  let nameCont = <span className="player-name">{editName}</span>;
  let btn = "Edit";
  if (isEditing) {
    nameCont = (
      <input
        type="text"
        value={editName}
        onChange={handleNameChange}
        required
      />
    );
    btn = "Save";
  }
  return (
    <li>
      <span className="player">
        {nameCont}
        <span className="player-symbol">{symbol}</span>
        <button onClick={SetPlayername}>{btn}</button>
      </span>
    </li>
  );
}
