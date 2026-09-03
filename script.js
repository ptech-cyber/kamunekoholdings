/* =========================================================
   ESTATEPRO
   Production-ready frontend JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   PROPERTY DATA
   ========================================================= */

const properties = {
  1: {
    title: "Modern 4-Bedroom Family Home",
    location: "Kakamega, Kenya",
    price: "KES 18.5M",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    meta: ["4 Beds", "3 Baths", "3,200 sq ft"],
    description:
      "A spacious modern family home designed for comfortable living, with generous indoor spaces and a practical layout. Contact our team for availability, viewing arrangements and full property information.",
  },

  2: {
    title: "Prime Residential Plot",
    location: "Kakamega County",
    price: "KES 6.8M",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",
    meta: ["1/2 Acre", "Road Access", "Residential"],
    description:
      "A strategically positioned residential plot suitable for a private home or long-term investment. Contact our team for location details, documentation information and viewing arrangements.",
  },

  3: {
    title: "Contemporary Commercial Space",
    location: "Kakamega CBD",
    price: "KES 180K / month",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    meta: ["2 Baths", "2,400 sq ft", "Office"],
    description:
      "A modern commercial space suitable for offices, professional services and other business uses. Contact our team for tenancy details, viewing arrangements and availability.",
  },

  4: {
    title: "Elegant 3-Bedroom Villa",
    location: "Milimani",
    price: "KES 12.9M",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    meta: ["3 Beds", "3 Baths", "2,600 sq ft"],
    description:
      "An elegant villa offering comfortable residential living in a desirable neighbourhood. Contact our team to arrange a viewing and receive the latest property information.",
  },

  5: {
    title: "Income-Generating Commercial Property",
    location: "Western Kenya",
    price: "KES 32M",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    meta: ["4 Baths", "8,100 sq ft", "Investment"],
    description:
      "A substantial commercial property with investment potential. Request further information from our team regarding tenancy, income performance, documentation and viewing.",
  },

  6: {
    title: "Executive 3-Bedroom Apartment",
    location: "Kakamega",
    price: "KES 75K / month",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    meta: ["3 Beds", "2 Baths", "1,650 sq ft"],
    description:
      "An executive apartment designed for modern residential living, with well-proportioned rooms and convenient amenities. Contact our team for availability and viewing.",
  },
};

/* =========================================================
   SERVICE DATA
   ========================================================= */

const services = {
  "Property Management":
    "We provide structured property management support designed to help property owners protect their assets, coordinate maintenance and improve the day-to-day management of residential and commercial properties.",

  "Building & Construction":
    "We support building and construction projects through planning, coordination and project execution. Our goal is to help clients move from concept to completed development with clear communication throughout the process.",

  "E-Filings":
    "We assist clients with property-related electronic filing and administrative requirements, helping make documentation processes more organised and easier to navigate.",

  "Land & Property Sales":
    "We connect buyers and sellers with land and property opportunities while supporting the transaction process and helping clients understand the practical steps involved.",

  "Borehole Drilling":
    "We coordinate borehole drilling and water-access projects for residential, agricultural and commercial requirements, helping clients move from assessment through implementation.",

  "Process Serving":
    "We provide professional process-serving support for relevant court and licence-related requirements, with an emphasis on reliable handling and clear communication.",
};

