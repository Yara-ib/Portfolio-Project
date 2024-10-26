# ArchiMatter | ALX Portfolio-Project
________________________________________________________
## An E-Commerce Website with Services & Blog Sections

![Homepage](ArchiMatter.png)

## Introduction
*ArchiMatter* aims to connect architects, interior designers, and customers with innovative materials and services. The platform features other two key sections beside the *Market Section*:

* *Blog Section:* focused on trendy architectural materials and topics.
* *Services Section:* where architectural and interior designers can offer their services directly to customers.

________________________________________________________

## Table of contents
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Technologies](#technologies)
* [Features](#features)
* [Contact](#contact)

________________________________________________________

## Prerequisites
- Any IDE - Example: VS Code [Install From Here](https://code.visualstudio.com/download)
- Node.js v22.4.0 & npm v10.8.3 - [Install From Here](https://nodejs.org/en/download/package-manager)
- MongoDB - [Install From Here](https://docs.mongodb.com/manual/installation/)
- Postman - [Install From Here](https://www.postman.com/downloads/)

________________________________________________________

## Installation
To run the project, clone it locally or download it.

## Usage
### Clone Repository

`git clone https://github.com/Yara-ib/Portfolio-Project.git`
### Navigate to the Project folder
`cd Portfolio-Project`

### How To Run
Create the file ".env" in the main folder to include the following keys:
* `MONGO_URI`= Database Details.
* `JWToken`= Key for JSON Web Token.

### Install dependencies with required versions
`npm install`

### Start Server
`npm run dev`

### To View it locally, open your browser
`Go to >> localhost:5000`

________________________________________________________

## Technologies

- **Node.js**: Handling server logic and processing requests.
- **Express**: Framework used to structure the backend, managing routing, middleware, and APIs.
- **Mongoose**: For interacting with MongoDB, which is used as the database to store users, blog posts, services, products, and orders data.
- **Argon2**: For hashing password, locations, phone numbers, any sensitive data securely to ensure user data protection.
- **JsonWebToken (JWT)**: To manage user authentication and authorization, providing secure access to different sections of the site.
- **Nodemon**: Helps with real-time updates during development by automatically restarting the server upon code changes.
- **Dotenv**: For environment variable management, ensuring sensitive information like database URIs and secret keys are kept secure.
- **Strip**: For handling the payments of orders in the market section.
________________________________________________________

## Features
### Main Roles:
Users || Bloggers || Service Providers || Admins
### Basic Features for all Roles:
* Sign Up.
* Sign In.
* Access their Profile Page.
* Update Profile Page.

### Unique Features For Each Role:
#### 1. Users
##### Market Section:
* Getting list of products or using filter.
* Make Orders & Add Reviews on Products.
* Add, get all Orders or by Id.

##### Blog Section:
* Add Comments on Posts.
##### Services Section:
* Add reviews on Services.

#### 2. Service Providers | Only in Services Section
* Add Services & Update Services.

#### 3. Bloggers | Only in Blog Section
* Add Posts & Update Posts.

#### 4. Admins
* Add, delete & update Products.
* Delete Any kind of Accounts.

________________________________________________________

## Available Endpoints
For full documentation, check that [link](Shall be added)

### Market
#### *-* Products
```
GET /api/products/
GET /api/products/:id
POST /api/products/add
DELETE /api/products/delete/:id
PUT /api/products/update/:id
```
#### *-* Orders
```
GET /api/orders/
GET /api/orders/:id
POST /api/orders/add
```

### Blog
#### *-* Posts
```
GET /api/blog/posts/
GET /api/blog/posts/:id
POST /api/blog/posts/addPost
PUT /api/blog/posts/update/:id
DELETE /api/blog/posts/delete/:id
```

#### *-* Bloggers
```
POST /api/blog/newblogger
POST /api/blog/logblogger

GET /api/blog/profile
PUT /api/blog/profile/update/:id
```

#### *-* Comments
```
POST /api/blog/posts/comments/add/:id
```

### Services
```
GET /api/services/
GET /api/services/:id
POST /api/services/add
PUT /api/services/update/:id
DELETE /api/services/delete/:id
```
#### *-* Services Providers
```
POST /api/services/newProvider
POST /api/services/logProvider

GET /api/services/profileProvider
PUT /api/services/updateProfile/:id
```
### Users
```
POST /api/users/signup
POST /api/users/signin

GET /api/users/profile
PUT /api/users/updateProfile/:id
```

### Admins "Extra Features"
```
GET /api/admin/profile/:id
PUT /api/admin/updateProfile/:id
DELETE /api/admin/deleteAccount/:id
DELETE /api/blog/profile/delete/:id
DELETE /api/services/profile/delete/:id
```
________________________________________________________

## Development

* Frontend Integration: Moving forward, I will focus on integrating the backend API with the frontend.
* User Notifications: Setting up real-time notifications for users about order updates, new blog posts, and service changes.
* Monitoring System: Integrate a monitoring system to handle logs, monitor server health, and track application performance. This will allow for proactive issue detection and smoother maintenance.
* Subscription System for Service Providers: I’ll be implementing a subscription system using Stripe to enable service providers to subscribe to. This system will include secure payment processing, and customizable subscription plans.
* Real-Time Chat for Customer Service: Implement a real-time chat feature to enhance customer support, allowing users to connect directly with support representatives.
________________________________________________________

## Authors
[Yara Nazih](https://github.com/Yara-ib)

________________________________________________________


## Licensing
MIT license
