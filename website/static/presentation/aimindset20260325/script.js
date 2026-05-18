/* eslint-disable no-undef, unicorn/no-array-for-each, unicorn/prefer-dom-node-append, unicorn/prefer-global-this, unicorn/prefer-query-selector, unicorn/prefer-spread */

(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const indicator = document.getElementById("slide-indicator");
  const metaTag = document.querySelector(".pixel-tag");
  const progressBar = document.getElementById("progress-bar");
  const total = slides.length;
  let current = 0;

  function setupAbsoluteSlideLayout() {
    slides.forEach((slide) => {
      if (slide.querySelector(":scope > .slide-main")) return;

      const main = document.createElement("div");
      main.className = "slide-main";
      const keepOutside = ["peek-pane", "cli-pane"];
      const children = Array.from(slide.children);

      children.forEach((node) => {
        const keep = keepOutside.some((cls) => node.classList.contains(cls));
        if (!keep) main.appendChild(node);
      });

      slide.prepend(main);
    });
  }

  function toTwoDigits(n) {
    return String(n).padStart(2, "0");
  }

  function updateHash(index) {
    history.replaceState(null, "", `#slide-${index + 1}`);
  }

  function render(index) {
    current = Math.max(0, Math.min(total - 1, index));
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
      slide.setAttribute("aria-hidden", i === current ? "false" : "true");
    });

    indicator.textContent = `${toTwoDigits(current + 1)} / ${toTwoDigits(total)}`;
    metaTag.textContent = `WF-${toTwoDigits(current + 1)}`;
    progressBar.style.width = `${((current + 1) / total) * 100}%`;
    document.title = `${slides[current].dataset.title} — Agentplane Deck`;
    updateHash(current);
  }

  function next() {
    render(current + 1);
  }

  function prev() {
    render(current - 1);
  }

  function onKeydown(event) {
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      next();
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      prev();
      return;
    }

    if (event.key === " ") {
      event.preventDefault();
      if (event.shiftKey) {
        prev();
      } else {
        next();
      }
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      render(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      render(total - 1);
    }
  }

  function fromHash() {
    const match = window.location.hash.match(/^#slide-(\d+)$/);
    if (!match) {
      return 0;
    }

    const index = Number(match[1]) - 1;
    return Number.isNaN(index) ? 0 : index;
  }

  window.addEventListener("keydown", onKeydown);
  window.addEventListener("hashchange", () => render(fromHash()));

  setupAbsoluteSlideLayout();
  render(fromHash());
})();
