import express from 'express';
import cors from 'cors'; // Import cors
import multer from 'multer';
import imageRoutes from './routes/image';

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use('/api/images', imageRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
