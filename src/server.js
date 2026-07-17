const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config();
require('./config/redis');

const app=require('./app');
const connectDB=require('./config/database');

connectDB();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});