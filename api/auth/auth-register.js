// Copyright (c) 2022 Bondo Pangaji
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Register Event Handler
const registerForm = document.getElementById("register-form")
registerForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const name = registerForm["name"].value
  const email = registerForm["email"].value
  const password = registerForm["password"].value
  registerForm.reset()
  register(name, email, password)
});

// Register Method
function register(name, email, password) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return fs
        .collection("users")
        .doc(cred.user.uid)
        .set({
          Name: name,
          Email: email,
          Password: password,
        })
        .then(() => {
          location = "index.html";
        })
        .catch((err) => {
          alert(err.message)
        });
    })
    .catch((err) => {
      alert(err.msg)
    });
}

