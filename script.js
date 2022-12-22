let currentResult;
let currentPokemonId;
let currentPokemon;
let currentElement;
let resultList = [0];
let pokemonList = [];
let pokemonPic;
let loadMore;
let url = "https://pokeapi.co/api/v2/pokemon";
let urlPokemon;

let plus20 = 0;
let currentGif;
let upperAttack;
let attackNum;
let upperDefens;
let defensNum;
let upperSpecAttack;
let specAttackNum;
let upperSpecDefens;
let specDefensNum;
let upperSpeed;
let speedNum;

function init() {
  eachPokemon();
  safeResult();
  pushPokemonsUrl();
}

async function loadMorePokemon() {
  loadingButton();

  plus20 += 20;
  let nextUrl = `https://pokeapi.co/api/v2/pokemon?offset=${String(
    plus20
  )}&limit=20`;
  let nextRespons = await fetch(nextUrl);
  let nextPoke = await nextRespons.json();
  currentResult = nextPoke["results"];
  eachPokemon();
  safeResult();
  setTimeout(loadingButton, 1800);
}

function safeResult() {
  for (let i = 0; i < currentResult.length; i++) {
    resultList.push(currentResult[i]);
  }
}

async function getPokemons() {
  let respons = await fetch(url);
  responsAsJson = await respons.json();
  currentResult = responsAsJson["results"];
  loadMore = responsAsJson.next;
  init();
}

async function getPokemon() {
  let url = urlPokemon;
  let respons = await fetch(url);
  currentPokemon = await respons.json();
  loadPokemonData(currentPokemon);
  currentPokemonId = currentPokemon["id"];
  renderPokemonInfo();
}

function loadPokemonData(newRespons) {
  currentGif =
    newRespons["sprites"]["versions"]["generation-v"]["black-white"][
      "animated"
    ]["front_default"];
  let attack = newRespons["stats"][1]["stat"]["name"];
  upperAttack = attack.charAt(0).toUpperCase() + attack.slice(1);
  attackNum = newRespons["stats"][1]["base_stat"];
  let defens = newRespons["stats"][2]["stat"]["name"];
  upperDefens = defens.charAt(0).toUpperCase() + defens.slice(1);
  defensNum = newRespons["stats"][2]["base_stat"];
  let specAttack = newRespons["stats"][3]["stat"]["name"];
  upperSpecAttack = specAttack.charAt(0).toUpperCase() + specAttack.slice(1);
  specAttackNum = newRespons["stats"][3]["base_stat"];
  let specDefens = newRespons["stats"][4]["stat"]["name"];
  upperSpecDefens = specDefens.charAt(0).toUpperCase() + specDefens.slice(1);
  specDefensNum = newRespons["stats"][4]["base_stat"];
  let speed = newRespons["stats"][5]["stat"]["name"];
  upperSpeed = speed.charAt(0).toUpperCase() + speed.slice(1);
  speedNum = newRespons["stats"][5]["base_stat"];
}

function renderPokemonInfo() {
  generateCards();
  cardBackground(currentPokemon);
  getPokemonId(currentPokemon);
  renderPokemonName(currentPokemon);
  renderPokemonPic(currentPokemon);
  renderPokemonHp(currentPokemon);
  getPokemonElement(currentPokemon);
}
async function eachPokemon() {
  for (let i = 0; i < currentResult.length; i++) {
    const pokemonName = currentResult[i];
    urlPokemon = url + "/" + pokemonName["name"];
    await getPokemon(urlPokemon);
  }
}

function renderPokemonName(pokemon) {
  let pokeId = pokemon["id"];

  let name = document.getElementById(`name${pokeId}`);
  let currentName = pokemon["name"];
  let upperName = currentName.charAt(0).toUpperCase() + currentName.slice(1);

  if (upperName.length > 10) {
    upperName = upperName.substring(0, 10) + "...";
  }
  name.innerHTML = upperName;
}

function renderPokemonPic(pokemon) {
  let pokeId = pokemon["id"];
  pokemonPic = pokemon["sprites"]["front_default"];
  document.getElementById(`img${pokeId}`).src = pokemonPic;
}

function renderPokemonHp(pokemon) {
  let pokeId = pokemon["id"];
  document.getElementById(
    `hp${pokeId}`
  ).innerHTML = `<b>${pokemon["stats"][0]["base_stat"]}</b> HP`;
}

