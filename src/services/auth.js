export const signUpService = (firebase, firestore, newUser) => {
    return firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
    ).then(resp => {
        return firestore.collection('users').doc(resp.user.uid).set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
        });
    });
};

export const signInService = (firebase, credentials) => {
    return firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
    );
};

export const signOutService = (firebase) => {
    return firebase.auth().signOut();
};