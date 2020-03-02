import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCfxL_XiuNJatIYoOQD3Xx2l701znyTbCQ",
    authDomain: "crown-db-e7c05.firebaseapp.com",
    databaseURL: "https://crown-db-e7c05.firebaseio.com",
    projectId: "crown-db-e7c05",
    storageBucket: "crown-db-e7c05.appspot.com",
    messagingSenderId: "294265327152",
    appId: "1:294265327152:web:0b0e685d7e407bb9cfa7f5"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;
    const userRef = firestore.doc( `users/${userAuth.uid}` );
    const snapShot = await userRef.get();
    if(!snapShot.exist){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({displayName, email, createdAt, ...additionalData});
        }catch (error){
            console.log('error catching error', error.message)
        }

    }
    return userRef;
    

}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;