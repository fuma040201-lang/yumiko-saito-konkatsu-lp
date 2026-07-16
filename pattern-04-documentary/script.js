(() => {
  const button = document.getElementById("menuButton");
  const nav = document.getElementById("globalNav");

  button?.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    document.body.classList.toggle("menu-open", open);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      button?.setAttribute("aria-expanded", "false");
      button?.setAttribute("aria-label", "メニューを開く");
      document.body.classList.remove("menu-open");
    });
  });

  const form = document.getElementById("applicationForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = ["齋藤弓子様", "", "無料経営相談を希望します。", "", ...Array.from(data.entries(), ([key, value]) => `${key}：${String(value).trim() || "（未入力）"}`)];
    location.href = `mailto:t3.5ty6@gmail.com?subject=${encodeURIComponent("【無料経営相談】お申し込み")}&body=${encodeURIComponent(lines.join("\n"))}`;
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
