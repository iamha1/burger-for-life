var express = require("express");

var router = express.Router();

// Import the model (burgerModel.js) to use its database functions.
var burger = require("../models/burgerModel.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  console.log('/ reached main route')
  burger.all(function(data) {
    console.log(data)
    res.render("index", { burgers: data });
  });
});

router.post("/api/burgers", function(req, res) {
  console.log('=== Just hit post route /api/burgers')
  console.log(req.body)
  burger.insertOne(req.body.burger_name, req.body.devoured, function(result) {
    
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: true
  }, 
  condition, function(result) {
    console.log('Upate burger orm')
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// Export routes for server.js to use.
module.exports = router;
