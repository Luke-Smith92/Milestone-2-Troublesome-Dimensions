/* ------------ Cards & Arena Backgrounds ------------- */
// Use the exact filenames you have in /images
const CARDS = [
  { id:"darkelf",  name:"Dark Elf",  type:"Dark",      img:"Darkelf.jpg",            maxHp:110,
    attacks:[ {name:"Shadow Dagger",power:18,accuracy:.95}, {name:"Night Veil",power:28,accuracy:.8} ] },
  { id:"fire-dragon", name:"Fire Dragon", type:"Fire", img:"Fire dragon.jpg",        maxHp:130,
    attacks:[ {name:"Flame Bite",power:22,accuracy:.90}, {name:"Inferno Burst",power:34,accuracy:.70} ] },
  { id:"lightning-drake", name:"Lightning Drake", type:"Lightning", img:"Lighting Drake.png", maxHp:120,
    attacks:[ {name:"Chain Spark",power:21,accuracy:.90}, {name:"Tempest",power:33,accuracy:.65} ] },
  { id:"orc",    name:"Orc",    type:"Earth",   img:"Orc Jim-cooper.jpg",   maxHp:125,
    attacks:[ {name:"Brutal Swing",power:20,accuracy:.92}, {name:"War Cry",power:28,accuracy:.80} ] },
  { id:"troll",  name:"Troll",  type:"Earth",   img:"troll jcope.jpg",      maxHp:140,
    attacks:[ {name:"Club Smash",power:20,accuracy:.90}, {name:"Boulder Throw",power:30,accuracy:.75} ] },
  { id:"wood-elf", name:"Wood Elf", type:"Nature", img:"woodelf.jpg",       maxHp:105,
    attacks:[ {name:"Arrow Volley",power:19,accuracy:.93}, {name:"Vine Snare",power:27,accuracy:.82} ] },
  { id:"paladin", name:"Paladin", type:"Light", img:"paladin.jpg",          maxHp:115,
    attacks:[ {name:"Smite",power:20,accuracy:.92}, {name:"Holy Nova",power:31,accuracy:.72} ] },
];

const ARENA_BACKGROUNDS = [
  "misty forest.jpg",
  "vulcanic-landscape-7492624_1920.jpg",
  "Mystic-mountains areana.jpg",
  "castle-7696633_1920.jpg",
  "waterfalls-4207893_1920.jpg",
  "city-wall-8752954_1920.jpg"
];

/* Packs for ownership */
const PACKS = [
  { id:"demo",    name:"Demo Pack",    price:0,   cards:["darkelf","fire-dragon"] },
  { id:"starter", name:"Starter Pack", price:200, cards:["wood-elf","paladin"] },
  { id:"beasts",  name:"Beasts Pack",  price:300, cards:["lightning-drake","troll"] },
];

/* --------- Utils / State --------- */
const views = ["home","select","battle","store","login"];
const $ = id => document.getElementById(id);
const rand = arr => arr[Math.floor(Math.random()*arr.length)];
const coinEls = [ $("coinsHome"), $("coinsSelect"), $("coinsBattle"), $("coinsStore") ];

let DEFAULT_BG = "";  // holds full background shorthand (image+position+size+attachment)
let save = loadSave();

function loadSave(){
  const s = JSON.parse(localStorage.getItem("aca-save")||"null");
  if (s && s.version===1) return s;
  const fresh = { version:1, coins:300, ownedPacks:["demo","starter"] };
  localStorage.setItem("aca-save", JSON.stringify(fresh));
  return fresh;
}
function persist(){ localStorage.setItem("aca-save", JSON.stringify(save)); }
function ownedCardIds(){
  const set = new Set();
  save.ownedPacks.forEach(pid=>{
    const p = PACKS.find(x=>x.id===pid);
    if (p) p.cards.forEach(c=>set.add(c));
  });
  return [...set];
}
function getCard(id){ return CARDS.find(c=>c.id===id); }
function updateCoinsUI(){ coinEls.forEach(el=>el && (el.textContent = save.coins)); }

/* --------- Router --------- */
function show(id){
  // hide all views
  views.forEach(v => $(v)?.classList.add("hidden"));
  $(id)?.classList.remove("hidden");

  // show news only on home
  $("news-section")?.classList.toggle("hidden", id !== "home");

  // restore background when not in battle
  if (id !== "battle") restoreBackground();

  updateCoinsUI();
}

/* --------- Background helpers --------- */
function setArenaBackground(){
  const src = rand(ARENA_BACKGROUNDS);
  // full shorthand preserves cover/fixed/center
  document.body.style.background = `url('images/${src}') center/cover no-repeat fixed`;
}
function restoreBackground(){
  if (DEFAULT_BG) document.body.style.background = DEFAULT_BG;
}

/* --------- Home → Select --------- */
function enterArena(){
  renderSelect();
  show('select');
}

