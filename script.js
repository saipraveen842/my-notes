let notes = [];
const notesContainer = document.getElementById("notesContainer");
const addNoteBtn = document.getElementById("addNoteBtn");

function saveNotesToStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotesFromStorage() {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    }
}

function deleteNote(index) {
    notes.splice(index, 1); // Remove the note at index
    saveNotesToStorage(); // Update storage
    renderNotes(); // Update UI
}

//Show all notes on the page
function renderNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        const noteEl = document.createElement("div");
        noteEl.classList.add("note");

        const textarea = document.createElement("textarea");
        textarea.value = note.text;
        textarea.autofocus = true;

        // Save note when user types
        textarea.addEventListener("input", () => {
            notes[index].text = textarea.value;
            saveNotesToStorage();
        });

        // Delete note on double-click
        noteEl.addEventListener("dblclick", () => {
            if (confirm("Delete this note?")) {
                deleteNote(index);
            }
        });

        noteEl.appendChild(textarea);
        notesContainer.appendChild(noteEl);
    });
}


window.onload = function() {
    loadNotesFromStorage(); // Load saved notes
    renderNotes(); // Show them on the page
};

// ➕When the "Add Note" button is clicked
addNoteBtn.addEventListener("click", () => {
    notes.push({
        text: ""
    }); // Add an empty note
    saveNotesToStorage();
    renderNotes();
});
