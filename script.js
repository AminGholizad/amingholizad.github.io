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
  const ratingMap = {
    1: "Novice",
    2: "Competent",
    3: "Proficient",
    4: "Advanced",
    5: "Expert",
  };

  skillGauges.forEach((gauge) => {
    const rating = parseInt(gauge.dataset.rating, 10);
    gauge.title = ratingMap[rating] || ""; // Set the tooltip text
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
    summary: "fa-solid fa-user", // Added icon for summary
  };



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

  const navLinks = document.querySelectorAll("nav a");



  const scrollSpy = () => {
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 50) {
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
    }
  };

  scrollSpy();
  window.addEventListener("scroll", scrollSpy);
});
