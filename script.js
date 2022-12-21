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
  pushPokemons();
}
// Check the url at LoadMorePokemon because there is somthing wrong. should make it Manuel!
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
  cardBackground();
  getPokemonId();
  renderPokemonName();
  renderPokemonPic();
  renderPokemonHp();
  getPokemonElement();
}
async function eachPokemon() {
  for (let i = 0; i < currentResult.length; i++) {
    const pokemonName = currentResult[i];
    urlPokemon = url + "/" + pokemonName["name"];
    await getPokemon(urlPokemon);
  }
}

function renderPokemonName() {
  let name = document.getElementById(`name${currentPokemonId}`);
  let currentName = currentPokemon["name"];
  let upperName = currentName.charAt(0).toUpperCase() + currentName.slice(1);

  if (upperName.length > 10) {
    upperName = upperName.substring(0, 10) + "...";
  }
  name.innerHTML = upperName;
}

function renderPokemonPic() {
  pokemonPic = currentPokemon["sprites"]["front_default"];
  document.getElementById(`img${currentPokemonId}`).src = pokemonPic;
}

function renderPokemonHp() {
  document.getElementById(
    `hp${currentPokemonId}`
  ).innerHTML = `<b>${currentPokemon["stats"][0]["base_stat"]}</b> HP`;
}

function getPokemonElement() {
  if (currentPokemon["types"][1]) {
    let element = currentPokemon["types"][0]["type"]["name"];
    let element2 = currentPokemon["types"][1]["type"]["name"];
    let upperElement = element.charAt(0).toUpperCase() + element.slice(1);
    let upperElement2 = element2.charAt(0).toUpperCase() + element2.slice(1);

    document.getElementById(`smal-info${currentPokemonId}`).innerHTML =
      upperElement;
    document.getElementById(`second-info${currentPokemonId}`).innerHTML =
      upperElement2;
  } else {
    let element = currentPokemon["types"][0]["type"]["name"];
    let upperElement = element.charAt(0).toUpperCase() + element.slice(1);

    document.getElementById(`smal-info${currentPokemonId}`).innerHTML =
      upperElement;
  }
}

function getPokemonId() {
  let pokeId = currentPokemon["id"];

  document.getElementById(
    `poke_id${currentPokemonId}`
  ).innerHTML = `# ${pokeId}`;
}

function cardBackground() {
  let element = currentPokemon["types"][0]["type"]["name"];

  document
    .getElementById(`pokemon-card${currentPokemonId}`)
    .classList.add(`${element}`);
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

async function overview(currentPokemonId) {
  let overviewUrl = resultList[currentPokemonId]["url"];
  let respons = await fetch(overviewUrl);
  let newRespons = await respons.json();
  let element = newRespons["types"][0]["type"]["name"];
  let overviewName = newRespons["name"];
  let upperName = overviewName.charAt(0).toUpperCase() + overviewName.slice(1);
  let detail = document.getElementById("overviewId");
  let overviewGif =
    newRespons["sprites"]["versions"]["generation-v"]["black-white"][
      "animated"
    ]["front_default"];

  document.getElementById("overviewId").style = "display: flex";
  document.getElementById("overviewId").classList.add(element);

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

  currentElement = element;
  generateSkills(attackNum, defensNum, specAttackNum, specDefensNum, speedNum);
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
}

async function pushPokemons() {
  counter = responsAsJson["count"] / 20;
  let plus = 0;

  for (let i = 0; i < counter; i++) {
    let pokeUrl = `https://pokeapi.co/api/v2/pokemon?offset=${String(
      plus
    )}&limit=20`;
    plus += 20;
    let rps = await fetch(pokeUrl);
    let rpsAsJson = await rps.json();
    for (let j = 0; j < 20; j++) {
      let pokemons = await rpsAsJson["results"][j];
      if (!(pokemons == undefined)) {
        pokemonList.push(pokemons);
      }
    }
  }
}

async function searchPokemons() {
  if (document.getElementById("search").value == "") {
    checkInput();
  } else {
    let searchList = [];
    wantedPokemon = document.getElementById("search").value;
    wantedPokemon.toLowerCase();
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
    document.getElementById("output").innerHTML = "";

    for (let j = 0; j < searchList.length; j++) {
      let searchResult = searchList[j];
      searchRespons = await fetch(searchResult["url"]);
      searchJson = await searchRespons.json();

      document.getElementById("output").innerHTML += searchPokemonsHTML();
      checkElement(searchJson);
      searchCardBackground(searchJson);
      serachRenderPokemonName(searchJson);
      searchRenderPokemonPic(searchJson);
      searchRenderPokemonHp(searchJson);
      checkInput();
      changeSearchClasses();
    }
    searchResult = [];
  }
}

function checkElement(searchJson) {
  if (searchJson["types"][1]) {
    let element = searchJson["types"][0]["type"]["name"];
    let element2 = searchJson["types"][1]["type"]["name"];
    let upperElement = element.charAt(0).toUpperCase() + element.slice(1);
    let upperElement2 = element2.charAt(0).toUpperCase() + element2.slice(1);

    document.getElementById(`search-smal-info${searchJson["id"]}`).innerHTML =
      upperElement;
    document.getElementById(`search-second-info${searchJson["id"]}`).innerHTML =
      upperElement2;
  } else {
    let element = searchJson["types"][0]["type"]["name"];
    let upperElement = element.charAt(0).toUpperCase() + element.slice(1);

    document.getElementById(`search-smal-info${searchJson["id"]}`).innerHTML =
      upperElement;
  }
}

function searchCardBackground(searchJson) {
  let element = searchJson["types"][0]["type"]["name"];

  document
    .getElementById(`search-pokemon-card${searchJson["id"]}`)
    .classList.add(`${element}`);
}

function serachRenderPokemonName(searchJson) {
  let name = document.getElementById(`search-name${searchJson["id"]}`);
  currentName = searchJson["name"];
  let upperName = currentName.charAt(0).toUpperCase() + currentName.slice(1);
  if (upperName.length > 10) {
    upperName = upperName.substring(0, 10) + "...";
  }
  name.innerHTML = upperName;
}

function searchRenderPokemonPic(searchJson) {
  pokemonPic = searchJson["sprites"]["front_default"];
  document.getElementById(`search-img${searchJson["id"]}`).src = pokemonPic;
}

function searchRenderPokemonHp(searchJson) {
  document.getElementById(
    `search-hp${searchJson["id"]}`
  ).innerHTML = `<b>${searchJson["stats"][0]["base_stat"]}</b> HP`;
}

function checkInput() {
  let searchValue = document.getElementById("search").value;
  if (searchValue == "") {
    addRelaod();
    setTimeout(closeSearch, 1000);
  }
}

function loading() {
  document.getElementById("button").classList.add("d-none");
  document.getElementById("div").classList.add("d-none");
  document.getElementById("output").classList.remove("d-none");
  addRelaod();
  setTimeout(searchPokemons, 1000);
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
