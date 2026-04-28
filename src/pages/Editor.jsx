import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Header from "../components/Header";

const Editor = () => {

  // ✅ stores the markdown content the user types
  // starts with a welcome template so the editor isn't empty
  const [value, setValue] = useState(`# Welcome to the Editor

## What is Markdown?
Markdown is a lightweight markup language that lets you write formatted text using plain text syntax.

---

## Text Formatting

**Bold text** is written with double asterisks.

*Italic text* is written with single asterisks.

~~Strikethrough~~ is written with double tildes.

**_Bold and italic_** combined.

---

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4

---

## Lists

### Unordered List
- Item one
- Item two
  - Nested item
  - Another nested item
- Item three

### Ordered List
1. First step
2. Second step
3. Third step

---

## Links and Images

[Click here to visit Google](https://www.google.com)

---

## Code

Inline code: \`console.log("Hello World")\`

Code block:
\`\`\`javascript
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greet("Shawky"));
\`\`\`

---

## Blockquote

> "The best way to predict the future is to create it."
> — Peter Drucker

---

## Table

| Name       | Role        | Country |
|------------|-------------|---------|
| Shawky     | Developer   | Egypt   |
| John       | Designer    | USA     |
| Sara       | Manager     | UK      |

---

## Checklist

- [x] Learn React
- [x] Learn CSS Grid
- [x] Build a Dashboard
- [ ] Deploy the app
- [ ] Add more features

---

*Start editing on the left to see the live preview on the right!*
`);

  // ✅ tracks which view mode the user selected
  const [mode, setMode] = useState("live");
  // "live"    = editor on left, preview on right (split view)
  // "edit"    = editor only
  // "preview" = preview only

  // ✅ word count — counts words in the raw markdown text
  const wordCount = value
    ? value.trim().split(/\s+/).filter(Boolean).length
    : 0;

  // ✅ character count
  const charCount = value ? value.length : 0;

  // ✅ line count — counts how many lines
  const lineCount = value ? value.split("\n").length : 0;

  // ✅ copies the markdown text to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    alert("Markdown copied to clipboard!");
  };

  // ✅ clears all the content
  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all content?")) {
      setValue("");
    }
  };

  // ✅ downloads the content as a .md file
  const handleDownload = () => {
    const blob = new Blob([value], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  // button style — reused for all toolbar buttons
  const btnStyle = (active = false) => ({
    padding: "6px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    background: active ? "#3b82f6" : "#f1f5f9",
    color: active ? "white" : "#475569",
    transition: "all 0.2s",
  });

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Editor" category="App" />

      {/* ✅ Top toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "16px",
          padding: "12px 16px",
          background: "#f8fafc",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Left side — view mode buttons */}
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            style={btnStyle(mode === "edit")}
            onClick={() => setMode("edit")}
          >
            Edit
          </button>
          <button
            style={btnStyle(mode === "live")}
            onClick={() => setMode("live")}
          >
            Split View
          </button>
          <button
            style={btnStyle(mode === "preview")}
            onClick={() => setMode("preview")}
          >
            Preview
          </button>
        </div>

        {/* Right side — action buttons */}
        <div style={{ display: "flex", gap: "6px" }}>
          <button style={btnStyle()} onClick={handleCopy}>
            Copy
          </button>
          <button style={btnStyle()} onClick={handleDownload}>
            Download .md
          </button>
          <button
            style={{ ...btnStyle(), background: "#fee2e2", color: "#ef4444" }}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      {/*
        MDEditor — the main editor component
        value     — the current markdown text stored in state
        onChange  — updates state every time the user types
        height    — height of the editor in pixels
        preview   — controls the view mode:
                    "live"    = split editor + preview
                    "edit"    = editor only
                    "preview" = preview only
        data-color-mode — sets light or dark mode for the editor
      */}
      <div data-color-mode="light">
        <MDEditor
          value={value}
          onChange={setValue}
          height={500}
          preview={mode}
        />
      </div>

      {/* ✅ Bottom stats bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "12px",
          padding: "10px 16px",
          background: "#f8fafc",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          fontSize: "13px",
          color: "#64748b",
        }}
      >
        {/* Stats on the left */}
        <div style={{ display: "flex", gap: "20px" }}>
          <span>
            Words: <strong style={{ color: "#1e293b" }}>{wordCount}</strong>
          </span>
          <span>
            Characters: <strong style={{ color: "#1e293b" }}>{charCount}</strong>
          </span>
          <span>
            Lines: <strong style={{ color: "#1e293b" }}>{lineCount}</strong>
          </span>
        </div>

        {/* Mode indicator on the right */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span>
            Mode:{" "}
            <strong style={{ color: "#1e293b", textTransform: "capitalize" }}>
              {mode === "live" ? "Split View" : mode}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Editor;


/*

LibraryWhy chosen@uiw/react-md-editorBest free markdown editor for React. Built specifically for React, has live preview split view, syntax highlighting for code blocks, toolbar with formatting buttons, dark mode support, and is actively maintained. No license fees unlike some alternatives

Full story of how each part works:
The value state holds the entire markdown text as a plain string. Every single character the user types updates this state through onChange={setValue}. The editor and preview are always perfectly in sync because they both read from the same value.
The mode state controls what the user sees. "live" shows the editor and rendered preview side by side. "edit" shows only the raw markdown editor. "preview" shows only the beautifully rendered output. The three buttons at the top switch between these modes.
data-color-mode="light" on the wrapper div forces the editor to always use light mode regardless of the user's system settings. Without this wrapper, the editor might render with a dark background that clashes with your white dashboard card.
Word count uses .split(/\s+/) which splits the text by any whitespace (spaces, tabs, newlines). .filter(Boolean) removes any empty strings from the resulting array. .length gives the total count.
handleDownload creates a Blob — a raw binary object — from the text content with type: "text/markdown". URL.createObjectURL generates a temporary URL pointing to that blob. A fake <a> element is created, given that URL as href and "document.md" as the download filename, then .click() is called programmatically to trigger the browser download. revokeObjectURL cleans up the temporary URL from memory after the download starts.
handleCopy uses the browser's built-in navigator.clipboard.writeText() API to copy the markdown text to the user's clipboard — no external library needed.
provided.placeholder — wait, that was Kanban! In the Editor, the btnStyle function is the equivalent clever trick — it's a function that takes an active boolean and returns a different style object based on whether that button is currently selected. This avoids writing separate CSS classes for each button state.



*/