/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const propertyModal = document.getElementById("propertyModal");
const serviceModal = document.getElementById("serviceModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalPrice = document.getElementById("modalPrice");
const modalMeta = document.getElementById("modalMeta");
const modalDescription = document.getElementById("modalDescription");

const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalText = document.getElementById("serviceModalText");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");

/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function closeNavigation() {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#mainNav a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

function updateHeader() {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

window.addEventListener("scroll", updateHeader, {
  passive: true,
});

updateHeader();

/* =========================================================
   BACK TO TOP
   ========================================================= */

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* =========================================================
   PROPERTY FILTERING
   ========================================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const propertyCards = document.querySelectorAll(".property-card");
const noResults = document.getElementById("noResults");

function filterProperties(filter) {
  let visibleCount = 0;

  propertyCards.forEach((card) => {
    const types = card.dataset.type.split(" ");

    const shouldShow = filter === "all" || types.includes(filter);

    if (shouldShow) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  if (visibleCount === 0) {
    noResults.classList.add("visible");
  } else {
    noResults.classList.remove("visible");
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    filterProperties(button.dataset.filter);
  });
});

/* =========================================================
   PROPERTY SEARCH
   ========================================================= */

const searchType = document.getElementById("searchType");
const searchLocation = document.getElementById("searchLocation");
const searchPurpose = document.getElementById("searchPurpose");
const searchPropertiesButton = document.getElementById("searchProperties");

searchPropertiesButton.addEventListener("click", () => {
  const type = searchType.value;
  const location = searchLocation.value.trim().toLowerCase();
  const purpose = searchPurpose.value;

  let visibleCount = 0;

  propertyCards.forEach((card) => {
    const types = card.dataset.type.split(" ");
    const cardLocation = card.dataset.location.toLowerCase();

    let typeMatch = type === "all" || types.includes(type);

    /*
      "buy" maps to sale.
      "rent" maps to rent.
      "invest" shows commercial/land opportunities.
    */
    if (purpose === "buy") {
      typeMatch = typeMatch && types.includes("sale");
    }

    if (purpose === "rent") {
      typeMatch = typeMatch && types.includes("rent");
    }

    if (purpose === "invest") {
      typeMatch =
        typeMatch && (types.includes("commercial") || types.includes("land"));
    }

    const locationMatch = !location || cardLocation.includes(location);

    const show = typeMatch && locationMatch;

    if (show) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  if (visibleCount === 0) {
    noResults.classList.add("visible");
  } else {
    noResults.classList.remove("visible");
  }

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  document
    .querySelector('.filter-btn[data-filter="all"]')
    .classList.add("active");

  document.getElementById("properties").scrollIntoView({
    behavior: "smooth",
  });
});

/* =========================================================
   PROPERTY MODAL
   ========================================================= */

function openPropertyModal(id) {
  const property = properties[id];

  if (!property) return;

  modalImage.src = property.image;
  modalImage.alt = property.title;

  modalTitle.textContent = property.title;
  modalLocation.textContent = property.location;
  modalPrice.textContent = property.price;

  modalMeta.innerHTML = "";

  property.meta.forEach((item) => {
    const span = document.createElement("span");

    span.textContent = item;

    modalMeta.appendChild(span);
  });

  modalDescription.textContent = property.description;

  propertyModal.classList.add("active");
  propertyModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  const closeButton = propertyModal.querySelector(".modal-close");

  closeButton.focus();
}

function closePropertyModal() {
  propertyModal.classList.remove("active");
  propertyModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".view-property").forEach((button) => {
  button.addEventListener("click", () => {
    openPropertyModal(button.dataset.id);
  });
});

/* =========================================================
   SERVICE MODAL
   ========================================================= */

function openServiceModal(serviceName) {
  const description = services[serviceName];

  if (!description) return;

  serviceModalTitle.textContent = serviceName;
  serviceModalText.textContent = description;

  serviceModal.classList.add("active");
  serviceModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  const closeButton = serviceModal.querySelector(".modal-close");

  closeButton.focus();
}

function closeServiceModal() {
  serviceModal.classList.remove("active");
  serviceModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".service-details").forEach((button) => {
  button.addEventListener("click", () => {
    openServiceModal(button.dataset.service);
  });
});

/* =========================================================
   CLOSE MODALS
   ========================================================= */

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closePropertyModal);
});

document.querySelectorAll("[data-close-service]").forEach((element) => {
  element.addEventListener("click", closeServiceModal);
});

/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  closePropertyModal();
  closeServiceModal();

  closeNavigation();
});

/* =========================================================
   CONTACT FORM
   ========================================================= */

/*
  IMPORTANT:
  This is frontend-only.

  The form currently validates locally and displays a success
  message. It does NOT send email or save enquiries.

  Before launch, connect this form to:
  - your backend API
  - Formspree
  - Netlify Forms
  - a CRM
  - or your preferred email/API service
*/

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();

  const phone = document.getElementById("phone").value.trim();

  const service = document.getElementById("service").value;

  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !service || !message) {
    formMessage.textContent = "Please complete all required fields.";

    formMessage.classList.add("visible");

    return;
  }

  formMessage.textContent = "Thank you. Your enquiry has been captured.";

  formMessage.classList.add("visible");

  contactForm.reset();
});

/* =========================================================
   MODAL ENQUIRY BUTTON
   ========================================================= */

const modalEnquire = document.getElementById("modalEnquire");

modalEnquire.addEventListener("click", () => {
  closePropertyModal();

  setTimeout(() => {
    const serviceField = document.getElementById("service");

    if (serviceField) {
      serviceField.focus();
    }
  }, 500);
});

/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("revealed");

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("revealed");
  });
}

/* =========================================================
   CURRENT YEAR
   ========================================================= */

currentYear.textContent = new Date().getFullYear();

/* =========================================================
   IMAGE ERROR FALLBACK
   ========================================================= */

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    /*
      Simple fallback when an external image cannot load.
    */

    image.style.background = "#e9ece8";
    image.removeAttribute("src");

    image.alt = image.alt || "Property image";
  });
});

/* =========================================================
   CLOSE MOBILE NAV WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener("click", (event) => {
  const clickedInsideNav = mainNav.contains(event.target);

  const clickedMenu = menuToggle.contains(event.target);

  if (mainNav.classList.contains("open") && !clickedInsideNav && !clickedMenu) {
    closeNavigation();
  }
});

/* =========================================================
   INITIALISE
   ========================================================= */

filterProperties("all");
