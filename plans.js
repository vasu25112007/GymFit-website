/* =========================================================
   Admin - plans.js
   ========================================================= */

var plans = getData("plans");
var editIndex = -1;

// Show all plans in the table
function showPlans() {
  var html = "";

  for (var i = 0; i < plans.length; i++) {
    var p = plans[i];
    html += "<tr>" +
              "<td>" + (i + 1) + "</td>" +
              "<td>" + clean(p.name) + "</td>" +
              "<td>₹" + clean(p.price) + "</td>" +
              "<td>" + clean(p.duration) + "</td>" +
              "<td>" + clean(p.features) + "</td>" +
              "<td>" +
                '<button class="btn-small btn-edit" onclick="editPlan(' + i + ')">Edit</button>' +
                '<button class="btn-small btn-delete" onclick="deletePlan(' + i + ')">Delete</button>' +
              "</td>" +
            "</tr>";
  }

  if (plans.length === 0) {
    html = '<tr><td colspan="6" class="empty">No plans yet.</td></tr>';
  }

  document.getElementById("tableBody").innerHTML = html;
}

// Add or update a plan
document.getElementById("planForm").onsubmit = function (event) {
  event.preventDefault();

  var plan = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    duration: document.getElementById("duration").value,
    features: document.getElementById("features").value
  };

  if (editIndex === -1) {
    plans.push(plan);
  } else {
    plans[editIndex] = plan;
  }

  saveData("plans", plans);
  cancelEdit();
  showPlans();
};

function editPlan(i) {
  var p = plans[i];
  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("duration").value = p.duration;
  document.getElementById("features").value = p.features;

  editIndex = i;
  document.getElementById("formTitle").innerHTML = "Edit Plan";
  document.getElementById("saveBtn").innerHTML = "Update Plan";
  window.scrollTo(0, 0);
}

function deletePlan(i) {
  if (confirm("Delete the " + plans[i].name + " plan?")) {
    plans.splice(i, 1);
    saveData("plans", plans);
    showPlans();
  }
}

function cancelEdit() {
  document.getElementById("planForm").reset();
  editIndex = -1;
  document.getElementById("formTitle").innerHTML = "Add New Plan";
  document.getElementById("saveBtn").innerHTML = "Add Plan";
}

showPlans();
