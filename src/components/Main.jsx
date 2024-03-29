import React from "react";
import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) {
    return <div className="no-active-note">No Active Note</div>;
  }
  return (
    <div className="app-main">
      {/* Show only in edit Mode */}
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          autoFocus
          placeholder="Enter Title"
          value={activeNote.title}
          onChange={(e) => {
            onEditField("title", e.target.value);
          }}
        />
        <textarea
          name=""
          id="body"
          cols="30"
          rows="10"
          placeholder="Write Your Note, buddy!"
          value={activeNote.body}
          onChange={(e) => {
            onEditField("body", e.target.value);
          }}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
