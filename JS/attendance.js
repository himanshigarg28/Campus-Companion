function loadSemester(){
    let profileData =
        localStorage.getItem("Campus Profile");
            if(!profileData){
                return;
            }
    let profile = JSON.parse(profileData);
    let semester = document.getElementById("semester");
        if(semester){
            semester.innerText = profile.semester;
        }
}
function addSubjectFromForm(){
    let subject = document.getElementById("subjectName").value.trim();
    let held = document.getElementById("initialHeld").value;
    let attended = document.getElementById("initialAttended").value;
        if(subject === ""){
            alert("Please enter subject name.");
            return;
        }
        if(held === ""){
            held = 0;
        }
        if(attended === ""){
            attended = 0;
        }
        held = Number(held);
        attended = Number(attended);
        if(held < 0 || attended < 0){
            alert("Values cannot be negative.");
            return;
        }
        if(attended > held){
            alert(
                "Attended classes cannot be greater than classes held."
            );
            return;
        }
    let subjects =JSON.parse(localStorage.getItem("subjects")) || [];
    let alreadyExists =
        subjects.some(function(item){
            return item.name.toLowerCase() === subject.toLowerCase();
        });
        if(alreadyExists){
            alert("This subject already exists.");
            return;
        }
    let newSubject = {
        name: subject,
        held: held,
        attended: attended
    };
    subjects.push(newSubject);
    localStorage.setItem("subjects",JSON.stringify(subjects));
    document.getElementById("subjectName").value = "";
    document.getElementById("initialHeld").value = "";
    document.getElementById("initialAttended").value = "";
    loadSubjects();
    loadAttendance();
    loadAllClasses();
    loadTodayClasses();
    updateDashboard();
}
function deleteSubject(index){
    let subjects =JSON.parse(localStorage.getItem("subjects")) || [];
        if(!subjects[index]){
            return;
        }
    let subjectName = subjects[index].name;
    let confirmDelete =
        confirm("Delete " + subjectName + "?");
        if(!confirmDelete){
            return;
        }
        subjects.splice(index, 1);
        localStorage.setItem("subjects",JSON.stringify(subjects));
    let timetable =JSON.parse(localStorage.getItem("timetable")) || [];
    timetable = timetable.filter(function(item){
        return item.subject !== subjectName;
    });
    localStorage.setItem("timetable",JSON.stringify(timetable));
    loadSubjects();
    loadAttendance();
    loadTodayClasses();
    loadAllClasses();
    updateDashboard();
}
function loadSubjects(){
    let subjects =
        JSON.parse(localStorage.getItem("subjects")) || [];
    let list =document.getElementById("subjectList");
        if(!list){
            return;
        }
        list.innerHTML = "";
        if(subjects.length === 0){
            list.innerHTML = `
                <div class="empty-message">
                    No subjects added yet.
                </div>
            `;
            return;
        }
    subjects.forEach(function(subject, index){
            let div =
                document.createElement("div");
                div.className = "subject-list-item";
                div.innerHTML = `
                    <span>
                        ${subject.name}
                    </span>
                    <button
                        onclick="deleteSubject(${index})">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                `;
                list.appendChild(div);
            }
        );

}

