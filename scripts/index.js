function createEventCard(eventData) {
  // Створюємо основний контейнер картки
  const card = document.createElement("div");
  card.className = "event-card";

  // Зображення
  const imageElement = document.createElement("div");
  imageElement.className = "event-card__image";
  if (eventData.imageUrl) {
    const imgTag = document.createElement("img");
    imgTag.src = eventData.imageUrl;
    imgTag.alt = eventData.title;
    imageElement.appendChild(imgTag);
  } else {
    imageElement.textContent =
      eventData.imagePlaceholderText || "Зображення (272x153)";
  }
  card.appendChild(imageElement);

  // Заголовок
  const title = document.createElement("h3");
  title.className = "event-card__title";
  title.textContent = eventData.title;
  card.appendChild(title);

  // Категорія
  const categorySection = document.createElement("div");
  categorySection.className = "event-card__category";

  const categoryName = document.createElement("span");
  categoryName.className = "event-card__category-name";
  categoryName.textContent = eventData.category;
  categorySection.appendChild(categoryName);

  if (eventData.distance) {
    const categoryDistance = document.createElement("span");
    categoryDistance.className = "event-card__category-distance";
    categoryDistance.textContent = eventData.distance; // Відстань вже містить дужки з data.js або буде порожньою
    categorySection.appendChild(categoryDistance);
  }
  card.appendChild(categorySection);

  // Дата
  const dateSection = document.createElement("div");
  dateSection.className = "event-card__date";

  const dateIcon = document.createElement("span");
  dateIcon.className = "event-card__date-icon";
  dateIcon.innerHTML = `<img src="assets/icons/calendar.svg" alt="calendar icon">`;
  dateSection.appendChild(dateIcon);

  const dateText = document.createElement("span");
  dateText.className = "event-card__date-text";
  dateText.textContent = eventData.dateTime; // Наприклад: "Птн, Січ 01 - 7:00 PM PDT"
  dateSection.appendChild(dateText);
  card.appendChild(dateSection);

  // Інформація (учасники, ціна)
  const infoSection = document.createElement("div");
  infoSection.className = "event-card__info";

  // Учасники
  const participantsItem = document.createElement("div");
  participantsItem.className = "event-card__info-item";
  const participantsIcon = document.createElement("span");
  participantsIcon.className = "event-card__info-icon";
  participantsIcon.innerHTML = `<img src="assets/icons/circle.svg" alt="participants icon">`;
  const participantsText = document.createElement("span");
  participantsText.className = "event-card__info-text";
  participantsText.textContent = eventData.participants; // Дані з eventsStore вже у форматі "N going"
  participantsItem.appendChild(participantsIcon);
  participantsItem.appendChild(participantsText);
  infoSection.appendChild(participantsItem);

  // Ціна
  const priceItem = document.createElement("div");
  priceItem.className = "event-card__info-item";
  const priceIcon = document.createElement("span");
  priceIcon.className = "event-card__info-icon";
  priceIcon.innerHTML = `<img src="assets/icons/ticket.svg" alt="ticket icon">`;
  const priceText = document.createElement("span");
  priceText.className = "event-card__info-text";
  priceText.textContent = eventData.price; // Наприклад: "Free" або "₴200"
  priceItem.appendChild(priceIcon);
  priceItem.appendChild(priceText);
  infoSection.appendChild(priceItem);

  card.appendChild(infoSection);

  return card;
}

