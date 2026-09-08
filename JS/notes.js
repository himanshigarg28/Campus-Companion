function addNote(title, content){
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let newNote = {
        title : title,
        content : content,
    };
    notes.push(newNote);
    localStorage.setItem("notes",JSON.stringify(notes));
    loadNotes();
}
function addNoteFromForm(){
     let title = document.getElementById("noteTitle").value; 
     let content = document.getElementById("noteContent").value; 
     if (title === "" || content === "" ){ 
        alert("Please fill all fields."); 
        return; 
    } 
    addNote(title,content); 
    document.getElementById("noteTitle").value = ""; 
    document.getElementById("noteContent").value = ""; 
}
function deleteNote(index){
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notes));
    loadNotes();
}
function loadNotes(){ 
    let notes = JSON.parse(localStorage.getItem("notes")) || []; 
    let list = document.getElementById("noteList"); 
    if (!list){ 
        return; 
    } 
    list.innerHTML = ""; 
    notes.forEach(function(note, index){ 
        let div = document.createElement("div"); 
        div.className = "note-item"; 
        div.innerHTML = ` 
            <div class="note-content"> 
                <h3> ${note.title} </h3> 
                <p> ${note.content} </p>
            </div> 
            <button onclick="deleteNote(${index})"> 
                <i class="fa-solid fa-trash-can" style="color: rgb(177, 151, 252);"></i> 
            </button>
        `; 
        list.appendChild(div); 
    }); 
} 
document.addEventListener("DOMContentLoaded", function(){
    loadNotes();
});