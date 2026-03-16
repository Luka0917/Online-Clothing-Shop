const express = require('express');
const cors = require('cors');
const app = express();

const userRouter = require('./routers/userRoute.cjs');
const cartRouter = require('./routers/cartRoute.cjs');
const orderRouter = require('./routers/orderRoute.cjs');
const productRouter = require('./routers/productRoute.cjs');

const notFoundMiddleware = require('./middleware/notFoundMiddleware.cjs');

app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);

app.use(notFoundMiddleware);

module.exports = app;