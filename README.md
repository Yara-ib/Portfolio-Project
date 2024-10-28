# ArchiMatter | ALX Portfolio-Project

________________________________________________________

## An E-Commerce API with Services & Blog Sections

![Logo](./public/assets/images/ArchiMatter.png)

## Introduction
*ArchiMatter* aims to connect architects, interior designers, and customers with innovative materials and services. The platform features other two key sections beside the *Market Section*:

* *Blog Section:* focused on trendy architectural materials and topics.
* *Services Section:* where architectural and interior designers can offer their services directly to customers.

________________________________________________________

## Table of Contents
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Technologies](#technologies)
* [Features](#features)
* [Contact](#contact)

________________________________________________________

## Prerequisites
- Any IDE - Example: VS Code [Install From Here](https://code.visualstudio.com/download)
- Node.js v22.4.0 & npm v10.8.3 or later - [Install From Here](https://nodejs.org/en/download/package-manager)
- MongoDB v7.0.12 or later - [Install From Here](https://docs.mongodb.com/manual/installation/)
- Postman - [Install From Here](https://www.postman.com/downloads/)

________________________________________________________

## Installation
To run the project, clone it locally or download it.

### Clone Repository
`git clone https://github.com/Yara-ib/Portfolio-Project.git`
### Navigate to the Project folder
`cd Portfolio-Project`

### How To Run
Create the file ".env" in the main folder to include the following keys:
* `MONGO_URI`= Database Details.
* `JWToken`= Key for JSON Web Token.
* `STRIPE_SK`= Key for Stripe Payments

### Install dependencies with required versions
`npm install`

### Start Server
`npm run dev`

### To View it locally:
Use Postman or in your browser, go to: `https://localhost:5000`

________________________________________________________

## Technologies

- **Node.js**
- **Express**
- **MongoDB**

________________________________________________________

## Features
### Main Roles:
Users || Bloggers || Service Providers || Admins
### Basic Features for all Roles:
* Sign Up, Sign In, Access their Profile Page & Update it.

### Unique Features For Each Role:
#### 1. Users
##### Market Section:
* Getting list of all Products or by using different filters.
* Make Orders & Add Reviews on Products.
* Add, get all Orders or by Id.

##### Blog Section:
* Add Comments on Posts.
##### Services Section:
* Add reviews on Services.

#### 2. Service Providers
* Add Services & Update Services.

#### 3. Bloggers
* Add Posts & Update Posts.

#### 4. Admins
* Add, delete & update Products.
* Delete or Ban Any kind of Account.
* Get List of Users, Service Providers, and Bloggers.
* Update the username & email for Users, Service Providers, and Bloggers.

________________________________________________________

## Available Endpoints
For full documentation, check [Here](https://documenter.getpostman.com/view/37391633/2sAY4uBNZE)

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

### Admins | Other Accounts Management
```
GET /api/admin/users
GET /api/admin/profile/:id
PUT /api/admin/updateProfile/:id
PUT /api/admin/banProfile/:id
DELETE /api/admin/deleteAccount/:id

GET /api/admin/bloggers
GET /api/admin/profileBlogger/:id
PUT /api/admin/updateBlogger/:id
PUT /api/admin/banBlogger/:id
DELETE /api/admin/deleteBlogger/:id

GET /api/admin/providers
GET /api/admin/profileProvider/:id
PUT /api/admin/updateSProvider/:id
PUT /api/admin/banSProvider/:id
DELETE /api/admin/deleteSProvider/:id

```
________________________________________________________

## Development

* **Frontend Integration:** Integrating the backend API with the frontend.
* **User Notifications:** Setting up real-time notifications for users.
* **Better Monitoring System:** Integrate a monitoring system to monitor server health, and track the performance.
* **Subscription System for Service Providers:** Implementing a subscription system.
* **Real-Time Chat for Customer Service:** Implement a real-time chat feature.

________________________________________________________

## Authors
[Yara Nazih](https://github.com/Yara-ib)

________________________________________________________

## Licensing
MIT license