function getPokemonElement(pokemon) {
  if (pokemon["types"][1]) {
    getPokemonWithTwoElements(pokemon);
  } else {
    getPokemonWithOneElements(pokemon);
  }
}

function getPokemonWithTwoElements(pokemon) {
  let element = pokemon["types"][0]["type"]["name"];
  let element2 = pokemon["types"][1]["type"]["name"];
  let upperElement = element.charAt(0).toUpperCase() + element.slice(1);
  let upperElement2 = element2.charAt(0).toUpperCase() + element2.slice(1);

  document.getElementById(`smal-info${pokemon["id"]}`).innerHTML = upperElement;
  document.getElementById(`second-info${pokemon["id"]}`).innerHTML =
    upperElement2;
}

function getPokemonWithOneElements(pokemon) {
  let element = pokemon["types"][0]["type"]["name"];
  let upperElement = element.charAt(0).toUpperCase() + element.slice(1);

  document.getElementById(`smal-info${pokemon["id"]}`).innerHTML = upperElement;
}

function getPokemonId(pokemon) {
  let pokeId = pokemon["id"];

  document.getElementById(`poke_id${pokeId}`).innerHTML = `# ${pokeId}`;
}

async function cardBackground(pokemon) {
  let pokeId = pokemon["id"];
  let element = pokemon["types"][0]["type"]["name"];

  document.getElementById(`pokemon-card${pokeId}`).classList.add(`${element}`);
}

async function loadBackPic(id) {
  let tochangeUrl = resultList[id]["url"];
  res = await fetch(tochangeUrl);
  resasJson = await res.json();

  let name = document.getElementById(`name${id}`);
  name.innerHTML = resasJson["name"].charAt(0).toUpperCase();
}

function generateCards() {
  document.getElementById("div").innerHTML +=
    generateCardsHTML(currentPokemonId);
}

async function overview(url) {
  let urlToFetch = searchUrl(url);
  let respons = await fetch(urlToFetch);
  let newRespons = await respons.json();
  let element = newRespons["types"][0]["type"]["name"];
  let overviewName = newRespons["name"];
  let upperName = overviewName.charAt(0).toUpperCase() + overviewName.slice(1);
  let detail = document.getElementById("overviewId");
  let overviewGif =
    newRespons["sprites"]["versions"]["generation-v"]["black-white"][
      "animated"
    ]["front_default"];
  overviewContinue(newRespons, element, upperName, detail, overviewGif);
}

function overviewContinue(newRespons, element, upperName, detail, overviewGif) {
  document.getElementById("overviewId").style = "display: flex";

  loadPokemonData(newRespons);
  detail.classList.remove("d-none");
  detail.innerHTML = overviewHTML(
    upperName,
    upperAttack,
    attackNum,
    upperDefens,
    defensNum,
    upperSpecAttack,
    specAttackNum,
    upperSpecDefens,
    specDefensNum,
    upperSpeed,
    speedNum
  );
  document.getElementById("gif").src = overviewGif;
  document.getElementById("overview_background").classList.add(element);

  currentElement = element;
  generateSkills(attackNum, defensNum, specAttackNum, specDefensNum, speedNum);
  disableScrolling();
}

function generateSkills(
  attackNum,
  defensNum,
  specAttackNum,
  specDefensNum,
  speedNum
) {
  document.getElementById("attackId").style = `width: ${attackNum}%`;
  document.getElementById("attackInNum").style = `width: ${attackNum}`;
  document.getElementById("defensId").style = `width: ${defensNum}%`;
  document.getElementById("defensInNum").style = `width: ${defensNum}`;
  document.getElementById("specAttackInNum").style = `width: ${specAttackNum}`;
  document.getElementById("specAttackid").style = `width: ${specAttackNum}%`;
  document.getElementById("specDefens").style = `width: ${specDefensNum}%`;
  document.getElementById("specDefensInNum").style = `width: ${specDefensNum}`;
  document.getElementById("speed").style = `width: ${speedNum}%`;
  document.getElementById("speedInNum").style = `width: ${speedNum}`;
}

function closeOverview() {
  document.getElementById("overviewId").innerHTML = "";
  document.getElementById("overviewId").classList.add("d-none");
  document.getElementById("overviewId").style = "";
  document.getElementById("overviewId").classList.remove(currentElement);
  enableScrolling();
}

