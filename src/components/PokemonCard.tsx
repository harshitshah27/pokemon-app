"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PokemonCardProps {
  name: string;
  imageUrl: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ name, imageUrl }) => {
  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(`/pokemon/${name}`);
  };

  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow">
      {/* Pokémon Image */}
      <img
        src={imageUrl}
        alt={name}
        className="w-32 h-32 object-contain mb-4"
      />

      {/* Pokémon Name */}
      <h2 className="text-lg font-semibold capitalize text-gray-800">
        {name}
      </h2>

      {/* Details Button */}
      <button
        onClick={handleDetailsClick}
        className="mt-4 text-blue-500 hover:underline flex items-center"
      >
        Details →
      </button>
    </div>
  );
};

