const config = {
  locales: [
    // 'ar',
    'fr',
    // 'cs',
    // 'de',
    // 'dk',
    // 'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
};

const bootstrap = (app) => {
  const styleTag = document.createElement("style");
  styleTag.innerText = `
      a[href*="/dashboard/plugins/cloud"], a[href*="/strapi/strapi/releases/tag/v"], a[href*="strapi.io/"], a[href*="cloud.strapi.io"] {
        display: none;
      }
      nav[aria-label="Settings"] ol li:nth-child(2), nav[aria-label="Settings"] ol ol li:nth-child(3) {
        display: none;
      }
      aside[aria-labelledby="join-the-community"], .home-page #main-content>div:first-child>img {
        display: none;
      }
    `;
  document.head.appendChild(styleTag);
  const isHomePage =
    window.location.pathname === "/admin" ||
    window.location.pathname === "/admin/";
  document.documentElement.classList.add(
    isHomePage ? "home-page" : "not-home-page"
  );

};



export default {
  config,
  bootstrap,
};
