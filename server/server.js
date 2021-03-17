const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(cors());

app.use((req, res, next) => {
//  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));



var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1234",
    database : 'startwelldb',
    insecureAuth : true
  });
  
app.post("/Newsletter", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  db.query( "INSERT INTO Newsletter (email) VALUES (?)",
     [email],
     (err,result) => {

      res.send({ "status": true});
       console.log(result);
     });
  });

 app.post("/register", (req, res) => {
  console.log(req.body);

  const userId= req.body.userid;
  const userType = req.body.usertype;
  const password = req.body.password;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const dob = req.body.dob;
  const sex = req.body.sex;
  const email = req.body.email;

  
    db.query(
      "INSERT INTO Users (UserID,UserType,pass,First_Name,Last_Name,DOB,sex,EmailID) VALUES (?,?,?,?,?,?,?,?)",
  
      [userId,userType,password,firstName,lastName,dob,sex,email],
      (err, result) => {
        res.send({ "status": true});
        console.log(err);
      }
    );
  });


app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("***");
  console.log(username);
  console.log(password);

  db.query(
    "SELECT * FROM Users WHERE UserID = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
  
      if (result.length > 0) {
        console.log("***");
        console.log(result);
        console.log(result[0]);
        console.log(result[3]);
        console.log("***");
        console.log(result[4]);


        if (password == result[0].Pass.toString()) {
  
          res.send({"status":true});
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.listen(9000, () => {
  console.log("running server");
});
