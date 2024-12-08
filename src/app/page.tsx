'use client'
import React, { useEffect, useState } from "react";
import { fetchPokemonTypes, fetchPokemonsByType, fetchPokemonsByName } from "@/api";
import { SearchForm, PokemonCard, SkeletonLoader } from "@/components";


const HomePage = () => {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("normal");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pokemons, setPokemons] = useState<{ name: string; imageUrl: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  // Handle form submission
  const handleSearch = async (term: string, type: string) => {
    setLoading(true);
    try {
      if (term) {
        // Fetch Pokémon by name
        const data = await fetchPokemonsByName(term);
        setPokemons([data]);
      } else if (type) {
        // Fetch Pokémon by type
        const data = await fetchPokemonsByType(type);
        setPokemons(data);
      }
    } finally {
      setLoading(false);
    }
  };

    // Fetch Pokémon types on initial load
    useEffect(() => {
      const loadTypes = async () => {
        const data = await fetchPokemonTypes();
        setTypes(data.map((type) => type.name));
      };
      loadTypes();
      handleSearch('',selectedType);
    }, []);
  
  return (
    <div className="p-4">
      <SearchForm
        types={types}
        selectedType={selectedType}
        searchTerm={searchTerm}
        onTypeChange={setSelectedType}
        onSearchChange={setSearchTerm}
        onSubmit={handleSearch}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => <SkeletonLoader key={index} />)
        ) : pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} imageUrl={pokemon.imageUrl} />
          ))
        ) : (
          <div>No Pokémon found</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
