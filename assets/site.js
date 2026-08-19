function $(selector) {
  return document.querySelector(selector);
}

function setText(selector, value) {
  const el = $(selector);
  if (el && value) el.textContent = value;
}

function setHref(selector, value) {
  const el = $(selector);
  if (el && value) el.setAttribute("href", value);
}

document.addEventListener("DOMContentLoaded", () => {
  const data = window.SITE_DATA;
  if (!data) return;

  document.querySelectorAll("[data-site-name]").forEach(el => el.textContent = data.name);
  setText("[data-role]", data.role);
  setText("[data-institution]", data.institution);
  setText("[data-intro]", data.intro);
  setHref("[data-email]", `mailto:${data.email}`);
  setHref("[data-cv]", data.links.cv);
  setHref("[data-hal]", data.links.hal);
  setHref("[data-arxiv]", data.links.arxiv);
  setHref("[data-github]", data.links.github);

  const interests = $("[data-interests]");
  if (interests && Array.isArray(data.interests)) {
    interests.innerHTML = data.interests
      .map(item => `<span class="tag">${item}</span>`)
      .join("");
  }

  const news = $("[data-news]");
  if (news && Array.isArray(data.news)) {
    news.innerHTML = data.news
      .map(item => `
        <div class="news-item">
          <div class="news-year">${item.year}</div>
          <div>${item.text}</div>
        </div>
      `)
      .join("");
  }

  document.querySelectorAll("[data-year]").forEach(
    el => el.textContent = new Date().getFullYear()
  );

  const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

function updateThemeIcon() {
  if (!themeToggle) return;

  themeToggle.textContent =
    document.body.classList.contains("dark-mode")
      ? "☀︎"
      : "☾";
}

updateThemeIcon();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark =
      document.body.classList.contains("dark-mode");

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );

    updateThemeIcon();

  });
}
});