function pushPokemonsUrl() {
  counter = responsAsJson["count"] / 20;
  let plus = 0;

  for (let i = 0; i < counter; i++) {
    let pokeUrl = `https://pokeapi.co/api/v2/pokemon?offset=${String(
      plus
    )}&limit=20`;

    pushPokemons(pokeUrl);
    plus += 20;
  }
}

async function pushPokemons(pokeUrl) {
  let rps = await fetch(pokeUrl);
  let rpsAsJson = await rps.json();
  for (let j = 0; j < 20; j++) {
    let pokemons = await rpsAsJson["results"][j];
    if (!(pokemons == undefined)) {
      pokemonList.push(pokemons);
    }
  }
}

async function searchPokemons() {
  if (document.getElementById("search").value == "") {
    checkInput();
  } else {
    /*document.getElementById("output").innerHTML = "";*/
    let searchList = [];
    wantedPokemon = document.getElementById("search").value;
    wantedPokemon.toLowerCase();
    searchLogic(wantedPokemon, searchList);
  }

  searchResult = [];
}

function searchLogic(wantedPokemon, searchList) {
  for (let i = 0; i < pokemonList.length; i++) {
    let element = pokemonList[i]["name"];
    if (wantedPokemon.length == 1) {
      const firstLetterWanted = wantedPokemon;
      const firstLetterList = element.charAt(0);
      if (firstLetterWanted == firstLetterList) {
        searchList.push(pokemonList[i]);
      }
    } else if (wantedPokemon.length > 1) {
      const firstLetterWanted = wantedPokemon;
      const firstLetterList = element.charAt(0);
      if (
        firstLetterWanted == firstLetterList ||
        element.includes(wantedPokemon)
      ) {
        searchList.push(pokemonList[i]);
      }
    }
  }
  setTimeout(showSearchResult, 1430, searchList);
}

async function showSearchResult(searchList) {
  removeRealod();
  for (let j = 0; j < searchList.length; j++) {
    let searchResult = searchList[j];
    searchRespons = await fetch(searchResult["url"]);
    searchJson = await searchRespons.json();

    document.getElementById("output").innerHTML += searchPokemonsHTML();
    getPokemonElement(searchJson);
    cardBackground(searchJson);
    renderPokemonName(searchJson);
    renderPokemonPic(searchJson);
    renderPokemonHp(searchJson);
    getPokemonId(searchJson);
    checkInput();
    changeSearchClasses();
  }
}

function checkInput() {
  let searchValue = document.getElementById("search").value;
  if (searchValue == "") {
    addRelaod();
    setTimeout(closeSearch, 100);
  }
}

function loading() {
  setTimeout(searchPokemons, 200);
  document.getElementById("button").classList.add("d-none");
  document.getElementById("div").classList.add("d-none");
  document.getElementById("output").classList.remove("d-none");
  addRelaod();
}

function changeSearchClasses() {
  let pokeName = document.getElementsByClassName("pokemonName");
  let smalInfo = document.getElementsByClassName("smal-info");
  let smalInfo2 = document.getElementsByClassName("smal-info2");
  for (let i = 0; i < pokeName.length; i++) {
    pokeName[i].classList.add("nameFontSize");
    smalInfo[i].classList.add("smal-info-font");
    smalInfo2[i].classList.add("smal-info-font");
  }
}

function addRelaod() {
  document.getElementById("output").innerHTML =
    '<div id="loading" class="lds-ripple"><div></div><div></div></div>';
}

function removeRealod() {
  document.getElementById("output").innerHTML = "";
}

function closeSearch() {
  document.getElementById("button").classList.remove("d-none");
  document.getElementById("output").innerHTML = "";
  document.getElementById("output").classList.add("d-none");
  document.getElementById("div").classList.remove("d-none");
}

/*      scroll Button    */

// Get the button
let mybutton =
  // When the user scrolls down 20px from the top of the document, show the button
  (window.onscroll = function () {
    scrollFunction();
  });

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").classList.remove("d-none");
  } else {
    document.getElementById("myBtn").classList.add("d-none");
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
/*          scroll button end      */

function loadingButton() {
  document.getElementById("loader").classList.toggle("d-none");
  document.getElementById("button-loader-icon").classList.toggle("d-none");
}

function disableScrolling() {
  document.body.style.margin = "0";
  document.body.style.heigth = "100%";
  document.body.style.overflow = "hidden";
}

function enableScrolling() {
  document.body.style.overflow = "auto";
}

function searchUrl(id) {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  return url;
}

// serachr-name serach-hp and search-id
