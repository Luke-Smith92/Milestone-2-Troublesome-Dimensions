const IMG_BASE = "assets/images/";

const CARDS = [
  { id: "darkelf", name: "Dark Elf", type: "Dark", img: "darkelf.jpg", maxHp: 110,
    attacks: [{ name: "Shadow Dagger", power: 18, accuracy: 0.95 }, { name: "Night Veil", power: 28, accuracy: 0.8 }] },

  { id: "fire-dragon", name: "Fire Dragon", type: "Fire", img: "fire-dragon.jpg", maxHp: 130,
    attacks: [{ name: "Flame Bite", power: 22, accuracy: 0.90 }, { name: "Inferno Burst", power: 34, accuracy: 0.70 }] },

  { id: "lightning-drake", name: "Lightning Drake", type: "Lightning", img: "lighting-drake.png", maxHp: 120,
    attacks: [{ name: "Chain Spark", power: 21, accuracy: 0.90 }, { name: "Tempest", power: 33, accuracy: 0.65 }] },

  { id: "orc", name: "Orc", type: "Earth", img: "orc-jim-cooper.jpg", maxHp: 125,
    attacks: [{ name: "Brutal Swing", power: 20, accuracy: 0.92 }, { name: "War Cry", power: 28, accuracy: 0.80 }] },

  { id: "troll", name: "Troll", type: "Earth", img: "troll-jcope.jpg", maxHp: 140,
    attacks: [{ name: "Club Smash", power: 20, accuracy: 0.90 }, { name: "Boulder Throw", power: 30, accuracy: 0.75 }] },

  { id: "wood-elf", name: "Wood Elf", type: "Nature", img: "woodelf.jpg", maxHp: 105,
    attacks: [{ name: "Arrow Volley", power: 19, accuracy: 0.93 }, { name: "Vine Snare", power: 27, accuracy: 0.82 }] },

  { id: "paladin", name: "Paladin", type: "Light", img: "paladin-jimmy-f.png", maxHp: 115,
    attacks: [{ name: "Smite", power: 20, accuracy: 0.92 }, { name: "Holy Nova", power: 31, accuracy: 0.72 }] },
];

const ARENA_BACKGROUNDS = [
  "misty-forest.jpg",
  "vulcanic-landscape.jpg",
  "mystic-mountains-arena.jpg",
  "castle.jpg",
  "waterfalls.jpg"
];

const PACKS = [
  { id: "demo", name: "Demo Pack", price: 0, cards: ["darkelf", "fire-dragon"] },
  { id: "starter", name: "Starter Pack", price: 200, cards: ["wood-elf", "paladin"] },
  { id: "beasts", name: "Beasts Pack", price: 300, cards: ["lightning-drake", "troll"] },
];

const views = ["home", "select", "battle", "store", "error404"];
const $ = id => document.getElementById(id);
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

let DEFAULT_BG = "";
let save = loadSave();
let battle = null;

function loadSave() {
  const savedData = JSON.parse(localStorage.getItem("aca-save") || "null");

  if (savedData && savedData.version === 1) {
    return savedData;
  }

  const freshSave = {
    version: 1,
    coins: 300,
    ownedPacks: ["demo", "starter"]
  };

  localStorage.setItem("aca-save", JSON.stringify(freshSave));
  return freshSave;
}

function persist() {
  localStorage.setItem("aca-save", JSON.stringify(save));
}

function ownedCardIds() {
  const ownedCards = new Set();

  save.ownedPacks.forEach(packId => {
    const pack = PACKS.find(item => item.id === packId);

    if (pack) {
      pack.cards.forEach(cardId => ownedCards.add(cardId));
    }
  });

  return [...ownedCards];
}

function getCard(id) {
  return CARDS.find(card => card.id === id);
}

function updateCoinsUI() {
  const coinEls = [
    $("coinsHome"),
    $("coinsSelect"),
    $("coinsBattle"),
    $("coinsStore")
  ];

  coinEls.forEach(el => {
    if (el) {
      el.textContent = save.coins;
    }
  });
}

function show(id) {
  views.forEach(view => {
    $(view)?.classList.add("hidden");
  });

  $(id)?.classList.remove("hidden");

  if (id !== "battle") {
    restoreBackground();
  }

  updateCoinsUI();
}

function setArenaBackground() {
  const src = rand(ARENA_BACKGROUNDS);
  document.body.style.background = `url('${IMG_BASE}${src}') center/cover no-repeat fixed`;
}

function restoreBackground() {
  if (DEFAULT_BG) {
    document.body.style.background = DEFAULT_BG;
  }
}

function enterArena() {
  renderSelect();
  show("select");
}

function renderSelect() {
  const grid = $("selectGrid");
  grid.innerHTML = "";

  const ownedIds = ownedCardIds();
  const visibleCards = [...new Set([...ownedIds, ...CARDS.map(card => card.id)])];

  visibleCards.forEach(id => {
    const card = getCard(id);

    if (!card) {
      return;
    }

    const owned = ownedIds.includes(id);
    const div = document.createElement("div");

    div.className = "card";
    div.innerHTML = `
      <h4>${card.name}</h4>
      <img src="${IMG_BASE}${card.img}" alt="${card.name}">
      <div class="muted">${card.type} • HP ${card.maxHp}</div>
      <button class="btn ${owned ? "primary" : ""}" ${owned ? "" : "disabled"}>
        ${owned ? "Pick & Battle" : "Locked"}
      </button>
    `;

    div.querySelector("button").onclick = () => {
      if (owned) {
        startBattle(card.id);
      }
    };

    grid.appendChild(div);
  });
}

