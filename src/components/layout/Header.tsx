
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, Heart, MessageSquare, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // This will be replaced with actual auth

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-marketplace-primary">Trove</span>
          <span className="hidden sm:inline text-lg">Finds</span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search for items..." 
            className="pl-10 w-full bg-muted"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/sell">
            <Button variant="ghost">Sell</Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/messages">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-listings">My Listings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsAuthenticated(false)}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => setIsAuthenticated(true)}>
                Login
              </Button>
              <Button>Sign Up</Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 md:hidden">
            <div className="relative flex mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search for items..." 
                className="pl-10 w-full bg-muted"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/sell" className="w-full">
                <Button variant="outline" className="w-full justify-start">Sell an Item</Button>
              </Link>
              <Link to="/wishlist" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
              </Link>
              <Link to="/messages" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Messages
                </Button>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-5 w-5 mr-2" />
                      My Profile
                    </Button>
                  </Link>
                  <Link to="/my-listings" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      My Listings
                    </Button>
                  </Link>
                  <Link to="/settings" className="w-full">
                    <Button variant="outline" className="w-full justify-start">
                      Settings
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      setIsAuthenticated(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      setIsAuthenticated(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button className="w-full">Sign Up</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
