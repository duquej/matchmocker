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

async function handleNewInterviewRequest(
  email,
  googleID,
  introduction,
  datetime,
  name,
  topic,
  slanguage,
  planguage,
  zoomlink,
  doclink
) {
  console.log("zoomlink data:");
  console.log(zoomlink);
  const requestsRef = await db.collection("requests").doc(googleID);
  requestsRef.set({ googleID: googleID, email: email }, { merge: true });
  requestsRef
    .collection("userrequests")
    .doc(datetime)
    .set({
      email: email,
      googleID: googleID,
      introduction: introduction,
      datetime: datetime,
      name: name,
      topic: topic,
      slanguage: slanguage,
      planguage: planguage,
      zoomlink: zoomlink,
      doclink: doclink,
      fullfilled: false,
    })
    .then(() => {})
    .catch((err) => {
      console.log("handleNewInterviewRequest error occured: ");
      console.log(err);
    });
}

module.exports = {
  returnUserFromUserID,
  handleUserLogin,
  handleNewInterviewRequest,
};
