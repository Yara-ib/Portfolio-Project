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
- **Strip**: For handling the payments in the market section.
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
/api/products/
/api/products/:id
/api/products/add
/api/products/delete/:id
/api/products/update/:id
```
#### *-* Orders
```
/api/orders/
/api/orders/:id
/api/orders/add
```

### Blog
#### *-* Posts
```
/api/blog/posts/
/api/blog/posts/:id
/api/blog/posts/addPost
/api/blog/posts/update/:id
/api/blog/posts/delete/:id
```

#### *-* Bloggers
```
/api/blog/newblogger
/api/blog/logblogger

/api/blog/profile
/api/blog/profile/update/:id
/api/blog/profile/delete/:id
```

#### *-* Comments
```
/api/blog/posts/comments/add/:id
```

### Services
```
/api/services/
/api/services/:id
/api/services/add
/api/services/update/:id
/api/services/delete/:id
```
#### *-* Services Providers
```
/api/services/newProvider
/api/services/logProvider

/api/services/profileProvider
/api/services/updateProfile/:id
```
### Users
```
/api/users/signup
/api/users/signin

/api/users/profile
/api/users/updateProfile/:id
```

### Admins
```
/api/admin/
/api/admin/profile/:id
/api/admin/updateProfile/:id
/api/admin/deleteAccount/:id
```
________________________________________________________

## Contact
[Yara Nazih](https://github.com/Yara-ib)

________________________________________________________


## Licensing
MIT license
