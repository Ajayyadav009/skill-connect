const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
//  const token = 'welconmeToTheWorldOfProgrammer';
const SECRET_KEY = "ajayydv009";

app.use(express.json());

const users = [];

app.post("/Register", (req, ress) => {
  const username = req.body.username;
  const password = req.body.password;
  users.push({
    username: username,
    password: password,
  });
  ress.json({
    message: "User Registered Successfully",
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let foundeUser = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      foundeUser = users[i];
    }
}
    if (!foundeUser) {
      res.json({
        message: " Your username or password is incorrect",
      });
      return;
    } else {
      const token = jwt.sign(
        {
          username: foundeUser.username,
        },
        SECRET_KEY
      );
      res.header("jwt", token);
      res.header("random", "Ajay");
      res.json({
        token: token,
      });
    }
  
});

app.get("/me", (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).send("Invalid Token");
    res.json({
      user: decoded,
    });
  });
});

app.listen(3000);
