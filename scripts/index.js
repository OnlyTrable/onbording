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

// Функція для форматування дати з mockdata.js
function formatMockEventDate(dateObj) {
  if (!(dateObj instanceof Date) || isNaN(dateObj)) {
    return "N/A";
  }
  const optionsDate = { weekday: "short", month: "short", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };

  // Прибираємо .toUpperCase() для більш м'якого вигляду
  const formattedDate = dateObj.toLocaleDateString("en-US", optionsDate);
  const formattedTime = dateObj.toLocaleTimeString("en-US", optionsTime);

  // Змінюємо роздільник на " · "
  return `${formattedDate} · ${formattedTime}`;
}

// Функція для створення маленької картки події (для event-cards-container-near)
function createNearEventCard(eventData) {
  const card = document.createElement("div");
  card.className = "near-event-card";

  // Лівий блок: Зображення
  const imageWrapper = document.createElement("div");
  imageWrapper.className = "near-event-card__image-wrapper";
  const img = document.createElement("img");
  img.src = eventData.image || "assets/images/placeholder.png"; // Додамо плейсхолдер
  img.alt = eventData.title || "Event image";
  imageWrapper.appendChild(img);
  card.appendChild(imageWrapper);

  // Правий блок: Вертикальний флекс з 5 полями
  const content = document.createElement("div");
  content.className = "near-event-card__content";

  // 1. Дата
  const dateElement = document.createElement("div");
  dateElement.className = "near-event-card__date";
  dateElement.textContent = formatMockEventDate(eventData.date);
  content.appendChild(dateElement);

  // 2. Заголовок
  const titleElement = document.createElement("div");
  titleElement.className = "near-event-card__title";
  titleElement.textContent = eventData.title || "N/A";
  content.appendChild(titleElement);

  // 3. Категорія та дистанція
  const categoryDistanceElement = document.createElement("div");
  categoryDistanceElement.className = "near-event-card__category-distance-info"; // Новий або загальний клас для стилізації
  let categoryText = eventData.category || "N/A";
  if (eventData.distance) {
    categoryText += ` (${eventData.distance}km)`;
  }
  categoryDistanceElement.textContent = categoryText;
  content.appendChild(categoryDistanceElement);

  // 4. Тип події (якщо онлайн)
  if (eventData.type === "online") {
    const typeElement = document.createElement("div");
    typeElement.className = "near-event-card__type-online"; // Новий клас для стилізації

    const icon = document.createElement("img");
    icon.src = "assets/icons/camera.svg"; // Переконайтесь, що шлях до іконки правильний
    icon.alt = "Online event";
    // Стилі для іконки можна задати тут або в CSS
    icon.style.width = "11px";
    icon.style.height = "11px";
    icon.style.marginRight = "4px";

    const typeText = document.createElement("span");
    typeText.textContent = "Online Event";

    typeElement.appendChild(icon);
    typeElement.appendChild(typeText);
    content.appendChild(typeElement);
  }

  // 5. Кількість учасників
  const attendeesElement = document.createElement("div");
  attendeesElement.className = "near-event-card__attendees";
  attendeesElement.textContent = eventData.attendees
    ? `${eventData.attendees} attendees` // Якщо є дані, виводимо "NN attendees"
    : ""; // Якщо даних немає, виводимо порожній рядок
  content.appendChild(attendeesElement);

  card.appendChild(content);
  return card;
}

// Допоміжна функція для адаптації даних з data.js (eventsStore) до формату createEventCard
function adaptDataJsItemToCreateEventCardFormat(item) {
  return {
    imageUrl: item.image,
    title: item.title,
    category: item.categoryName,
    distance: item.categoryDistance,
    dateTime: item.date, // data.js вже має форматовану дату-рядок
    participants: item.participantsItem,
    price: item.price || "Free",
  };
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

// Функція для заповнення контейнерів подій на основі ширини екрана
function populateEventContainers() {
  const screenWidth = window.innerWidth;

  // --- Заповнення event-cards-container-near ---
  if (cardsContainerNear) {
    cardsContainerNear.innerHTML = ""; // Очищаємо
    if (screenWidth <= 393 && typeof mockEventsStore !== "undefined") {
      // Випадок <= 393px: маленькі картки з mockEventsStore
      const dataForNear = mockEventsStore.slice(0, 3);
      dataForNear.forEach((mockItem) => {
        const cardElement = createNearEventCard(mockItem); // createNearEventCard очікує структуру mockEventsStore
        cardsContainerNear.appendChild(cardElement);
      });
    } else if (typeof eventsStore !== "undefined") {
      // Випадок > 393px: великі картки з eventsStore (data.js)
      const dataForNear = eventsStore.slice(0, 8); // Перші 8 карток "по-старому"
      dataForNear.forEach((dataJsItem) => {
        const adaptedItem = adaptDataJsItemToCreateEventCardFormat(dataJsItem);
        const cardElement = createEventCard(adaptedItem);
        cardsContainerNear.appendChild(cardElement);
      });
    }
    adjustLastRowLayout(cardsContainerNear); // Застосовуємо вирівнювання
  }

  // --- Заповнення event-cards-container-online ---
  if (cardsContainerOnline) {
    cardsContainerOnline.innerHTML = ""; // Очищаємо
    if (screenWidth <= 393 && typeof mockEventsStore !== "undefined") {
      // Випадок <= 393px: 3 маленькі онлайн-картки з mockEventsStore
      const onlineEvents = mockEventsStore
        .filter((event) => event.type === "online")
        .slice(0, 3);
      onlineEvents.forEach((mockItem) => {
        const cardElement = createNearEventCard(mockItem);
        cardsContainerOnline.appendChild(cardElement);
      });
    } else if (typeof eventsStore !== "undefined") {
      // Випадок > 393px: 4 великі картки з eventsStore (data.js) "по-старому"
      const dataForOnline = eventsStore.slice(8, 12);
      dataForOnline.forEach((dataJsItem) => {
        const adaptedItem = adaptDataJsItemToCreateEventCardFormat(dataJsItem);
        const eventCardElement = createEventCard(adaptedItem);
        cardsContainerOnline.appendChild(eventCardElement);
      });
    }
    adjustLastRowLayout(cardsContainerOnline);
  }
}

// Перевіряємо, чи існує eventsStore (з data.js) або mockEventsStore (з mockdata.js)
if (
  typeof eventsStore !== "undefined" ||
  typeof mockEventsStore !== "undefined"
) {
  // Початкове заповнення контейнерів
  populateEventContainers();

  // Додаємо обробник події для зміни розміру вікна
  window.addEventListener("resize", () => {
    populateEventContainers(); // Перезаповнюємо контейнери подій
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
    "Масиви eventsStore та/або mockEventsStore не знайдено! Переконайтеся, що файли data.js та mockdata.js завантажено перед index.js."
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
