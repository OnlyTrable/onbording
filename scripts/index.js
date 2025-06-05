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
    if (cardsInLastRow === 1) {
      container.style.justifyContent = "space-around";
    }
    // Якщо останній рядок неповний і містить більше однієї картки
    else if (cardsInLastRow > 1 && cardsInLastRow < cardsInSecondLastRow) {
      // Останній рядок неповний і не порожній
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
