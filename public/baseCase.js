$(document).ready(function () {
    checkUserLogin()
})

function checkUserLogin () {
    var user = localStorage.getItem("user")
    if (!user) {
        window.location.href = "index.html"

    }
}