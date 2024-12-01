import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AUTH_STORE } from './storeKeys';

const useAuthStore = create(
  persist(
    (set) => {
      return {
        auth: {},
        saveAuth: (authObj) => {
          set(currentState => ({
            auth: {
              ...currentState?.auth,
              ...authObj
            }
          }))
        },
        // getRoleId: () => set((state) => state.auth?.user.Roles[0]?.roleId || null),
        resetAuth: () => {
          set({ auth: {} }, true)
          /** This will replace the current entry in the browser's history, without reloading */ 
          window?.location?.replace?.('/');
        }
      }
    },
    {
      name: AUTH_STORE,
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export default useAuthStore;