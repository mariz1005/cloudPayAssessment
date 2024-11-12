# Angular Super Admin and Regular User Dashboard App

## About the Project

This Angular application has **two types of users**:

- **Super Admin**: 
  - Super Admins have the ability to manage users and resources. Only users with the following email addresses can access the **Super Admin Dashboard**:
    - `eve.holt@reqres.in`
    - `charles.morris@reqres.in`
    - `tracey.ramos@reqres.in`
  - When a user logs in, their email is checked, and if it matches one of the above, they are granted access to the Super Admin Dashboard.
  
- **Regular User**: Any users with different email addresses, such as:
   - `george.bluth@reqres.in`
   - `janet.weaver@reqres.in`
   - `emma.wong@reqres.in`
  - Regular users have restricted access. They can only access the **User Dashboard**.
  - They can view, add, edit, and delete resources.
  - Resources can be manipulated directly through the UI, and users can update or delete them as needed.

### Key Features:

- **Authentication**: Users can log in with **any password** as long as their email matches one of the valid user emails in the system. Authentication is handled via an **AuthGuard** to ensure that Super Admins and Regular Users can only access their respective dashboards.
- **API Integration**: 
  - The project fetches user and resource data from the **Reqres API** (`https://reqres.in/`).
  - The API provides user details such as ID, first name, last name, and avatar. These are used to display user info in the dashboard.
  - Resource management (add, edit, delete) functionality for Regular Users.

## Setup Instructions

### 1. Clone the Repository

First, clone this repository to your local machine:

-bash
git clone <repository-url>
cd <project-folder>

### 2. Install Dependencies
Run the following command to install all the necessary dependencies:

npm install



## How to Run the Application

### 1. Serve the Application Locally
To run the application locally, use the following command:

ng serve

-This will launch the Angular development server and open the app in your browser at http://localhost:4200/.

### 2. Accessing the Dashboards
-Super Admin Dashboard:
Only users with the email addresses eve.holt@reqres.in, charles.morris@reqres.in, or tracey.ramos@reqres.in can access the Super Admin Dashboard.
The AuthGuard ensures that other users cannot navigate to the Super Admin Dashboard.

-User Dashboard:
Regular users (fetched from the API) can access the User Dashboard. They can:
View resources
Add new resources
Edit existing resources
Delete resources

### 3. Authentication and AuthGuard
The AuthGuard is used to ensure that users only access the dashboard they are authorized for:

When a user logs in, the email is checked against the Super Admin list (eve.holt@reqres.in, charles.morris@reqres.in, tracey.ramos@reqres.in).
If they match, they are redirected to the Super Admin Dashboard.
If they are a regular user, they are redirected to the User Dashboard.
Users can log in with any password as long as their email matches the one specified in the system. The email is the only key factor for determining access to the Super Admin or User Dashboard.
AuthGuard ensures that users cannot bypass the login screen or access unauthorized sections of the application.


# Now, the specific mention that users can log in with any password as long as the email is correct. Let me know if you need any further adjustments. Thank you😊
