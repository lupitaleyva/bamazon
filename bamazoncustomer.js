require('dotenv').config()
var mySQL = require ("mysql");
//var Table = require('cli-table');
require ("console.table");
var inquirer = require ("inquirer");
var connection = mySQL.createConnection({
    host:process.env.DB_HOST,
    port:3306,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database: "bamazon",
});





connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  
  connection.query("select*from products;", function(error, results){
    if (error){
        console.log(error);
    }
    console.table(results);
    

    
    runSearch();
  
  });
});


function runSearch() {
inquirer
  .prompt([

  {
        name: "product_name",
        type: "input",
        message: "Which t-shirt would you like to buy?"
  },



        {
          name: "quantity",
          type: "units",
          message: "How many t-shirts would you like to buy?"
          
    }
        
  ])
    
.then(function(answer) {
  console.log(answer);
    var quantityToBuy = answer.quantity;
    var query = "SELECT product_name, quantity FROM products WHERE ?";
    connection.query(query, { product_name: answer.product_name}, function(err, res) {
      console.log (res);
      quantityInStock =res[0].quantity
      for (var i = 0; i < res.length; i++) {
        console.log("product_name: " + res[i].product_name);
      }

              
              if (quantityToBuy < quantityInStock) {
                // bid was high enough, so update db, let the user know, and start over
                console.log("Your purchased has been placed succesfully!");
                 connection.query(
                //
                   "UPDATE products SET ? WHERE ?",
                  [
                    {
                      
                      quantityToBuy: answer.quantity
                    },
                    {
                      item_id: quantityInStock.item_id
                    }
                  ],
                  function(error) {
                    if (error) throw err;
                    console.log("Your purchased has been placed succesfully!");
                    start();
                  }
                );
              }
              else {
                // bid wasn't high enough, so apologize and start over
                console.log("Sorry! We don´t have this big quantity, try over again!");
                runSearch();
              }
      //runQuantity();
    });
  });
}




//INSERT INTO products (product_name, department_name,price,quantity)
//VALUES ("black t-shirt", "women clothing", 20.00, 100);

// function runQuantity() {
//     inquirer
//       .prompt({
//             name: "quantity",
//             type: "units",
//             message: "How many t-shirts would you like to buy?"
            
//       })
        
//     .then(function(answer) {
//         var query = "SELECT quantity FROM products WHERE ?";
//         connection.query(query, { product: answer.quantity }, function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log("quantity: " + res[i].quantity);
//           }
//           runQuantity();
//         });
//       });
//     }

//     connection.end ();

    
//     function runConfirmation{
//     inquirer
//     .pompt({
//         name: "confirm",
//         type: "confirm",
//         message: "Are you sure:",
//         default: true


//     })
    
//   .then(function(inquirerResponse) {
//     // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
//     if (inquirerResponse.confirm) {
//       console.log("\nWelcome " + inquirerResponse.username);
//       console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
//     }
//     else {
//       console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
//     }
//   });





//   ....

//   function runSearch() {
//   inquirer
//     .prompt({
//       name: "action",
//       type: "list",
//       message: "What would you like to do?",
//       choices: [
//         "Find songs by artist",
//         "Find all artists who appear more than once",
//         "Find data within a specific range",
//         "Search for a specific song"
//       ]
//     })
//     .then(function(answer) {
//       switch (answer.action) {
//       case "Find songs by artist":
//         artistSearch();
//         break;

//       case "Find all artists who appear more than once":
//         multiSearch();
//         break;

//       case "Find data within a specific range":
//         rangeSearch();
//         break;

//       case "Search for a specific song":
//         songSearch();
//         break;
//       }
//     });
// }

// function artistSearch() {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?"
//     })
//     .then(function(answer) {
//       var query = "SELECT position, song, year FROM top5000 WHERE ?";
//       connection.query(query, { artist: answer.artist }, function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//         }
//         runSearch();
//       });
//     });
// }

// function multiSearch() {
//   var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//   connection.query(query, function(err, res) {
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].artist);
//     }
//     runSearch();
//   });
// }

// function rangeSearch() {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Position: " +
//               res[i].position +
//               " || Song: " +
//               res[i].song +
//               " || Artist: " +
//               res[i].artist +
//               " || Year: " +
//               res[i].year
//           );
//         }
//         runSearch();
//       });
//     });
// }

// function songSearch() {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(function(answer) {
//       console.log(answer.song);
//       connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//         console.log(
//           "Position: " +
//             res[0].position +
//             " || Song: " +
//             res[0].song +
//             " || Artist: " +
//             res[0].artist +
//             " || Year: " +
//             res[0].year
//         );
//         runSearch();
//       });
//     });
// }

