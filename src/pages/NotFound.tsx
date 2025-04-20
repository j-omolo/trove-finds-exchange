import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-md text-center px-4">
        <div className="text-marketplace-primary text-9xl font-bold mb-6">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          We can't seem to find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/browse">
              <Search className="mr-2 h-5 w-5" />
              Browse Items
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
