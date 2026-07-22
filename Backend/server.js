const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config();
require('./src/config/redis');



const app=require('./src/app');
const connectDB=require('./src/config/database');


connectDB();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});