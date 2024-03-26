import express from "express";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: "backend",
  })
  .then(() => console.log("database connections successful."))
  .catch((err) => {
    console.log(err);
  });
// message schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});
// model declaration
const Msg = mongoose.model("Message", messageSchema);

// server creation and connecting to the server

const app = express();
const port = 5000;

//middlewares

//cors-policy
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Parse JSON bodies
app.use(express.json());



//home route
app.get("/", (req, res) => {
  console.log("Hello World...");
  res.send("Hello  !!!");
});

// add user route
app.post("/add", async (req, res) => {
  await Msg.create({ name: req.body.name, email: req.body.email });

  res.send({message:"user has been added succesfully"});
});

app.get("/getData", async (req, res) => {
  const jsonData = [
    { name: "Jyoti Prakash", email: "jyoti@gmail.com" },
    { name: "Jay Prakash", email: "jay@gmail.com" },
    { name: "Youtube", email: "subscribe@gmail.com" },
    // Add more key-value pairs as needed
  ];
  res.send(jsonData);
});

app.get("/dbData", async (req, res) => {
  const data = await Msg.find({});
  res.send(data);
});

//login
app.post("/login",(req,res)=>{
  res.cookie("token","cookieset");
  res.send("<h1>cookie has been set successfulyy</h1>")
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
