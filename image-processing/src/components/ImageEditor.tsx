import sharp from 'sharp';

export async function processImage(
  buffer: Buffer,
  format: 'jpeg' | 'png' ,
  brightness: number,
  contrast: number,
  saturation: number,
  rotation: number
) {
  try {
    const image = sharp(buffer);
    
    // Apply transformations
    const processedImage = await image
      .rotate(rotation) // Rotate image
      .modulate({
        brightness: brightness,
        contrast: contrast,
        saturation: saturation
      })
      .resize({ width: 400 }) // Low quality preview
      .toFormat(format)
      .toBuffer();

    return processedImage;
  } catch (error) {
    throw new Error('Error processing image.');
  }
}

