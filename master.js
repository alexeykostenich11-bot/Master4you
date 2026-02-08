const masterForm = document.getElementById("masterRegistrationForm");
const masterOrdersList = document.getElementById("masterOrdersList");
const masterProfileList = document.getElementById("masterProfileList");
const masterRegistrationHint = document.getElementById("masterRegistrationHint");

const renderMasterOrders = () => {
  const orders = storage.get("clientOrders");

  if (!orders.length) {
    masterOrdersList.innerHTML = `
      <div class="card empty">
        <h3>Пока нет заказов</h3>
        <p>Как только клиенты создадут заявки, они появятся здесь.</p>
      </div>
    `;
    return;
  }

  masterOrdersList.innerHTML = orders
    .map(
      (order) => `
        <article class="card">
          <div class="meta">
            <span>${order.city}</span>
            <span>${categoryLabels[order.category] ?? "Заказ"}</span>
          </div>
          <h3>${order.title}</h3>
          <div class="tag">${order.contact}</div>
          <div class="meta">
            <span>Бюджет</span>
            <strong>${formatBudget(order.budget)}</strong>
          </div>
          <button class="primary" type="button">Откликнуться</button>
        </article>
      `
    )
    .join("");
};

const renderMasterProfile = () => {
  const masters = storage.get("masterProfiles");

  if (!masters.length) {
    masterProfileList.innerHTML = `
      <div class="card empty">
        <h3>Профиль не создан</h3>
        <p>Заполните форму регистрации, чтобы ваш профиль появился в списке.</p>
      </div>
    `;
    return;
  }

  masterProfileList.innerHTML = masters
    .map(
      (master) => `
        <article class="card">
          <div class="meta">
            <span>${master.city}</span>
            <span>${categoryLabels[master.category] ?? "Мастер"}</span>
          </div>
          <h3>${master.name}</h3>
          <p>${master.about || "Опытный мастер, готов к новым заказам."}</p>
          <div class="tag">${master.contact}</div>
        </article>
      `
    )
    .join("");
};

masterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const newMaster = {
    id: Date.now(),
    name: document.getElementById("masterName").value.trim(),
    category: document.getElementById("masterCategory").value,
    city: document.getElementById("masterCity").value.trim(),
    contact: document.getElementById("masterContact").value.trim(),
    about: document.getElementById("masterAbout").value.trim(),
  };

  const masters = storage.get("masterProfiles");
  masters.unshift(newMaster);
  storage.set("masterProfiles", masters);
  masterForm.reset();
  masterRegistrationHint.textContent = "Профиль создан — клиенты уже могут с вами связаться!";
  renderMasterProfile();
});

renderMasterOrders();
renderMasterProfile();
