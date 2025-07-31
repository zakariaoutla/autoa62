const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authoRoute = require('./router/authenticatorRouter')
const carsRoute = require('./router/carsRouter')
const userRouter = require('./router/usersRouter')
const rentalRouter = require('./router/rentalRouter')
const paymentsRouter = require('./router/paymentsRouter')
const reviewsRouter = require('./router/reviewsRouter')
const PORT = 8080

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/auth', authoRoute)
app.use('/car', carsRoute)
app.use('/user', userRouter)
app.use('/rental', rentalRouter)
app.use('/payment', paymentsRouter)
app.use('/review', reviewsRouter)












app.listen(PORT, () => {
    console.log('Server is running on port' + PORT);

})

