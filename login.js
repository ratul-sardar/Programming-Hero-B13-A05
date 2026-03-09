const username = document.getElementById("username");
const password = document.getElementById("password");

function login() {
  if (username.value === "admin" && password.value === "admin123") {
    window.location.pathname = "./dashboard.html";
  } else {
    alert("Wrong username/password.");
  }
}
