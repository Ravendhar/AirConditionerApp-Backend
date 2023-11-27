# Mern-Stack-Air-Conditioner-Backend
Mern Stack Air Conditioner  Backend


MERN Stack Air Conditioner Backend
This backend repository powers the Air Conditioner web application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a range of routes and functionalities essential for managing products, user authentication, orders, and cart functionalities.

Product Routes
GET /products: Retrieve a list of all available air conditioner products.

POST /products: Add a new air conditioner product to the database.

PUT /products/:id: Update an existing product's details based on its ID.

DELETE /products/:id: Delete a specific product from the database using its ID.

Authentication Process
POST /user/register: Register a new user by providing necessary details such as username, email, and password.

POST /user/login: Authenticate user credentials and generate an authentication token.

Order Routes
GET /orders: Retrieve a list of all orders placed.

POST /orders/placeorder: Place a new order for air conditioner products.

Cart Routes
GET /cart: Retrieve the contents of the user's shopping cart.

POST /cart/addToCart/:id: Add a specific air conditioner product to the user's cart by its ID.

PUT /cart/update/:id: Update the quantity or details of a product in the user's cart.

DELETE /cart/remove/:id: Remove a product from the user's cart.

User Routes
GET /user: Retrieve a list of all users (might be restricted based on admin permissions).

PUT /user/:id: Update user details such as username, email, or password.

DELETE /user/:id: Delete a user account based on their ID (admin functionality).

Setup Instructions
To run this backend server locally or on a server:

Clone the repository: git clone (https://github.com/MouliSri/Mern-Stack-Air-Conditioner-Backend.git)
Install dependencies: npm install
Set up environment variables (if any).
Run the server: npm start or node index.js
