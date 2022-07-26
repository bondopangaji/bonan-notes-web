// Copyright (c) 2022 Bondo Pangaji
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Add note event handler
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const noteTitle = form["note-title"].value;
  const noteDescription = form["note-description"].value;
  const createdAt = dateNow();
  form.reset();
  addNote(noteTitle, noteDescription, createdAt);
});

/**
 * Method to add note
 * @param id
 * @param noteTitle
 * @param noteDescription
 * @param createdAt
 */
function addNote(noteTitle, noteDescription, createdAt) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.ref("users/" + user.uid + "/notes").push(
        {
          title: noteTitle,
          description: noteDescription,
          createdAt: createdAt,
        },
        (error) => {
          if (error) {
            alert(error);
          } else {
            alert("Sucessfully add notes");
          }
        }
      );
    }
  });
}

// Container for each note
const noteContainer = document.getElementById("cards");

/**
 * Method to render note
 * @param {*} childKey
 * @param {*} childData
 */
function getAll(childKey, childData) {
  // Parent element
  const parentEl = document.createElement("li");
  parentEl.className = "cards_item";
  parentEl.setAttribute("data-id", childKey);
  // Card
  const card = document.createElement("div");
  card.className = "card";
  // Card Content
  const cardContent = document.createElement("div");
  cardContent.className = "card_content";
  cardContent.dataset.target = "modal-update";
  cardContent.setAttribute("onClick", "toggleModal(event)");
  // Card title
  const cardTitle = document.createElement("h2");
  cardTitle.className = "card_title";
  cardTitle.textContent = childData.title;
  // Card description
  const cardDescription = document.createElement("p");
  cardDescription.className = "card_text";
  cardDescription.textContent = childData.description;
  // Card date
  const cardDate = document.createElement("small");
  cardDate.className = "card_date";
  cardDate.textContent = childData.createdAt;
  // Delete button
  let delBtn = document.createElement("a");
  delBtn.className = "del-btn";

  // Append elements
  card.appendChild(delBtn);
  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardDescription);
  cardContent.appendChild(cardDate);
  card.appendChild(cardContent);
  parentEl.appendChild(card);
  noteContainer.appendChild(parentEl);

  // Update note event handler
  const formUpdate = document.getElementById("form-update");
  cardContent.addEventListener("click", (e) => {
    const key =
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "data-id"
      );
    formUpdate.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        title: formUpdate["note-title-update"].value,
        description: formUpdate["note-description-update"].value,
        createdAt: dateNow(),
      };
      form.reset();
      updateNote(key, data);
    });
  });

  // Remove note event handler
  delBtn.addEventListener("click", (e) => {
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    removeNote(id);
  });
}

/**
 * Method to update note
 * @param key
 */
function updateNote(key, data) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.ref("users/" + user.uid + "/notes")
        .child(key)
        .update(data);
    }
    location.reload();
  });
}

/**
 * Method to remove note
 * @param key
 */
function removeNote(key) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.ref("users/" + user.uid + "/notes")
        .child(key)
        .remove();
    }
    location.reload();
  });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    let notesRef = db.ref("users/" + user.uid);

    notesRef.on("child_added", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        getAll(childKey, childData);
      });
    });

    notesRef.on("child_removed", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let childKey = childSnapshot.key;
        let li = noteContainer.querySelector("[data-id=" + childKey + "]");
        noteContainer.removeChild(li);
      });
    });
  }
});
