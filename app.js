require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


const express = require('express');
const app = express();
//connect DB
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

//routers
const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const branchRouter = require('./routes/branch')
const cityRouter = require('./routes/city')
const bookingRouter = require('./routes/booking')
const enquiryRouter = require('./routes/enquiry')
const quotationRouter = require('./routes/quotation')
const userRouter = require('./routes/user')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>')
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/bookings', bookingRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/quotations', quotationRouter)
app.use('/api/v1/city', cityRouter)
app.use('/api/v1/customer', userRouter)
app.use('/api/v1/branch', branchRouter)
app.use('/api/v1/enquiry', enquiryRouter)
// app.use('/api/v1/customer', customerRouter)
// app.use('/api/v1/', authenticateUser, jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
