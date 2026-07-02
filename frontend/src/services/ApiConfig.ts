const productionApiUrl = "https://bunyalit2001-sportsystem.fly.dev";
const configuredApiUrl = process.env.REACT_APP_API_URL;
const isLocalhost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);
const configuredApiUrlIsLocal =
  configuredApiUrl?.includes("localhost") || configuredApiUrl?.includes("127.0.0.1");

const apiUrl =
  configuredApiUrl && (!configuredApiUrlIsLocal || isLocalhost)
    ? configuredApiUrl
    : productionApiUrl;

export { apiUrl };
