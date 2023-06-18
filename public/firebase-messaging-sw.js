importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js");
var config = {
  apiKey: "AIzaSyDVxcAS9EWP-Pc8Pu0Bi84WtHFZu7PePVk",
  authDomain: "biadjo-1546341863949.firebaseapp.com",
  databaseURL: "https://biadjo-1546341863949.firebaseio.com",
  projectId: "biadjo-1546341863949",
  storageBucket: "biadjo-1546341863949.appspot.com",
  messagingSenderId: "1058566822933",
  appId: "1:1058566822933:web:d0cc8695c063c7363d421c",
  measurementId: "G-9B0EZQSYLT"
};
var objectStore;
firebase.initializeApp(config);

const messaging = firebase.messaging();

var ID = "";
var Title = "";
var Body = "";
var Type = "";
messaging.onBackgroundMessage(function(payload) {
  Type = payload.data.Type;
  switch (payload.data.Type) {
    case "RecieveBiadjoRequest":
      Title = "Recieve Biadjo request";
      Body = "New biadjo request with ID" + " " + payload.data.Biadjo_ID;
      ID = payload.data.Biadjo_ID;
      break;

    case "DriverWaitingForVerfication":
      Title = "Driver Waiting For Verfication";
      Body =
        "There is a Driver waiting for verfication with ID" +
        " " +
        payload.data.ID;
      ID = payload.data.ID;
      break;

    case "ConflictedBiadjo":
      Title = "Conflicted Biadjo";
      Body =
        "You have New Conflicted Biadjos Please Resolve it As Soon As Possible there count is" +
        " " +
        payload.data.Biadjos_Count;
      ID = payload.data.Biadjos_Count;
      break;

    case "NewBiadjo":
      Title = "New Biadjo";
      Body = "New biadjo request with ID" + " " + payload.data.Biadjo_ID;
      ID = payload.data.Biadjo_ID;
      break;

    case "BiadjoAcceptedKMPrice":
      Title = "Biadjo Accepted KM Price";
      Body =
        "New biadjo Accepted KM Price with ID" + " " + payload.data.Biadjo_ID;
      ID = payload.data.Biadjo_ID;
      break;

    case "BiadjoWithoutDrivers":
      Title = "Biadjo Without Drivers";
      Body =
        "There is a new Biadjo without Driver ID" +
        " " +
        payload.data.Biadjo_ID;
      ID = payload.data.Biadjo_ID;
      break;

    case "NewOffer":
      Title = "New Offer";
      Body =
        "There is a new offer waiting for approve or reject with ID" +
        " " +
        payload.data.Biadjo_ID;
      ID = payload.data.Biadjo_ID;
      break;

    case "OffersWaitingForApproval":
      Title = "Offers Waiting For Approval";
      Body =
        "There is a new offer waiting for approve or reject with ID" +
        " " +
        payload.data.ID;
      ID = payload.data.ID;
      break;

    case "DoneBiadjos":
      Title = "Done Biadjos";
      Body =
        "There is a Biadjo done and waiting for Client to close it with ID" +
        " " +
        payload.data.Biadjo_ID;
      ID = payload.data.Biadjo_ID;
      break;

    case "UnstartedBiadjos":
      Title = "Unstarted Biadjos";
      Body = "There is unstarted biadjo with ID" + " " + payload.data.Biadjo_ID;
      ID = payload.data.Biadjo_ID;
      break;

    default:
      Title = payload.data.Type;
      Body = payload.data.Type;
      ID = "";
  }
  const notificationTitle = Title;
  const notificationOptions = {
    body: Body,
    image: "https://biadjo.com/wp-content/uploads/2020/05/Home-Pic.png"
  };
  // re-call notification when user back to web tab
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener(
  "notificationclick",
  function(event) {
    switch (Type) {
      case "RecieveBiadjoRequest":
        event.notification.close();
        clients.openWindow("/BiadjoDetails/" + ID);
        break;

      case "DriverWaitingForVerfication":
        event.notification.close();
        clients.openWindow("/Setting/DriverProfile/" + ID);
        break;

      case "ConflictedBiadjo":
        event.notification.close();
        clients.openWindow("/ConflictedBiadjo/");
        break;

      case "NewBiadjo":
        event.notification.close();
        clients.openWindow("/BiadjoDetails/" + ID);
        break;

      case "BiadjoAcceptedKMPrice":
        event.notification.close();
        clients.openWindow("/BiadjoDetails/" + ID);
        break;

      case "BiadjoWithoutDrivers":
        event.notification.close();
        clients.openWindow("/BiadjoDetails/" + ID);
        break;

      case "OffersWaitingForApproval":
        event.notification.close();
        clients.openWindow("/OffersForBiadjo/" + ID);
        break;

      case "NewOffer":
        event.notification.close();
        clients.openWindow("/OffersForBiadjo/" + ID);
        break;

      case "DoneBiadjos":
        event.notification.close();
        clients.openWindow("/BiadjoDetails/" + ID);
        break;

      case "UnstartedBiadjos":
        event.notification.close();
        clients.openWindow("/BiadjoDetails/" + ID);
        break;
    }
  },
  false
);
