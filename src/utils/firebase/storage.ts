import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { app } from './config';

export const storage = getStorage(app);

//  Upload photo
export const uploadUserImage = async (file: File, userUid: string) => {
  const userImgRef = ref(storage, `images/${userUid}`);

  //  with blob api
  uploadBytes(userImgRef, file).then((snapshot) => snapshot);
};

//  Get img url
export const getUserImage = async (userUid: string) => {
  const userImageRef = ref(storage, `images/${userUid}`);

  return getDownloadURL(userImageRef).then((userPhotoUrl) => userPhotoUrl);
};
