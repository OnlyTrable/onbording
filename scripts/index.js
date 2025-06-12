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

// Функція для форматування дати з mockdata.js (використовується для маленьких карток)
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

// Функція для рендерингу популярних міст (адаптивна кількість)
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

  const screenWidth = window.innerWidth;
  let citiesToRender = cities;

  // При ширині <= 393px відображаємо тільки перші 4 міста
  if (screenWidth <= 393) {
    citiesToRender = cities.slice(0, 4);
  }

  citiesContainer.innerHTML = ""; // Очищаємо контейнер

  citiesToRender.forEach((city) => {
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

// --- Початок коду для фільтрації на second.html (оновлено для кастомних дропдаунів) ---

// Зберігаємо поточні вибрані значення фільтрів
let currentSecondPageFilters = {
  type: "all",
  category: "all",
  distance: "all", // Додаємо фільтр дистанції
};

// Допоміжна функція для отримання поточних значень фільтрів
function getSecondPageFilters() {
  return currentSecondPageFilters;
}

// Функція для застосування всіх активних фільтрів до списку подій
function applyAllFilters(events, filters) {
  let filteredEvents = [...events];

  // Фільтрація за типом події
  if (filters.type && filters.type !== "all") {
    filteredEvents = filteredEvents.filter(
      (event) => event.type === filters.type
    );
  }

  // Фільтрація за категорією
  if (filters.category && filters.category !== "all") {
    filteredEvents = filteredEvents.filter(
      (event) => event.category === filters.category
    );
  }

  // Фільтрація за дистанцією
  if (filters.distance && filters.distance !== "all") {
    const maxDistance = parseInt(filters.distance, 10);
    if (!isNaN(maxDistance)) {
      filteredEvents = filteredEvents.filter((event) => {
        // Переконуємося, що event.distance існує і є числом
        // Події без вказаної дистанції або з дистанцією 0 будуть включені, якщо maxDistance достатньо велика.
        // Якщо потрібно виключити події без дистанції, додайте перевірку: typeof event.distance === 'number'
        return (
          typeof event.distance === "number" && event.distance <= maxDistance
        );
      });
    }
  }

  return filteredEvents;
}

// Функція для заповнення випадаючого списку категорій для кастомного дропдауна
function populateCustomCategoryFilter() {
  const categoryDropdownMenu = document.querySelector(
    "#eventCategoryFilterContainer .dropdown-menu"
  );
  if (typeof mockEventsStore === "undefined" || !categoryDropdownMenu) return;

  // Очищаємо існуючі опції, крім "All categories", яка вже є в HTML
  // Залишаємо тільки перший елемент (All categories) і видаляємо решту, якщо вони були додані динамічно раніше
  while (categoryDropdownMenu.children.length > 1) {
    const lastElement = categoryDropdownMenu.lastElementChild; // Використовуємо lastElementChild

    if (!lastElement) {
      // Якщо немає більше дочірніх елементів (залишилися тільки текстові вузли після першого елемента)
      // Видаляємо останній дочірній вузол, якщо це текстовий вузол, щоб уникнути нескінченного циклу
      if (
        categoryDropdownMenu.lastChild &&
        categoryDropdownMenu.lastChild.nodeType !== Node.ELEMENT_NODE
      ) {
        categoryDropdownMenu.removeChild(categoryDropdownMenu.lastChild);
        continue; // Повторюємо перевірку умови циклу
      }
      break;
    }

    // Перевіряємо умову з оригінального циклу: lastElement.dataset.value !== "all"
    // Якщо останній елемент - це "all", припиняємо видалення
    if (
      lastElement.tagName === "A" &&
      lastElement.hasAttribute("data-value") &&
      lastElement.dataset.value === "all"
    ) {
      break;
    }

    // Якщо ми тут, значить lastElement не "all", тому видаляємо його.
    categoryDropdownMenu.removeChild(lastElement);
  }

  // Якщо "All categories" немає, додамо її (це для випадку, якщо HTML зміниться)
  if (!categoryDropdownMenu.querySelector('a[data-value="all"]')) {
    const allCategoriesLink = document.createElement("a");
    allCategoriesLink.href = "#";
    allCategoriesLink.dataset.value = "all";
    allCategoriesLink.textContent = "All categories";
    categoryDropdownMenu.insertBefore(
      allCategoriesLink,
      categoryDropdownMenu.firstChild
    );
  }

  const categories = [
    ...new Set(mockEventsStore.map((event) => event.category).filter((c) => c)),
  ].sort();

  // Додаємо унікальні категорії з mockEventsStore, якщо їх ще немає в меню
  categories.forEach((category) => {
    if (!categoryDropdownMenu.querySelector(`a[data-value="${category}"]`)) {
      const link = document.createElement("a");
      link.href = "#";
      link.dataset.value = category;
      link.textContent = category;
      categoryDropdownMenu.appendChild(link);
    }
  });
}

// Функція для рендерингу 6 карток подій на second.html
function renderSecondPageEvents() {
  console.log(
    "renderSecondPageEvents called. Current filters:",
    JSON.stringify(currentSecondPageFilters)
  );
  const eventListContainer = document.querySelector(".event-cards-list");

  // Якщо контейнера немає, значить ми не на second.html або DOM структура інша.
  // Нічого не робимо для цього блоку.
  if (!eventListContainer) {
    return;
  }

  if (
    typeof mockEventsStore === "undefined" ||
    !Array.isArray(mockEventsStore)
  ) {
    console.error(
      "Дані mockEventsStore не знайдено або мають неправильний формат для second.html."
    );
    eventListContainer.innerHTML =
      "<p>Не вдалося завантажити події. Спробуйте пізніше.</p>";
    return;
  }

  const currentFilters = getSecondPageFilters();
  console.log("Applying filters:", JSON.stringify(currentFilters));
  const filteredEvents = applyAllFilters(mockEventsStore, currentFilters);
  console.log("Number of filtered events:", filteredEvents.length);
  const eventsToDisplay = filteredEvents.slice(0, 6); // Показуємо до 6 відфільтрованих подій

  if (eventsToDisplay.length === 0) {
    eventListContainer.innerHTML = ""; // Очищаємо контейнер

    // Стилізуємо eventListContainer для центрування вмісту
    eventListContainer.style.display = "flex";
    eventListContainer.style.justifyContent = "center";
    eventListContainer.style.alignItems = "center";
    eventListContainer.style.minHeight = "300px"; // Задаємо мінімальну висоту для вертикального центрування

    const noEventsMessageContainer = document.createElement("div");
    noEventsMessageContainer.style.display = "flex";
    noEventsMessageContainer.style.flexDirection = "column";
    noEventsMessageContainer.style.alignItems = "center"; // Центруємо елементи всередині цього блоку
    noEventsMessageContainer.style.textAlign = "center"; // Центруємо текст

    const image = document.createElement("img");
    image.src = "assets/images/byuntear-emoji.gif";
    image.alt = "Зображення події";
    image.style.width = "120px"; // Задаємо ширину
    image.style.height = "120px"; // Задаємо висоту рівну ширині для квадрата
    image.style.marginBottom = "15px"; // Відступ знизу від картинки

    const noEventsText = document.createElement("p");
    noEventsText.textContent = "There are no events matching your filters.";

    noEventsMessageContainer.appendChild(image);
    noEventsMessageContainer.appendChild(noEventsText);
    eventListContainer.appendChild(noEventsMessageContainer);
    return;
  }

  // Якщо є події, скидаємо стилі, які могли бути встановлені для повідомлення "немає подій"
  eventListContainer.style.display = "";
  eventListContainer.style.justifyContent = "";
  eventListContainer.style.alignItems = "";
  eventListContainer.style.minHeight = "";
  eventListContainer.style.textAlign = "";

  eventListContainer.innerHTML = ""; // Очищаємо контейнер перед додаванням карток

  eventsToDisplay.forEach((eventData) => {
    const card = document.createElement("div");
    card.classList.add("event-card-item");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("event-card-item__image-container");
    const image = document.createElement("img");
    image.src = eventData.image || "assets/images/byuntear-emoji.gif";
    image.alt = eventData.title || "Зображення події";
    image.classList.add("event-card-item__image");
    imageContainer.appendChild(image);

    // Правий блок: деталі події (вертикальний флекс)
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("event-card-item__details"); // Новий клас для правого блоку

    const dateTimeP = document.createElement("p");
    dateTimeP.classList.add("event-card-item__datetime");
    // Використовуємо eventData.date з mockEventsStore та форматуємо його
    dateTimeP.textContent = formatMockEventDate(eventData.date);

    const titleH4 = document.createElement("h4");
    titleH4.classList.add("event-card-item__title");
    titleH4.textContent = eventData.title;

    // Елемент для категорії та дистанції
    const categoryDistanceP = document.createElement("p");
    categoryDistanceP.classList.add("event-card-item__category-distance");
    let categoryDistanceText = eventData.category || "N/A";
    if (eventData.distance) {
      // Додаємо "km" до дистанції, якщо вона є
      categoryDistanceText += ` (${eventData.distance}km)`;
    }
    categoryDistanceP.textContent = categoryDistanceText;

    const metaDiv = document.createElement("div");
    metaDiv.classList.add("event-card-item__meta");
    metaDiv.innerHTML = ""; // Очищаємо для нового вмісту

    if (eventData.type === "online") {
      const onlineIcon = document.createElement("img");
      onlineIcon.src = "assets/icons/camera.svg"; // Шлях до іконки онлайн-події
      onlineIcon.alt = "Online Event";
      onlineIcon.style.width = "14px"; // Налаштуйте розмір за потреби
      onlineIcon.style.height = "14px";
      onlineIcon.style.marginRight = "4px";
      onlineIcon.style.verticalAlign = "middle";
      metaDiv.appendChild(onlineIcon);

      const onlineText = document.createElement("span");
      onlineText.textContent = "Online Event";
      metaDiv.appendChild(onlineText);
    }

    if (eventData.attendees) {
      if (metaDiv.hasChildNodes()) {
        // Якщо вже є "Online Event", додаємо роздільник
        const separator = document.createElement("span");
        separator.textContent = " · ";
        metaDiv.appendChild(separator);
      }
      const attendeesText = document.createElement("span");
      attendeesText.textContent = `${eventData.attendees} attendees`;
      metaDiv.appendChild(attendeesText);
    }

    detailsDiv.appendChild(dateTimeP);
    detailsDiv.appendChild(titleH4);
    detailsDiv.appendChild(categoryDistanceP); // Додаємо новий елемент
    detailsDiv.appendChild(metaDiv);

    card.appendChild(imageContainer);
    card.appendChild(detailsDiv);

    eventListContainer.appendChild(card);
  });
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
    renderPopularCities(); // Викликаємо рендеринг міст, який тепер адаптивний
    document.querySelector(".categories-popular-cities-container"); // Додаємо для міст
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
  renderPopularCities(); // Викликаємо початковий рендеринг популярних міст
  renderArticles(); // Викликаємо рендеринг статей
  // ... (інші ваші виклики функцій) ...

  // Виклик функції для заповнення карток на second.html
  renderSecondPageEvents();
});

document.addEventListener("DOMContentLoaded", () => {
  // Цей код виконається тільки якщо ми на сторінці second.html (або сторінці з таким селектором)
  console.log("DEBUG: DOMContentLoaded for second.html specific logic - START");
  if (document.querySelector(".second-content-wrapper")) {
    console.log("DEBUG: .second-content-wrapper FOUND.");
    const cityDropdownToggle = document.querySelector(
      ".search-group-dropdown .dropdown-toggle"
    );
    const cityDropdownMenu = document.querySelector(
      ".search-group-dropdown .dropdown-menu"
    );
    const mainHeaderH1 = document.querySelector(".container-left h1");
    const sidebarLocationH2 = document.querySelector(
      ".container-right .sidebar-location-title"
    );
    const mapIframe = document.querySelector(".map-wrapper iframe");
    const cityMapData = {
      "Mountain View, CA":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50731.71574810052!2d-122.11600004868165!3d37.38605169999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb6dfb66fa17f%3A0x4a501367f076adff!2sMountain%20View%2C%20CA%2C%20USA!5e0!3m2!1sen!2suk!4v1716460012345!5m2!1sen!2suk",
      "New York, NY":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799088417!2d-74.25987059906294!3d40.69767006351021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1716479000000!5m2!1sen!2suk",
      "San Francisco, CA":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201887.47130290992!2d-122.57768494908707!3d37.75776270000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076ad1c!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2suk!4v1716479000002!5m2!1sen!2suk",
      "Chicago, IL":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d379000.6248093529!2d-87.9400974990507!3d41.83390370840953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c3cd0f4cbed%3A0xafe0a6ad09c0c000!2sChicago%2C%20IL%2C%20USA!5e0!3m2!1sen!2suk!4v1716540000001!5m2!1sen!2suk",
      "Nashville, TN":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412235.5761135701!2d-87.0240999133911!3d36.186866600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8864ec3213eb903d%3A0x7d3fb9d0a1e9daa0!2sNashville%2C%20TN%2C%20USA!5e0!3m2!1sen!2suk!4v1716540000002!5m2!1sen!2suk",
      "Los Angeles, CA":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.4330028827!2d-118.69192007955933!3d34.020730499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2suk!4v1716540000003!5m2!1sen!2suk",
      "Seattle, WA":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d344200.4320115072!2d-122.6279903240903!3d47.6131746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C%20WA%2C%20USA!5e0!3m2!1sen!2suk!4v1716540000004!5m2!1sen!2suk",
      "Boston, MA":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d377400.16090990137!2d-71.3824373529007!3d42.31350000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3652d0d3d311b%3A0x787c120037cc1137!2sBoston%2C%20MA%2C%20USA!5e0!3m2!1sen!2suk!4v1716540000005!5m2!1sen!2suk",
      "Miami, FL":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d459800.2809734717!2d-80.51019230707746!3d25.7825453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL%2C%20USA!5e0!3m2!1sen!2suk!4v1716540000006!5m2!1sen!2suk",
      "London, UK":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317715.7119019099!2d-0.3817848008039717!3d51.52873519999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2suk!4v1716479000001!5m2!1sen!2suk",
      "Paris, FR":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d335887.1471411658!2d2.079999955129267!3d48.8589506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2suk!4v1716479000003!5m2!1sen!2suk",
    };

    if (
      cityDropdownMenu &&
      cityDropdownToggle &&
      mainHeaderH1 &&
      sidebarLocationH2 &&
      mapIframe
    ) {
      console.log("DEBUG: All city selection elements FOUND.");
      cityDropdownMenu.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
          event.preventDefault(); // Запобігаємо переходу за посиланням

          const selectedCity = event.target.textContent.trim();

          // Оновлюємо текст кнопки випадаючого списку
          cityDropdownToggle.textContent = selectedCity;

          // Оновлюємо H1
          mainHeaderH1.textContent = `Events near ${selectedCity}`;

          // Оновлюємо H2 в сайдбарі
          sidebarLocationH2.textContent = selectedCity;

          // Оновлюємо iframe з картою
          if (cityMapData[selectedCity]) {
            mapIframe.src = cityMapData[selectedCity];
            mapIframe.title = `Карта ${selectedCity}`; // Оновлюємо title для доступності
          } else {
            console.warn(`Map URL for ${selectedCity} not found.`);
            // Можна встановити якусь карту за замовчуванням або приховати iframe
            // mapIframe.src = ""; // Наприклад, очистити src
          }
        }
      });

      // Ініціалізація кастомних фільтрів для second.html
      populateCustomCategoryFilter(); // Заповнюємо/оновлюємо фільтр категорій
      console.log("DEBUG: populateCustomCategoryFilter CALLED.");

      const filterContainers = document.querySelectorAll(
        ".second-content-wrapper .filter-dropdown"
      );
      console.log(
        `DEBUG: Found ${filterContainers.length} filter-dropdown elements.`
      );

      if (filterContainers.length > 0) {
        filterContainers.forEach((container) => {
          console.log(`DEBUG: Processing container: ${container.id}`);
          const button = container.querySelector(".dropdown-toggle");
          const menu = container.querySelector(".dropdown-menu");

          if (button && menu) {
            console.log(
              `DEBUG: Attaching click listener to menu for filter container: ${container.id}`
            );
            menu.addEventListener("click", (event) => {
              console.log(
                `DEBUG: Click event on menu for ${container.id}. Target:`,
                event.target
              );
              if (
                event.target.tagName === "A" &&
                event.target.hasAttribute("data-value")
              ) {
                event.preventDefault();
                console.log(
                  `DEBUG: Valid filter link clicked in ${container.id}.`
                );
                const selectedValue = event.target.dataset.value;
                const selectedText = event.target.textContent;

                console.log(
                  `Filter clicked: ID=${container.id}, Value=${selectedValue}, Text=${selectedText}`
                );

                // Оновлюємо текст кнопки, зберігаючи іконку
                const icon = button.querySelector(".filter-icon");
                button.textContent = selectedText + " "; // Додаємо пробіл перед іконкою
                if (icon) {
                  button.appendChild(icon.cloneNode(true)); // Клонуємо іконку, щоб не втратити її
                }

                // Оновлюємо глобальний об'єкт фільтрів
                if (container.id === "eventTypeFilterContainer") {
                  currentSecondPageFilters.type = selectedValue;
                } else if (container.id === "eventCategoryFilterContainer") {
                  currentSecondPageFilters.category = selectedValue;
                } else if (container.id === "eventDistanceFilterContainer") {
                  currentSecondPageFilters.distance = selectedValue;
                }
                // Додайте тут логіку для інших фільтрів, наприклад, дистанції
                console.log(
                  "Updated currentSecondPageFilters:",
                  JSON.stringify(currentSecondPageFilters)
                );
                renderSecondPageEvents(); // Перерендеримо картки
              } else {
                console.log(
                  `DEBUG: Click in menu for ${
                    container.id
                  } was not on a valid <a> tag with data-value. Target tagName: ${
                    event.target.tagName
                  }, Has data-value: ${event.target.hasAttribute("data-value")}`
                );
              }
            });
          } else {
            console.warn(
              `DEBUG: Button or menu NOT FOUND for filter container: ${
                container.id
              }. Button: ${!!button}, Menu: ${!!menu}`
            );
          }
        });
      } else {
        console.warn(
          "DEBUG: No .filter-dropdown elements found to attach listeners."
        );
      }
    } else {
      console.error(
        "DEBUG: One or more elements for city selection functionality NOT FOUND. Filter setup SKIPPED."
      );
      if (!cityDropdownMenu)
        console.error("DEBUG: cityDropdownMenu is MISSING");
      if (!cityDropdownToggle)
        console.error("DEBUG: cityDropdownToggle is MISSING");
      if (!mainHeaderH1) console.error("DEBUG: mainHeaderH1 is MISSING");
      if (!sidebarLocationH2)
        console.error("DEBUG: sidebarLocationH2 is MISSING");
      if (!mapIframe) console.error("DEBUG: mapIframe is MISSING");
    }
  } else {
    console.warn(
      "DEBUG: .second-content-wrapper NOT FOUND. Skipping second.html specific logic."
    );
  }
  console.log("DEBUG: DOMContentLoaded for second.html specific logic - END");
});

// --- Кінець коду для фільтрації на second.html ---
