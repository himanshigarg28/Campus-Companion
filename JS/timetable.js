function addClass(subject,time,room,day){
    let timetable = JSON.parse(localStorage.getItem("timetable")) || [];
    let newClass = {
        subject : subject,
        time : time,
        room : room,
        day : day
    };
    timetable.push(newClass);
    localStorage.setItem("timetable",JSON.stringify(timetable));
    loadTimetable();
}

function addClassFromForm(){
     let subject = document.getElementById("subject").value; 
     let time = document.getElementById("time").value; 
     let room = document.getElementById("room").value; 
     let day = document.getElementById("day").value; 
     if (subject === "" || time === "" || room === "" || day === ""){ 
        alert("Please fill all fields."); 
        return; 
    } 
    addClass(subject, time, room, day); 
    document.getElementById("subject").value = ""; 
    document.getElementById("time").value = ""; 
    document.getElementById("room").value = ""; 
    document.getElementById("day").value = ""; 
}

function deleteClass(index){
    let timetable = JSON.parse(localStorage.getItem("timetable")) || [];
    timetable.splice(index,1);
    localStorage.setItem("timetable",JSON.stringify(timetable));
    loadTimetable();
}

function loadTimetable(){ 
    let timetable = JSON.parse(localStorage.getItem("timetable")) || []; 
    let list = document.getElementById("timetableList"); 
    if (!list){ 
        return; 
    } 
    list.innerHTML = ""; 
    timetable.forEach(function (item, index){ 
        let div = document.createElement("div"); 
        div.className = "class-item"; 
        div.innerHTML = ` 
            <div>${item.day}</div> 
            <div>${item.time}</div> 
            <div>${item.subject}</div> 
            <div>${item.room}</div> 
            <button onclick="deleteClass(${index})">
            <i class="fa-solid fa-trash-can" style="color: rgb(177, 151, 252);"></i>
            </button> 
        `; 
        list.appendChild(div); 
    }); 
}
loadTimetable();