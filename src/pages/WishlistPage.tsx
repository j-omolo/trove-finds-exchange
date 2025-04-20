
import { useState } from "react";
import { mockProducts } from "@/data/mockData";
import ProductCard, { Product } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  // In a real app, this would be stored in a database
  const [wishlistItems, setWishlistItems] = useState<Product[]>(
    // For demo purposes, let's include a few sample items
    mockProducts.slice(0, 4)
  );
  
  const removeFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Your Wishlist</h1>
      <p className="text-muted-foreground mb-8">Items you've saved for later</p>
      
      {wishlistItems.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div key={product.id} className="group relative">
                <ProductCard product={product} />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center pt-4">
            <Button asChild>
              <Link to="/browse">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg">
          <div className="text-5xl mb-4">💭</div>
          <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">
            Start saving items you love while browsing
          </p>
          <Button asChild>
            <Link to="/browse">Browse Items</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
