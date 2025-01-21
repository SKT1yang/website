import { Bomb, Rocket, SparkleIcon as Sparkler } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryClick,
}: CategoryFilterProps) {
  const categories = [
    { name: "全部", icon: Sparkler },
    { name: "礼花类", icon: Rocket },
    { name: "玩具烟花类", icon: Sparkler },
    { name: "爆竹类", icon: Bomb },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 my-8">
      {categories.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => onCategoryClick(name)}
          className={`festive-button flex items-center ${
            (name === "全部" && !selectedCategory) || selectedCategory === name
              ? "ring-4 ring-yellow-300"
              : ""
          }`}
          aria-pressed={
            (name === "全部" && !selectedCategory) || selectedCategory === name
          }
        >
          <Icon className="mr-2" />
          {name}
        </button>
      ))}
    </div>
  );
}
