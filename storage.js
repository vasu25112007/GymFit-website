/* =========================================================
   GymFit Gym - storage.js
   This file is shared by the client site AND the admin site.
   All data is saved in the browser using localStorage.
   ========================================================= */

// Data used the very first time the website is opened
var defaultData = {
  plans: [
    { name: "Basic", price: 999, duration: "1 Month", features: "Gym floor access, Locker room, 1 fitness assessment" },
    { name: "Standard", price: 2499, duration: "3 Months", features: "Gym floor access, Group classes, Locker room, Diet chart" },
    { name: "Premium", price: 8999, duration: "12 Months", features: "All gym access, Unlimited classes, Personal trainer (4 sessions), Diet chart, Steam room" }
  ],
  trainers: [
    { name: "Rahul Sharma", specialty: "Strength & Bodybuilding", experience: 8 },
    { name: "Priya Verma", specialty: "Yoga & Flexibility", experience: 6 },
    { name: "Arjun Singh", specialty: "CrossFit & HIIT", experience: 5 },
    { name: "Neha Kapoor", specialty: "Zumba & Cardio", experience: 4 }
  ],
  classes: [
    { name: "Power Lifting", day: "Monday", time: "07:00", trainer: "Rahul Sharma" },
    { name: "Morning Yoga", day: "Tuesday", time: "06:30", trainer: "Priya Verma" },
    { name: "HIIT Blast", day: "Wednesday", time: "18:00", trainer: "Arjun Singh" },
    { name: "Zumba Party", day: "Friday", time: "19:00", trainer: "Neha Kapoor" }
  ],
  members: [
    { name: "Amit Kumar", phone: "9876543210", plan: "Standard", joinDate: "2026-09-01", status: "Active" },
    { name: "Sneha Patel", phone: "9123456780", plan: "Premium", joinDate: "2026-07-15", status: "Active" },
    { name: "Vikram Rao", phone: "9988776655", plan: "Basic", joinDate: "2026-05-10", status: "Expired" }
  ],
  bookings: [
    { member: "Amit Kumar", className: "HIIT Blast", date: "2026-11-25", status: "Confirmed" },
    { member: "Sneha Patel", className: "Morning Yoga", date: "2026-11-24", status: "Pending" }
  ],
  messages: []
};

// Read a list from localStorage (or use the default list)
function getData(key) {
  var saved = localStorage.getItem("gymfit_" + key);
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultData[key];
}

// Save a list to localStorage
function saveData(key, list) {
  localStorage.setItem("gymfit_" + key, JSON.stringify(list));
}

// Stop people typing HTML tags into forms (simple safety)
function clean(text) {
  return String(text).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
