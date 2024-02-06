import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { app } from './config';

export const storage = getStorage(app);

//  Upload photo
export const uploadUserImage = async (file: File, userUid: string) => {
  const userImgRef = ref(storage, `images/${userUid}`);

  //  with blob api
  await uploadBytes(userImgRef, file);
};

//  Get img url
export const getUserImage = async (userUid: string) => {
  const userImageRef = ref(storage, `images/${userUid}`);

  const userPhototUrl = getDownloadURL(userImageRef);
  return userPhototUrl;
};
