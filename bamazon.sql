DROP DATABASE IF EXIST bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL (10,2) NULL,
    quantity INT NULL,
    PRIMARY KEY (id),

);

INSERT INTO products (product_name, department_name,price,quantity)
VALUES ("black t-shirt", "women clothing", 20.00, 100);

INSERT INTO products (product_name, department_name,price,quantity)
VALUES ("pink t-shirt", "women clothing", 19.00, 110),

INSERT TO products (product_name, department_name,price,quantity)
VALUES ("white t-shirt", "women clothing", 15.00, 200),

INSERT TO products (product_name, department_name,price,quantity)
VALUES ("pink t-shirt", "women clothing", 20.00, 120)

INSERT INTO products (product_name, department_name,price,quantity)
VALUES ("blue t-shirt", "women clothing", 20.00, 130);

INSERT INTO products (product_name, department_name,price,quantity)
VALUES ("flower t-shirt", "women clothing", 19.00, 140),

INSERT TO products (product_name, department_name,price,quantity)
VALUES ("animal print t-shirt", "women clothing", 15.00, 150),

INSERT TO products (product_name, department_name,price,quantity)
VALUES ("red t-shirt", "women clothing", 20.00, 160)

INSERT TO products (product_name, department_name,price,quantity)
VALUES ("yellow t-shirt", "women clothing", 15.00, 270),

INSERT TO products (product_name, department_name,price,quantity)
VALUES ("green t-shirt", "women clothing", 20.00, 180)


