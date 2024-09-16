import { Router } from 'express';
import multer from 'multer';
import { processImage } from '../utils/imageProcessor';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/process', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const { format, brightness, contrast, saturation, rotation, preview } = req.body;
    const isPreview = preview === 'true'; // Ensure boolean conversion
    const processedImage = await processImage(
      req.file.buffer,
      format,
      parseFloat(brightness),
      parseFloat(contrast),
      parseFloat(saturation),
      parseFloat(rotation),
      isPreview
    );

    res.set('Content-Type', `image/${format}`);
    res.send(processedImage);
  } catch (error) {
    res.status(500).send('Error processing image.');
  }
});

export default router;
