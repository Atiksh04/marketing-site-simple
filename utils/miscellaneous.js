export const sendEventAndRedirect = (event, metadata, url) => {
  if (!metadata) metadata = {};

  const theme = useTheme();

  metadata = {
    ...metadata,
    app: "marketing_site",
    theme: theme.value,
  };

  if (typeof window.sa_event === "function" && window.sa_loaded && event) {
    let sent = false;
    window.sa_event(event, metadata, () => {
      sent = true;
      window.location.href = url;
    });
    setTimeout(() => {
      if (!sent) window.location.href = url;
    }, 4000);
  } else if (event) {
    console.warn("Simple Analytics not loaded yet to send event:", event);
  }

  return (window.location.href = url);
};

export const navigateToWelcome = (event, metadata) => {
  if (!metadata) metadata = {};

  const config = useRuntimeConfig();
  const { MAIN_URL } = config.public;
  const theme = useTheme();
  const currency = useState("currency");
  const affiliate = useState("affiliate");

  const params = new URLSearchParams();
  if (currency?.value?.code) params.set("currency", currency.value.code);
  if (affiliate?.value?.slug) params.set("affiliate", affiliate?.value?.slug);
  if (theme.value === "dark") params.set("theme", "dark");

  const welcomeUrl = `${MAIN_URL}/welcome?${params}`;
  return sendEventAndRedirect(event, metadata, welcomeUrl);
};

export const getFlagUrl = (locale, availableLocales) => {
  const url = "https://assets.simpleanalytics.com/images/flags/";

  if (locale === "en" && process.client) {
    const found = navigator?.languages.find((lang) => lang.startsWith("en-"));
    if (found) {
      const [, region] = found.split("-");
      return `${url}${region.toUpperCase()}.svg`;
    }
  }

  const found = availableLocales.find((lang) => lang.code === locale);
  if (found) {
    return `${url}${found.flag.toUpperCase()}.svg`;
  }
};
