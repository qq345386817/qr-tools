import jsQR from 'jsqr';

// Limit decoded pixels before allocating canvas buffers, including camera frames.
export function decodeFrame(source, width, height, canvas, maxDimension = 1600) {
  const scale = Math.min(1, maxDimension / Math.max(width, height));
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  return jsQR(pixels.data, pixels.width, pixels.height, { inversionAttempts: 'attemptBoth' })?.data ?? null;
}

export async function readImage(file) {
  if (file.size > 20 * 1024 * 1024) throw new Error('largeFile');
  if (!file.type.startsWith('image/')) throw new Error('imageOnly');
  const url = URL.createObjectURL(file);
  const image = new Image();
  try {
    image.src = url;
    await image.decode();
    if (image.naturalWidth * image.naturalHeight > 40_000_000) throw new Error('largeFile');
    return decodeFrame(image, image.naturalWidth, image.naturalHeight, document.createElement('canvas'));
  } catch (error) {
    if (error.message === 'largeFile') throw error;
    throw new Error('imageOnly');
  } finally {
    URL.revokeObjectURL(url);
  }
}
