document.addEventListener("DOMContentLoaded",()=>{
    loadProfile();
});

/* PROFILE */
function loadProfile(){
    let profileData = localStorage.getItem("Campus Profile");
    if(!profileData){
        return;
    }
    const profile = JSON.parse(profileData);
    const studentName = document.querySelector("#studentName");
    const topName = document.querySelector("#topname");
    if(studentName){
        studentName.innerText = profile.name;
    }
    if(topName){
        topName.innerText = profile.name;
    }
}

/* SIDEBAR */
function showPage(page){
    if(page === "dashboard"){
        window.location.href = "dashboard.html";
    }
    else if(page === "timetable"){
        window.location.href = "timetable.html";
    }
    else if(page === "tasks"){
        window.location.href = "tasks.html";
    }
    else if(page === "attendance"){
        window.location.href = "attendance.html";
    }
    else if(page === "cgpa-calculator"){
        window.location.href = "cgpa.html";
    }
    else if(page === "notes"){
        window.location.href = "notes.html";
    }
    else if(page === "study-timer"){
        window.location.href = "study-timer.html";
    }
    else if(page === "profile"){
        window.location.href = "profile.html";
    }
}

/* LOGOUT */
function logoutBtn() {
    localStorage.removeItem("Campus Profile");
    window.location.href = "index.html";

}

// Dark Mode
const themeBtn = document.querySelector(".theme-btn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark"){
    document.body.classList.add("dark-mode");
}
if(themeBtn){
    themeBtn.addEventListener("click", function(){
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")){
            localStorage.setItem("theme", "dark");
        }
        else{
            localStorage.setItem("theme", "light");
        }
    });
}

