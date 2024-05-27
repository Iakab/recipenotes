import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';

import { app } from './config';

export const storage = getStorage(app);

//  Upload photo
export const uploadImage = async (
  file: File,
  userUid: string,
  folderName: string,
) => {
  const userImgRef = ref(storage, `images/${userUid}/${folderName}`);

  await uploadBytes(userImgRef, file);
};

//  Get img url
export const getImage = async (path: string) => {
  try {
    const userImageRef = ref(storage, path);

    return await getDownloadURL(userImageRef);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'storage/object-not-found') {
      console.log("File doesn't exist");
      return undefined;
    }
    console.log(error);
    return undefined;
  }
};

export const deleteImg = async (path: string) => {
  const img = await getImage(path);

  try {
    if (img) {
      const imgRef = ref(storage, path);
      await deleteObject(imgRef);
    }
  } catch (error) {
    console.log(error);
  }
};
