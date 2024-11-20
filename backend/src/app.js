const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bagRoutes = require("./routes/bagRoutes");
const imageRoute = require("./routes/imageRoute");
const refundRoute = require("./routes/refundRoutes")

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/bags',bagRoutes);
app.use('/api/images',imageRoute);
app.use('/api/refunds',refundRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})