import { instanceWithClodinaryUrl } from './api';

// type SetPhotoResponseDataType = {
//   photos: PhotosType
// }

export const profileAPI = {
  setUserPhoto(photoFile: File) {
    const formData = new FormData();
    formData.append('file', photoFile);
    formData.append('upload_preset', 'egqtl0yn');

    return instanceWithClodinaryUrl
      .post('upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => res);
  },
};
