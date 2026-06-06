/* eslint-disable */
// Vite Environment
declare global {
  namespace Vite {
    interface ImportMeta {
      env: {
        VITE_API_URL: string;
      };
    }
  }
}

export {};
