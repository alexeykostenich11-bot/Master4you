const baseOrders = [
  {
    id: 1,
    title: "Маникюр + покрытие гель-лак",
    city: "Москва",
    budget: 3500,
    category: "beauty",
    client: "Анна",
    date: "Сегодня",
  },
  {
    id: 2,
    title: "Сборка кухни под ключ",
    city: "Санкт-Петербург",
    budget: 12000,
    category: "repair",
    client: "Игорь",
    date: "Завтра",
  },
  {
    id: 3,
    title: "Репетитор по математике (8 класс)",
    city: "Казань",
    budget: 2500,
    category: "tutoring",
    client: "Наталья",
    date: "Сегодня",
  },
  {
    id: 4,
    title: "Генеральная уборка квартиры 60 м²",
    city: "Москва",
    budget: 5000,
    category: "cleaning",
    client: "Сергей",
    date: "На выходных",
  },
  {
    id: 5,
    title: "Ведущий на свадьбу",
    city: "Екатеринбург",
    budget: 18000,
    category: "events",
    client: "Марина",
    date: "Через неделю",
  },
  {
    id: 6,
    title: "Наращивание ресниц",
    city: "Санкт-Петербург",
    budget: 4200,
    category: "beauty",
    client: "Ольга",
    date: "Сегодня",
  },
];

const searchInput = document.getElementById("searchInput");
const ordersContainer = document.getElementById("orders");
const cityFilter = document.getElementById("cityFilter");
const budgetFilter = document.getElementById("budgetFilter");
const sortFilter = document.getElementById("sortFilter");
const chips = document.querySelectorAll(".chip");
const searchButton = document.getElementById("searchButton");

const state = {
  query: "",
  category: "",
};

const formatBudget = (budget) => `${budget.toLocaleString("ru-RU")} ₽`;

const matchBudget = (budgetValue, filter) => {
  if (!filter) return true;
  if (filter === "7000") return budgetValue >= 7000;
  const [min, max] = filter.split("-").map(Number);
  return budgetValue >= min && budgetValue <= max;
};

const getCombinedOrders = () => {
  const clientOrders = storage.get("clientOrders");
  return [...clientOrders, ...baseOrders];
};

const getFilteredOrders = () => {
  const query = state.query.toLowerCase();
  const city = cityFilter.value;
  const budget = budgetFilter.value;

  return getCombinedOrders()
    .filter((order) => {
      const matchQuery = order.title.toLowerCase().includes(query);
      const matchCity = city ? order.city === city : true;
      const matchCategory = state.category ? order.category === state.category : true;
      const matchBudgetFilter = matchBudget(order.budget, budget);
      return matchQuery && matchCity && matchCategory && matchBudgetFilter;
    })
    .sort((a, b) => {
      if (sortFilter.value === "budget") {
        return b.budget - a.budget;
      }
      return b.id - a.id;
    });
};

const renderOrders = () => {
  const filteredOrders = getFilteredOrders();

  if (!filteredOrders.length) {
    ordersContainer.innerHTML = `
      <div class="card">
        <h3>Подходящих заказов пока нет</h3>
        <p>Попробуйте изменить фильтры или выбрать другую категорию.</p>
      </div>
    `;
    return;
  }

  ordersContainer.innerHTML = filteredOrders
    .map(
      (order) => `
        <article class="card">
          <div class="meta">
            <span>${order.city}</span>
            <span>${order.date}</span>
          </div>
          <h3>${order.title}</h3>
          <div class="tag">${order.client}</div>
          <div class="meta">
            <span>Бюджет</span>
            <strong>${formatBudget(order.budget)}</strong>
          </div>
          <button class="primary">Откликнуться</button>
        </article>
      `
    )
    .join("");
};

const updateQuery = () => {
  state.query = searchInput.value.trim();
  renderOrders();
};

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const newCategory = chip.dataset.category;
    state.category = state.category === newCategory ? "" : newCategory;
    chips.forEach((item) => item.classList.toggle("active", item === chip && state.category));
    renderOrders();
  });
});

searchInput.addEventListener("input", updateQuery);
searchButton.addEventListener("click", updateQuery);
cityFilter.addEventListener("change", renderOrders);
budgetFilter.addEventListener("change", renderOrders);
sortFilter.addEventListener("change", renderOrders);

renderOrders();

const landingForm = document.getElementById("landingRegistrationForm");
const landingHint = document.getElementById("landingRegistrationHint");

landingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const newMaster = {
    id: Date.now(),
    name: document.getElementById("landingName").value.trim(),
    category: "custom",
    city: document.getElementById("landingCity").value.trim(),
    contact: document.getElementById("landingContact").value.trim(),
    about: document.getElementById("landingSpecialty").value.trim(),
  };

  const masters = storage.get("masterProfiles");
  masters.unshift(newMaster);
  storage.set("masterProfiles", masters);
  landingForm.reset();
  if (landingHint) {
    landingHint.textContent = "Профиль создан — вы получите отклики от клиентов.";
  }
});