// LOAD ATTENDANCE
function loadAttendance(){
    let subjects =
        JSON.parse(localStorage.getItem("subjects")) || [];
    let list =
        document.getElementById("attendanceList");
        if(!list){
            return;
        }
        list.innerHTML = "";
    let totalHeld = 0;
    let totalAttended = 0;
    subjects.forEach(function(subject){
        let held =
            Number(subject.held);
        let attended =
            Number(subject.attended);
            totalHeld += held;
            totalAttended += attended;
        let percentage = 0;
        if(held > 0){
            percentage =(attended / held) * 100;
        }
        let div = document.createElement("div");
        div.className = "subject-attendance";
        div.innerHTML = `
            <div class="subject-top">
                <span class="subject-name">
                    ${subject.name}
                </span>
                <span class="subject-percentage">
                    ${percentage.toFixed(0)}%
                </span>
            </div>
            <div class="progress-bar">
                <div
                    class="progress-fill"
                    style="width: ${percentage}%">
                </div>
            </div>
        `;
        list.appendChild(div);
    });
    let missed =
        totalHeld - totalAttended;
    let overallPercentage = 0;
        if(totalHeld > 0){
            overallPercentage = (totalAttended / totalHeld) * 100;
        }
    document.getElementById("classesHeld").innerText = totalHeld;
    document.getElementById("classesAttended").innerText = totalAttended;
    document.getElementById("classesMissed").innerText = missed;
    document.getElementById("overallPercentage").innerText = overallPercentage.toFixed(0) + "%";
    let circle =
        document.getElementById("attendanceCircle");
    let degree =
        overallPercentage * 3.6;
        circle.style.background =
            `conic-gradient(
                #5b3cc4 0deg,
                #5b3cc4 ${degree}deg,
                #eee ${degree}deg,
                #eee 360deg
            )`;
}
function getToday(){
    return new Date().toLocaleDateString(
        "en-US",
        {
            weekday: "long"
        }
    );

}

//    TODAY'S CLASSES
function loadTodayClasses(){
    let timetable =JSON.parse(localStorage.getItem("timetable")) || [];
    let todayClasses = document.getElementById("todayClasses");
    let todayName = document.getElementById("todayName");
    if(!todayClasses){
        return;
    }
    todayClasses.innerHTML = "";
    let today =
        getToday();
    todayName.innerText = "Today is " + today;
    let classes =
        timetable.filter(function(item){
            return item.day === today;
        });
    if(classes.length === 0){
        todayClasses.innerHTML = `
            <div class="empty-message">

                No classes scheduled for today.

            </div>

        `;

        return;

    }
    classes.forEach(function(item, index){
        let div = document.createElement("div");
        div.className ="today-class";
        let attendance = getClassAttendance(item);
        div.innerHTML = `
            <div class="class-info">
                <span class="class-subject">
                    ${item.subject}
                </span>
                <span class="class-details">
                    ${item.time}
                    &nbsp; | &nbsp;
                    Room ${item.room}
                </span>
            </div>
            <div class="attendance-buttons">
                <button
                    class="present-btn ${
                        attendance === "Present"
                        ? "selected"
                        : ""
                    }"
                    onclick="markAttendance(
                        '${escapeValue(item.subject)}',
                        '${escapeValue(item.time)}',
                        '${escapeValue(item.day)}'
                    )">
                    Present
                </button>
                <button
                    class="absent-btn ${
                        attendance === "Absent"
                        ? "selected"
                        : ""
                    }"
                    onclick="markAbsence(
                        '${escapeValue(item.subject)}',
                        '${escapeValue(item.time)}',
                        '${escapeValue(item.day)}'
                    )">
                    Absent
                </button>
            </div>
        `;
        todayClasses.appendChild(div);
    });
}


//  ESCAPE VALUE
function escapeValue(value){
    return String(value)
        .replace(/'/g, "\\'");
}



//    GET ATTENDANCE RECORDS
function getAttendanceRecords(){
    return JSON.parse(localStorage.getItem("attendanceRecords")) || [];

}



//    GET CLASS RECORD
function getClassAttendance(item){
    let records = getAttendanceRecords();
    let today =
        new Date()
        .toISOString()
        .split("T")[0];
    let record = records.find(function(record){
            return record.date === today &&
                   record.subject === item.subject &&
                   record.time === item.time &&
                   record.day === item.day;
    });
    if(record){
        return record.status;
    }
    return null;
}


//    SAVE ATTENDANCE
function saveClassAttendance(
    subjectName,
    time,
    day,
    status
){
    let records = getAttendanceRecords();
    let today =
        new Date()
        .toISOString()
        .split("T")[0];
    let existingIndex = records.findIndex(function(record){
            return record.date === today &&
                   record.subject === subjectName &&
                   record.time === time &&
                   record.day === day;
    });
    if(existingIndex !== -1){
        records[existingIndex].status =
            status;
    }
    else{
        records.push({
            date: today,
            subject: subjectName,
            time: time,
            day: day,
            status: status

        });

    }
    localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(records)
    );
}

