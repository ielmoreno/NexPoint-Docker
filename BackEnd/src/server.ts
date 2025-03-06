import express from 'express';
import cors from 'cors'
import { PORT, HOST, ENVIRONMENT } from './config';
import welcome from './controllers/welcome';
import routeNotFounded from './controllers/routeNotFounded';
import poisRouter from './routers/poisRouter';
import errorHandler from './middlewares/errorHandler';
import logger from './middlewares/logger';

const app = express()
app.use(logger)
app.use(cors())
app.use(express.json())

app.get('/', welcome)
app.use('/pois', poisRouter)
app.use('*', routeNotFounded)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Servidor rodando no ambiente ${ENVIRONMENT} em ${ENVIRONMENT == 'production' ? HOST : HOST+':'+PORT}`)
  })