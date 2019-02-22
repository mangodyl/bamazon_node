const mysql = require("mysql");
const inquirer = require("inquirer");
let itemNum;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MySequel27",
    database: "bamazon"
});

connection.connect((err) => {
    if (err) throw err;
    displayItems();
});

const displayItems = () => {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        let item;
        itemNum = res.length;
        for (let i = 0; i < itemNum; i++) {
            item = res[i];
            console.log(`Item ID: ${item.item_id}
            >> ${item.product_name}
            ${item.department_name}
            $${item.price}
            Stock: ${item.stock_quantity} units
            --------------------`)
        };
        buyItems();
    });
};

const buyItems = () => {
    inquirer
        .prompt([
            {
                name: "askBuy",
                type: "confirm",
                message: "Have you decided what you'd like to buy?"
            }
        ])
        .then(answer => {
            if(answer.askBuy){
                inquirer
                    .prompt([
                        {
                            name: "enterID",
                            type: "input",
                            validate: function(value) {
                                let pass = value.match("^\\d{1,2}$");
                                if(pass) {
                                    if (value <= itemNum) {
                                        return true;
                                    } else {
                                        return "This ID is not matched to a product."
                                    };
                                }
                                else return "Please enter a valid ID";
                            },
                            message: "Enter the ID of the product you wish to purchase"
                        },
                        {
                            name: "enterAmount",
                            type: "input",
                            validate: function(value) {
                                let pass = value.match("^\\d{1,4}$");
                                if(pass) return true;
                                else return "Please enter a valid amount between 1 and 9999";
                            },
                            message: "Please enter the amount you wish to purchase"
                        }
                    ]).then(answer => {
                        let query = "SELECT * FROM products WHERE item_id =?";
                        var orderAmount = parseInt(answer.enterAmount);
                        connection.query(query, answer.enterID, (err, res) => {
                            if (err) throw err;
                            let stock = parseInt(res[0].stock_quantity);
                            if (orderAmount >= 0 && orderAmount <= stock) {
                                console.log(`Order completed! Your '${res[0].product_name}' will be with you soon!`);
                                let newStock = stock - orderAmount;
                                let query = `UPDATE products SET stock_quantity = ? WHERE item_id = ?`;
                                connection.query(query, [newStock, res[0].item_id], (err, res) => {
                                    if (err) throw err;
                                    console.log(`\nStock levels have been changed to ${newStock}! Why don't you order something else too? Treat yourself!`);
                                    displayItems();
                                })
                            } else {
                                console.log("We can't complete this order. Please check our stocks and try again");
                                buyItems();
                            };
                        });
                    });
            } else {
                console.log(`In that case... 
                I DEMAND THAT YOU LEAVE MY SITE IMMEDIATELY!
                
                PRESS 'CTRL + C' TO LEAVE IN SHAME`);
            };
        })
};