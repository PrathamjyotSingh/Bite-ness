import { Heart, MessageCircle, Share, Bookmark, MapPin, Star, Clock } from "lucide-react";
import { FoodReel, Restaurant } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReelCardProps {
  reel: FoodReel;
  restaurant: Restaurant;
  onLike: (reelId: string) => void;
  onSave: (reelId: string) => void;
  onRestaurantClick: (restaurantId: string) => void;
}

export const ReelCard = ({ reel, restaurant, onLike, onSave, onRestaurantClick }: ReelCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const getPriceDisplay = (level: number) => {
    return "$".repeat(level);
  };

  return (
    <div className="relative w-full h-screen bg-card snap-start">
      {/* Background Image/Video */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${reel.imageUrl})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
        {/* Top Section - Creator Info */}
        <div className="flex items-center justify-between pt-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-black font-semibold text-sm">
              {reel.creator.charAt(1).toUpperCase()}
            </div>
            <span className="text-sm font-medium">{reel.creator}</span>
          </div>
          <Button variant="secondary" size="sm" className="backdrop-blur-sm">
            Follow
          </Button>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4">
          {/* Restaurant Card */}
          <div 
            className="bg-card/80 backdrop-blur-md rounded-2xl p-4 border border-border/50 cursor-pointer hover:bg-card/90 transition-all duration-300"
            onClick={() => onRestaurantClick(restaurant.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground mb-1">{restaurant.name}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-foreground font-medium">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.distance}km</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {getPriceDisplay(restaurant.priceLevel)}
                  </Badge>
                  {restaurant.isOpen && (
                    <div className="flex items-center gap-1 text-success">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">Open</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="flex-1 bg-gradient-primary hover:opacity-90 text-black font-semibold"
              >
                View Menu
              </Button>
              <Button variant="secondary" size="sm" className="px-3">
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Reel Content */}
          <div className="space-y-3">
            <div>
              <h2 className="font-bold text-xl mb-2">{reel.title}</h2>
              <p className="text-sm text-gray-300 leading-relaxed">{reel.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {reel.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-secondary/50 backdrop-blur-sm">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span>{formatNumber(reel.views)} views</span>
              <span>{formatNumber(reel.likes)} likes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-12 h-12 rounded-full backdrop-blur-sm hover:bg-white/20"
          onClick={() => onLike(reel.id)}
        >
          <Heart 
            className={`w-6 h-6 ${reel.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
          />
        </Button>
        <div className="text-center text-xs text-white">
          {formatNumber(reel.likes)}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-12 h-12 rounded-full backdrop-blur-sm hover:bg-white/20"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-12 h-12 rounded-full backdrop-blur-sm hover:bg-white/20"
          onClick={() => onSave(reel.id)}
        >
          <Bookmark 
            className={`w-6 h-6 ${reel.isSaved ? 'fill-primary text-primary' : 'text-white'}`} 
          />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-12 h-12 rounded-full backdrop-blur-sm hover:bg-white/20"
        >
          <Share className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};