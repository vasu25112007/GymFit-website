/* =========================================================
   GymFit Gym - main.js (Client website)
   Each function only runs if its element is on the page.
   ========================================================= */

// ---------- Mobile menu button ----------
var menuBtn = document.getElementById("menuBtn");
var navLinks = document.getElementById("navLinks");

if (menuBtn) {
  menuBtn.onclick = function () {
    navLinks.classList.toggle("show");
  };
}

// ---------- Show membership plans ----------
function showPlans() {
  var box = document.getElementById("plansList");
  if (!box) return;

  var plans = getData("plans");
  var html = "";

  for (var i = 0; i < plans.length; i++) {
    var p = plans[i];
    var features = p.features.split(",");
    var list = "";

    for (var j = 0; j < features.length; j++) {
      list += "<li>" + clean(features[j].trim()) + "</li>";
    }

    // Make the middle plan look "popular"
    var extraClass = (i === 1) ? " popular" : "";

    html += '<div class="card plan-card' + extraClass + '">' +
              "<h3>" + clean(p.name) + "</h3>" +
              '<div class="price">₹' + clean(p.price) + " <small>/ " + clean(p.duration) + "</small></div>" +
              "<ul>" + list + "</ul>" +
            "</div>";
  }

  if (plans.length === 0) {
    html = '<p class="section-sub">No plans available right now.</p>';
  }

  box.innerHTML = html;
}

// ---------- Show class schedule ----------
function showClasses() {
  var body = document.getElementById("classesList");
  if (!body) return;

  var classes = getData("classes");
  var html = "";

  for (var i = 0; i < classes.length; i++) {
    var c = classes[i];
    html += "<tr>" +
              "<td>" + clean(c.name) + "</td>" +
              "<td>" + clean(c.day) + "</td>" +
              "<td>" + clean(c.time) + "</td>" +
              "<td>" + clean(c.trainer) + "</td>" +
            "</tr>";
  }

  if (classes.length === 0) {
    html = '<tr><td colspan="4">No classes scheduled.</td></tr>';
  }

  body.innerHTML = html;
}

// ---------- Show trainers ----------
function showTrainers() {
  var box = document.getElementById("trainersList");
  if (!box) return;

  var trainers = getData("trainers");
  var html = "";

  for (var i = 0; i < trainers.length; i++) {
    var t = trainers[i];
    var firstLetter = t.name.charAt(0).toUpperCase();

    html += '<div class="card trainer-card">' +
              '<div class="avatar">' + clean(firstLetter) + "</div>" +
              "<h3>" + clean(t.name) + "</h3>" +
              "<p>" + clean(t.specialty) + "</p>" +
              '<span class="tag">' + clean(t.experience) + " years experience</span>" +
            "</div>";
  }

  box.innerHTML = html;
}

// ---------- Contact form ----------
function setupContactForm() {
  var form = document.getElementById("contactForm");
  if (!form) return;

  form.onsubmit = function (event) {
    event.preventDefault(); // stop page reload

    var message = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      text: document.getElementById("message").value,
      date: new Date().toLocaleString(),
      read: false
    };

    var messages = getData("messages");
    messages.push(message);
    saveData("messages", messages);

    form.reset();
    document.getElementById("successMsg").style.display = "block";
  };
}

// ---------- Footer year ----------
var yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.innerHTML = new Date().getFullYear();
}

// Run everything
showPlans();
showClasses();
showTrainers();
setupContactForm();
