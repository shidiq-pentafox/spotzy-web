import { apiCallProtected } from "../api/axios";

export const getAPICall = (url: string, options: any = {}) => {
  return new Promise((resolve, reject) => {
    apiCallProtected.get(url, options?.headers)
      .then((response) => {
        if (response?.status?.toLowerCase() === 'success') {
          resolve(response?.result);
        }
        else {
          reject(response?.error_message || 'Something went wrong');
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const postAPICall = (url: string, data: any, options: any = {}) => {
  return new Promise((resolve, reject) => {
    apiCallProtected.post(url, data, options?.headers)
      .then((response) => {
        if (response?.status?.toLowerCase() === 'success') {
          resolve(response?.result);
        }
        else {
          reject(response?.error_message || 'Something went wrong');
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
};
