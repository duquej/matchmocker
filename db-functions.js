let firebase = require("./functions/db-config");

const db = firebase.admin.firestore();

async function checkIfUserIDExists(userID) {
  const userRef = await db
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.googleID === userID) {
          return true;
        }
      });
    });

  return false;
}

async function handleUserLogin(id, displayName, profilePicLink, email) {
  const userRef = await db.collection("users").doc(email);
  userRef
    .set(
      {
        username: displayName,
        googleID: id,
        profilePic: profilePicLink,
        email: email,
      },
      { merge: true }
    )
    .then((res) => {
      console.log("Addded user to database.");
    })
    .catch((err) => {
      console.log("An error has occured trying to add a user to the database.");
    });
}

module.exports = {
  checkIfUserIDExists,
  handleUserLogin,
};
