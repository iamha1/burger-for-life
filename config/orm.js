// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// // Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
    
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function (table, cb) {
    connection.query("SELECT * FROM " + table + ";", function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },


  insertOne: function (table, cols, vals, cb) {
    console.log( '==============Insert one ran==================')
    console.log(table)

    let queryString = "INSERT INTO " +
    table +
    " ( burger_name ) VALUES ( '" + cols +   "'); ";
    console.log(queryString);

    connection.query(queryString,
      function (err, result) {
        if (err) {
          console.log(err)
          throw err;
        }
        console.log(result)
        cb(result);

      });
  },



  updateOne: function (table, objColVals, condition, cb) {
    connection.query("UPDATE " +
      table +
      " SET " +
    objToSql(objColVals) +
      " WHERE " +
      condition, function (err, result) {
        if (err) {
          throw err;
        }

        cb(result);
      });
  }

};
module.exports = orm;
