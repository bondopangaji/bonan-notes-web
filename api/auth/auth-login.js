// Copyright (c) 2022 Bondo Pangaji
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Login Event Handler
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["email"].value;
  const password = loginForm["password"].value;

  login(email, password)
})

// Login Method
function login(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      location = "main.html";
    })
    .catch((err) => {
      alert(err.message);
    })
}
