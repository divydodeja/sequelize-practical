-- Active: 1680764028203@@127.0.0.1@3306@mysqlPractical
CREATE TABLE user (
    userId INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (userID),
    CHECK(email LIKE '%___@%.%')
);

INSERT INTO user(name,email) VALUES
('Divy','divy.d@gmail.com'),
('Girish','girish.p@gmail.com'),
('Nidhi','nidhi.j@gmail.com'),
('Nensi','nensi.j@gmail.com'),
('Smit','smit.d@gmail.com'),
('Sanskar','sanskar.m@gmail.com'),
('Harsh','harsh.m@gmail.com'),
('Chirag', 'chirag.p@gmail.com'),
('Ravi', 'ravi.p@gmail.com'),
('Jenil', 'jenil.b@hamil.com');

CREATE TABLE product (
    productId INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    price INT NOT NULL,
    PRIMARY KEY(productId)
);

INSERT INTO product(name, price) VALUES
('jacket', 3499),
('watch', 4999),
('earphones', 2499),
('smartphone', 29999),
('Android TV', 24999),
('Desert Cooler',9999),
('Recliner',13499),
('A Song of Ice and Fire Bookset',3050),
('PS5 Playstation Console', 49990);

CREATE TABLE orders (
    orderId INT AUTO_INCREMENT,
    userId INT,
    orderStatus ENUM('pending','confirmed','shipped','delivered'),
    orderDate DATE NOT NULL DEFAULT(CURDATE()),
    deliveryDate DATE NOT NULL,
    PRIMARY KEY(orderId),
    Foreign Key (userId) REFERENCES user(userId) 
    ON UPDATE CASCADE ON DELETE SET NULL
);

INSERT INTO orders(userId, orderStatus, orderDate, deliveryDate) VALUES
(1, 'delivered','2023-03-29', CURDATE()+INTERVAL -3 DAY);

INSERT INTO orders(userId, orderStatus, deliveryDate) VALUES
(3, 'confirmed', CURDATE()+INTERVAL 2 DAY),
(2, 'shipped', CURDATE()+INTERVAL 4 DAY);

INSERT INTO orders(userId, orderStatus, orderDate, deliveryDate) VALUES
(1, 'confirmed', '2023-04-05', CURDATE()+INTERVAL 1 DAY),
(4, 'shipped', '2023-04-02', CURDATE()+INTERVAL 2 DAY),
(4, 'pending', '2023-04-02', CURDATE()+INTERVAL 3 DAY);

INSERT INTO orders(userId, orderStatus, orderDate, deliveryDate) VALUES
(7, 'delivered','2023-03-27', CURDATE()+INTERVAL -1 DAY);

INSERT INTO orders(userId, orderStatus, deliveryDate) VALUES
(9, 'pending', CURDATE()+INTERVAL 5 DAY),
(5, 'shipped', CURDATE()+INTERVAL 3 DAY);

INSERT INTO orders(userId, orderStatus, orderDate, deliveryDate) VALUES
(1, 'pending', '2023-04-04', CURDATE()+INTERVAL 1 DAY),
(3, 'confirmed', '2023-04-04', CURDATE()+INTERVAL 2 DAY),
(2, 'shipped', '2023-03-30', CURDATE()+INTERVAL 4 DAY);

CREATE TABLE orderDetails (
    orderId INT,
    productId INT,
    quantity INT NOT NULL DEFAULT 1,
    Foreign Key (orderId) REFERENCES orders(orderId)
    ON UPDATE CASCADE ON DELETE SET NULL,
    Foreign Key (productId) REFERENCES product(productId)
    ON UPDATE CASCADE ON DELETE SET NULL
);

INSERT INTO orderDetails(orderId, productId, quantity) VALUES
(1,4,1),
(2,8,2),
(3,1,2),
(4,9,1),
(5,3,4),
(6,2,2),
(7,4,1),
(8,8,3),
(9,6,3),
(10,2,1),
(11,3,2),
(12,7,2);

SELECT user.name as 'Customer Name', product.name as 'Product Name', orders.orderDate as 'Order Date',
IF(orders.orderStatus<>'delivered',CONCAT('within ',DATEDIFF(orders.deliveryDate, orders.orderDate),' days'),'Already Delivered')
as 'Expected Delivery Date'
from orderDetails 
join orders on orderDetails.orderId = orders.orderId
join product on orderDetails.productId = product.productId
join user on orders.userId = user.userId;

SELECT user.name as 'Customer Name', product.name as 'Product Name', orders.orderDate as 'Order Date',
IF(orders.orderStatus<>'delivered',CONCAT('within ',DATEDIFF(orders.deliveryDate, orders.orderDate),' days'),'Already Delivered')
as 'Expected Delivery Date'
from orderDetails 
join orders on orderDetails.orderId = orders.orderId
join product on orderDetails.productId = product.productId
join user on orders.userId = user.userId
where orders.orderStatus<>'delivered';

SELECT user.name as 'Customer Name', product.name as 'Product Name', orders.orderDate as 'Order Date',
IF(orders.orderStatus<>'delivered',CONCAT('within ',DATEDIFF(orders.deliveryDate, orders.orderDate),' days'),'Already Delivered')
as 'Expected Delivery Date'
from orderDetails 
join orders on orderDetails.orderId = orders.orderId
join product on orderDetails.productId = product.productId
join user on orders.userId = user.userId
ORDER BY orders.orderDate DESC
LIMIT 5;

SELECT user.name as 'Active Users'
from user 
join orders on user.userId = orders.userId
GROUP BY user.name
order by count(user.name) DESC
limit 5;

SELECT user.name as 'Inactive Users' from user where user.name NOT IN(
    SELECT user.name as 'Active Users'
    from user 
    join orders on user.userId = orders.userId
);

SELECT product.name as 'Most Purchased Products'
from product 
join orderDetails on product.productId = orderDetails.productId
GROUP BY product.name
order by sum(quantity) DESC
LIMIT 5;

(
    SELECT 'Most Expensive' as Type, orderDetails.orderId as 'Order Id', product.name as 'Product Name'
    from product 
    join orderDetails on product.productId = orderDetails.productId
    ORDER BY price*quantity DESC
    LIMIT 1
)
UNION
(
    SELECT 'Most Cheapest' as Type, orderDetails.orderId, product.name as 'Product Name'
    from product 
    join orderDetails on product.productId = orderDetails.productId
    ORDER BY price*quantity
    LIMIT 1
);


