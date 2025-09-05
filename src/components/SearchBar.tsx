import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#00aff0]" size={20} />
        <input
          type="text"
          placeholder="Search for users or videos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-[#00aff0] rounded-lg focus:outline-none focus:border-[#0095d1] transition-colors"
        />
      </div>
    </div>
  );
};

export default SearchBar;