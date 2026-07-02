const localApiUrl = "http://localhost:8080";
const productionApiUrl = "https://bunyalit2001-sportsystem.fly.dev";

const isLocalhost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const apiUrl = process.env.REACT_APP_API_URL || (isLocalhost ? localApiUrl : productionApiUrl);

export { apiUrl };