function startBattle(playerId) {
  const player = structuredClone(getCard(playerId));
  const aiPool = CARDS.filter(card => card.id !== playerId);
  const ai = structuredClone(rand(aiPool));

  battle = {
    player,
    ai,
    pHp: player.maxHp,
    aHp: ai.maxHp,
    locked: false,
    rewarded: false
  };

  setArenaBackground();
  renderBattle();
  show("battle");
}

function renderBattle() {
  const { player, ai } = battle;

  $("playerZone").innerHTML = cardBattleHtml("You", player, "playerHp");
  $("aiZone").innerHTML = cardBattleHtml("Invader", ai, "aiHp");

  updateHpBars();

  const row = $("attackRow");
  row.innerHTML = "";

  player.attacks.forEach((attack, index) => {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = `${attack.name} (${attack.power})`;
    button.onclick = () => playerTurn(index);
    row.appendChild(button);
  });

  $("resultText").textContent = "";
}

function cardBattleHtml(label, card, hpId) {
  return `
    <div class="card">
      <h4>${label}</h4>
      <img src="${IMG_BASE}${card.img}" alt="${card.name}">
      <div>${card.name}</div>
      <div class="hp-bar"><div id="${hpId}" class="hp-fill"></div></div>
    </div>
  `;
}

function updateHpBars() {
  $("playerHp").style.width = `${(battle.pHp / battle.player.maxHp) * 100}%`;
  $("aiHp").style.width = `${(battle.aHp / battle.ai.maxHp) * 100}%`;
}

function playerTurn(index) {
  if (battle.locked) {
    return;
  }

  battle.locked = true;

  const attack = battle.player.attacks[index];

  if (Math.random() <= attack.accuracy) {
    battle.aHp = Math.max(0, battle.aHp - attack.power);
  }

  updateHpBars();

  if (checkEnd()) {
    return;
  }

  setTimeout(aiTurn, 700);
}

function aiTurn() {
  const attack = rand(battle.ai.attacks);

  if (Math.random() <= attack.accuracy) {
    battle.pHp = Math.max(0, battle.pHp - attack.power);
  }

  updateHpBars();

  if (checkEnd()) {
    return;
  }

  battle.locked = false;
}

function checkEnd() {
  if (battle.pHp <= 0 || battle.aHp <= 0) {
    if (battle.pHp <= 0 && battle.aHp <= 0) {
      $("resultText").textContent = "It's a draw!";
    } else if (battle.pHp <= 0) {
      $("resultText").textContent = "You lose!";
    } else {
      if (!battle.rewarded) {
        save.coins += 50;
        persist();
        battle.rewarded = true;
      }

      $("resultText").textContent = "You win! +50 coins";
    }

    battle.locked = false;
    updateCoinsUI();
    return true;
  }

  return false;
}

function renderStore() {
  const wrap = $("packList");
  wrap.innerHTML = "";

  PACKS.forEach(pack => {
    const owned = save.ownedPacks.includes(pack.id);
    const div = document.createElement("div");

    div.className = "card";
    div.innerHTML = `
      <h4>${pack.name}</h4>
      <p class="muted">Contains: ${pack.cards.map(id => getCard(id).name).join(", ")}</p>
      <p class="muted">Price: ${pack.price} 🪙</p>
      <button class="btn ${owned ? "" : "primary"}" ${owned ? "disabled" : ""}>
        ${owned ? "Owned" : "Buy"}
      </button>
    `;

    const button = div.querySelector("button");

    if (!owned) {
      button.onclick = () => {
        if (save.coins < pack.price) {
          alert("Not enough coins!");
          return;
        }

        save.coins -= pack.price;
        save.ownedPacks.push(pack.id);
        persist();
        updateCoinsUI();
        renderStore();
      };
    }

    wrap.appendChild(div);
  });
}

function setupBreakingNews() {
  const wrap = $("news-container");

  if (!wrap) {
    return;
  }

  const cards = Array.from(wrap.querySelectorAll(".news-article"));
  const visibleCount = 3;
  let index = 0;
  let timer;

  function layout(start = 0) {
    cards.forEach((card, i) => {
      const shouldShow = i >= start && i < start + visibleCount;
      card.style.display = shouldShow ? "block" : "none";
      card.style.opacity = shouldShow ? 1 : 0;
      card.style.transition = "opacity .35s ease";
    });
  }

  function tick() {
    index = (index + 1) % cards.length;

    if (index > cards.length - visibleCount) {
      index = 0;
    }

    layout(index);
  }

  function start() {
    stop();
    timer = setInterval(tick, 5000);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
    }
  }

  layout(0);
  start();

  document.querySelector(".news-panel")?.addEventListener("mouseenter", stop);
  document.querySelector(".news-panel")?.addEventListener("mouseleave", start);
}

document.addEventListener("DOMContentLoaded", () => {
  DEFAULT_BG = getComputedStyle(document.body).background;

  $("titleHome")?.addEventListener("click", event => {
    event.preventDefault();
    show("home");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const view = link.getAttribute("data-view");

      if (view === "select") {
        renderSelect();
      }

      if (view === "store") {
        renderStore();
      }

      show(view);
    });
  });

  $("shimmerCta")?.addEventListener("click", enterArena);
  $("selectBackBtn")?.addEventListener("click", () => show("home"));
  $("battleHomeBtn")?.addEventListener("click", () => show("home"));

  $("battleAgainBtn")?.addEventListener("click", () => {
    renderSelect();
    show("select");
  });

  $("battleStoreBtn")?.addEventListener("click", () => {
    renderStore();
    show("store");
  });

  $("storeBackBtn")?.addEventListener("click", () => show("home"));
  $("error404BackBtn")?.addEventListener("click", () => show("home"));
  $("returnHomeBtn")?.addEventListener("click", () => show("home"));

  updateCoinsUI();
  show("home");
  setupBreakingNews();
});