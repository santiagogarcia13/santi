(function () {
  "use strict";

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".site-header nav a")
  );
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  var form = document.querySelector(".contact-form");

  if (form && !form.getAttribute("action")) {
    form.addEventListener("submit", function () {
      var button = form.querySelector("button");
      if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
      }
    });
  }

  var flash = document.querySelector(".flash");

  if (flash) {
    flash.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
})();
