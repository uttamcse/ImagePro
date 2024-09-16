import sharp from 'sharp';

export async function processImage(
  buffer: Buffer,
  format: 'jpeg' | 'png',
  brightness: number,
  contrast: number,
  saturation: number,
  rotation: number,
  preview: boolean = false
) {
  try {
    const image = sharp(buffer);

    // Apply transformations
    const processedImage = image
      .rotate(rotation) // Rotate image
      .modulate({
        brightness: brightness,
        saturation: saturation
      })
      .linear(contrast, 0); // Apply contrast adjustment

    if (preview) {
      // For live preview, resize the image to lower quality
      return await processedImage
        .resize({ width: 400 }) // Adjust size for quicker previews
        .toFormat(format)
        .toBuffer();
    } else {
      // For final download, use original or high quality settings
      return await processedImage
        .toFormat(format)
        .toBuffer();
    }
  } catch (error) {
    throw new Error('Error processing image.');
  }
}
