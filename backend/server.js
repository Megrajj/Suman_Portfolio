const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./data/db');
const contactRoutes = require('./routes/contact');
const serviceRequestsRoutes = require('./routes/serviceRequests'); // Import new service requests route
const ProjectRoute = require('./routes/project'); 
require('dotenv').config();

const EMAIL = process.env.EMAIL_USER;
const PASSWORD = process.env.EMAIL_PASS;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', contactRoutes);
app.use('/api', serviceRequestsRoutes); // Use the service requests route
app.use('/api', ProjectRoute);

// make a route for user to login
app.post('/login', (req, res) => {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();
    if (email === EMAIL.toLowerCase() && password === PASSWORD) {
        res.status(200).json({ message: 'Login successful!' });
    } else {
        res.status(401).json({ message: 'Login failed!' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
