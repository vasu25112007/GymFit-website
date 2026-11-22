/* =========================================================
   Admin - classes.js
   ========================================================= */

var classes = getData("classes");
var editIndex = -1;

// Fill the trainer drop-down with trainers from the Trainers page
function loadTrainerOptions() {
  var trainers = getData("trainers");
  var html = "";
  for (var i = 0; i < trainers.length; i++) {
    html += "<option>" + clean(trainers[i].name) + "</option>";
  }
  document.getElementById("trainer").innerHTML = html;
}

function showClasses() {
  var html = "";

  for (var i = 0; i < classes.length; i++) {
    var c = classes[i];
    html += "<tr>" +
              "<td>" + (i + 1) + "</td>" +
              "<td>" + clean(c.name) + "</td>" +
              "<td>" + clean(c.day) + "</td>" +
              "<td>" + clean(c.time) + "</td>" +
              "<td>" + clean(c.trainer) + "</td>" +
              "<td>" +
                '<button class="btn-small btn-edit" onclick="editClass(' + i + ')">Edit</button>' +
                '<button class="btn-small btn-delete" onclick="deleteClass(' + i + ')">Delete</button>' +
              "</td>" +
            "</tr>";
  }

  if (classes.length === 0) {
    html = '<tr><td colspan="6" class="empty">No classes yet.</td></tr>';
  }

  document.getElementById("tableBody").innerHTML = html;
}

document.getElementById("classForm").onsubmit = function (event) {
  event.preventDefault();

  var newClass = {
    name: document.getElementById("name").value,
    day: document.getElementById("day").value,
    time: document.getElementById("time").value,
    trainer: document.getElementById("trainer").value
  };

  if (editIndex === -1) {
    classes.push(newClass);
  } else {
    classes[editIndex] = newClass;
  }

  saveData("classes", classes);
  cancelEdit();
  showClasses();
};

function editClass(i) {
  var c = classes[i];
  document.getElementById("name").value = c.name;
  document.getElementById("day").value = c.day;
  document.getElementById("time").value = c.time;
  document.getElementById("trainer").value = c.trainer;

  editIndex = i;
  document.getElementById("formTitle").innerHTML = "Edit Class";
  document.getElementById("saveBtn").innerHTML = "Update Class";
  window.scrollTo(0, 0);
}

function deleteClass(i) {
  if (confirm("Delete " + classes[i].name + "?")) {
    classes.splice(i, 1);
    saveData("classes", classes);
    showClasses();
  }
}

function cancelEdit() {
  document.getElementById("classForm").reset();
  editIndex = -1;
  document.getElementById("formTitle").innerHTML = "Add New Class";
  document.getElementById("saveBtn").innerHTML = "Add Class";
}

loadTrainerOptions();
showClasses();
