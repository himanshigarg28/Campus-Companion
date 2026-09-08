
//    GET GRADE POINT
function getGradePoint(marks){
    if (marks >= 90) {
        return 10;
    }
    if (marks >= 75) {
        return 9;
    }
    if (marks >= 65) {
        return 8;
    }
    if (marks >= 55) {
        return 7;
    }
    if (marks >= 50) {
        return 6;
    }
    if (marks >= 45) {
        return 5;
    }
    if (marks >= 40) {
        return 4;
    }
    return 0;
}

//    ADD SUBJECT


function addCGPASubject(){
    let subject = document.getElementById("subjectName").value.trim();
    let marks = document.getElementById("marks").value;
    let credits = document.getElementById("credits").value;

    /* CHECK SUBJECT */
    if (subject === ""){
        alert("Please enter subject name.");
        return;
    }

    /* CHECK MARKS */
    if (marks === ""){
        alert("Please enter marks.");
        return;
    }
    marks = Number(marks);

    if(marks < 0 || marks > 100){
        alert("Marks must be between 0 and 100.");
        return;
    }

    /* CHECK CREDITS */
    if (credits === ""){
        alert("Please enter credits.");
        return;
    }
    credits = Number(credits);
    if (credits <= 0){
        alert("Credits must be greater than 0.");
        return;
    }

    /* GET EXISTING SUBJECTS */
    let subjects =JSON.parse(localStorage.getItem("cgpaSubjects")) || [];

    /* MAXIMUM 20 */
    if(subjects.length >= 20){
        alert("You can add maximum 20 subjects.");
        return;
    }

    /* DUPLICATE CHECK */
    let alreadyExists =
        subjects.some(function(item){
            return item.subject.toLowerCase() ===
                   subject.toLowerCase();
        });
    if(alreadyExists){
        alert("This subject has already been added.");
        return;
    }

    /* CALCULATE GRADE POINT */
    let gradePoint = getGradePoint(marks);

    /* CREATE SUBJECT */
    let newSubject = {
        subject: subject,
        marks: marks,
        credits: credits,
        gradePoint: gradePoint
    };
    subjects.push(newSubject);

    /* SAVE */

    localStorage.setItem("cgpaSubjects",JSON.stringify(subjects));

    /* CLEAR FORM */
    document.getElementById("subjectName").value = "";
    document.getElementById("marks").value = "";
    document.getElementById("credits").value = "";

    /* UPDATE */
    loadCGPASubjects();
    calculateCGPA();
}

//    LOAD SUBJECTS
function loadCGPASubjects(){
    let subjects = JSON.parse(localStorage.getItem("cgpaSubjects")) || [];
    let list = document.getElementById("cgpaSubjectList");
    list.innerHTML = "";

    /* EMPTY */
    if (subjects.length === 0){
        list.innerHTML = `
            <div class="cgpa-empty">
                <i class="fa-solid fa-book-open"></i>
                <p>
                    No subjects added yet.
                </p>
                <small>
                    Add your first subject above.
                </small>
            </div>
        `;
        updateSubjectCount();
        return;
    }
    /* TABLE */
    let table = document.createElement("table");
    table.className = "cgpa-table";
    table.innerHTML = `
        <thead>
            <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Credits</th>
                <th>Grade Point</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="cgpaTableBody"></tbody>
    `;
    list.appendChild(table);
    let tbody =
        document.getElementById("cgpaTableBody");
        subjects.forEach(function(item, index){
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>
                ${index + 1}
            </td>
            <td>
                <strong>
                    ${item.subject}
                </strong>
            </td>
            <td>
                ${item.marks}
            </td>
            <td>
                ${item.credits}
            </td>
            <td class="grade-point">
                ${item.gradePoint}
            </td>
            <td>
                <button
                    class="delete-subject-btn"
                    onclick="deleteCGPASubject(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    updateSubjectCount();
}

//    DELETE SUBJECT
function deleteCGPASubject(index){
    let subjects = JSON.parse(localStorage.getItem("cgpaSubjects")) || [];
    subjects.splice(index, 1);
    localStorage.setItem("cgpaSubjects",JSON.stringify(subjects));
    loadCGPASubjects();
    calculateCGPA();
}

//    CALCULATE CGPA
function calculateCGPA(){
    let subjects = JSON.parse(localStorage.getItem("cgpaSubjects")) || [];
    let totalCredits = 0;
    let weightedPoints = 0;
    subjects.forEach(function(item){
        let credits = Number(item.credits);
        let gradePoint = Number(item.gradePoint);
        totalCredits += credits;
        weightedPoints += gradePoint * credits;
    });
    let cgpa = 0;
    if (totalCredits > 0) {
        cgpa =
            weightedPoints /
            totalCredits;
    }
    document.getElementById("cgpaValue").innerText = cgpa.toFixed(2);
    document.getElementById("totalCredits").innerText = totalCredits;
    document.getElementById("totalSubjects").innerText = subjects.length;
    updateSubjectCount();
}

//    SUBJECT COUNT


function updateSubjectCount(){
    let subjects = JSON.parse(localStorage.getItem("cgpaSubjects")) || [];
    document.getElementById("subjectCount").innerText = subjects.length + " / 20 Subjects";
}


//    RESET
function resetCGPA(){
    let subjects = JSON.parse(localStorage.getItem("cgpaSubjects")) || [];
    if (subjects.length === 0){
        return;
    }
    let confirmReset =confirm("Are you sure you want to delete all subjects?");
    if(!confirmReset){
        return;
    }
    localStorage.removeItem("cgpaSubjects");
    loadCGPASubjects();
    calculateCGPA();
}

//    LOAD ON PAGE

loadCGPASubjects();
calculateCGPA();