const url = 'https://pokeapi.co/api/v2/pokemon/';
const dataName = document.querySelector("[data-name]");
const btnSearch = document.querySelector("[btn-search]");
const input = document.querySelector("[data-input]");
const imgData = document.querySelector("[data-img]");
const cardBox = document.querySelector("[data-cardBox]");
const dataAbilities = document.querySelector("[data-abilities]");
const dataTypes = document.querySelector("[data-types]");



let pokemon = {
    name: String,
    img: String,
    abilities: [],
    types: []
};



// Faz a busca na api
async function searchPokemon(){
    // pega valou do imput
    let search = input.value;

    // verificar se o input está vazio
    if(search.length == 0){
        alert('Pesquisa vazia, tente digitar o nome de um Pokemon');
    }else{
        try{
            // faz a busca dos dados na api
            let response = await axios.get(url+search);
            setAttribute(response);
            
        }catch(err){
            alert('Pokemon não encontrado');
        };
    };

};
// seta os atributos
const setAttribute = (response) =>{
    // apaga os detalhes anteriores 
    pokemon.types = []
    pokemon.abilities = []
    

    pokemon.name = response.data.name;
    pokemon.img = response.data.sprites.front_default;


    // pega array dos tipos e adiciona no obj pokemon
    let types = response.data.types
    let abilities = response.data.abilities

    for(let type of types){
        pokemon.types.push(type.type.name)
    }
    for(let ability of abilities){
        pokemon.abilities.push(ability.ability.name)
    }

    console.log(pokemon)

    show(pokemon);


    // seta atributo na card box
    cardBox.style.display = 'flex';
}

//exibir busca
const show = (pokemon) =>{

    // apaga os detalhes anteriores
    dataAbilities.innerHTML = ''
    dataTypes.innerHTML = ''

    // atribui os resultados
    dataName.innerHTML = pokemon.name;
    imgData.setAttribute('src', pokemon.img);

    for(let type of pokemon.types){
        dataTypes.innerHTML += `<span>${type}</span><br>`
    }

    for(let ability of pokemon.abilities){
        dataAbilities.innerHTML += `<span>${ability}</span><br>`
    }
    

};


btnSearch.addEventListener('click', searchPokemon);