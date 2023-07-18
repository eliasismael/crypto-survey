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
