import { apiCallProtected } from "../api/axios";
import { URL } from "../api/serverUrls";

export const login = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    apiCallProtected
      .post(URL.loginUser, { email, password })
      .then((response) => {
        console.log(response);
        
        if (response?.status?.toLowerCase() === 'success') {
          resolve(response?.result);
        } else {
          reject(response?.error_message || 'Something went wrong');
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};