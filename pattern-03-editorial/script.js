(() => {
  const progress = document.getElementById("readingProgress");
  const mobileCta = document.getElementById("mobileCta");
  const application = document.getElementById("apply");

  const updateScrollState = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    progress.style.width = `${ratio * 100}%`;

    if (mobileCta && application) {
      const formTop = application.getBoundingClientRect().top + window.scrollY;
      const shouldShow = window.scrollY > 500 && window.scrollY < formTop - window.innerHeight * 0.45;
      mobileCta.classList.toggle("is-visible", shouldShow);
    }
  };

  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);
  updateScrollState();

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const form = document.getElementById("applicationForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const lines = [
      "齋藤弓子様",
      "",
      "無料経営相談を希望します。",
      "",
      ...Array.from(data.entries(), ([key, value]) => `${key}：${String(value).trim() || "（未入力）"}`),
      "",
      "どうぞよろしくお願いいたします。"
    ];
    const subject = encodeURIComponent("【無料経営相談】お申し込み");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:t3.5ty6@gmail.com?subject=${subject}&body=${body}`;
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
