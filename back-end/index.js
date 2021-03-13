const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bcrypt = require("bcrypt");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.set("port", 3001);
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://admin-Pentavalent:Nosotroscinco@cluster0.vuo1v.mongodb.net/Elan?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Coudn't connect MongoDB....", err));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
});
const channelSchema = new mongoose.Schema({
  channel_name: String,
  channel_theme: String,
  channel_code: String,
  channel_users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  channel_admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  channel_desc: String,
  private: Boolean,
  channel_message: String,
});
const Channel = new mongoose.model("Channel", channelSchema);
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
});
const User = new mongoose.model("User", userSchema);
const verifySchema = new mongoose.Schema({
  email: String,
  otp: String,
});
const Verify = new mongoose.model("Verify", verifySchema);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
// function createAdmin(email, password, req, res) {
//   console.log("Vandhutten");
//   const user = new User({
//     email: email,
//     password: password,
//   });
//   admin.save(function (err) {
//     if (err) console.log("Error in adding new item");
//     else {
//       const store = new Store({
//         store_owner: admin._id,
//       });
//       store.save(function (err) {
//         if (err) console.log("Error in adding new item");
//         else {
//           Admin.findOne({ admin_email: email }, (err, found) => {
//             if (!err) {
//               console.log("Yes here");
//               found.store_id = store._id;
//               res.redirect(
//                 307,
//                 "/login?admin=" + true + "&password=" + password
//               );
//               found.save();
//             }
//           });
//         }
//       });
//     }
//   });
// }
function randomString(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}
app.post("/signup", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const name = req.body.username;
  const pass = req.body.password;
  if (email && pass) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(pass, salt, function (err, hash) {
        if (!err) {
          console.log("Hi");
          const user = new User({
            email: email,
            password: hash,
            name: name,
          });
          user.save();
          res.status(200).send("/login?admin=" + true + "&password=" + hash);
        } else res.send("error in hash gen");
      });
    });
  } else
    return res.status(403).json({
      message: "Problem in signing up",
    });
});
app.post("/new-channel", (req, res) => {
  console.log(req.body);
  var random = randomString(
    6,
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );
  const channel = new Channel({
    channel_name: req.body.channel_name,
    channel_theme: req.body.channel_theme,
    channel_code: random,
    private: req.body.private,
    channel_admin: req.body.user_id,
  });
  channel.save(function (err) {
    if (err) console.log("Error in adding new item");
    else {
      User.findOne({ _id: req.body.user_id })
        .populate("channels")
        .exec(function (err, user) {
          if (err) console.log("Error in finding user id from user");
          else user.channels.push(channel._id);
        });
      res.send("saved");
    }
  });
});

app.post("/verify", (req, res) => {
  Verify.deleteMany({ email: req.body.email }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted");
    }
  });
  console.log(req.body);
  var random = randomString(
    6,
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );
  const user = new Verify({
    email: req.body.email,
    otp: random,
  });
  user.save();
  var mailOptions = {
    from: process.env.SMTP_USER,
    to: req.body.email,
    subject: "Verify your email address",
    text:
      "To finish setting up your account, we just need to make sure this email address is yours.",
    html:
      "<div>To verify your email address use this security code: '" +
      random +
      "'</div>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Mail Sent");
    }
  });
});
app.post("/otp-verify", (req, res) => {
  Verify.findOne({ email: req.body.email }, (err, found) => {
    if (!err) {
      if (found.otp == req.body.otp) {
        res.status(200).send("Correct");
      } else {
        res.status(403).send("OTP incorrect");
      }
    } else {
      res.send("Email not found");
    }
  });
});
app.post("/login", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const pass = req.body.password;
  if (email && pass) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(pass, salt, function (err, hash) {
        if (!err) {
          console.log("Hi");
          User.findOne({ email: req.body.email }, (err, found) => {
            if (!err) {
              if (found) {
                console.log("found");

                bcrypt.compare(pass, found.password, function (err, result) {
                  if (!err) {
                    if (result == true) {
                      res.status(200).send("Login");
                    } else {
                      res.send("Wrong Pwd");
                    }
                  }
                });
              } else {
                res.send("SignUp");
              }
            } else {
              console.log(err);
            }
          });
        } else res.send("error in hash gen");
      });
    });
  }
});
function Storing(foundChannel, found) {
  console.log("Save panniten");
}
app.post("/set-pref", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, found) => {
    if (!err) {
      if (found) {
        Channel.findOne(
          { channel_name: req.body.pref },
          async (err, foundChannel) => {
            if (!err) {
              if (foundChannel) {
                foundChannel.channel_users.push(found._id);
                found.channels.push(foundChannel._id);
                await foundChannel
                  .save()
                  .then(() => {
                    console.log("Saved");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                await found
                  .save()
                  .then(() => {
                    console.log("Saved User");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
          }
        );
      }
    }
  });
  res.send(req.body);
});

app.post("/channels", (req, res) => {
  Channel.find({}, (err, foundChannels) => {
    if (!err) {
      if (foundChannels) {
        res.send(foundChannels);
      }
    }
  });
});

app.post("/chat", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  User.findOne({ email: email })
    .populate("channels")
    .exec(function (err, found) {
      if (err) {
        console.log(err);
      } else {
        res.send(found);
      }
    });
});

app.get("/", (req, res) => {
  res.send("object");
});
app.listen(app.get("port"), function () {
  console.log(`App started on port ${app.get("port")}`);
});
