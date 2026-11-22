/* =========================================================
   Admin - members.js
   ========================================================= */

var members = getData("members");
var editIndex = -1; // -1 means we are adding, not editing

// Fill the plan drop-down with plans made in the Plans page
function loadPlanOptions() {
  var plans = getData("plans");
  var html = "";
  for (var i = 0; i < plans.length; i++) {
    html += "<option>" + clean(plans[i].name) + "</option>";
  }
  document.getElementById("plan").innerHTML = html;
}

// Show all members in the table
function showMembers() {
  var html = "";
  var active = 0;

  for (var i = 0; i < members.length; i++) {
    var m = members[i];
    var badge = (m.status === "Active") ? "badge-green" : "badge-red";
    if (m.status === "Active") active++;

    html += "<tr>" +
              "<td>" + (i + 1) + "</td>" +
              "<td>" + clean(m.name) + "</td>" +
              "<td>" + clean(m.phone) + "</td>" +
              "<td>" + clean(m.plan) + "</td>" +
              "<td>" + clean(m.joinDate) + "</td>" +
              '<td><span class="badge ' + badge + '">' + clean(m.status) + "</span></td>" +
              "<td>" +
                '<button class="btn-small btn-edit" onclick="editMember(' + i + ')">Edit</button>' +
                '<button class="btn-small btn-delete" onclick="deleteMember(' + i + ')">Delete</button>' +
              "</td>" +
            "</tr>";
  }

  if (members.length === 0) {
    html = '<tr><td colspan="7" class="empty">No members yet.</td></tr>';
  }

  document.getElementById("tableBody").innerHTML = html;
  document.getElementById("totalMembers").innerHTML = members.length;
  document.getElementById("activeMembers").innerHTML = active;
}

// Add or update a member when the form is submitted
document.getElementById("memberForm").onsubmit = function (event) {
  event.preventDefault();

  var member = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    plan: document.getElementById("plan").value,
    joinDate: document.getElementById("joinDate").value,
    status: document.getElementById("status").value
  };

  if (editIndex === -1) {
    members.push(member);          // add new
  } else {
    members[editIndex] = member;   // update old
  }

  saveData("members", members);
  cancelEdit();
  showMembers();
};

// Put a member's details into the form to edit
function editMember(i) {
  var m = members[i];
  document.getElementById("name").value = m.name;
  document.getElementById("phone").value = m.phone;
  document.getElementById("plan").value = m.plan;
  document.getElementById("joinDate").value = m.joinDate;
  document.getElementById("status").value = m.status;

  editIndex = i;
  document.getElementById("formTitle").innerHTML = "Edit Member";
  document.getElementById("saveBtn").innerHTML = "Update Member";
  window.scrollTo(0, 0);
}

// Delete a member
function deleteMember(i) {
  if (confirm("Delete " + members[i].name + "?")) {
    members.splice(i, 1);
    saveData("members", members);
    showMembers();
  }
}

// Clear the form and go back to "add" mode
function cancelEdit() {
  document.getElementById("memberForm").reset();
  editIndex = -1;
  document.getElementById("formTitle").innerHTML = "Add New Member";
  document.getElementById("saveBtn").innerHTML = "Add Member";
}

loadPlanOptions();
showMembers();
