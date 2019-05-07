import firebase from './FirebaseConnection'

class SystemConnectionDB {

    logout() {
        firebase.auth().signOut()
    }

    addAuthListener(callback) {
        firebase.auth().onAuthStateChanged(callback)
    }

    login(email, senha) {
        return firebase.auth().signInWithEmailAndPassword(email, senha)
    }

    getUserInfo(callback) {
        firebase.database().ref('usuarios').child(firebase.auth().currentUser.uid).once('value')
        .then(callback)
    }
}

export default new SystemConnectionDB