# Second Shift Auto

Welcome to Second Shift Auto! 🚗💨

This Angular application serves as a platform for listing and selling cars. It incorporates both user and guest functionalities, providing a seamless experience for everyone involved.

## Features

### Guest Features:
- **Login & Registration:** Guests can create accounts or log in to access additional features.
- **Browse Vehicles:** Guests can view all vehicles listed on the platform.
- **Filtering:** Ability to filter vehicles based on various criteria.

### User Features:
- **Add Vehicles:** Users can add new vehicles to the platform.
- **Edit Vehicles:** Users can edit details of vehicles they have added (not yet sold).
- **Delete Vehicles:** Users can remove vehicles they have added from the platform.
- **Purchase Vehicles:** Users can buy vehicles listed by other users that are not yet sold.
- **Profile Page:** Users have access to a profile page where they can:
  - View personal profile information.
  - See a list of cars they've added and bought.
  - Check total profit from sales and total costs from purchases.

## Tech Stack

- **Frontend:** Angular v16
- **Backend:** Express.js
- **Database:** MongoDB

## Getting Started

1. **Clone the Repository:**
2. **Install Dependencies:**
3. **Set Up Backend:**
- Ensure MongoDB is installed and running.
- Navigate to the backend directory and run 'npm start'
4. **Start the Application:**
- Navigate to the client directory and run 'ng serve' 
5. **Access the Application:**
Open your browser and navigate to `http://localhost:4200`.

Happy Car Shopping! 🚙🎉

## Screenshots
- View of bought car vs car for sale on the catalog page:
![Project Screenshot](./screenshots/catalog-sold-vs-forsale.png)
- Details page viewed as guest:
![Project Screenshot](./screenshots/details-guest.png)
- Details page viewed as owner:
![Project Screenshot](./screenshots/details-owner.png)
- Details page of a bought car viewed by the user who bought the car:
![Project Screenshot](./screenshots/details-user-bought-buyer.png)
- Details page of a bought car viewed by a user who is not the buyer of the car:
![Project Screenshot](./screenshots/details-user-bought-not-buyer.png)
- Details page of a car for sale:
![Project Screenshot](./screenshots/details-user-not-bought.png)
- Profile page of a user who hasn't bought anythign and has no listings:
![Project Screenshot](./screenshots/profile-empty.png)
- Profile page of a user who has listings and has bought cars:
![Project Screenshot](./screenshots/profile-full.png)



