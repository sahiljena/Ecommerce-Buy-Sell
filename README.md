# Ecommerce-Buy-Sell
## ✨ Description
An ecommerce classifieds  web application developed in MERN Stack. This app is deployed at https://ecomm-buy-sell.netlify.app/ <br/>
This app has the following features:
- User can post classifieds ads for his `Laptops`, `Mobiles`, `Books`.
- User can see classifieds for `Laptops`, `Mobiles`, `Books` and get the selling user details
## 🛠️ Tech Stack
- React.js for Frontend
- Node.js and Express.js for Backend
- MonogDB for Database
- Tailwind CSS for frontend UI
## 🔥 Demo
https://ecomm-buy-sell.netlify.app/ <br/>
Credentials for testing
- `email : admin@admin.com`
- `password : admin`

📂 Project Organization
------------

    ├── README.md          <- The top-level README for developers using this project.
    │
    ├── ecomm-frontend
    │       ├── package.json        <- Containing the required node modules start up scripts etc
    │       ├── postcss.config.js   <- Tailwind css file
    │       ├── tailwind.config.js  <- Tailwind css file
    │       ├── public             
    │       └── src
    │           ├── App.js          <- React App 
    │           ├── index.js        <- React App startup 
    │           ├── pages           <- Folder for pages
    │           └── components      <- Folder for react components
    │
    │
    └── backend
        ├── node_modules   <- Folder containg node modules 
        ├── uplaods        <- Folder for storing user image uploads from the app
        ├── .env           <- MongoDB connection string
        ├── app.js         <- Main Express app containing all the api routes
        ├── auth.js        <- Middleware to check if user is authenticated
        ├── index.js       <- startup js file intializing the app and the port
        ├── package.json   <- Containing the required node modules start up scripts etc
        └── db
            ├── dbConncet.js       <- Connect to MongoDB 
            ├── lisitingModel.js   <- Schema Model for classifieds lisitng
            └── userModel.js       <- Schema Model for User
        


