
import { useParams } from "react-router-dom";
import { mockProducts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, Share2, Shield, MapPin, Star } from "lucide-react";
import { useState } from "react";
import ProductGrid from "@/components/product/ProductGrid";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Find the product by ID
  const product = mockProducts.find(p => p.id === id);
  
  // Get similar products (same category)
  const similarProducts = product 
    ? mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4) 
    : [];
  
  if (!product) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
              <img 
                src={product.image} 
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {/* Normally we would have multiple images, this is a placeholder */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-md border bg-muted">
                  <img 
                    src={product.image} 
                    alt={`${product.title} thumbnail ${i+1}`}
                    className="h-full w-full object-cover opacity-80 hover:opacity-100 cursor-pointer transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-muted">
                  {product.condition}
                </Badge>
                <Badge variant="outline" className="bg-muted">
                  {product.category}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {product.location}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">
                {/* Mock description */}
                This {product.title} is in {product.condition.toLowerCase()} condition and ready for a new home. 
                Barely used, works perfectly, and comes with the original packaging. 
                Selling because I'm upgrading to a newer model. No scratches or dents, 
                just normal signs of light use. Great deal for this quality item!
              </p>
            </div>
            
            <div className="flex items-center gap-4 py-2">
              <div className="flex flex-col">
                <span className="font-medium">{product.seller.name}</span>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.seller.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.seller.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              {product.seller.verified && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Verified Seller
                </Badge>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="flex-1">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Seller
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {isWishlisted ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="bg-muted rounded-lg p-4 flex items-start gap-3 text-sm mt-4">
              <Shield className="h-5 w-5 text-marketplace-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Buyer Protection</p>
                <p className="text-muted-foreground">
                  Shop with confidence on Trove Finds. Our system ensures secure transactions and helps resolve any issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="container py-8">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="reviews">Seller Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-4 border rounded-lg mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Item Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">Condition</span>
                    <span className="font-medium">{product.condition}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">Brand</span>
                    <span className="font-medium">Example Brand</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">Age</span>
                    <span className="font-medium">2 years</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">Color</span>
                    <span className="font-medium">Black</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-muted-foreground">Listed</span>
                    <span className="font-medium">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="p-4 border rounded-lg mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Shipping Options</h3>
                <div className="mt-2 space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Local Pickup</div>
                      <div className="text-sm text-muted-foreground">Meet in a public location in {product.location}</div>
                    </div>
                    <div className="font-medium text-green-600">Free</div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Standard Shipping</div>
                      <div className="text-sm text-muted-foreground">Delivery in 3-5 business days</div>
                    </div>
                    <div className="font-medium">$8.99</div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Express Shipping</div>
                      <div className="text-sm text-muted-foreground">Delivery in 1-2 business days</div>
                    </div>
                    <div className="font-medium">$14.99</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 border rounded-lg mt-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold flex items-center">
                  Seller Rating 
                  <span className="ml-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.seller.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({product.seller.rating.toFixed(1)})
                  </span>
                </h3>
              </div>
              
              {/* Mock reviews */}
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                          {['JD', 'AK', 'MT'][i]}
                        </div>
                        <div>
                          <div className="font-medium">{['John D.', 'Amanda K.', 'Mark T.'][i]}</div>
                          <div className="text-xs text-muted-foreground">{['2 weeks ago', '1 month ago', '2 months ago'][i]}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${
                              j < [5, 4, 5][i]
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm">
                      {[
                        "Great seller! Fast response and item exactly as described. Would definitely buy from again.",
                        "Item was shipped quickly and carefully packaged. Very happy with my purchase.",
                        "Excellent communication throughout the entire process. The seller was accommodating when I needed to change pickup locations."
                      ][i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="container py-8 mb-12">
          <ProductGrid 
            products={similarProducts} 
            title="Similar Items"
            description="You might also like these related items"
          />
        </div>
      )}
    </>
  );
};

export default ProductPage;
