// Mobile menu toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });
}

// Highlight active link based on current file name
const current = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(a => {
  const href = a.getAttribute("href");
  if (href === current) a.classList.add("active");
});
// Typing effect (Home)
const typingEl = document.getElementById("typing");
if (typingEl) {
  const roles = ["AI Engineer", "Data Analyst", "Computer Engineer"];

  let r = 0, i = 0, deleting = false;

  function tick(){
    const text = roles[r];
    typingEl.textContent = text.slice(0, i);

    if (!deleting && i < text.length) i++;
    else if (deleting && i > 0) i--;
    else {
      if (!deleting) { deleting = true; setTimeout(tick, 900); return; }
      deleting = false; r = (r + 1) % roles.length;
    }
    setTimeout(tick, deleting ? 45 : 70);
  }
  tick();
}

// Counters animation (Home)
const counters = document.querySelectorAll(".stat-num");
if (counters.length) {
  const runCounter = (el) => {
    const target = Number(el.dataset.target || "0");
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(timer); }
      else el.textContent = current;
    }, 25);
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        runCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
}
const btn = document.getElementById("themeToggle");
const icon = btn.querySelector("i");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const icon = btn.querySelector("i");

  // charger le theme sauvegardé
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
    if (icon) icon.className = "fa-solid fa-sun";
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    if (icon) icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  });
});
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("themeToggle");
  const icon = btn.querySelector("i");

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
      icon.className = "fa-solid fa-sun";
    } else {
      icon.className = "fa-solid fa-moon";
    }
  });

});
// Smooth scroll for section buttons
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Simple slider (Diplomas + Certificates)
function makeSlider(imgId, folder, filesCount){
  const img = document.getElementById(imgId);
  if(!img) return;

  let index = 1;

  const parent = img.closest(".media-slider");
  const prev = parent.querySelector(".prev");
  const next = parent.querySelector(".next");

  const update = () => {
    img.src = `${folder}/${imgId === "diplomaImg" ? "diploma" : "cert"}${index}.jpg`;
  };

  prev.addEventListener("click", () => {
    index = (index - 1 < 1) ? filesCount : index - 1;
    update();
  });

  next.addEventListener("click", () => {
    index = (index + 1 > filesCount) ? 1 : index + 1;
    update();
  });
}

// IMPORTANT: change 3 to your real number of images
makeSlider("diplomaImg", "assets/diplomas", 3);
makeSlider("certImg", "assets/certificates", 3);
// highlight active section button
const tabs = document.querySelectorAll(".tab-btn");

window.addEventListener("scroll", () => {
  let current = "";

  document.querySelectorAll("section[id]").forEach(sec => {
    const top = sec.offsetTop - 120;
    if (scrollY >= top) current = sec.getAttribute("id");
  });

  tabs.forEach(btn => {
    btn.classList.remove("active");
    if(btn.getAttribute("href") === "#" + current){
      btn.classList.add("active");
    }
  });
});
// ===== Slider Diplomas + Certificates =====
const diplomaImages = [
  "assets/diplomas/diploma1.jpg",
  "assets/diplomas/diploma2.jpg",
  "assets/diplomas/diploma3.jpg"
];

const certImages = [
  "assets/certificates/cert1.jpg",
  "assets/certificates/cert2.jpg",
  "assets/certificates/cert3.jpg"
];

let diplomaIndex = 0;
let certIndex = 0;

function updateSlider(type) {
  if (type === "diploma") {
    const img = document.getElementById("diplomaImg");
    if (img) img.src = diplomaImages[diplomaIndex];
  }
  if (type === "cert") {
    const img = document.getElementById("certImg");
    if (img) img.src = certImages[certIndex];
  }
}

document.querySelectorAll(".slide-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.target;          // "diploma" ou "cert"
    const isNext = btn.classList.contains("next");

    if (type === "diploma") {
      diplomaIndex = isNext
        ? (diplomaIndex + 1) % diplomaImages.length
        : (diplomaIndex - 1 + diplomaImages.length) % diplomaImages.length;
      updateSlider("diploma");
    }

    if (type === "cert") {
      certIndex = isNext
        ? (certIndex + 1) % certImages.length
        : (certIndex - 1 + certImages.length) % certImages.length;
      updateSlider("cert");
    }
  });
});

// initialisation
updateSlider("diploma");
updateSlider("cert");
const sliders = {
  diploma: {
    imgId: "diplomaImg",
    index: 0,
    items: [
      "assets/diplomas/diploma1.jpg",
      "assets/diplomas/diploma2.jpg"
    ]
  },
  cert: {
    imgId: "certImg",
    index: 0,
    items: [
      "assets/certificates/cert1.jpg",
      "assets/certificates/cert2.jpg"
    ]
  }
};

function showSlide(type){
  const s = sliders[type];
  const img = document.getElementById(s.imgId);
  if(!img) return;
  img.src = s.items[s.index];
}

document.querySelectorAll(".slide-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.target; // "cert" ou "diploma"
    const s = sliders[type];
    if(!s || s.items.length === 0) return;

    if(btn.classList.contains("next")){
      s.index = (s.index + 1) % s.items.length;
    }else{
      s.index = (s.index - 1 + s.items.length) % s.items.length;
    }
    showSlide(type);
  });
});

// initialiser
showSlide("diploma");
showSlide("cert");
