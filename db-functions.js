let firebase = require("./functions/db-config");

const db = firebase.admin.firestore();

async function returnUserFromUserID(userID) {
  const userData = await db
    .collection("users")
    .doc(userID)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log("user not found, doc doesnt exist");
        return undefined;
      }

      const data = doc.data();
      return data;
    });

  return userData;
}

async function handleUserLogin(id, displayName, profilePicLink, email) {
  const userRef = await db.collection("users").doc(id);
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
  returnUserFromUserID,
  handleUserLogin,
};
