const storage = {
  get(key, fallback = []) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch (error) {
      console.error("Storage read error", error);
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const formatBudget = (budget) => `${Number(budget).toLocaleString("ru-RU")} ₽`;

const categoryLabels = {
  repair: "Ремонт",
  cleaning: "Клининг",
  beauty: "Ногти и бьюти",
  tutoring: "Обучение",
  events: "События",
  custom: "Мастер",
};
