interface ImportMetaEnv {
//   VITE_APP_TITLE: string;
//   VITE_API_URL: string;
  // Add your environment variables here
//   REACT_APP_API_KEY: string;
  REACT_APP_PROJECT_ENV: string;
  REACT_APP_BASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