// Функція для налаштування вирівнювання останнього рядка карток
function adjustLastRowLayout(container) {
  if (!container) {
    return;
  }

  const cards = Array.from(container.children);
  if (cards.length === 0) {
    // Якщо карток немає
    container.style.justifyContent = "flex-start"; // або інше значення за замовчуванням
    return;
  }

  // Визначаємо унікальні значення offsetTop для кожного рядка карток
  const cardTops = cards.map((card) => card.offsetTop);
  const uniqueTops = [...new Set(cardTops)].sort((a, b) => a - b);

  if (uniqueTops.length === 1) {
    // Якщо всі картки в одному рядку
    if (cards.length === 1) {
      // Якщо тільки одна картка в рядку
      container.style.justifyContent = "space-around";
    } else {
      // Якщо більше однієї картки в одному рядку
      container.style.justifyContent = "space-between";
    }
  } else {
    // Якщо більше одного рядка
    const lastRowTop = uniqueTops[uniqueTops.length - 1];
    const secondLastRowTop = uniqueTops[uniqueTops.length - 2]; // Попередній рядок

    const cardsInLastRowArray = cards.filter(
      (card) => card.offsetTop === lastRowTop
    );
    const cardsInLastRow = cardsInLastRowArray.length;
    const cardsInSecondLastRow = cards.filter(
      (card) => card.offsetTop === secondLastRowTop
    ).length;

    // Якщо в останньому рядку 1 або 2 елементи, використовуємо space-around.
    // Це також покриває випадок, коли всі рядки мають по 2 елементи.
    if (cardsInLastRow === 1 || cardsInLastRow === 2) {
      container.style.justifyContent = "space-around";
    } else if (cardsInLastRow === 3 && cardsInLastRow < cardsInSecondLastRow) {
      // Якщо в останньому рядку 3 елементи і він неповний порівняно з попереднім.
      container.style.justifyContent = "space-around";
    } else {
      container.style.justifyContent = "space-between";
    }
  }
}
// Отримуємо контейнери з HTML
const cardsContainerNear = document.getElementById(
  "event-cards-container-near"
);
const cardsContainerOnline = document.getElementById(
  "event-cards-container-online"
);
function renderCategories() {
  const categoriesContainer = document.querySelector(".categories-container");
  if (!categoriesContainer) return;

  // Очищаємо контейнер перед додаванням нових елементів (якщо потрібно)
  categoriesContainer.innerHTML = "";

  categoriesData.forEach((category) => {
    const categoryItem = document.createElement("div");
    categoryItem.classList.add("category-item");
    categoryItem.style.paddingTop = "22px";
    categoryItem.style.justifyContent = "flex-start";
    categoryItem.style.marginBottom = "11px";

    const img = document.createElement("img");
    img.src = category.imgSrc;
    img.alt = category.altText;
    const p = document.createElement("p");
    p.innerHTML = category.text; // Використовуємо innerHTML, оскільки текст може містити <br />

    categoryItem.appendChild(img);
    categoryItem.appendChild(p);
    categoriesContainer.appendChild(categoryItem);
  });

  // Застосовуємо налаштування макету для контейнера категорій
  adjustLastRowLayout(categoriesContainer);
}

// Функція для рендерингу популярних міст
function renderPopularCities() {
  const citiesContainer = document.querySelector(
    ".categories-popular-cities-container"
  );
  if (!citiesContainer) {
    console.error("Контейнер для популярних міст не знайдено!");
    return;
  }
  if (typeof cities === "undefined" || cities.length === 0) {
    console.error(
      "Масив 'cities' не знайдено або він порожній. Переконайтеся, що файл cities.js завантажено."
    );
    return;
  }

  citiesContainer.innerHTML = ""; // Очищаємо контейнер

  cities.forEach((city) => {
    const cityItem = document.createElement("div");
    cityItem.classList.add("popular-city-item"); // Додаємо клас для стилізації

    const img = document.createElement("img");
    img.src = city.image;
    img.alt = city.title;

    const title = document.createElement("p"); // Або h3, h4, залежно від бажаної семантики
    title.textContent = city.title;

    cityItem.appendChild(img);
    cityItem.appendChild(title);
    citiesContainer.appendChild(cityItem);
  });

  // Застосовуємо налаштування макету для контейнера міст
  adjustLastRowLayout(citiesContainer);
}