/* --------- Select (choose your card) --------- */
function renderSelect(){
  const grid = $("selectGrid");
  grid.innerHTML = "";

  const ids = ownedCardIds();
  const visible = [...new Set([...ids, ...CARDS.map(c=>c.id)])];

  visible.forEach(id=>{
    const card = getCard(id);
    if (!card) return;
    const owned = ids.includes(id);

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h4>${card.name}</h4>
      <img src="images/${card.img}" alt="${card.name}">
      <div class="muted">${card.type} • HP ${card.maxHp}</div>
      <button class="btn ${owned?'primary':''}" ${owned?'':'disabled'}>
        ${owned ? 'Pick & Battle' : 'Locked'}
      </button>
    `;
    div.querySelector("button").onclick = ()=> owned && startBattle(card.id);
    grid.appendChild(div);
  });
}

/* --------- Battle --------- */
let battle = null;

function startBattle(playerId){
  const player = JSON.parse(JSON.stringify(getCard(playerId)));
  const aiPool  = CARDS.filter(c=>c.id!==playerId);
  const ai = JSON.parse(JSON.stringify(rand(aiPool)));

  battle = { player, ai, pHp:player.maxHp, aHp:ai.maxHp, locked:false };

  setArenaBackground();   // pick a random arena background
  renderBattle();
  show("battle");
}

function renderBattle(){
  const {player, ai} = battle;
  $("playerZone").innerHTML = cardBattleHtml("You", player, "playerHp");
  $("aiZone").innerHTML     = cardBattleHtml("AI",  ai,     "aiHp");
  updateHpBars();

  const row = $("attackRow");
  row.innerHTML = "";
  player.attacks.forEach((atk,i)=>{
    const b = document.createElement("button");
    b.className = "btn";
    b.textContent = `${atk.name} (${atk.power})`;
    b.onclick = () => playerTurn(i);
    row.appendChild(b);
  });
  $("resultText").textContent = "";
}

function cardBattleHtml(label, card, hpId){
  return `
    <div class="card">
      <h4>${label}</h4>
      <img src="images/${card.img}" alt="${card.name}">
      <div>${card.name}</div>
      <div class="hp-bar"><div id="${hpId}" class="hp-fill"></div></div>
    </div>
  `;
}

function updateHpBars(){
  $("playerHp").style.width = `${(battle.pHp / battle.player.maxHp)*100}%`;
  $("aiHp").style.width     = `${(battle.aHp / battle.ai.maxHp)*100}%`;
}

function playerTurn(i){
  if (battle.locked) return;
  battle.locked = true;
  const atk = battle.player.attacks[i];
  if (Math.random() <= atk.accuracy) battle.aHp = Math.max(0, battle.aHp - atk.power);
  updateHpBars();
  if (checkEnd()) return;
  setTimeout(aiTurn, 700);
}

function aiTurn(){
  const atk = rand(battle.ai.attacks);
  if (Math.random() <= atk.accuracy) battle.pHp = Math.max(0, battle.pHp - atk.power);
  updateHpBars();
  if (checkEnd()) return;
  battle.locked = false;
}

function checkEnd(){
  if (battle.pHp<=0 || battle.aHp<=0){
    $("resultText").textContent =
      (battle.pHp<=0 && battle.aHp<=0) ? "It's a draw!" :
      (battle.pHp<=0) ? "You lose!" : "You win!";
    return true;
  }
  return false;
}

/* --------- Store --------- */
function renderStore(){
  const wrap = $("packList");
  wrap.innerHTML = "";
  PACKS.forEach(p=>{
    const owned = save.ownedPacks.includes(p.id);
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h4>${p.name}</h4>
      <p class="muted">Contains: ${p.cards.map(id=>getCard(id).name).join(", ")}</p>
      <p class="muted">Price: ${p.price} 🪙</p>
      <button class="btn ${owned ? '' : 'primary'}" ${owned ? 'disabled' : ''}>
        ${owned ? 'Owned' : 'Buy'}
      </button>
    `;
    const btn = div.querySelector("button");
    if (!owned){
      btn.onclick = ()=>{
        if (save.coins < p.price) { alert("Not enough coins!"); return; }
        save.coins -= p.price;
        save.ownedPacks.push(p.id);
        persist(); updateCoinsUI(); renderStore();
      };
    }
    wrap.appendChild(div);
  });
}

/* --------- News (auto-rotate on Home) --------- */
function setupBreakingNews(){
  const wrap = $("news-container");
  if (!wrap) return;
  const cards = Array.from(wrap.querySelectorAll(".news-article"));
  const VISIBLE = 3;
  let index = 0, timer;

  function layout(start=0){
    cards.forEach((card,i)=>{
      const show = i >= start && i < start + VISIBLE;
      card.style.display = show ? "block" : "none";
      card.style.opacity = show ? 1 : 0;
      card.style.transition = "opacity .35s ease";
    });
  }
  function tick(){
    index = (index + 1) % cards.length;
    if (index > cards.length - VISIBLE) index = 0;
    layout(index);
  }
  function start(){ stop(); timer = setInterval(tick, 5000); }
  function stop(){ if (timer) clearInterval(timer); }

  layout(0); start();
  $("news-section")?.addEventListener("mouseenter", stop);
  $("news-section")?.addEventListener("mouseleave", start);
}

/* --------- Init --------- */
document.addEventListener("DOMContentLoaded", ()=>{
  // Keep the FULL background shorthand so we can restore it exactly
  DEFAULT_BG = getComputedStyle(document.body).background;

  // Title acts as Home
  document.querySelector('#titleHome')?.addEventListener('click', (e)=>{
    e.preventDefault(); show('home');
  });

  // Nav links
  document.querySelectorAll('.nav-link').forEach(link=>{
    link.addEventListener('click', e=>{
      e.preventDefault();
      const view = link.getAttribute('data-view');
      if (view === 'select') renderSelect();
      if (view === 'store')  renderStore();
      show(view);
    });
  });

  // Portal Battle button -> My Cards
  $("shimmerCta")?.addEventListener("click", enterArena);

  // View buttons
  $("selectBackBtn")?.addEventListener("click", ()=> show("home"));
  $("battleHomeBtn")?.addEventListener("click", ()=> show("home"));
  $("battleAgainBtn")?.addEventListener("click", ()=> show("select"));
  $("battleStoreBtn")?.addEventListener("click", ()=> { renderStore(); show("store"); });
  $("storeBackBtn")?.addEventListener("click", ()=> show("home"));
  $("loginBackBtn")?.addEventListener("click", ()=> show("home"));

  updateCoinsUI();
  show("home");
  setupBreakingNews();
});