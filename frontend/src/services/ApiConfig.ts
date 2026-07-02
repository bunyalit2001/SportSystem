const localApiUrl = "http://localhost:8080";
const productionApiUrl = "https://bunyalit2001-sportsystem.fly.dev";

const isLocalhost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const configuredApiUrl = process.env.REACT_APP_API_URL;
const configuredApiUrlIsLocal =
  configuredApiUrl?.includes("localhost") || configuredApiUrl?.includes("127.0.0.1");

const apiUrl =
  configuredApiUrl && (isLocalhost || !configuredApiUrlIsLocal)
    ? configuredApiUrl
    : isLocalhost
      ? localApiUrl
      : productionApiUrl;

export { apiUrl };
