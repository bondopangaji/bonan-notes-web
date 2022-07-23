// Copyright (c) 2022 Bondo Pangaji
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Middleware to check login state
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User successfully login")
  } else {
    alert("Session expired or you've been logged out")
    location = "index.html";
  }
});
