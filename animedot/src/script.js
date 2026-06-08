document.addEventListener("DOMContentLoaded", () => {
  const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);

  if (isBot) {
    const securityScreen = document.getElementById("security-screen");
    const mainContent = document.getElementById("main-content");
    if (securityScreen) securityScreen.style.display = "none";
    if (mainContent) mainContent.style.display = "flex";
  }

  const savedTheme = localStorage.getItem("animeDotTheme");
  if (savedTheme) {
    document.body.className = savedTheme;
    const icon = document.querySelector("#theme-toggle i");
    if(icon) icon.className = savedTheme === "dark-theme" ? "fas fa-moon" : "fas fa-sun";
  }

  const savedName = localStorage.getItem("hokageNinjaName");
  const savedMsg = localStorage.getItem("hokageNinjaMessage");
  if (savedName || savedMsg) {
    document.getElementById("ninja-name").value = savedName || "";
    document.getElementById("ninja-message").value = savedMsg || "";
    document.getElementById("saved-msg-status").innerHTML =
      "<span style='color:#00d2ff;'>📜 Scroll data restored.</span>";
  }

  generateStickers();
  setTimeout(checkLoginStatus, 100); 
});

function checkSecurity() {
  const pin = document.getElementById("pin-input").value;
  const errorMsg = document.getElementById("security-error");

  if (pin === "1234") {
    document.getElementById("security-screen").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("security-screen").style.display = "none";
      document.getElementById("main-content").style.display = "flex";
    }, 400);
  } else {
    errorMsg.innerText = "Access Denied! Intruders detected.";
    errorMsg.style.color = "#ff3333";
  }
}

function toggleMenu() {
  const wrapper = document.querySelector(".circle-menu-wrapper");
  wrapper.classList.toggle("active");
  if (!wrapper.classList.contains("active")) {
    wrapper.classList.remove("sub-active");
  }
}

function toggleSubMenu() {
  const wrapper = document.querySelector(".circle-menu-wrapper");
  wrapper.classList.toggle("sub-active");
}

function openPage(pageId) {
  document.getElementById("circle-menu-container").style.display = "none";
  document.getElementById("global-rasengan").style.display = "none";

  const page = document.getElementById(pageId);
  page.classList.remove("id-hide");
  page.classList.add("id-show");
}

function closePage(pageId) {
  const page = document.getElementById(pageId);
  page.classList.remove("id-show");
  page.classList.add("id-hide");

  setTimeout(() => {
    document.getElementById("circle-menu-container").style.display = "flex";
    document.getElementById("global-rasengan").style.display = "block";
    const wrapper = document.querySelector(".circle-menu-wrapper");
    wrapper.classList.remove("active");
    wrapper.classList.remove("sub-active");
  }, 400);
}

function showSection(sectionName) {
  document
    .querySelectorAll(".anime-card")
    .forEach((card) => card.classList.add("hide"));
  const targetSection = document.getElementById(`${sectionName}-section`);
  if (targetSection) targetSection.classList.remove("hide");

  if (sectionName === "signup") {
    const mouth = document.getElementById("sakura-mouth-element");
    const avatar = document.getElementById("sakura-avatar");
    if (localStorage.getItem("ninjaUserLoggedIn") !== "true") {
      mouth.classList.remove("joy");
      avatar.classList.remove("sakura-jump");
    }
  }
}

function closeSection(id) {
  document.getElementById(id).classList.add("hide");
}

function toggleTheme() {
  const body = document.body;
  const icon = document.querySelector("#theme-toggle i");

  if (body.classList.contains("dark-theme")) {
    body.classList.replace("dark-theme", "light-theme");
    icon.className = "fas fa-sun";
    localStorage.setItem("animeDotTheme", "light-theme");
  } else {
    body.classList.replace("light-theme", "dark-theme");
    icon.className = "fas fa-moon";
    localStorage.setItem("animeDotTheme", "dark-theme");
  }
}

