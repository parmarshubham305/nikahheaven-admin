import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config';

export const uploadImageIntoFirebase = async (file: any, path: string) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};
