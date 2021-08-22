import express from "express";
import cors from 'cors';

import Authorization from './middleware/authorization';

import jobRouter from './routes/job'


const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())


const isAuth = new Authorization()
app.use(isAuth.handler)

app.use('/job',jobRouter)

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});

import init from './helpers/init-mock'
init()

