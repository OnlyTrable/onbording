const translations = {}; // Для зберігання завантажених перекладів
let currentLang = "en"; // Поточна мова за замовчуванням

async function loadTranslations(lang) {
  try {
    const response = await fetch(
      `locales/${lang}.json?v=${new Date().getTime()}`
    ); // Додаємо кеш-бастер
    if (!response.ok) {
      console.error(
        `Не вдалося завантажити ${lang}.json. Спроба завантажити 'en.json'.`
      );
      if (lang !== "en") {
        // Уникаємо нескінченного циклу, якщо 'en' також не вдається завантажити
        return loadTranslations("en");
      }
      return;
    }
    translations[lang] = await response.json();
    currentLang = lang;
    applyTranslations();
    localStorage.setItem("preferredLang", lang); // Зберігаємо вибір користувача
  } catch (error) {
    console.error("Помилка завантаження перекладів:", error);
    if (lang !== "en") {
      return loadTranslations("en");
    }
  }
}

function applyTranslations() {
  const langTranslations = translations[currentLang];
  if (!langTranslations) {
    console.warn(`Переклади для ${currentLang} не завантажені.`);
    return;
  }
  document.querySelectorAll("[data-i18n-key]").forEach((element) => {
    const key = element.getAttribute("data-i18n-key");
    if (langTranslations[key]) {
      // Можна розширити для обробки різних атрибутів (placeholder, title, value для input і т.д.)
      if (element.hasAttribute("placeholder") && element.tagName === "INPUT") {
        element.placeholder = langTranslations[key];
      } else if (
        element.tagName === "INPUT" &&
        (element.type === "submit" || element.type === "button")
      ) {
        element.value = langTranslations[key];
      } else {
        element.textContent = langTranslations[key];
      }
    } else {
      // console.warn(`Відсутній переклад для ключа: ${key} в ${currentLang}`);
    }
  });

  // Оновлення тексту поточної мови в перемикачі (якщо є такий елемент)
  const currentLangTextElement = document.getElementById("current-lang-text");
  if (currentLangTextElement) {
    currentLangTextElement.textContent = currentLang.toUpperCase();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const preferredLang =
    localStorage.getItem("preferredLang") ||
    navigator.language.split("-")[0] ||
    "en";

  // Обробники для посилань вибору мови
  document
    .querySelectorAll(".language-dropdown .dropdown-menu a[data-lang]")
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedLang = link.getAttribute("data-lang");
        if (selectedLang !== currentLang) {
          loadTranslations(selectedLang);
        }
        // Закриття випадаючого меню (якщо воно не закривається автоматично по CSS :hover)
        // link.closest('.dropdown-menu').style.display = 'none'; // Може бути непотрібним, якщо CSS обробляє :hover
      });
    });

  loadTranslations(preferredLang); // Завантажуємо початкові переклади
});
