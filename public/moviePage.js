document.addEventListener("DOMContentLoaded", event => {

    var userpic = localStorage.getItem("pic")
    var user = localStorage.getItem("name")
    // console.log(user)
    $("#profileImage").attr("src",userpic)
    $("#username").text(user)
    
    const db = firebase.firestore()
    var movieCollection = db.collection("Movies1")
    movieCollection.get().then(results => {
        
        results.docs.forEach(element => {
            console.log(element.id)
            $("#movieList").append(`<li onclick="select('${element.id}')" style="padding-bottom:8px; cursor:pointer">${element.id}</li><hr>`)
        });
    })
    
    
    
})
function select (id) {

    $("#moviename").text(id)
    const db= firebase.firestore()
    var movieData = db.collection("Movies1").doc(id)
    movieData.get().then(answer => {
        const mov = answer.data()
        $("#desc").text(mov.Description)
        $("#moviepic").html(`<img src='${mov.Image}' alt="moviepc" id = "" style="width:420px;padding-left:5.165px;height:500px;">`)
        $("#ratingAvg").html(`<b>Rating ${mov.Rating}/5</b>`)
        $("#stars").css({"visibility":"visible"})
        $("#btnsubmit").css({"visibility":"visible"})
    })


    
}

$('#stars li').on('mouseover', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
   
    // Now highlight all the stars that's not after the current hovered star
    $(this).parent().children('li.star').each(function(e){
      if (e < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });
    
  }).on('mouseout', function(){
    $(this).parent().children('li.star').each(function(e){
      $(this).removeClass('hover');
    });
  });
  
  
  /* 2. Action to perform on click */
  $('#stars li').on('click', function(){
    var onStar = parseInt($(this).data('value'), 10); 
    console.log(onStar)// The star currently selected
    var stars = $(this).parent().children('li.star');
    
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
    $("#btnsubmit").on('click', function () {
        // var stars = $("#stars li").parent().children('li.star');
        // var onStar = parseInt($("#stars li").data('value'), 10);
        console.log(onStar)
        
        const db = firebase.firestore()
        var name = $("#moviename").text()
        const movieObj = db.collection("Movies1").doc(name)
        movieObj.get().then(result => {
            var avg = result.data().Rating
            if(avg!=0) {
                avg = (avg + onStar)/2
            } else {
                avg = avg + onStar
            }
            
            movieObj.update({
                Rating: avg
            })
            $("#ratingAvg").html(`<b>Rating ${avg}/5</b>`)

        })
        const document = db.collection("Movies1").doc(name).collection("ratingObj").doc(localStorage.getItem("name"))
        document.set({
            uname: localStorage.getItem("name"),
            rating: onStar
        })
        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
          }
    
      })

  })
