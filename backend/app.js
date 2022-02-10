const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');

// require database connection
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const Listing = require("./db/listingModel");
const auth = require("./auth");
const crypto = require('crypto');

// execute database connection
dbConnect();

const generateUuid = () => {
  return [4, 2, 2, 2, 6] // or 8-4-4-4-12 in hex
    .map(group => crypto.randomBytes(group).toString('hex'))
    .join('-');
};

console.log(generateUuid());
console.log(generateUuid());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + generateUuid() + ".png")
    }
})
var upload = multer({ storage: storage })


app.use(express.static(__dirname + './ecomm-frontend/public'));
app.use('/uploads', express.static('uploads'));

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// register endpoint
app.post("/api/user/new", (request, response) => {
  // hash the password
  console.log(request.body);
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
app.post("/api/user/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
              userName: user.name,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            token,
          });
        })
        // catch error if password do not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});


app.post("/api/listing/new",auth ,(req, res) =>{
  // console.log(req.body);
  // console.log(req.user.userName);

  const listing = new Listing({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    username: req.user.userEmail,
    name : req.user.userName,
    expectedPrice : req.body.expectedPrice,
    productAge: req.body.productAge,
    prodcutImg: req.body.productImg,
    added: new Date,
  });

  console.log(listing);

  listing
    .save()
    .then((result)=>{
      res.status(201).send({
        message: 'Product listed successfully',
        result,
      })
    })
    .catch((error)=>{
      res.status(500).send({
        message: 'Error creating listing',
        error,
      })
    });

})

app.post("/api/listing/newImg",auth, upload.single('productImg') ,(req, res, next) =>{

  console.log(JSON.stringify(req.file))
  res.status(200).send({'uploaded_img':req.file.path});

})

app.get("/api/listings",(req, res)=>{
  Listing.find({}, null, {limit: 5 ,sort :{ createdAt : -1}}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})

app.get("/api/listings/mobile",(req, res)=>{
  Listing.find({"category":"mobile"}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})
app.get("/api/listings/mobile/5",(req, res)=>{
  Listing.find({"category":"mobile"},null, {limit: 5 }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})

app.get("/api/listings/book",(req, res)=>{
  Listing.find({"category":"books"}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})
app.get("/api/listings/book/5",(req, res)=>{
  Listing.find({"category":"books"},null, {limit: 5 }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})

app.get("/api/listings/laptop",(req, res)=>{
  Listing.find({"category":"laptop"}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})
app.get("/api/listings/laptop/5",(req, res)=>{
  Listing.find({"category":"laptop"},null, {limit: 5 }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})


app.get("/api/listings/my",auth,(req, res)=>{
  //console.log(req.user.userEmail);
  Listing.find({"username":req.user.userEmail}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})

app.get("/api/listings/search",(req, res)=>{
  Listing.find({ "title" :{$regex: req.query.q,$options: 'i'}}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})

app.get("/api/listings/find",(req, res)=>{
  Listing.find({ "_id" : req.query.id}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})

app.post("/api/listings/delete",auth,(req, res)=>{
  Listing.deleteOne({"username":req.user.userEmail,"_id": req.body.id}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      Listing.find({"username":req.user.userEmail}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
    }
  });
  
})


app.get('/api/getUser',auth,(request, response) => {
  response.json(request.user);
})

module.exports = app;
