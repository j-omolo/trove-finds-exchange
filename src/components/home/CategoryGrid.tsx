
import { categories } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link to={`/category/${category.id}`} key={category.id}>
          <Card className="h-full transition-all hover:shadow-md hover:border-marketplace-primary/40">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <div className="text-2xl mb-4">
                {getCategoryIcon(category.id)}
              </div>
              <h3 className="font-medium text-center">{category.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

// Helper function to get an emoji for each category
function getCategoryIcon(categoryId: string): string {
  const icons: Record<string, string> = {
    electronics: "🖥️",
    furniture: "🪑",
    clothing: "👕",
    books: "📚",
    home: "🏡",
    toys: "🧸",
    sports: "⚽",
    collectibles: "🏆",
  };
  
  return icons[categoryId] || "📦";
}

export default CategoryGrid;
