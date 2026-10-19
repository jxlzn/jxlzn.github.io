(() => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (media.matches) return;

  const projects = document.querySelectorAll(".project");
  if (!("IntersectionObserver" in window) || !projects.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.style.transition = "opacity 0.55s ease, transform 0.55s ease";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.18 }
  );

  projects.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transitionDelay = `${Math.min(i * 0.05, 0.2)}s`;
    observer.observe(el);
  });
})();
