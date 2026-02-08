const clientForm = document.getElementById("clientOrderForm");
const clientOrdersList = document.getElementById("clientOrdersList");
const clientMastersList = document.getElementById("clientMastersList");
const clientOrderHint = document.getElementById("clientOrderHint");

const renderClientOrders = () => {
  const orders = storage.get("clientOrders");

  if (!orders.length) {
    clientOrdersList.innerHTML = `
      <div class="card empty">
        <h3>Пока нет заказов</h3>
        <p>Создайте первую заявку, чтобы мастера увидели ваш запрос.</p>
      </div>
    `;
    return;
  }

  clientOrdersList.innerHTML = orders
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
          <button class="primary" type="button">Заказ опубликован</button>
        </article>
      `
    )
    .join("");
};

const renderMasters = () => {
  const masters = storage.get("masterProfiles");

  if (!masters.length) {
    clientMastersList.innerHTML = `
      <div class="card empty">
        <h3>Пока нет мастеров</h3>
        <p>После регистрации мастеров вы сможете связаться с ними здесь.</p>
      </div>
    `;
    return;
  }

  clientMastersList.innerHTML = masters
    .map(
      (master) => `
        <article class="card">
          <div class="meta">
            <span>${master.city}</span>
            <span>${categoryLabels[master.category] ?? "Мастер"}</span>
          </div>
          <h3>${master.name}</h3>
          <p>${master.about || "Готов(а) принять новые заказы."}</p>
          <div class="tag">${master.contact}</div>
          <button class="primary" type="button">Связаться</button>
        </article>
      `
    )
    .join("");
};

clientForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const newOrder = {
    id: Date.now(),
    category: document.getElementById("orderCategory").value,
    title: document.getElementById("orderTitle").value.trim(),
    city: document.getElementById("orderCity").value.trim(),
    budget: Number(document.getElementById("orderBudget").value),
    contact: document.getElementById("orderContact").value.trim(),
  };

  const orders = storage.get("clientOrders");
  orders.unshift(newOrder);
  storage.set("clientOrders", orders);
  clientForm.reset();
  clientOrderHint.textContent = "Заказ опубликован — мастера уже видят вашу заявку!";
  renderClientOrders();
});

renderClientOrders();
renderMasters();
