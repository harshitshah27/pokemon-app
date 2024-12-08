import React from "react";

interface SearchFormProps {
  types: string[];
  selectedType: string;
  searchTerm: string;
  onTypeChange: (type: string) => void;
  onSearchChange: (searchTerm: string) => void;
  onSubmit: (searchTerm: string, selectedType: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  types,
  selectedType,
  searchTerm,
  onTypeChange,
  onSearchChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(searchTerm, selectedType);
      }}
    >
      <div className="grid grid-cols-6 gap-4 items-center">
        <select
          className="col-span-2 border p-2 rounded capitalize"
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">Select Type</option> {/* Default option */}
          {types.map((type) => (
            <option key={type} value={type} className="capitalize">
              {type}
            </option>
          ))}
        </select>
        <div className="col-span-4 flex">
          <input
            type="text"
            placeholder="Search Pokémon"
            className="flex-grow border p-2 rounded-l"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
