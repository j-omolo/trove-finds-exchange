
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-marketplace-primary/10 to-marketplace-secondary/10 rounded-xl overflow-hidden">
      <div className="container py-12 md:py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover Unique Treasures in Your Community
            </h1>
            <p className="text-lg text-muted-foreground">
              Buy, sell, and find amazing pre-owned items nearby or nationwide. Join thousands of people giving items a second life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-medium">
                <Link to="/sell">Sell an Item</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-medium">
                <Link to="/browse">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Items
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -top-10 right-0 w-32 h-32 bg-marketplace-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 left-10 w-40 h-40 bg-marketplace-secondary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                      alt="Kitchen appliance" 
                      className="rounded-lg h-40 w-full object-cover" />
                  <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                      alt="Camera" 
                      className="rounded-lg h-32 w-full object-cover" />
                </div>
                <div className="space-y-4 pt-10">
                  <img src="https://images.unsplash.com/photo-1637681068516-2b22116e68cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                      alt="Books" 
                      className="rounded-lg h-36 w-full object-cover" />
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                      alt="Laptop" 
                      className="rounded-lg h-44 w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
