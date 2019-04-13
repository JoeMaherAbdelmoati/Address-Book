export const addContactService = (firestore, newContact) => {

    return firestore.collection('contact').add({...newContact});
};

export const editContactService = (firestore, contact, contactID) => {
    return firestore.collection('contact').doc(contactID).update({
        ...contact
    });
};

export const DeleteContactService = (firestore, contactID) => {
    return firestore.collection('contact').doc(contactID).delete();
};
export const FetchContactService = (firestore, userID) => {
    return firestore.collection('contact').where("userID", "==", userID).get();
};
export const FetchSelectedContactService = (firestore, contactID) => {
    return firestore.collection('contact').doc(contactID).get();
};