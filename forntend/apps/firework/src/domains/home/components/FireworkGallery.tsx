import FireworkCard from "./FireworkCard";
import type { Firework } from "../types";

interface FireworkGalleryProps {
  fireworks: Firework[];
  category: string;
}

export default function FireworkGallery({
  fireworks,
  category,
}: FireworkGalleryProps) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">{category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fireworks.map((firework) => (
          <FireworkCard key={firework.id} firework={firework} />
        ))}
      </div>
    </section>
  );
}
