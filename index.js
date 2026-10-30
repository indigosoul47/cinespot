import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import libraryRoutes from './routes/libraryRoutes.js';
import connectDB from './config/db.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

// Define allowed origins
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], // Allowed headers
  credentials: false
};

app.use(cors(corsOptions));

const router = express.Router();

if(process.env.NODE_ENV === 'dev'){
    app.use(morgan('dev'))
}

app.use(express.json());

router.use('/library', libraryRoutes);
router.use('/movies', movieRoutes);
router.use('/users', userRoutes);
router.use('/upload', uploadRoutes);

app.use('/api', router);

const __dirname = path.resolve();

if(process.env.NODE_ENV === 'prod'){
    app.use(express.static(path.join(__dirname, './goode-promo/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'goode-promo', 'build', 'index.html'))
    });
}

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, console.log(`[Init] Movie Server : (${PORT})`));
