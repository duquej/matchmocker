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

async function deleteUserInterviewRequest(docID, googleID) {
  const userRef = await db.collection("requests").doc(googleID);
  const updatedRequests = userRef
    .collection("userrequests")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        if (doc.id === docID) {
          console.log("document deleted");
          doc.ref.delete().catch((err) => {
            console.log(err);
          });
        }
      });

      //This could be optimized.
      return querySnapshot.docs
        .map((doc) => {
          return doc.data();
        })
        .filter((doc) => {
          console.log(doc.datetime != docID);
          return doc.datetime != docID;
        });
    })
    .catch((err) => {
      console.log(erro);
    });

  return updatedRequests;
}

async function getAllUnfullfilledRequests() {
  const requestsRefData = await db
    .collection("requests")
    .get()
    .then((querySnapshot) => {
      var allAvailableRequests = [];
      return new Promise((resolve, reject) => {
        querySnapshot.forEach(async (userDoc) => {
          const userRequestsRefData = await userDoc.ref
            .collection("userrequests")
            .where("fullfilled", "==", false)
            .get()
            .then((requestsSnap) => {
              requestsSnap.forEach((request) => {
                allAvailableRequests.push(request.data());
              });
              resolve(allAvailableRequests);
            })
            .catch((err) => {
              reject(err); //
            });
        });
      });
    })

    .catch((err) => {
      console.log(err);
    });

  return requestsRefData;
}

async function acceptUserRequest(
  requesterGoogleID,
  requesterDocID,
  accepterEmail,
  accepterGoogleID,
  accepterName
) {
  const requestsRef = db.collection("requests");
  const requesterRef = requestsRef
    .doc(requesterGoogleID)
    .collection("userrequests")
    .doc(requesterDocID);

  await requesterRef
    .update({
      fullfilled: true,
      accepter: {
        googleID: accepterGoogleID,
        email: accepterEmail,
        name: accepterName,
      },
    })
    .catch((err) => console.log(err));

  const requesterDocData = await requesterRef
    .get()
    .then((docSnap) => {
      if (docSnap.exists) {
        return docSnap.data();
      } else {
        throw "Requester Doc DNE";
      }
    })
    .catch((err) => console.log(err));

  const accepterRef = requestsRef.doc(accepterGoogleID);

  await accepterRef.set(
    { googleID: accepterGoogleID, email: accepterEmail },
    { merge: true }
  );
  await accepterRef.collection("acceptedrequests").doc(requesterDocID).set({
    requesterData: requesterDocData,
  });

  return true;
}

async function getSpecificInterviewRequest(googleID, docID) {
  const requestRef = await db.collection("requests").doc(googleID);
  const interviewRequest = requestRef
    .collection("userrequests")
    .doc(docID)
    .get()
    .then((docSnap) => {
      if (docSnap.exists) {
        return docSnap.data();
      }
    });
  return interviewRequest;
}

async function getAllUserRequestsFromID(googleID) {
  const requestsRef = await db.collection("requests").doc(googleID);
  const allInterviewRequestsMade = requestsRef
    .collection("userrequests")
    .get()
    .then((querySnapshot) => {
      const allData = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      return allData;
    });
  return allInterviewRequestsMade;
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
      completed: false,
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
  getAllUserRequestsFromID,
  deleteUserInterviewRequest,
  getSpecificInterviewRequest,
  getAllUnfullfilledRequests,
  acceptUserRequest,
};
