import fs from 'fs';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const dirPath = path.join(__dirname, '../../tmp');

export default function cleanDir() {
  try {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        fs.unlinkSync(filePath);
      } else if (stats.isDirectory()) {
        cleanDir(filePath);
        fs.rmdirSync(filePath);
      }
    }
    console.log(`directly cleaned: ${dirPath}`);
  } catch (error) {
    console.error(`Error cleaning directly: ${error.message}`);
  }
}
