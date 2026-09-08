require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {createClient} = require("redis")

const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware")

const app = express();


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // user and admin frontends
  credentials: true
}));

const redis = createClient({url : process.env.REDIS_URL});
console.log(redis)
redis.on("error" , (err) => console.log("Error in redis connections: " , err));
(async () =>{
  try{
    await redis.connect();
    await redis.set("testKey" , "Hello i am ashrith setting the redis");

    const val = await redis.get("testKey");
    console.log(val);
  }catch(err){
console.log(err)
  }
})();
app.get("/auth", authMiddleware, (req, res) => {
   res.json({ message: "Token valid", user: req.user.username }); 
});
// Routes (auth will be added later)
app.use(require("./routes/authRoutes"));
app.use(require("./routes/booksRoutes"));
app.use(require("./routes/cartRoutes"))



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
