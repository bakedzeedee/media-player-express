import express from 'express';
import songRouter from './routes/songs.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs');

app.use(logger); // logs every route initialized after this line

app.use('/static', express.static(path.join(__dirname + '/../public')));

app.use('/songs', songRouter);

function logger (req, res, next) {
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}

app.listen(3000);