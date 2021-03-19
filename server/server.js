const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const keyConfig = require("./config/key.config");
const app = express();

const authJWT = require("./authJwt");


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
    password: "root",
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

  const email = req.body.email;

  
    db.query(
      "INSERT INTO Users (UserID,UserType,pass,First_Name,Last_Name,EmailID) VALUES (?,?,?,?,?,?)",
  
      [userId,userType,password,firstName,lastName,email],
      (err, result) => {
        if(err)
        {res.send({ "message": err});
        }
        if(result) {
        res.send({ "status": true});
        }
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


app.post("/profile", [authJWT.verifyToken],(req, res) => {
  const username = req.body.username;
  console.log(username);
  res.send({message: username});
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
          var token = jwt.sign({ id: username }, keyConfig.secret, {
            expiresIn: 500 // 86400 - 24 hours
          });

          res.send({"status":true,token:token,user:username});
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});


app.post('/forgotpassword', function(req, res){
  var data = {
      
    "EmailID":req.body.email,
      }
   console.log(req.body.email); 
   console.log("DB")  
   db.conn.query(`SELECT * FROM users where EmailID='${req.body.email}'`,
   data.Email, function(error,results,fields){
      console.log(req)
      if(error){
          console.log(error)
          res.send({
              "code":400,
          "Status":"error ocurred"
          })
        }
      else if(results.length == 0){
          console.log("no results")
          
          res.send({
              "code": 210,
              "Status" : "EmailID Not recognized"
          })
      }
      else{
          const crypto=require('crypto');
          const token = crypto.randomBytes(30).toString('hex')
          var resetPasswordTokenExpires = new Date()
          console.log(db.conn.escape(resetPasswordTokenExpires))
          var t = req.body.email
          var sql = `Update users SET resetPasswordToken = '${req.body.resetPasswordToken}', resetPasswordTokenExpires = '${resetPasswordTokenExpires}' Where EmailID = '${req.body.email}'`
          db.conn.query(sql,[token,resetPasswordTokenExpires,t],function(error,result,fields){
              if(error){
                  console.log(error)
                  res.send({
                      "code":400,
                  "failed":"error ocurred"
                  })
              }
              else{
                  var nodemailer = require('nodemailer');
                  var transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: 'startwell2021@gmail.com',
                        pass: 'Welcome@123'
                      }
                  });
                    var mailOptions = {
                      from: 'startwell2021@gmail.com',
                      to: req.body.email,
                      subject: 'Link To Reset Password',
                      text:'You are recieving this email because you have requested to reset the password.\n'
                      +'Please click the below link\n\n'+
                      'http://localhost:3000/ResetPassword/'







                    };
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                      }
                    });


                    res.send({
              
                      "code":200,
                          "success":"Email Sent Successfully"
                  });

              }
          })
          
      }
   })

})


app.get('/resetpassword', cors(corsOptions),function(req,res){
  console.log("In re-setpassword",req.query)
  var data = {
      "resetPasswordToken" : req.query.resetPasswordToken,
  }
  console.log(data.resetPasswordToken)
  db.conn.query(`SELECT * from users where resetPasswordToken = '${req.body.resetPasswordToken}'`,
  data.resetPasswordToken,function(error,results,fields){
      var d = new Date()
      console.log("token expires date value",d,"  ",new Date(results[0].resetPasswordTokenExpires))
      console.log("time value",d - new Date(results[0].resetPasswordTokenExpires))
      if(error){
          res.send({
              "code":400,
              "Status":"error occured"
          })
      }
      else if(d - new Date(results[0].resetPasswordTokenExpires)<= 36000000){
          //res.setHeader("Access-Control-Allow-Origin","*")
          //res.redirect('http://localhost:3000/ResetPassword')
          res.send({

              "code" : 200,
              "Status":"reset link OK",
              results
          })
          
      }
      else{
          res.send({
              "code" : 210,
              "Status" : "reset link expired"
          })
      }
  })

})

app.put('/updatepassword', function(req,res)
{
  var data = {
     
    "EmailID":req.body.email,
     "Pass":req.body.password
  
      }
    const SALT_ROUND = 12
    let hashedPassword = bcrypt.hashSync(data.Pass,SALT_ROUND)
      db.conn.query(`Update users SET Pass = '${req.body.password}' Where EmailID ='${req.body.email}'`,
      [hashedPassword,data.EmailID],function(error,results,fields){
          console.log(data.EmailID)
          console.log(hashedPassword)
          console.log(req.body.password)
          if(error){
              console.log(error);
              res.send({
                  "code":400,
                  "Status":"error occured",
              })
          }
          else{
              res.send({
                  "code":200,
                  "Status" : "Password updated successfully",
              })
          }
      })

})


app.listen(9000, () => {
  console.log("running server");
  ;
});


