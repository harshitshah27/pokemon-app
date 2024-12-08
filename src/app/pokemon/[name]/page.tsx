'use client'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function fetchPokemonDetails(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon details");
  }
  return response.json();
}

const PokemonDetailsPage = () => {
  const { name } = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        const data = await fetchPokemonDetails(name as string);
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      loadPokemonDetails();
    }
  }, [name]);

  if (loading) {
    return <div className="p-4 text-center">Loading Pokémon details...</div>;
  }

  if (!pokemon) {
    return <div className="p-4 text-center">Pokémon not found.</div>;
  }

  const stats = pokemon.stats.map((stat: any) => stat.stat.name).join(", ");
  const abilities = pokemon.abilities.map((ability: any) => ability.ability.name).join(", ");
  const moves = pokemon.moves.slice(0, 5).map((move: any) => move.move.name).join(", ");
  const types = pokemon.types.map((type: any) => type.type.name).join(", ");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Back
      </button>

      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
        {/* Top Section */}
        <div className="bg-teal-300 p-6 rounded-t-lg flex flex-col items-center">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-40 h-40"
          />
        </div>

        {/* Details Section */}
        <div className="bg-orange-300 p-6 rounded-b-lg">
          <h2 className="text-2xl font-bold capitalize text-gray-800">Name: {pokemon.name}</h2>
          <p className="text-lg font-semibold text-gray-700 mt-2">Type: {types}</p>
          <p className="text-md font-medium text-gray-700 mt-2">
            <strong>Stats:</strong> {stats}
          </p>
          <p className="text-md font-medium text-gray-700 mt-2">
            <strong>Abilities:</strong> {abilities}
          </p>
          <p className="text-md font-medium text-gray-700 mt-2">
            <strong>Some Moves:</strong> {moves}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailsPage;
