const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const agentRoutes = require('./routes/agentRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/agent', agentRoutes);


app.use(errorHandler);

module.exports = app;