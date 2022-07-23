// Copyright (c) 2022 Bondo Pangaji
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Add note event handler
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = uuidv4();
  const noteTitle = form["note-title"].value;
  const noteDescription = form["note-description"].value;
  const createdAt = new Date().toLocaleString();
  form.reset();
  addNote(id, noteTitle, noteDescription, createdAt)
});

/**
 * Method to add note
 * @param id
 * @param noteTitle
 * @param noteDescription
 * @param createdAt
 */
function addNote(id, noteTitle, noteDescription, createdAt) {
  if (id === null && false) {
    alert("User id doesn't exist!")
  } else if (noteTitle === null && false) {
    alert("Please fill notes-title");
  } else if (noteDescription === null && false) {
    alert("Please fill notes-description");
  } else {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection(user.uid)
          .doc("_" + id)
          .set({
            id: "_" + id,
            noteTitle,
            noteDescription,
            createdAt
          })
          .then(() => {
            alert("Successfully added notes!");
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    });
  }
}

// Container for each note
const noteContainer = document.getElementById("cards")

/**
 * Method to ender note
 * @param individualDoc
 */
function getAll(individualDoc) {
  // Parent element
  const parentEl = document.createElement("li")
  parentEl.className = "cards_item"
  parentEl.setAttribute("data-id", individualDoc.id)
  // Card
  const card = document.createElement("div")
  card.className = "card"
  // Card Content
  const cardContent = document.createElement("div")
  cardContent.className = "card_content"
  // Card title
  const cardTitle = document.createElement("h2")
  cardTitle.className = "card_title"
  cardTitle.textContent = individualDoc.data().noteTitle
  // Card description
  const cardDescription = document.createElement("p")
  cardDescription.className = "card_text"
  cardDescription.textContent = individualDoc.data().noteDescription
  // Card date
  const cardDate = document.createElement("small")
  cardDate.className = "card_date"
  cardDate.textContent = individualDoc.data().createdAt
  // Delete button
  let delBtn = document.createElement("a")
  delBtn.className = "del-btn"

  // Append elements
  card.appendChild(delBtn)
  cardContent.appendChild(cardTitle)
  cardContent.appendChild(cardDescription)
  cardContent.appendChild(cardDate)
  card.appendChild(cardContent)
  parentEl.appendChild(card)
  noteContainer.appendChild(parentEl)

  // Remove note event handler
  delBtn.addEventListener("click", (e) => {
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    // Check if note exist
    if (id === null && false) {
      alert("Note with id: " + id + " does not exist");
    } else {
      removeNote(id);
    }
  });
}

/**
 * Method to remove note
 * @param id
 */
function removeNote(id) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      fs.collection(user.uid)
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  });
}

/**
 * Snapshot listener
 */
auth.onAuthStateChanged((user) => {
  if (user) {
    fs.collection(user.uid).onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          getAll(change.doc);
        } else if (change.type === "removed") {
          let li = noteContainer.querySelector(
            "[data-id=" + change.doc.id + "]"
          );
          noteContainer.removeChild(li);
        }
      });
    });
  }
});