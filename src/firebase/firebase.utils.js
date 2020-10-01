import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyC6bfofrWDChjBcRV_-2HUEJ8mV43mxCqw",
    authDomain: "training-react-e8fd5.firebaseapp.com",
    databaseURL: "https://training-react-e8fd5.firebaseio.com",
    projectId: "training-react-e8fd5",
    storageBucket: "training-react-e8fd5.appspot.com",
    messagingSenderId: "350252052394",
    appId: "1:350252052394:web:d50973e0d9800fe1da45d3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}



firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;