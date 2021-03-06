let firebase = require("./functions/db-config");
const emailUtil = require("./functions/email/email-user.js");

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
  const userRef = db.collection("users").doc(id);

  const doesDocExist = await userRef.get().then((res) => {
    if (res && res.exists) {
      return true;
    } else {
      return false;
    }
  });

  if (doesDocExist === true) {
    return true;
  } else {
    userRef
      .set(
        {
          username: displayName,
          googleID: id,
          profilePic: profilePicLink,
          email: email,
          group: "Member",
        },
        { merge: true }
      )
      .then((res) => {
        console.log("Addded user to database.");
      })
      .catch((err) => {
        console.log(
          "An error has occured trying to add a user to the database."
        );
      });
  }
}

async function handleNewReport(
  reportedGoogleID,
  reportedUserName,
  reportedReason,
  reporterGoogleID,
  reporterUserName
) {
  const reportRef = db.collection("reports").doc();
  const reportID = reportRef.id;
  const fullfilled = await reportRef
    .set({
      reportedGoogleID: reportedGoogleID,
      reportedUserName: reportedUserName,
      reportedReason: reportedReason,
      reporterUserName: reporterUserName,
      reporterGoogleID: reporterGoogleID,
    })
    .then((resp) => {
      return reportID;
    });

  return fullfilled;
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

async function deleteAccount(googleID) {
  //Not deleting from users collection for stats collection purposes. But deleting all other info.
  const docRef = db.collection("requests").doc(googleID);
  return docRef.delete().catch((err) => {
    console.log(err);
  });
}

async function markRequestAsCompleted(
  docID,
  requesterGoogleID,
  accepterGoogleID
) {
  const requestsRef = db.collection("requests");
  await requestsRef
    .doc(requesterGoogleID)
    .collection("userrequests")
    .doc(docID)
    .update({ completed: true });

  await requestsRef
    .doc(accepterGoogleID)
    .collection("acceptedrequests")
    .doc(docID)
    .update({ completed: true });

  return true;
}

async function getAllUnfullfilledRequests() {
  const requestsRefData = db
    .collection("requests")
    .get()
    .then((querySnapshot) => {
      var allAvailableRequests = [];
      var promises = [];
      return new Promise((resolve, reject) => {
        querySnapshot.forEach(async (userDoc) => {
          const userRequestsPromise = userDoc.ref
            .collection("userrequests")
            .where("fullfilled", "==", false)
            .get()
            .then((requestsSnap) => {
              requestsSnap.forEach((request) => {
                allAvailableRequests.push(request.data());
              });
            })
            .catch((err) => {
              reject(err); //
            });

          promises.push(userRequestsPromise);
        });

        Promise.all(promises).then((t) => {
          resolve(allAvailableRequests);
        });
      });
    })

    .catch((err) => {
      console.log(err);
    });

  return requestsRefData;
}

async function getProfileComments(googleID) {
  const profileRef = db
    .collection("profiles")
    .doc(googleID)
    .collection("comments")
    .orderBy("timestamp");
  return await profileRef.get().then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => {
      return doc.data();
    });
  });
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
    completed: false,
    requesterData: requesterDocData,
  });

  await emailUtil.sendConfirmation(requesterDocData, true).catch((err) => {
    console.log(err);
  });
  await emailUtil.sendConfirmation(requesterDocData, false).catch((err) => {
    console.log(err);
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

async function handleNewComment(
  profileGoogleID,
  comment,
  submittedByGoogleID,
  submittedByName,
  submittedProfilePic
) {
  const profileRef = db.collection("profiles").doc(profileGoogleID);
  profileRef.set({ googleID: profileGoogleID }, { merge: true });
  return await profileRef
    .collection("comments")
    .doc()
    .set({
      comment: comment,
      submittedByGoogleID: submittedByGoogleID,
      submittedByName: submittedByName,
      submittedProfilePic: submittedProfilePic,
      timestamp: Date.now(),
    })
    .then((data) => {
      return true;
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
  markRequestAsCompleted,
  deleteAccount,
  handleNewComment,
  getProfileComments,
  handleNewReport,
};
