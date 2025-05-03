const jwt = require("jsonwebtoken");
const SECRET_KEY = "ajayydv009";

const users = [];

exports.post("/Register", (req, ress) => {
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

exports.post("/login", (req, res) => {
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

exports.get("/me", (req, res) => {
  const token = req.headers.token;
const decodedData = jwt.verify(token, SECRET_KEY);
const username = decodedData.username;

let foundeUser = null;
for( let i =0; i<users.length; i++){
  if(users[i].username == username){
    foundeUser = username;
  }
}
if(foundeUser){
  res.json({
    username: foundeUser.username,
    password: foundeUser.password
  })
}
else{
  res.json({
    messagee: " Token is invalid "
  })
}
});

app.listen(3000);
