// Landing Page
function goSetup(){
    window.location.href = "setup.html";
}

// Profile Setup
const setupForm = document.getElementById('setupForm');
setupForm.addEventListener("submit",(event) =>{
                event.preventDefault();
                const name = document.querySelector("#name").value.trim();
                const branch = document.querySelector("#branch").value;
                const semester = document.querySelector("#semester").value;

                if(name===""){
                    alert("Please enter your name");
                    return;
                }

                if(!branch || branch === "Select Branch"){
                    alert("Please select your branch");
                    return;
                }

                if(!semester || semester === "Select Semester"){
                    alert("Please select your semester");
                    return;
                }

                const profile = {
                    name : name,
                    branch : branch,
                    semester:semester
                };
                localStorage.setItem("Campus Profile",JSON.stringify(profile));
                window.location.href = "dashboard.html";
    
});


