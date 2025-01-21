"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import FireworkCard from "./components/FireworkCard";
import Pagination from "./components/Pagination";
import CategoryFilter from "./components/CategoryFilter";
import { fireworks as initialFireworks } from "./data/fireworks";
import { Sparkles } from "lucide-react";
import type { Firework } from "./types";
import { FireworksProvider } from "../cart/views/CartContext";
import { CartFloatButton } from "../cart/views/CartFloatButton";

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [filteredFireworks, setFilteredFireworks] =
    useState<Firework[]>(initialFireworks);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let result = initialFireworks;

    if (searchQuery) {
      result = result.filter(
        (firework) =>
          firework.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          firework.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "全部") {
      result = result.filter((f) => f.category === selectedCategory);
    }

    setFilteredFireworks(result);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredFireworks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFireworks = filteredFireworks.slice(startIndex, endIndex);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === "全部" ? null : category);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-festive-bg">
      <FireworksProvider>
        <Header onSearch={handleSearch} />
        <main className="container mx-auto px-4 py-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
          {filteredFireworks.length === 0 ? (
            <div className="text-center mt-8">
              <Sparkles className="inline-block text-red-600 mb-4" size={48} />
              <p className="text-2xl font-bold text-red-600">
                没有找到匹配的烟花
              </p>
              <p className="text-gray-600 mt-2">请尝试其他搜索词或类别</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-8">
                {currentFireworks.map((firework) => (
                  <FireworkCard key={firework.id} firework={firework} />
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </main>
        <CartFloatButton />
      </FireworksProvider>
    </div>
  );
}
