require('dotenv').config();
const express = require('express');
const cors = require("cors");
const { validateSignUpInputs } = require('./middlewares/signUpValidation');
const { validateSignInInputs } = require('./middlewares/signInValidate');
const userController = require('./controllers/userController');
const { authenticate } = require('./middlewares/authentication');
const transactionsController = require('./controllers/transactionsController');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/sign-up', validateSignUpInputs, userController.postSignUp);

app.post('/api/sign-in', validateSignInInputs, userController.postSignIn);

app.get('/api/transactions', authenticate, transactionsController.getTransactions);

app.post('/api/transactions', authenticate, transactionsController.postTransactions )

const port = process.env.PORT;
app.listen(port);