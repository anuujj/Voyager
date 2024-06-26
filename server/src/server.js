require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const { startPolling } = require('./pollingService');
const { PORT } = process.env;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

startPolling();