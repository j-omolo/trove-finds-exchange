
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { categories } from "@/data/mockData";
import { Camera, Upload, Info } from "lucide-react";
import { useState } from "react";

const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

const SellPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, we would redirect to the listing page
      alert("Your item has been listed successfully!");
    }, 1500);
  };
  
  const addSampleImage = () => {
    // Add a sample image for demonstration
    const sampleImages = [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1637681068516-2b22116e68cf",
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    ];
    
    if (images.length < 4) {
      const randomImage = sampleImages[images.length];
      setImages([...images, randomImage]);
    }
  };
  
  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Sell an Item</h1>
      <p className="text-muted-foreground mb-8">
        Create a listing to sell your items to thousands of buyers
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
          <CardDescription>
            Provide detailed information about your item to attract buyers
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., Apple MacBook Pro 13-inch (2019)" 
                required 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select required>
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition.toLowerCase()}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  placeholder="e.g., 99.99" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="e.g., Portland, OR" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your item in detail including any defects or special features..."
                className="min-h-32"
                required
              />
            </div>
            
            <div className="space-y-3">
              <Label>Photos</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className="aspect-square border rounded-md bg-muted flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors"
                    onClick={addSampleImage}
                  >
                    {images[i] ? (
                      <img 
                        src={images[i]} 
                        alt={`Item preview ${i+1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <>
                        <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">
                          {i === 0 ? 'Add main photo' : 'Add photo'}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground flex items-center">
                <Info className="h-4 w-4 mr-1" />
                Click on the boxes to add sample photos (demonstration only)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (optional)</Label>
              <Input 
                id="tags" 
                placeholder="e.g., electronics, laptop, apple (separate with commas)"
              />
              <p className="text-xs text-muted-foreground">
                Tags help buyers find your item when searching
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex-col sm:flex-row gap-4 sm:justify-between">
            <div className="rounded-lg bg-muted p-3 flex items-center text-sm w-full sm:w-auto">
              <Info className="h-4 w-4 mr-2 text-marketplace-primary" />
              <span>Your listing will be reviewed before publishing</span>
            </div>
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish Listing"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SellPage;
