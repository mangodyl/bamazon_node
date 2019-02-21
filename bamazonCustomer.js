const mysql = require("mysql");
const inquirer = require("inquirer");

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
    setTimeout(buyItems(), 8000);
});

const displayItems = () => {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        let item;
        for (let i = 0; i < res.length; i++) {
            item = res[i];
            console.log(`Item ID: ${item.item_id}
            >> ${item.product_name}
            ${item.department_name}
            $${item.price}
            Stock: ${item.stock_quantity} units
            --------------------`)
        };
    });
};

const buyItems = () => {
    inquirer
        .prompt([
            {
                name: "askBuy",
                type: "confirm",
                message: "Have you decided what you'd like to buy?"
            }, {
                name: "enterID",
                type: "input",
                validate: function(value) {
                    let pass = value.match("\d{5}");
                    if(pass) return true;
                    else return "Please enter a valid ID";
                },
                message: "Enter the ID of the product you wish to purchase"
            }
        ])
}