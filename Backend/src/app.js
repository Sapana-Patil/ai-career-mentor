const express = require('express');
const cors=require('cors')

const app = express();
app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const analysisRoutes = require('./routes/analysis.routes');
app.use('/api/analysis', analysisRoutes);


module.exports = app;