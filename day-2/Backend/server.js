require("dotenv").config();

console.log("MONGO_URI =", process.env.MONGO_URI);

const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port", process.env.PORT || 3000);
});