const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

const userRouter = require('./routers/userRoute.cjs');
const cartRouter = require('./routers/cartRoute.cjs');
const orderRouter = require('./routers/orderRoute.cjs');
const productRouter = require('./routers/productRoute.cjs');
const addressRouter = require('./routers/addressRoute.cjs');

const notFoundMiddleware = require('./middleware/notFoundMiddleware.cjs');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);
app.use('/address', addressRouter);

app.use(notFoundMiddleware);

module.exports = app;