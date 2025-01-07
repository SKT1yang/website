"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="bg-gradient-to-r from-red-600 to-yellow-500 p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-white text-3xl font-bold mb-4 sm:mb-0 flex items-center">
          <Sparkles className="mr-2" />
          烟花盛宴
        </h1>
        <form onSubmit={handleSearch} className="w-full sm:w-auto">
          <div className="flex">
            <input
              type="text"
              placeholder="搜索烟花..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-red-600 px-6 py-2 rounded-r-full hover:bg-yellow-300 transition-colors duration-300"
            >
              搜索
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
