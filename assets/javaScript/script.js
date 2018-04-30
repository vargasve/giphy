var cast = ["Michael", "Jim", "Pam", "Dwight"];


 

 // add buttons from input, add text to buttons
 $("#addBtn").on("click", function(send) {
   send.preventDefault();
   $("#btnContainer").append(
     "<button class='queryBtn' style='background:" +
       $("#btnNameInput").val() +
       "'>" +
       $("#btnNameInput").val() +
       "</button>"
   );
   document.getElementById("btnNameInput").value = null;
   addEventListenerToBtns();
 });
 
 function addEventListenerToBtns() {
   $(".queryBtn").on("click", function buttonClick(btnEvent) {
     document.querySelector("#results").innerHTML = "";
     var btnName = btnEvent.target.innerText;
     var queryURL =
       "https://api.giphy.com/v1/gifs/search?q=" +
       btnName +
       "+the+office&api_key=WNS1CpPIB9EChLX4eBMBSgsrP34trBm0";
     $.ajax({
       url: queryURL,
       method: "Get"
     }).then(function(response) {
       response.data.forEach(function(image_object) {
         var responseImage = $("<img>")
           .attr("src", image_object.images.fixed_height_still.url)
           .addClass("responseImage")
           .attr("data-state", "still")
           .on("click", function(event) {
             if (event.target.getAttribute("data-state") === "still") {
               event.target.setAttribute(
                 "src",
                 image_object.images.original.url
               );
               event.target.setAttribute("data-state", "animated");
             } else {
               event.target.setAttribute(
                 "src",
                 image_object.images.original_still.url
               );
               event.target.setAttribute("data-state", "still");
             }
           });
 
         $("#results").append(responseImage);
+        $("#results").append(image_object.rating);
       });
     });
   });
 }
 
 addEventListenerToBtns();