// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // devour burger
  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");
   
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
    }).then(
      function() {
        console.log('Server responded put route')
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
// Creating a burger
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
console.log('for just ran')
    var newBurger = {
      burger_name: $("#burgerName").val().trim(),
      devoured: true
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $
});
