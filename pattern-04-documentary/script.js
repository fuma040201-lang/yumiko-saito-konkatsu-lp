(() => {
  const form = document.getElementById("consultForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = ["齋藤弓子様", "", "無料経営相談を希望します。", "", ...Array.from(data.entries(), ([key, value]) => `${key}：${String(value).trim() || "（未入力）"}`), "", "どうぞよろしくお願いいたします。"];
    location.href = `mailto:t3.5ty6@gmail.com?subject=${encodeURIComponent("【無料経営相談】お申し込み")}&body=${encodeURIComponent(lines.join("\n"))}`;
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
