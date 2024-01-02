import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import {Server} from 'socket.io';
import {createServer} from 'http';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import socket from './socket.io/socket.io.js';
import connectDB from './models/db.js';
import cleanDir from './utils/clearTemp.js';
import userRoute from './routes/userRoute.js';
import courseRoute from './routes/courseRoute.js';
import streamRoute from './routes/streamRoute.js';
import errorHandler from './controllers/errorHandler.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

dotenv.config();
const {NODE_ENV, PORT} = process.env;

const port = PORT || 8000;
const isLocal = NODE_ENV === 'development';

const corsOptions = {
  origin: isLocal ? 'http://localhost:5173' : undefined,
  credentials: !!isLocal,
};

isLocal ? app.use(morgan('dev')) : app.use(morgan('tiny'));

cleanDir();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(fileUpload({useTempFiles: true}));
app.use(express.urlencoded({extended: true}));

socket(io);

app.use('/api/user', userRoute);
app.use('/api/course', courseRoute);
app.use('/api/stream', streamRoute);
app.use(errorHandler);

await connectDB();

server.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);
