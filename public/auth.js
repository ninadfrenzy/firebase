document.addEventListener("DOMContentLoaded",event=> {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        } else {
          window.location.href = "index.html"
        }
      });
})