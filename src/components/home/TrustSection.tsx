
import { Shield, MessageSquare, Star, Truck } from "lucide-react";

const TrustSection = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-marketplace-primary" />,
      title: "Buyer Protection",
      description: "Every purchase is protected with our secure transaction system."
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-marketplace-primary" />,
      title: "Direct Communication",
      description: "Connect directly with sellers to ask questions or arrange details."
    },
    {
      icon: <Star className="h-10 w-10 text-marketplace-primary" />,
      title: "Verified Users",
      description: "Our rating system helps you trade with confidence and trust."
    },
    {
      icon: <Truck className="h-10 w-10 text-marketplace-primary" />,
      title: "Flexible Delivery",
      description: "Choose local pickup or shipping options that work for you."
    }
  ];

  return (
    <div className="bg-muted py-12 md:py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Trade with Confidence</h2>
          <p className="text-muted-foreground">
            At Trove Finds, safety and trust are our top priorities. We've built features to ensure a secure and positive experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
