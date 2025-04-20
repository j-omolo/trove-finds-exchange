
import ProductCard, { Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
}

const ProductGrid = ({ products, title, description }: ProductGridProps) => {
  return (
    <div className="space-y-6">
      {(title || description) && (
        <div className="text-center mb-8">
          {title && <h2 className="text-2xl font-semibold mb-2">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} featured={product.isFeatured} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
