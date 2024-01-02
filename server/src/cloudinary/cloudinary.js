import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

dotenv.config();

const {cloud_name, api_key, api_secret} = process.env;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export function uploadMedia(files, category, title, author) {
  return files.map(async (file) => {
    return await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: file.mimetype === 'video/mp4' ? 'video' : 'image',
      folder: `signVideo/${category}`,
      public_id: `${title}by${author}`,
    });
  });
}

export async function generateSecureUrl(publicId) {
  return cloudinary.utils.private_download_url(publicId, '', {
    secure: true,
    type: 'upload',
    resource_type: 'video',
    expires_at: Math.floor(Date.now() / 1000) + 60 * 35, // 35 minutes
  });
}
