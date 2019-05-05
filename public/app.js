document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app()
    console.log(app)
    
})

function googleLogin () {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user
        localStorage.setItem("user", user)
        localStorage.setItem("name",user.displayName)
        localStorage.setItem("pic",user.photoURL)
        var db = firebase.firestore()
        db.collection('Users').add({
            name: user.displayName
        }).then((docref) => {
            console.log(docref)
            window.location.href = "firstPage.html"
        })
        // document.write(`Hello ${user.displayName}`)
        
    }).catch (console.log)

}

function logout () {
    firebase.auth().signOut().then(() => {
        console.log('signed out')
        localStorage.removeItem("user")
        window.location.href="index.html"
    }).catch(console.log)
}