// Функція для рендерингу статей
function renderArticles() {
  const articlesContainer = document.querySelector(
    ".categories-articles-container"
  );
  if (!articlesContainer) {
    console.error("Контейнер для статей не знайдено!");
    return;
  }
  if (typeof articles === "undefined" || articles.length === 0) {
    console.error(
      "Масив 'articles' не знайдено або він порожній. Переконайтеся, що файл articles.js завантажено."
    );
    return;
  }

  articlesContainer.innerHTML = ""; // Очищаємо контейнер

  articles.forEach((article) => {
    const articleCard = document.createElement("div");
    articleCard.classList.add("article-card");

    const img = document.createElement("img");
    img.src = article.image;
    img.alt = article.titleOfArticle;

    const title = document.createElement("h3");
    title.textContent = article.titleOfArticle;

    const text = document.createElement("p");
    text.textContent = article.textOfArticle;

    const link = document.createElement("a");
    link.href = "#"; // Або article.linkOfArticle, якщо це справжнє посилання
    link.textContent = article.linkOfArticle;

    articleCard.appendChild(img);
    articleCard.appendChild(title);
    articleCard.appendChild(text);
    articleCard.appendChild(link);
    articlesContainer.appendChild(articleCard);
  });

  // Застосовуємо налаштування макету для контейнера статей
  adjustLastRowLayout(articlesContainer);
}

// Перевіряємо, чи існує eventsStore (з data.js)
if (typeof eventsStore !== "undefined") {
  eventsStore.forEach((item, index) => {
    // Адаптуємо дані з eventsStore до формату, який очікує createEventCard
    const eventData = {
      imageUrl: item.image,
      title: item.title,
      category: item.categoryName,
      distance: item.categoryDistance, // Пустий рядок або "(X km)"
      dateTime: item.date,
      participants: item.participantsItem, // Вже у форматі "N going"
      price: item.price || "Free", // Додаємо "Free" за замовчуванням, якщо ціна не вказана
    };
    const eventCardElement = createEventCard(eventData);

    if (index < 8) {
      // Перші 8 карток
      if (cardsContainerNear) {
        cardsContainerNear.appendChild(eventCardElement);
      }
    } else if (index < 12) {
      // Наступні 4 картки (з 9-ї по 12-у)
      if (cardsContainerOnline) {
        cardsContainerOnline.appendChild(eventCardElement);
      }
    }
  });

  // Застосовуємо налаштування макету після додавання всіх карток
  adjustLastRowLayout(cardsContainerNear);
  adjustLastRowLayout(cardsContainerOnline);

  // Додаємо обробник події для зміни розміру вікна
  window.addEventListener("resize", () => {
    adjustLastRowLayout(cardsContainerNear);
    adjustLastRowLayout(cardsContainerOnline);
    adjustLastRowLayout(document.querySelector(".categories-container")); // Додаємо для категорій
    adjustLastRowLayout(
      document.querySelector(".categories-popular-cities-container")
    ); // Додаємо для міст
    adjustLastRowLayout(
      document.querySelector(".categories-articles-container")
    ); // Додаємо для статей
  });

  if (!cardsContainerNear) {
    console.error(
      "Контейнер для карток 'Events near' (event-cards-container-near) не знайдено!"
    );
  }
  if (!cardsContainerOnline) {
    console.error(
      "Контейнер для карток 'Upcoming online events' (event-cards-container-online) не знайдено!"
    );
  }
} else {
  console.error(
    "Масив eventsStore не знайдено! Переконайтеся, що файл data.js завантажено перед index.js."
  );
}

// Викликаємо функцію рендерингу категорій при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
  // ... (інші ваші виклики функцій) ...
  renderCategories();
  renderPopularCities(); // Викликаємо рендеринг популярних міст
  renderArticles(); // Викликаємо рендеринг статей
  // ... (інші ваші виклики функцій) ...
});
