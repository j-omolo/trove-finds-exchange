import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import BrowsePage from "./pages/BrowsePage";
import WishlistPage from "./pages/WishlistPage";
import SellPage from "./pages/SellPage";
import MessagesPage from "./pages/MessagesPage";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/category/:categoryId" element={<BrowsePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Route>
          {/* ADD ALL CUSTOM NON-LAYOUT ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
