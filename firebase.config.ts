import { FIREBASE } from './dotenv'

const firebaseConfig = {
    apiKey: FIREBASE.FIREBASE_APIKEY,
    authDomain: FIREBASE.FIREBASE_AUTHDOMAIN,
    projectId: FIREBASE.FIREBASE_PROJECTID,
    storageBucket: FIREBASE.FIREBASE_STORAGEBUCKET,
    messagingSenderId: FIREBASE.FIREBASE_MESSAGEINGSENDERID,
    appId: FIREBASE.FIREBASE_APPID,
    measurementId: FIREBASE.FIREBASE_MEASUREMENTID
}
export default firebaseConfig;
