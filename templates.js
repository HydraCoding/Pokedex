function searchPokemonsHTML() {
  return `
      
      <div class="card-overlay">
      <div class="pokemon-card" onclick="overview(${searchJson["id"]})" id="pokemon-card${searchJson["id"]}">
            <div class="stripe"></div>
            <div class="stripe2"></div>
            <img src="img/pokeball.png" class="pokeball" alt="" />
            <img src="img/pokeball.png" class="pokeball2" alt="" />
            <img src="img/pokeball.png" class="pokeball3" alt="" />
            <h2  class="pokemonName" id="name${searchJson["id"]}"></h2>
            <div class="smal-info smal" id="smal-info${searchJson["id"]}"></div>
            <div class="smal-info2 smal2" id="second-info${searchJson["id"]}"></div>
            <p class="hp hp2" id="hp${searchJson["id"]}"></p>
            <p class="id" id="poke_id${searchJson["id"]}"></p>
            <img  class="img" id="img${searchJson["id"]}" alt="" />
            </div>
            </div>`;
}

function overviewHTML(
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
) {
  return `
    <div class="close" onclick="closeOverview()">X</div>
    
    <div class="detail" id="overview_background">
      <div class="gifbox"><h3 class="overviewName" >${upperName}</h3><img class="overviewImg" id="gif"></div>
        <table>
          <tr class="table-title" >
            <th>Ability</th>
             
          </tr>
          <tr>
            <td>${upperAttack}</td>
            <td class="bar" ><div id="attackId" class="skills attack-bar"></div></td>
            <td id="attackInNum" >${attackNum}</td> 
          </tr>
          <tr>
            <td>${upperDefens}</td>
            <td class="bar"><div id="defensId" class="skills defens-bar"></div></td>
            <td id="defensInNum" >${defensNum}</td>
          </tr>
          <tr>
            <td>${upperSpecAttack}</td>
            <td class="bar"><div id="specAttackid" class="skills sepcAttack-bar"></div></td>
            <td id="specAttackInNum" >${specAttackNum}</td>
          </tr>
          <tr>
            <td>${upperSpecDefens}</td>
            <td class="bar"><div id="specDefens" class="skills specDefens-bar"></div></td>
            <td id="specDefensInNum" >${specDefensNum}</td>
          </tr>
          <tr>
            <td>${upperSpeed}</td>
            <td class="bar"><div id="speed" class="skills speed-bar"></div></td>
            <td id="speedInNum" >${speedNum}</td>
          </tr>
        </table>
    </div>`;
}

function generateCardsHTML(currentPokemonId) {
  return `
      <div class="card-overlay" >
        <div class="pokemon-card" onclick="overview(${currentPokemon["id"]})" id="pokemon-card${currentPokemonId}">
          <div class="stripe"></div>
          <div class="stripe2"></div>
          <img src="img/pokeball.png" class="pokeball"/>
          <img src="img/pokeball.png" class="pokeball2"   />
          <img src="img/pokeball.png" class="pokeball3"/>
          <h2  id="name${currentPokemonId}"></h2>
          <div class="smal-info" id="smal-info${currentPokemonId}"></div>
          <div class="smal-info2" id="second-info${currentPokemonId}"></div>
          <p class="hp" id="hp${currentPokemonId}"></p>
          <p class="id" id="poke_id${currentPokemonId}"></p>
          <img  class="img"  id="img${currentPokemonId}"  alt="" />
        </div>
      </div>`;
}
