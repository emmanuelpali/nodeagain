const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger} = require('./middleware/logEvents');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;

//middlewares
app.use(logger); 

//handle options credentials check for cors and fetch cookies credentials requirements
app.use(credentials);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false })); //form data
app.use(express.json());//json
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));



app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/', require('./routes/home'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));




app.listen(PORT, () => console.log(`server on port: ${PORT}`));