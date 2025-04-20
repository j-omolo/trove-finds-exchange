
import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductGrid from "@/components/product/ProductGrid";
import TrustSection from "@/components/home/TrustSection";
import { featuredProducts, recentProducts, popularProducts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <section className="container py-8">
        <HeroBanner />
      </section>
      
      <section className="container py-12">
        <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
        <CategoryGrid />
      </section>
      
      <TrustSection />
      
      <section className="container py-12">
        <ProductGrid 
          products={featuredProducts} 
          title="Featured Items"
          description="Handpicked treasures you don't want to miss"
        />
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/browse">View All Featured Items</Link>
          </Button>
        </div>
      </section>
      
      <section className="container py-12">
        <ProductGrid 
          products={recentProducts} 
          title="Recently Added"
          description="Fresh finds just added to the marketplace"
        />
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/browse">Browse All Items</Link>
          </Button>
        </div>
      </section>
      
      <section className="container py-12 mb-12">
        <div className="bg-gradient-to-r from-marketplace-primary/20 to-marketplace-secondary/20 rounded-xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Have items to sell?</h2>
            <p className="text-lg mb-8">
              Turn your unused items into cash. Create a listing in minutes and connect with buyers in your area or nationwide.
            </p>
            <Button asChild size="lg">
              <Link to="/sell">Start Selling</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
