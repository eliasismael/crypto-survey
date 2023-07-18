// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     apiKey: "AIzaSyD2ThrnJy0k1bU_N_P29MWQwCEPr4AMSGY",
//     authDomain: "challenge-899b9.firebaseapp.com",
//     databaseURL: "https://challenge-899b9-default-rtdb.firebaseio.com",
//     projectId: "challenge-899b9",
//     storageBucket: "challenge-899b9.appspot.com",
//     messagingSenderId: "509820343790",
//     appId: "1:509820343790:web:64b97b6c85585a34ceeaff",
//     measurementId: "G-R58PFZT91Y",
// };

// const app = initializeApp(firebaseConfig);
// import { getDatabase, ref, set, get, child } from "firebase/database";

// export const db = getDatabase();

// export const insertData = (path: string, value: object) => {
//     const strValue = JSON.stringify(value);
//     const dbRef = ref(db, path);

//     set(dbRef, strValue)
//         .then(() => console.log("Data stored"))
//         .catch((error) => console.log(error));
// };

// export const getData = (path: string): string => {
//     const dbRef = ref(db);
//     const childRef = child(dbRef, path);

//     get(childRef)
//         .then((snapshot) => {
//             if (snapshot.exists()) {
//                 console.log(snapshot.val());
//                 return String(snapshot.val());
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//         });

//     return "";
// };
