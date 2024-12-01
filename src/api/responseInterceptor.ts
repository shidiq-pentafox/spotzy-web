import { apiCallProtected } from "./axios";
import useAuthStore from "../store/authStore";
import { ToastNotification } from "../components";

const responseInterceptor = () =>
  apiCallProtected.interceptors.response.use(
    (response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else if (response.status === 204) {
        return { status: "success" };
      } else {
        return response;
      }
    },
    async (error) => {
      const { auth: authObj, resetAuth: logout } = useAuthStore?.getState();

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
          case 400:
            return Promise.reject({
              message: data?.error_message || "Bad Request! Please check your input.",
            });

          case 401:
            return Promise.reject({
              message:
                data?.error_message ||
                "Unauthorized! You are not authorized to access this resource.",
              data,
            });

          case 403:
            if (authObj?.accessToken) {
              // notifications.clean();
              // displayNotification({
              //   id: 'lms-session-out',
              //   title: 'Session Expired!',
              //   variant: 'error',
              //   icon: <ExclamationMark />,
              //   autoClose: 2000,
              //   message: 'Your session got expired! Please Login again to continue.'
              // });
              ToastNotification({
                type: "error",
                message:
                  "Your session got expired! Please Login again to continue.",
              });
              logout();
            }
            return Promise.reject({
              message:
                "Access forbidden! You do not have permission to access this resource.",
            });

          case 404:
            return Promise.reject({
              message:
                "Resource not found! The requested resource could not be found.",
            });

          case 500:
            return Promise.reject({
              message:
                "Internal server error! Something went wrong on the server.",
            });

          case 503:
            return Promise.reject({
              message: "Service Unavailable! Please try again later.",
            });

          default:
            return Promise.reject({
              message:
                data?.error_message || "An error occurred! Please try again later.",
            });
        }
      } else if (error.request) {
        return Promise.reject({
          message:
            "No response received from server! Please check your network connection.",
        });
      } else {
        return Promise.reject({
          message: error.message || "An unexpected error occurred!",
        });
      }
    }
  );

export default responseInterceptor;
