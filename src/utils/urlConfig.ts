// const process=import.meta

const getEnvironment = () => {
  switch (process.env.REACT_APP_PROJECT_ENV) {
    case 'production':
      return 'production';
    case 'development':
      return 'development';
    case 'v2Development':
      return 'v2Development';
    case 'v2Production':
      return 'v2Production';
    default:
      return '';
  }
};
const getBaseUrl = () => {
  switch (process.env.REACT_APP_PROJECT_ENV) {
    case 'production':
      return 'https://nikahheaven-staging.netlify.app';
    case 'development':
      return 'https://nikahheaven-staging.netlify.app';
    case 'v2Development':
      return 'https://nikahheaven-staging.netlify.app';
    case 'v2Production':
      return 'https://nikahheaven-staging.netlify.app';
    default:
      return 'http://localhost:5173';
  }
};
// const getStripeRedirectUrl = () => {
//   switch (process.env.REACT_APP_PROJECT_ENV) {
//     case 'production':
//       return 'https://nikahheaven-staging.netlify.app';
//     case 'development':
//       return 'https://nikahheaven-staging.netlify.app';
//     case 'v2Development':
//       return 'https://nikahheaven-staging.netlify.app';
//     case 'v2Production':
//       return 'https://nikahheaven-staging.netlify.app';
//     default:
//       return 'https://nikahheaven-staging.netlify.app';
//   }
// };
const getSiteBaseUrl = () => {
  switch (process.env.REACT_APP_PROJECT_ENV) {
    case 'production':
      return 'https://nikahheaven-staging.netlify.app';
    case 'development':
      return 'https://nikahheaven-staging.netlify.app';
    case 'v2Development':
      return 'https://nikahheaven-staging.netlify.app';
    case 'v2Production':
      return 'https://nikahheaven-staging.netlify.app';
    default:
      return 'http://localhost:5173';
  }
};
const getBackendBaseUrl = () => {
  switch (process.env.REACT_APP_PROJECT_ENV) {
    case 'production':
      return process.env.REACT_APP_BASE_API_URL;
    case 'development':
      return process.env.REACT_APP_BASE_API_URL || `http://localhost:5000`;
    case 'v2Development':
      return process.env.REACT_APP_BASE_API_URL || `http://localhost:5000`;
    case 'v2Production':
      return process.env.REACT_APP_BASE_API_URL || 'http://localhost:5000';
    default:
      return process.env.REACT_APP_BASE_API_URL || `http://localhost:5000`;
  }
};

const Url = {
  baseUrl: getBaseUrl(),
  baseSiteUrl: getSiteBaseUrl(),
  backendUrl: getBackendBaseUrl(),
};
const config = {
  BASE_URL: `${Url.baseUrl}`,
  environment: getEnvironment(),
  getBaseUrl: getBaseUrl(),
  getSiteBaseUrl: Url.baseSiteUrl,
  backendUrl: Url.backendUrl,
};
export default config;
