
import { useState } from "react";
import { mockProducts, categories } from "@/data/mockData";
import ProductGrid from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, X, CheckSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Product } from "@/components/product/ProductCard";

const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

const BrowsePage = () => {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("newest");
  
  const applyFilters = () => {
    let filtered = [...mockProducts];
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply price range
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => 
        selectedCategories.includes(p.category)
      );
    }
    
    // Apply condition filter
    if (selectedConditions.length > 0) {
      filtered = filtered.filter(p => 
        selectedConditions.includes(p.condition)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app, this would sort by date
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        break;
    }
    
    setFilteredProducts(filtered);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedConditions([]);
    setSortOption("newest");
    setFilteredProducts(mockProducts);
  };
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const toggleCondition = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Items</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 space-y-8">
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => toggleCategory(category.name)}
                  />
                  <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Condition</h3>
            <div className="space-y-2">
              {conditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`condition-${condition}`} 
                    checked={selectedConditions.includes(condition)}
                    onCheckedChange={() => toggleCondition(condition)}
                  />
                  <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="px-2">
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          
          <div className="space-y-3 pt-4">
            <Button onClick={applyFilters} className="w-full">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search items..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
            
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down your search with these filters
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-6 py-4">
                    <div>
                      <h3 className="font-medium mb-3">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mob-category-${category.id}`} 
                              checked={selectedCategories.includes(category.name)}
                              onCheckedChange={() => toggleCategory(category.name)}
                            />
                            <Label htmlFor={`mob-category-${category.id}`}>{category.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Condition</h3>
                      <div className="space-y-2">
                        {conditions.map((condition) => (
                          <div key={condition} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mob-condition-${condition}`} 
                              checked={selectedConditions.includes(condition)}
                              onCheckedChange={() => toggleCondition(condition)}
                            />
                            <Label htmlFor={`mob-condition-${condition}`}>{condition}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 1000]}
                          max={1000}
                          step={10}
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline" onClick={clearFilters}>Clear All</Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button onClick={applyFilters}>Apply Filters</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedConditions.length > 0 || 
             priceRange[0] > 0 || priceRange[1] < 1000 || searchTerm) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchTerm && (
                <Badge category="search" value={searchTerm} onClick={() => setSearchTerm("")} />
              )}
              
              {selectedCategories.map(cat => (
                <Badge 
                  key={cat} 
                  category="Category" 
                  value={cat} 
                  onClick={() => toggleCategory(cat)} 
                />
              ))}
              
              {selectedConditions.map(cond => (
                <Badge 
                  key={cond} 
                  category="Condition" 
                  value={cond} 
                  onClick={() => toggleCondition(cond)} 
                />
              ))}
              
              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Badge 
                  category="Price" 
                  value={`$${priceRange[0]} - $${priceRange[1]}`} 
                  onClick={() => setPriceRange([0, 1000])} 
                />
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilters}
                className="h-7 gap-1 text-xs"
              >
                <X className="h-3 w-3" />
                Clear All
              </Button>
            </div>
          )}
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-16 border rounded-lg">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-medium mb-2">No items found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for filter badges
interface BadgeProps {
  category: string;
  value: string;
  onClick: () => void;
}

const Badge = ({ category, value, onClick }: BadgeProps) => (
  <div className="flex items-center gap-1 bg-muted text-xs rounded-full py-1 pl-3 pr-1">
    {category !== "search" && (
      <span className="text-muted-foreground">{category}:</span>
    )}
    <span className="font-medium">{value}</span>
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={onClick}
      className="h-5 w-5 rounded-full"
    >
      <X className="h-3 w-3" />
    </Button>
  </div>
);

export default BrowsePage;
