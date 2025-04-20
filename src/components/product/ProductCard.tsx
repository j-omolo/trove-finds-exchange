
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

export interface Product {
  id: string;
  title: string;
  price: number;
  condition: string;
  location: string;
  image: string;
  category: string;
  isFeatured?: boolean;
  seller: {
    id: string;
    name: string;
    rating: number;
    verified: boolean;
  };
}

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className={`overflow-hidden h-full transition-all hover:shadow-md ${featured ? 'border-marketplace-primary/30' : ''}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          <img 
            src={product.image} 
            alt={product.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          
          {featured && (
            <Badge className="absolute top-2 left-2 bg-marketplace-primary">
              Featured
            </Badge>
          )}
          
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handleSaveProduct}
          >
            <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
        
        <CardContent className="pt-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium line-clamp-2">{product.title}</h3>
            <p className="font-semibold whitespace-nowrap">${product.price.toFixed(2)}</p>
          </div>
          
          <div className="mt-2 flex gap-2">
            <Badge variant="outline" className="text-xs bg-muted">
              {product.condition}
            </Badge>
            <Badge variant="outline" className="text-xs bg-muted">
              {product.category}
            </Badge>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-3 text-muted-foreground text-sm">
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <span>{product.seller.name}</span>
              {product.seller.verified && (
                <span className="ml-1 text-marketplace-primary">✓</span>
              )}
            </div>
            <div>{product.location}</div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
