import React, { useState } from 'react'

function Create({ addTask }) {
  const [value, setValue] = useState("")

  const addItem = () => {
    if (!value.trim()) return;
    addTask(value);
    setValue("");
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  }

  return (
    <div className="create-form">
      <input
        type="text"
        className="create-input"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button type="button" className="create-btn" onClick={addItem}>Add Work</button>
    </div>
  )
}

export default Create