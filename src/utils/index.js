const BASE_URL = 'https://pokeapi.co/api/v2/';

const colours = {
  normal: 'rgb(168, 167, 122',
  fire: 'rgb(238, 129, 48',
  water: 'rgb(99, 144, 240',
  electric: 'rgb(247, 206, 44',
  grass: 'rgb(121, 199, 76',
  ice: 'rgb(150, 217, 214',
  fighting: 'rgb(194, 46, 40',
  poison: 'rgb(163, 62, 161',
  ground: 'rgb(226, 191, 101',
  flying: 'rgb(170, 143, 243',
  psychic: 'rgb(249, 85, 134',
  bug: 'rgb(166, 185, 26',
  rock: 'rgb(182, 161, 54',
  ghost: 'rgb(115, 87, 151',
  dragon: 'rgb(109, 53, 252',
  dark: 'rgb(112, 87, 70',
  steel: 'rgb(183, 183, 206',
  fairy: 'rgb(214, 133, 174',
  shadow: 'rgb(39, 43, 40'
};

const stats = {
  hp: 255,
  attack: 190,
  defense: 250,
  'special-attack': 194,
  'special-defense': 250,
  speed: 200,
};

const rnd = (n) => Math.floor(Math.random() * n)

export {
  BASE_URL,
  colours,
  stats,
  rnd
}