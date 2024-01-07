import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import {fileURLToPath} from 'url';
import path, {dirname} from 'path';
import connectDB from './models/db.js';
import cookieParser from 'cookie-parser';
import cleanDir from './utils/clearTemp.js';
import fileUpload from 'express-fileupload';
import userRoute from './routes/userRoute.js';
import streamRoute from './routes/streamRoute.js';
import courseRoute from './routes/courseRoute.js';
import errorHandler from './controllers/errorHandler.js';

dotenv.config({path: '../.env'});

const app = express();
const {NODE_ENV, PORT} = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = PORT || 8000;
const isLocal = NODE_ENV === 'development';

const corsOptions = {
  origin: isLocal ? 'http://localhost:5173' : undefined,
  credentials: !!isLocal,
};

isLocal ? app.use(morgan('dev')) : app.use(morgan('tiny'));

cleanDir();

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data:'],
    },
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(fileUpload({useTempFiles: true}));
app.use(express.urlencoded({extended: true}));

app.use('/api/user', userRoute);
app.use('/api/course', courseRoute);
app.use('/api/stream', streamRoute);
app.use(errorHandler);

app.use(express.static(path.join(__dirname, '../../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});

await connectDB();

app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);