function saveHokageMessage() {
  const nameInput = document.getElementById("ninja-name");
  const messageInput = document.getElementById("ninja-message");
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    alert("⚠️ Please enter your Ninja Name and Message first!");
    return;
  }

  localStorage.setItem("hokageNinjaName", name);
  localStorage.setItem("hokageNinjaMessage", message);
  
  document.getElementById("saved-msg-status").innerHTML =
    `<span style='color:#00ffcc; font-weight: bold;'>✉️ Hokage: "Thank you, ${name}! Your scroll has been received."</span>`;

  nameInput.value = "";
  messageInput.value = "";
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function triggerSakuraJoy() {
  const signupSection = document.getElementById("signup-section");
  const inputs = signupSection.querySelectorAll("input");
  
  const username = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const password = inputs[2].value.trim();
  
  const mouth = document.getElementById("sakura-mouth-element");
  const avatar = document.getElementById("sakura-avatar");

  if (!username || !email || !password) {
    alert("⚠️ Please fill out all fields!");
    return;
  }

  if (!validateEmail(email)) {
    alert("❌ Invalid email format! Please use a valid email (e.g., name@gmail.com).");
    inputs[1].focus();
    return;
  }

  if (password.length < 6) {
    alert("❌ Password is too short! It must be at least 6 characters.");
    inputs[2].focus();
    return;
  }

  mouth.classList.add("joy");
  avatar.classList.add("sakura-jump");

  localStorage.setItem("ninjaUserLoggedIn", "true");
  localStorage.setItem("ninjaUsername", username);
  localStorage.setItem("ninjaEmail", email);

  alert(`🎉 Welcome ${username}! Registration successful. Your session is secured.`);
  setTimeout(() => { location.reload(); }, 1500);
}

function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("ninjaUserLoggedIn");
  const username = localStorage.getItem("ninjaUsername");
  
  if (isLoggedIn === "true" && username) {
    const signupSection = document.getElementById("signup-section");
    if (signupSection) {
      signupSection.querySelector("h3").innerText = `Welcome back, ${username}! ✨`;
      
      const inputs = signupSection.querySelectorAll("input");
      inputs.forEach(input => input.style.display = "none");
      
      const registerBtn = signupSection.querySelector(".submit-btn");
      registerBtn.innerText = "Logout";
      registerBtn.setAttribute("onclick", "logoutNinja()");

      const mouth = document.getElementById("sakura-mouth-element");
      const avatar = document.getElementById("sakura-avatar");
      if (mouth && avatar) {
        mouth.classList.add("joy");
        avatar.classList.add("sakura-jump");
      }
    }
  }
}

function logoutNinja() {
  localStorage.removeItem("ninjaUserLoggedIn");
  localStorage.removeItem("ninjaUsername");
  localStorage.removeItem("ninjaEmail");
  alert("🥷 Logged out successfully! Reloading scroll...");
  location.reload();
}

async function searchAnime() {
  const query = document.getElementById("search-input").value.trim();
  const resultDiv = document.getElementById("search-result");

  if (!query) {
    resultDiv.innerHTML = `<p style="color: #ff3333;">Please type an anime name first!</p>`;
    return;
  }

  resultDiv.innerHTML =
    "<p class='loading-text'>Summoning massive data from the global anime scrolls...</p>";

  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`
    );
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const anime = data.data[0];

      const title = anime.title_english || anime.title;
      const synopsis = anime.synopsis || "No synopsis available for this scroll.";
      const episodes = anime.episodes || "Unknown";
      const score = anime.score || "N/A";
      const status = anime.status;
      const aired = anime.aired.string;
      const studio = anime.studios.length > 0 ? anime.studios[0].name : "Unknown Studio";
      const genres = anime.genres.map((g) => g.name).join(", ");
      const rating = anime.rating || "Not Rated";
      const imageUrl = anime.images.jpg.large_image_url;

      let videoHTML = "";
      if (anime.trailer && anime.trailer.youtube_id) {
        const youtubeId = anime.trailer.youtube_id;
        videoHTML = `
            <div class="video-box" style="text-align: center; padding: 20px; background: rgba(0,0,0,0.5); border-radius: 12px; margin-top: 20px; border: 1px solid #00d2ff;">
                <p style="margin-bottom: 12px; color: #00d2ff; font-weight: 500;">🎬 Official Trailer Ready!</p>
                <a href="https://www.youtube.com/watch?v=${youtubeId}" target="_blank" class="submit-btn" style="text-decoration: none; display: inline-block; width: auto; padding: 10px 25px; background: #ff6600; color: white; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 15px rgba(255,102,0,0.3);">
                    Watch Trailer Directly
                </a>
            </div>
        `;
      } else {
        const searchQuery = encodeURIComponent(`${title} Official Trailer`);
        videoHTML = `
            <div class="video-box" style="text-align: center; padding: 20px; background: rgba(0,0,0,0.5); border-radius: 12px; margin-top: 20px; border: 1px solid #ff6600;">
                <p style="margin-bottom: 12px; color: #ff6600; font-weight: 500;">🔍 Searching Jutsu Activated!</p>
                <p style="font-size: 13px; color: #aaa; margin-bottom: 10px;">Official scroll video link was missing, try global search:</p>
                <a href="https://www.youtube.com/results?search_query=${searchQuery}" target="_blank" class="submit-btn" style="text-decoration: none; display: inline-block; width: auto; padding: 10px 25px; background: #00d2ff; color: black; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 15px rgba(0,210,255,0.3);">
                    Search Trailer on YouTube
                </a>
            </div>
        `;
      }

      resultDiv.innerHTML = `
                <div class="mega-anime-card" style="--bg-img: url('${imageUrl}')">
                    <div class="card-overlay">
                        <div class="mega-card-header">
                            <img src="${imageUrl}" class="mega-result-img" alt="${title}">
                            <div class="header-main-info">
                                <h4>${title}</h4>
                                <p class="anime-stat">⭐ <strong>Score:</strong> ${score} / 10</p>
                                <p class="anime-stat">🎬 <strong>Studio:</strong> ${studio}</p>
                                <p class="anime-stat">📅 <strong>Aired:</strong> ${aired}</p>
                            </div>
                        </div>
                        <hr class="info-divider">
                        <div class="mega-card-body">
                            <p>📺 <strong>Episodes:</strong> ${episodes} (${status})</p>
                            <p>🏷️ <strong>Genres:</strong> ${genres}</p>
                            <p>🔞 <strong>Age Rating:</strong> ${rating}</p>
                            <div class="synopsis-box">
                                <h5>📜 History & Synopsis:</h5>
                                <p>${synopsis}</p>
                            </div>
                            ${videoHTML}
                        </div>
                    </div>
                </div>
            `;
    } else {
      resultDiv.innerHTML = `<p style="color: #ff3333;">Anime not found in the global library. Check your spelling!</p>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: #ff3333;">Failed to connect to the ninja network. Try again later.</p>`;
  }
}

