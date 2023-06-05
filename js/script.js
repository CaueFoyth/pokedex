// Buscar pokemon com a api

// Recenbendo o nome do pokemon
const pokemonName = document.querySelector('.pokemon__name');

// Recebendo o Id do pokemon
const pokemonNumber = document.querySelector('.pokemon__number');

// Recebendo a imagem do pokemon
const pokemonImage = document.querySelector('.pokemon__image');

// Receber o pokemon do usuário
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

// Botões
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

// Busca o pokemon com a variável, assync para a função assincrona com o await
const fetchPokemon = async (pokemon) => {

  // Envia a variavel a api, com o await ele espera a resposta retornar para prosseguir
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  // Verificar se os status da api é 200
  if (APIResponse.status === 200) {

    // Pegar as informções dos pokemons com o json
    const data = await APIResponse.json();
    return data;
  }
}

// Buscar a informações do pokemon
const renderPokemon = async (pokemon) => {

  // Loading para esperar a resposta da api
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  // Verificar se os status do pokemon foi encontrado
  if (data) {
    pokemonImage.style.display = 'block';

    // Buscar o nome do pokemon
    pokemonName.innerHTML = data.name;

    // Buscar o Id do pokemon
    pokemonNumber.innerHTML = data.id;

    // Buscar a imagem do pokemon
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {

    // Caso seja uma entrada inválida
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

// Receber o pokemon do input
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

// Configuração dos botões
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

// Quando abrir começar com o primeiro pokemon
renderPokemon(searchPokemon);
