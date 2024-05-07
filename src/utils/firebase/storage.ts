import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

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
export const getImage = async (userUid: string, folderName: string) => {
  const userImageRef = ref(storage, `images/${userUid}/${folderName}`);

  const userPhototUrl = getDownloadURL(userImageRef);
  return userPhototUrl;
};
