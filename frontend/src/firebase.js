import { initializeApp } from "firebase/app";

import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAe256XjL3rvtHlFlPgvd1936v1XvxGK2E",

  authDomain: "twitter-clone-3d676.firebaseapp.com",

  projectId: "twitter-clone-3d676",

  storageBucket: "twitter-clone-3d676.appspot.com",

  messagingSenderId: "202056266713",

  appId: "1:202056266713:web:f06928f32ba12b04fa9fc8",

  measurementId: "G-XLVWM8JD3D",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getDatabase(firebaseApp);

function writeUserData(username, displayName, content, imageUrl) {
  const db = getDatabase();
  set(ref(db, "users/"), {
    username: username,
    displayName: displayName,
    content: content,
    profile_picture: imageUrl,
  });
}
export default writeUserData;
