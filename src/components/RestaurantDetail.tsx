import { ArrowLeft, Phone, MapPin, Clock, Star, Share, Bookmark } from "lucide-react";
import { Restaurant } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onBack: () => void;
  onSave: (restaurantId: string) => void;
  isSaved: boolean;
}

export const RestaurantDetail = ({ restaurant, onBack, onSave, isSaved }: RestaurantDetailProps) => {
  const getPriceDisplay = (level: number) => {
    return "$".repeat(level);
  };

  const getStatusColor = (isOpen: boolean) => {
    return isOpen ? "text-success" : "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Share className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2"
              onClick={() => onSave(restaurant.id)}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-primary text-primary' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Restaurant Image */}
      <div 
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${restaurant.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Restaurant Info */}
      <div className="p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-muted-foreground mb-4">{restaurant.description}</p>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-warning text-warning" />
              <span className="font-semibold">{restaurant.rating}</span>
            </div>
            
            <Badge variant="secondary">
              {getPriceDisplay(restaurant.priceLevel)}
            </Badge>
            
            <Badge variant="outline">
              {restaurant.cuisine}
            </Badge>
            
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{restaurant.distance}km away</span>
            </div>
          </div>
        </div>

        {/* Status & Hours */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span className={`font-medium ${getStatusColor(restaurant.isOpen)}`}>
              {restaurant.isOpen ? "Open Now" : "Closed"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {restaurant.isOpen ? "Closes at 10:00 PM" : "Opens at 11:00 AM"}
          </p>
        </Card>

        {/* Contact Info */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Contact & Location</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm">{restaurant.address}</p>
                <Button variant="link" className="p-0 h-auto text-primary text-sm">
                  Get Directions
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm">{restaurant.phone}</p>
                <Button variant="link" className="p-0 h-auto text-primary text-sm">
                  Call Restaurant
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Menu Highlights */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Menu Highlights</h3>
          <div className="grid grid-cols-1 gap-3">
            {restaurant.menuHighlights.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="font-medium">{item}</span>
                <Badge variant="outline" className="text-xs">Popular</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-20">
          <Button className="w-full bg-gradient-primary text-primary-foreground h-12 text-lg font-semibold">
            Order Online
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              Make Reservation
            </Button>
            <Button variant="outline" className="h-12">
              View Full Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};