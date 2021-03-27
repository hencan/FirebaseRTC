import openUserMedia from './openUserMedia.js';
import createRoom from './createRoom.js';
import copyKey from './copyKey.js';
import joinRoom from './joinRomm.js';
import hangUp from './hangUp.js';

// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
//   apiKey: '### FIREBASE API KEY ###',
//   authDomain: '### FIREBASE AUTH DOMAIN ###',
//   projectId: '### CLOUD FIRESTORE PROJECT ID ###'
// });

const open_user_media = openUserMedia();
const create_room = createRoom();
const copy_key = copyKey();
const join_romm = joinRoom();
const hang_up = hangUp();


function init() {
  document.querySelector('#cameraBtn').addEventListener('click', open_user_media.start);
  document.querySelector('#createBtn').addEventListener('click', create_room.start);
  document.querySelector('#copyBtn').addEventListener('click', copy_key.start);
  document.querySelector('#joinBtn').addEventListener('click', join_romm.start);
  document.querySelector('#hangupBtn').addEventListener('click', hang_up.stop);

  const state = {
    observers: [],
    variables: []
  }

  function subscribe(observerFunction) {
    state.observers.push(observerFunction)
  }

  function notifyAll(updates) {
    for (const observerFunction of state.observers) {
      observerFunction(updates)
    }
  }
}



init();