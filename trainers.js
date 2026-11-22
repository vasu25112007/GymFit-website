/* =========================================================
   Admin - trainers.js
   ========================================================= */

var trainers = getData("trainers");
var editIndex = -1;

function showTrainers() {
  var html = "";

  for (var i = 0; i < trainers.length; i++) {
    var t = trainers[i];
    html += "<tr>" +
              "<td>" + (i + 1) + "</td>" +
              "<td>" + clean(t.name) + "</td>" +
              "<td>" + clean(t.specialty) + "</td>" +
              "<td>" + clean(t.experience) + " years</td>" +
              "<td>" +
                '<button class="btn-small btn-edit" onclick="editTrainer(' + i + ')">Edit</button>' +
                '<button class="btn-small btn-delete" onclick="deleteTrainer(' + i + ')">Delete</button>' +
              "</td>" +
            "</tr>";
  }

  if (trainers.length === 0) {
    html = '<tr><td colspan="5" class="empty">No trainers yet.</td></tr>';
  }

  document.getElementById("tableBody").innerHTML = html;
}

document.getElementById("trainerForm").onsubmit = function (event) {
  event.preventDefault();

  var trainer = {
    name: document.getElementById("name").value,
    specialty: document.getElementById("specialty").value,
    experience: document.getElementById("experience").value
  };

  if (editIndex === -1) {
    trainers.push(trainer);
  } else {
    trainers[editIndex] = trainer;
  }

  saveData("trainers", trainers);
  cancelEdit();
  showTrainers();
};

function editTrainer(i) {
  var t = trainers[i];
  document.getElementById("name").value = t.name;
  document.getElementById("specialty").value = t.specialty;
  document.getElementById("experience").value = t.experience;

  editIndex = i;
  document.getElementById("formTitle").innerHTML = "Edit Trainer";
  document.getElementById("saveBtn").innerHTML = "Update Trainer";
  window.scrollTo(0, 0);
}

function deleteTrainer(i) {
  if (confirm("Delete " + trainers[i].name + "?")) {
    trainers.splice(i, 1);
    saveData("trainers", trainers);
    showTrainers();
  }
}

function cancelEdit() {
  document.getElementById("trainerForm").reset();
  editIndex = -1;
  document.getElementById("formTitle").innerHTML = "Add New Trainer";
  document.getElementById("saveBtn").innerHTML = "Add Trainer";
}

showTrainers();
