document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement; // This refers to the <html> tag
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  // Function to set the theme
  const setTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "inline-block";
    } else {
      sunIcon.style.display = "inline-block";
      moonIcon.style.display = "none";
    }
  };

  // Check for saved theme preference on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // If no saved theme, check system preference
    setTheme("dark");
  } else {
    setTheme("light"); // Default to light theme
  }

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  });

  // Generate stars for skill gauges
  const skillGauges = document.querySelectorAll(".skill-gauge");
  skillGauges.forEach((gauge) => {
    const rating = parseInt(gauge.dataset.rating, 10);
    let stars = "";
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars += '<span class="star filled">★</span>';
      } else {
        stars += '<span class="star">☆</span>';
      }
    }
    gauge.innerHTML = stars;
  });

  // Dynamically generate nav links
  const navUl = document.querySelector("nav ul");
  const sections = document.querySelectorAll("section[id]");
  const iconMap = {
    "employment-history": "fa-solid fa-briefcase",
    "additional-skills": "fa-solid fa-tools",
    education: "fa-solid fa-graduation-cap",
    publications: "fa-solid fa-book",
  };

  // Add Home link
  const homeLi = document.createElement("li");
  const homeLinkElement = document.createElement("a");
  homeLinkElement.href = "#top";
  homeLinkElement.innerHTML = '<i class="fas fa-home"></i> Home';
  homeLi.appendChild(homeLinkElement);
  navUl.appendChild(homeLi);

  // Add links for each section
  sections.forEach((section) => {
    const sectionId = section.getAttribute("id");
    const sectionTitle =
      section.querySelector("h2.section-title")?.textContent ||
      sectionId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    const iconClass = iconMap[sectionId];

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${sectionId}`;
    a.innerHTML = iconClass
      ? `<i class="${iconClass}"></i> ${sectionTitle}`
      : sectionTitle;
    li.appendChild(a);
    navUl.appendChild(li);
  });

  // Highlight active section in nav bar on scroll
  const navLinks = document.querySelectorAll("nav a");
  const homeLink = document.querySelector('nav a[href="#top"]');
  const header = document.querySelector("header");

  // Set scroll-padding-top dynamically based on header height
  const setScrollPadding = () => {
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty(
      "--scroll-padding-top",
      `${headerHeight + 20}px`,
    ); // Add a small buffer
  };

  // Initial set and on resize
  setScrollPadding();
  window.addEventListener("resize", setScrollPadding);

  const scrollSpy = () => {
    const headerHeight = header.offsetHeight;
    const scrollOffset = headerHeight + 25; // Use the same buffer as scroll-padding-top
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - scrollOffset) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    if (currentSectionId) {
      const activeLink = document.querySelector(
        `nav a[href="#${currentSectionId}"]`,
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    } else {
      if (homeLink) {
        homeLink.classList.add("active");
      }
    }
  };

  // Initial call
  scrollSpy();

  window.addEventListener("scroll", scrollSpy);
});
