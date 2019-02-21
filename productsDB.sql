DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(5) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    stock_quantity INTEGER(5) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Playstation 4", "Electronics", 179.99, 1250),
("Xbox One", "Electronics", 189.99, 1852),
("Nintendo Switch", "Electronics", 220.00, 821),
("Party Beers (x48)", "Food & Drink", 29.90, 83),
("Solo Beers (x1)", "Food & Drink", 0.99, 303),
("Photo Frame 6x8 (Black)", "Photography & Art", 12.90, 75),
("Pasta Restiffener Attatchment (KitchenAid)", "Kitchen Appliances", 36.49, 21),
("Buddy Beers (x6)", "Food & Drink", 1.50, 240),
("Obama: My Gnarly College Memoirs", "Books", 11.99, 343),
("George Michael - Careless Whisper (10 Hour Mix)", "CDs & DVDs", 8.99, 619);

 