//    PRESENT
function markAttendance(
    subjectName,
    time,
    day
){
    let subjects =
        JSON.parse(
            localStorage.getItem("subjects")
        ) || [];
    let subject =
        subjects.find(function(item){
            return item.name === subjectName;
        });
    if(!subject){
        return;
    }
    let previousStatus = getClassAttendance({
            subject: subjectName,
            time: time,
            day: day

        });

    /*
       If already Present,
       do nothing.
    */

    if(previousStatus === "Present"){
        return;
    }

    /*
       If previously Absent,
       change only attended count.
    */

    if(previousStatus === "Absent"){

        subject.attended += 1;

    }
    else{

        /*
           New class
        */

        subject.held += 1;
        subject.attended += 1;
    }
    saveClassAttendance(
        subjectName,
        time,
        day,
        "Present"
    );
    localStorage.setItem("subjects", JSON.stringify(subjects));
    loadAttendance();
    loadTodayClasses();
    loadAllClasses();
    updateDashboardIfAvailable();
}

//    ABSENT

function markAbsence(
    subjectName,
    time,
    day
){
    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    let subject =
        subjects.find(function(item){
            return item.name === subjectName;
        });
    if(!subject){
        return;
    }
    let previousStatus =
        getClassAttendance({
            subject: subjectName,
            time: time,
            day: day
        });

    /*
       Already Absent
    */
    if(previousStatus === "Absent"){
        return;
    }

    /*
       Previously Present
       Change Present → Absent
    */
    if(previousStatus === "Present"){
        subject.attended -= 1;
    }
    else{
        /*
           New class
        */
        subject.held += 1;

    }
    saveClassAttendance(
        subjectName,
        time,
        day,
        "Absent"
    );
    localStorage.setItem("subjects",JSON.stringify(subjects));
    loadAttendance();
    loadTodayClasses();
    loadAllClasses();
    updateDashboardIfAvailable();
}

//    ALL CLASSES
function loadAllClasses(){
    let timetable =
        JSON.parse(localStorage.getItem("timetable")) || [];
    let subjects =
        JSON.parse(localStorage.getItem("subjects")) || [];
    let list =
        document.getElementById("allClasses");
    if(!list){
        return;
    }
    list.innerHTML = "";
    if(timetable.length === 0){
        list.innerHTML = `
            <div class="empty-message">
                No classes found.
                <br>
                Add classes from Timetable.
            </div>
        `;
        return;
    }
    let header = document.createElement("div");
    header.className = "all-class all-class-header";
    header.innerHTML = `
        <span>
            Day
        </span>
        <span>
            Time
        </span>
        <span>
            Subject
        </span>
        <span>
            Room
        </span>
        <span>
            Attendance
        </span>
    `;
    list.appendChild(header);
    timetable.forEach(function(item){
        let subject = subjects.find(function(subject){
                return subject.name === item.subject;
        });
        let percentage = 0;
        if(subject && subject.held > 0){
            percentage =
                (subject.attended /
                subject.held) * 100;
        }
        let div = document.createElement("div");
        div.className = "all-class";
        div.innerHTML = `
            <span>
                ${item.day}
            </span>
            <span>
                ${item.time}
            </span>
            <span>
                ${item.subject}
            </span>
            <span>
                ${item.room}
            </span>
            <span class="attendance-status">
                ${percentage.toFixed(0)}%
            </span>
        `;
        list.appendChild(div);
    });
}



//    DASHBOARD UPDATE
function updateDashboardIfAvailable(){
    if(typeof updateDashboard === "function"){
        updateDashboard();
    }
}
loadSemester();
loadSubjects();
loadAttendance();
loadTodayClasses();
loadAllClasses();

