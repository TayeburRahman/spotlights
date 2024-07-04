require("dotenv").config();
const path = require('path');
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const app = express();
const port = process.env.PORT || 5000;

// Routes
const authRouter = require("./routes/auth.routes");
const usersRouter = require("./routes/users.route");
const toolsRouter = require("./routes/tools.routes");
const blogsRouter = require("./routes/blogs.routes");
const orderRouter = require("./routes/order.routes");
const publicationRouter = require("./routes/publication.routes");

// Middleware
app.use(cors());  
app.use(express.json());

const root = path.join(__dirname, 'public' );
app.use(express.static(root));

// Define catch-all route for serving index.html
app.get(['/', '/test', '/search/:value', '/ai-tools/:category', '/ai-tools/all-categories', '/blogs', '/deals', '/order/checkout', '/submit-tools', '/advertise', '/contact', '/:title', '/update/:title', '/tool-details/:title', '/update-tools/:title', '/order/pay', '/order/pay/success/:id', '/dashboard', '/dashboard/submit-tools', '/dashboard/my-tools', '/dashboard/manage-users', '/dashboard/manage-tools', '/dashboard/manage-blogs', '/dashboard/add-tool', '/dashboard/publish-blog', '/dashboard/manage-orders', '/dashboard/manage-order/:id', '/dashboard/orders', '/dashboard/orders/:id'], (req, res) => {
  res.sendFile(path.resolve(root, 'index.html'));
});

// Database Connect
connectDB();

// Bypassed APIs
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/api/v1/tools", toolsRouter);
app.use("/api/v1/blogs", blogsRouter);
app.use('/api/v1/order', orderRouter);
app.use("/api/v1/publication", publicationRouter);  

// Example POST route for creating tasks
app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;  
    res.status(201).json({ message: 'Task created successfully' }); // Placeholder response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Ai SpotLights Is Running On Port http://localhost:${port}`);
});
