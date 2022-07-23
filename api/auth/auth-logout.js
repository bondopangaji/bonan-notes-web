// Copyright (c) 2022 Bondo Pangaji
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Logout Event Handler
const logoutBtn = document.getElementById("logout-button");
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logout()
})

// Logout
function logout() {
  auth.signOut();
}


