const express = require('express');
const app = express();
const products = require('./app/product/routes');
const path = require('path');
const cors = require('cors');
const methodOverride = require('method-override')
// const axios = require('axios');
const logger = require('morgan');
const router = require('./routes');

// const data = async () => {
//     try {
//         const res = await axios.get('http://localhost:9000/api/v1/products')
//         return res.data;
//     } catch (error) {
//         console.error(error);
//     }
// }

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(router)
app.use('/api/v1', products);



app.listen(9000, () => {
    console.log('Server is running on: http://localhost:9000');
});