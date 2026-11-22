/* =========================================================
   Admin - bookings.js
   ========================================================= */

var bookings = getData("bookings");

// Fill drop-downs with members and classes
function loadOptions() {
  var members = getData("members");
  var classes = getData("classes");
  var html = "";

  for (var i = 0; i < members.length; i++) {
    html += "<option>" + clean(members[i].name) + "</option>";
  }
  document.getElementById("member").innerHTML = html;

  html = "";
  for (var j = 0; j < classes.length; j++) {
    html += "<option>" + clean(classes[j].name) + "</option>";
  }
  document.getElementById("className").innerHTML = html;
}

function showBookings() {
  var html = "";
  var pending = 0;

  for (var i = 0; i < bookings.length; i++) {
    var b = bookings[i];
    var badge = "badge-orange";
    var confirmBtn = "";

    if (b.status === "Confirmed") {
      badge = "badge-green";
    } else {
      pending++;
      confirmBtn = '<button class="btn-small btn-done" onclick="confirmBooking(' + i + ')">Confirm</button>';
    }

    html += "<tr>" +
              "<td>" + (i + 1) + "</td>" +
              "<td>" + clean(b.member) + "</td>" +
              "<td>" + clean(b.className) + "</td>" +
              "<td>" + clean(b.date) + "</td>" +
              '<td><span class="badge ' + badge + '">' + clean(b.status) + "</span></td>" +
              "<td>" + confirmBtn +
                '<button class="btn-small btn-delete" onclick="deleteBooking(' + i + ')">Delete</button>' +
              "</td>" +
            "</tr>";
  }

  if (bookings.length === 0) {
    html = '<tr><td colspan="6" class="empty">No bookings yet.</td></tr>';
  }

  document.getElementById("tableBody").innerHTML = html;
  document.getElementById("totalBookings").innerHTML = bookings.length;
  document.getElementById("pendingBookings").innerHTML = pending;
}

document.getElementById("bookingForm").onsubmit = function (event) {
  event.preventDefault();

  var booking = {
    member: document.getElementById("member").value,
    className: document.getElementById("className").value,
    date: document.getElementById("date").value,
    status: "Pending"
  };

  bookings.push(booking);
  saveData("bookings", bookings);
  document.getElementById("bookingForm").reset();
  showBookings();
};

function confirmBooking(i) {
  bookings[i].status = "Confirmed";
  saveData("bookings", bookings);
  showBookings();
}

function deleteBooking(i) {
  if (confirm("Delete this booking?")) {
    bookings.splice(i, 1);
    saveData("bookings", bookings);
    showBookings();
  }
}

loadOptions();
showBookings();
