/* =========================================================
   Admin - messages.js
   ========================================================= */

var messages = getData("messages");

function showMessages() {
  var html = "";
  var unread = 0;

  for (var i = 0; i < messages.length; i++) {
    var m = messages[i];
    var readBtn = "";
    var style = "";

    if (!m.read) {
      unread++;
      style = ' style="font-weight:bold"';
      readBtn = '<button class="btn-small btn-done" onclick="markRead(' + i + ')">Mark Read</button>';
    }

    html += "<tr" + style + ">" +
              "<td>" + (i + 1) + "</td>" +
              "<td>" + clean(m.name) + "</td>" +
              "<td>" + clean(m.email) + "<br>" + clean(m.phone) + "</td>" +
              "<td>" + clean(m.subject) + "</td>" +
              "<td>" + clean(m.text) + "</td>" +
              "<td>" + clean(m.date) + "</td>" +
              "<td>" + readBtn +
                '<button class="btn-small btn-delete" onclick="deleteMessage(' + i + ')">Delete</button>' +
              "</td>" +
            "</tr>";
  }

  if (messages.length === 0) {
    html = '<tr><td colspan="7" class="empty">No messages yet. Send one from the Contact page.</td></tr>';
  }

  document.getElementById("tableBody").innerHTML = html;
  document.getElementById("totalMessages").innerHTML = messages.length;
  document.getElementById("unreadMessages").innerHTML = unread;
}

function markRead(i) {
  messages[i].read = true;
  saveData("messages", messages);
  showMessages();
}

function deleteMessage(i) {
  if (confirm("Delete this message?")) {
    messages.splice(i, 1);
    saveData("messages", messages);
    showMessages();
  }
}

showMessages();
