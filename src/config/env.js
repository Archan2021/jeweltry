export const config = {
  basePath: import.meta.env.PROD ? '/gemtry' : '',
  apiUrl: import.meta.env.VITE_API_URL || '',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mediaPath: import.meta.env.PROD ? '/gemtry' : '',
  // Asset path helper
  getAssetPath: (path) => {
    const basePath = import.meta.env.PROD ? '/gemtry' : '';
    return `${basePath}${path.startsWith('/') ? path : '/' + path}`;
  },
};

export default config;
