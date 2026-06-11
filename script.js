let students = JSON.parse(localStorage.getItem("students"));

if (!students) {
    students = [
        { rollNo: 101, name: "Srinidhi", attendance: "Present", math: 90, science: 85, english: 95 },
        { rollNo: 102, name: "Rahul", attendance: "Present", math: 78, science: 82, english: 80 },
        { rollNo: 103, name: "Priya", attendance: "Absent", math: 88, science: 91, english: 89 },
        { rollNo: 104, name: "Arjun", attendance: "Present", math: 75, science: 79, english: 84 },
        { rollNo: 105, name: "Sneha", attendance: "Present", math: 92, science: 90, english: 94 },
        { rollNo: 106, name: "Kiran", attendance: "Absent", math: 70, science: 72, english: 76 },
        { rollNo: 107, name: "Ananya", attendance: "Present", math: 95, science: 97, english: 93 },
        { rollNo: 108, name: "Rohit", attendance: "Present", math: 82, science: 84, english: 81 },
        { rollNo: 109, name: "Pooja", attendance: "Present", math: 87, science: 89, english: 90 },
        { rollNo: 110, name: "Aakash", attendance: "Absent", math: 68, science: 70, english: 72 },
        { rollNo: 111, name: "Deepak", attendance: "Present", math: 80, science: 78, english: 85 },
        { rollNo: 112, name: "Meera", attendance: "Present", math: 91, science: 92, english: 88 },
        { rollNo: 113, name: "Varun", attendance: "Absent", math: 73, science: 75, english: 71 },
        { rollNo: 114, name: "Nisha", attendance: "Present", math: 89, science: 90, english: 92 },
        { rollNo: 115, name: "Harsha", attendance: "Present", math: 76, science: 81, english: 79 },
        { rollNo: 116, name: "Divya", attendance: "Present", math: 94, science: 96, english: 95 },
        { rollNo: 117, name: "Abhishek", attendance: "Absent", math: 72, science: 74, english: 73 },
        { rollNo: 118, name: "Kavya", attendance: "Present", math: 90, science: 88, english: 91 },
        { rollNo: 119, name: "Manoj", attendance: "Present", math: 79, science: 83, english: 77 },
        { rollNo: 120, name: "Aditi", attendance: "Present", math: 93, science: 94, english: 92 },
        { rollNo: 121, name: "Sanjay", attendance: "Absent", math: 69, science: 71, english: 68 },
        { rollNo: 122, name: "Neha", attendance: "Present", math: 88, science: 87, english: 90 },
        { rollNo: 123, name: "Vikas", attendance: "Present", math: 77, science: 80, english: 78 },
        { rollNo: 124, name: "Ishita", attendance: "Present", math: 96, science: 95, english: 97 },
        { rollNo: 125, name: "Ajay", attendance: "Absent", math: 71, science: 73, english: 70 },
        { rollNo: 126, name: "Riya", attendance: "Present", math: 92, science: 91, english: 93 },
        { rollNo: 127, name: "Nitin", attendance: "Present", math: 81, science: 79, english: 82 },
        { rollNo: 128, name: "Bhavana", attendance: "Present", math: 89, science: 88, english: 90 },
        { rollNo: 129, name: "Gaurav", attendance: "Absent", math: 74, science: 76, english: 72 },
        { rollNo: 130, name: "Shreya", attendance: "Present", math: 95, science: 93, english: 96 }
    ];

    localStorage.setItem("students", JSON.stringify(students));
}

window.onload = function () {
    loadStudents();
};

let editIndex = -1;

function addStudent() {

    let rollNo = document.getElementById("rollNo").value;
    let name = document.getElementById("studentName").value;
    let attendance = document.getElementById("attendance").value;
    let math = document.getElementById("math").value;
    let science = document.getElementById("science").value;
    let english = document.getElementById("english").value;

    if (!rollNo || !name) {
        alert("Please enter Roll Number and Student Name");
        return;
    }

    if (editIndex === -1) {

        let exists = students.some(
            student => student.rollNo == rollNo
        );

        if (exists) {
            alert("Roll Number already exists");
            return;
        }

        students.push({
            rollNo,
            name,
            attendance,
            math,
            science,
            english
        });

    } else {

        students[editIndex] = {
            rollNo,
            name,
            attendance,
            math,
            science,
            english
        };

        editIndex = -1;
    }

    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("rollNo").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("math").value = "";
    document.getElementById("science").value = "";
    document.getElementById("english").value = "";

    loadStudents();
}

function editStudent(index) {

    let student = students[index];

    document.getElementById("rollNo").value = student.rollNo;
    document.getElementById("studentName").value = student.name;
    document.getElementById("attendance").value = student.attendance;
    document.getElementById("math").value = student.math;
    document.getElementById("science").value = student.science;
    document.getElementById("english").value = student.english;

    editIndex = index;
}

function deleteStudent(index) {

    if (!confirm("Delete this student?")) {
        return;
    }

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    loadStudents();
}

function loadStudents() {

    let attendanceTable =
        document.getElementById("attendanceTable");

    let marksTable =
        document.getElementById("marksTable");

    let searchText = "";

    let searchBox =
        document.getElementById("searchBox");

    if (searchBox) {
        searchText =
            searchBox.value.toLowerCase();
    }

    while (attendanceTable.rows.length > 1)
        attendanceTable.deleteRow(1);

    while (marksTable.rows.length > 1)
        marksTable.deleteRow(1);

    students.forEach((student, index) => {

        if (
            searchText &&
            !student.name.toLowerCase().includes(searchText) &&
            !student.rollNo.toString().includes(searchText)
        ) {
            return;
        }

        let attendanceRow =
            attendanceTable.insertRow();

        attendanceRow.insertCell(0).innerHTML =
            student.rollNo;

        attendanceRow.insertCell(1).innerHTML =
            student.name;

        attendanceRow.insertCell(2).innerHTML =
            student.attendance;

        let total =
            Number(student.math) +
            Number(student.science) +
            Number(student.english);

        let percentage =
            ((total / 300) * 100).toFixed(2);

        let marksRow =
            marksTable.insertRow();

        marksRow.insertCell(0).innerHTML =
            student.rollNo;

        marksRow.insertCell(1).innerHTML =
            student.name;

        marksRow.insertCell(2).innerHTML =
            student.math;

        marksRow.insertCell(3).innerHTML =
            student.science;

        marksRow.insertCell(4).innerHTML =
            student.english;

        marksRow.insertCell(5).innerHTML =
            total;

        marksRow.insertCell(6).innerHTML =
            percentage + "%";

        marksRow.insertCell(7).innerHTML =
            `<button onclick="editStudent(${index})">Edit</button>`;

        marksRow.insertCell(8).innerHTML =
            `<button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>`;
    });
}