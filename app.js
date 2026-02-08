const masters = [
  {
    id: 1,
    name: "Анна Иванова",
    title: "Маникюр и дизайн ногтей",
    city: "Москва",
    budget: 3200,
    category: "beauty",
    rating: 4.9,
    experience: "6 лет опыта",
  },
  {
    id: 2,
    name: "Игорь Смирнов",
    title: "Сборка мебели и кухни",
    city: "Санкт-Петербург",
    budget: 11000,
    category: "repair",
    rating: 4.8,
    experience: "10 лет опыта",
  },
  {
    id: 3,
    name: "Наталья Кузнецова",
    title: "Репетитор по математике",
    city: "Казань",
    budget: 2200,
    category: "tutoring",
    rating: 5.0,
    experience: "Подготовка к ОГЭ/ЕГЭ",
  },
  {
    id: 4,
    name: "Сергей Волков",
    title: "Генеральная уборка квартир",
    city: "Москва",
    budget: 4800,
    category: "cleaning",
    rating: 4.7,
    experience: "20+ заказов",
  },
  {
    id: 5,
    name: "Марина Лукина",
    title: "Ведущая мероприятий",
    city: "Екатеринбург",
    budget: 18000,
    category: "events",
    rating: 4.9,
    experience: "Свадьбы и корпоративы",
  },
  {
    id: 6,
    name: "Ольга Борисова",
    title: "Наращивание ресниц",
    city: "Санкт-Петербург",
    budget: 4200,
    category: "beauty",
    rating: 4.8,
    experience: "Авторский уход",
  },
];

const searchInput = document.getElementById("searchInput");
const ordersContainer = document.getElementById("orders");
const cityFilter = document.getElementById("cityFilter");
const budgetFilter = document.getElementById("budgetFilter");
const sortFilter = document.getElementById("sortFilter");
const chips = document.querySelectorAll(".chip");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");

const tabClient = document.getElementById("tabClient");
const tabMaster = document.getElementById("tabMaster");
const pageClient = document.getElementById("pageClient");
const pageMaster = document.getElementById("pageMaster");

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

const getFilteredMasters = () => {
  const query = state.query.toLowerCase();
  const city = cityFilter.value;
  const budget = budgetFilter.value;

  return masters
    .filter((master) => {
      const matchQuery =
        master.title.toLowerCase().includes(query) ||
        master.name.toLowerCase().includes(query);
      const matchCity = city ? master.city === city : true;
      const matchCategory = state.category ? master.category === state.category : true;
      const matchBudgetFilter = matchBudget(master.budget, budget);
      return matchQuery && matchCity && matchCategory && matchBudgetFilter;
    })
    .sort((a, b) => {
      if (sortFilter.value === "budget") {
        return a.budget - b.budget;
      }
      if (sortFilter.value === "new") {
        return b.id - a.id;
      }
      return b.rating - a.rating;
    });
};

const renderMasters = () => {
  const filtered = getFilteredMasters();

  if (!filtered.length) {
    ordersContainer.innerHTML = `
      <div class="card">
        <h3>Ничего не найдено</h3>
        <p>Попробуйте изменить запрос или выбрать другую категорию.</p>
      </div>
    `;
    return;
  }

  ordersContainer.innerHTML = filtered
    .map(
      (master) => `
        <article class="card">
          <div class="meta">
            <span>${master.city}</span>
            <span>Рейтинг ${master.rating}</span>
          </div>
          <h3>${master.title}</h3>
          <div class="pill">${master.name}</div>
          <p>${master.experience}</p>
          <div class="meta">
            <span>Стоимость</span>
            <strong>${formatBudget(master.budget)}</strong>
          </div>
          <button class="primary" type="button">Выбрать мастера</button>
        </article>
      `
    )
    .join("");
};

const updateQuery = () => {
  state.query = searchInput.value.trim();
  renderMasters();
};

const clearFilters = () => {
  state.query = "";
  state.category = "";
  searchInput.value = "";
  cityFilter.value = "";
  budgetFilter.value = "";
  sortFilter.value = "rating";
  chips.forEach((chip) => chip.classList.remove("active"));
  renderMasters();
};

const setActivePage = (page) => {
  const isClient = page === "client";
  pageClient.classList.toggle("active", isClient);
  pageMaster.classList.toggle("active", !isClient);
  tabClient.classList.toggle("active", isClient);
  tabMaster.classList.toggle("active", !isClient);
};

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const newCategory = chip.dataset.category;
    state.category = state.category === newCategory ? "" : newCategory;
    chips.forEach((item) => item.classList.toggle("active", item === chip && state.category));
    renderMasters();
  });
});

searchInput.addEventListener("input", updateQuery);
searchButton.addEventListener("click", updateQuery);
clearButton.addEventListener("click", clearFilters);
cityFilter.addEventListener("change", renderMasters);
budgetFilter.addEventListener("change", renderMasters);
sortFilter.addEventListener("change", renderMasters);
tabClient.addEventListener("click", () => setActivePage("client"));
tabMaster.addEventListener("click", () => setActivePage("master"));

setActivePage("client");
renderMasters();