async function searchCharacter() {
  const query = document.getElementById("char-search-input").value.trim();
  const resultDiv = document.getElementById("char-search-result");

  if (!query) {
    resultDiv.innerHTML = `<p style="color: #ff3333;">Please type a character name first!</p>`;
    return;
  }

  resultDiv.innerHTML =
    "<p class='loading-text'>Summoning character records from the ninja scrolls...</p>";

  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(query)}&limit=1`
    );
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const char = data.data[0];
      const name = char.name;
      const nameKanji = char.name_kanji ? `(${char.name_kanji})` : "";
      const about = char.about || "No detailed historical records found for this shinobi.";
      const imageUrl = char.images.jpg.image_url;
      const charUrl = char.url;

      resultDiv.innerHTML = `
        <div class="mega-anime-card" style="--bg-img: url('${imageUrl}')">
          <div class="card-overlay">
            <div class="mega-card-header">
              <img src="${imageUrl}" class="mega-result-img" alt="${name}">
              <div class="header-main-info">
                <h4>${name} ${nameKanji}</h4>
                <p class="anime-stat">👤 <strong>Type:</strong> Character Profile</p>
                <p class="anime-stat">🌟 <strong>Favorites:</strong> ❤️ ${char.favorites || 0}</p>
              </div>
            </div>
            <hr class="info-divider">
            <div class="mega-card-body">
              <div class="synopsis-box">
                <h5>📜 Character Biography & Lore:</h5>
                <p style="white-space: pre-line;">${about}</p>
              </div>
              <div style="text-align: center; margin-top: 20px;">
                <a href="${charUrl}" target="_blank" class="submit-btn" style="text-decoration: none; display: inline-block; width: auto; padding: 10px 25px;">
                  View Full Ninja File
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `<p style="color: #ff3333;">Character not found in the archives. Check your spelling!</p>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p style="color: #ff3333;">Failed to connect to the ninja network. Try again later.</p>`;
  }
}

function generateStickers() {
  const grid = document.getElementById("stickers-grid");
  if (!grid) return;

  const stickerShinobi = [
    "Naruto", "Sasuke", "Kakashi", "Itachi", 
    "Gaara", "Jiraiya", "Tsunade", "Orochimaru"
  ];

  grid.innerHTML = "";

  stickerShinobi.forEach((name) => {
    const img = document.createElement("img");
    img.className = "sticker-item";
    img.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`;
    img.alt = `${name} Sticker`;
    img.title = `Click to activate ${name}'s Jutsu!`;
    
    img.onclick = () => {
      alert(`💥 Jutsu Activated: You unleashed ${name}'s hidden power!`);
    };

    grid.appendChild(img);
  });
}