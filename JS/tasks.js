function addTask(taskName, dueDate){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newTask = {
        name : taskName,
        dueDate : dueDate,
        completed : false
    };
    tasks.push(newTask);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    loadTasks();
}

function addTaskFromForm(){ 
    let taskName = document.getElementById("taskName").value; 
    let dueDate = document.getElementById("dueDate").value; 
    if (taskName === "" || dueDate === ""){ 
        alert("Please fill all fields."); 
        return; 
    } 
    addTask(taskName, dueDate); 
    document.getElementById("taskName").value = ""; 
    document.getElementById("dueDate").value = ""; 
}
function deleteTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    loadTasks();
}

function completeTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
    tasks[index].completed = !tasks[index].completed; 
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
    loadTasks(); 
}

function loadTasks(){ 
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
    let list = document.getElementById("taskList"); 
    if (!list){ 
        return; 
    } 
    list.innerHTML = ""; 
    tasks.forEach(function(task, index){ 
        let div = document.createElement("div"); 
        div.className = "task-item"; 
        div.innerHTML = ` 
            <div class="task-name"> 
            <input 
                type="checkbox" 
                ${task.completed ? "checked" : ""} 
                onchange="completeTask(${index})"> 
            <span> 
                ${task.name} 
            </span> 
            </div> 
            <div> 
                ${task.dueDate} 
            </div> 
            <div>
                 ${task.completed ? "Completed" : "Pending"} 
            </div> 
            <button onclick="deleteTask(${index})"> 
                <i class="fa-solid fa-trash-can" style="color: rgb(177, 151, 252);"></i> 
            </button>
        `; 
        list.appendChild(div); 
    }); 
} 
document.addEventListener("DOMContentLoaded", function(){
    loadTasks();
});