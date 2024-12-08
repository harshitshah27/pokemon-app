import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

// Base fetch function
export const fetchPokemonData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Resource not found (404). Please check the endpoint.");
      } else {
        throw new Error(
          `Failed to fetch data: ${error.response?.status || "Unknown Error"}.`
        );
      }
    }
    throw new Error("An unexpected error occurred.");
  }
};

// Fetch Pokémon types (for the select dropdown)
export const fetchPokemonTypes = async () => {
  try {
    const data = await fetchPokemonData("type");
    return data.results; // Returns an array of Pokémon types
  } catch (error: unknown) {
    console.error("Error fetching Pokémon types:", error);
    throw error;
  }
};

// Fetch Pokémon by type
export const fetchPokemonsByType = async (type: string = "normal") => {
  try {
    const data = await fetchPokemonData(`type/${type}`);
    // Returns an array of Pokémon with name and image URL
    const pokemons = await Promise.all(
      data.pokemon.map(async (poke: { pokemon: { name: string } }) => {
        try {
          const pokemonDetails = await fetchPokemonsByName(poke.pokemon.name);
          return pokemonDetails; // { name, imageUrl }
        } catch (error) {
          console.error(`Failed to fetch details for ${poke.pokemon.name}:`, error);
          return null; // Skip this Pokémon if fetching fails
        }
      })
    );
    // Filter out any null results
    return pokemons.filter((pokemon) => pokemon !== null);
  } catch (error: unknown) {
    throw error;
  }
};

// Fetch Pokémon by name
export const fetchPokemonsByName = async (name: string) => {
  try {
    const data = await fetchPokemonData(`pokemon/${name}`);
    return { name: data.name, imageUrl: data.sprites.front_default };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.warn(`Pokémon not found: ${name}`);
      return null; // Return null for missing Pokémon
    }
    throw error;
  }
};
