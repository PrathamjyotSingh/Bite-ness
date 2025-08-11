import { useState, useEffect ,useRef} from "react";
import { ReelCard } from "@/components/ReelCard";
import { BottomNav } from "@/components/BottomNav";
import { SearchFilters } from "@/components/SearchFilters";
import { RestaurantDetail } from "@/components/RestaurantDetail";
import { mockReels, mockRestaurants, FoodReel, Restaurant } from "@/data/mockData";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [reels, setReels] = useState<FoodReel[]>(mockReels);
  const [restaurants] = useState<Restaurant[]>(mockRestaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [savedRestaurants, setSavedRestaurants] = useState<string[]>([]);
  const [filteredReels, setFilteredReels] = useState<FoodReel[]>(mockReels);



  const scrollThrottle = useRef(false);
const touchStartY = useRef<number | null>(null);
  // Handle scroll for reel navigation
  useEffect(() => {
  const handleWheel = (e: WheelEvent) => {
    if (activeTab === "home" && !selectedRestaurant) {
      e.preventDefault();
      if (scrollThrottle.current) return;
      scrollThrottle.current = true;

      // Only move one reel per gesture, regardless of deltaY size
      if (e.deltaY > 0 && currentReelIndex < filteredReels.length - 1) {
        setCurrentReelIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && currentReelIndex > 0) {
        setCurrentReelIndex(prev => prev - 1);
      }

      setTimeout(() => {
        scrollThrottle.current = false;
      }, 600); // Adjust as needed
    }
  };

  window.addEventListener('wheel', handleWheel, { passive: false });
  return () => window.removeEventListener('wheel', handleWheel);
}, [activeTab, selectedRestaurant, currentReelIndex, filteredReels.length]);

// ...existing code...
useEffect(() => {
  const handleTouchStart = (e: TouchEvent) => {
    if (activeTab === "home" && !selectedRestaurant) {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (
      activeTab === "home" &&
      !selectedRestaurant &&
      touchStartY.current !== null &&
      !scrollThrottle.current
    ) {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      // Only trigger if swipe is big enough
      if (Math.abs(diff) > 60) {
        scrollThrottle.current = true;
        if (diff > 0 && currentReelIndex < filteredReels.length - 1) {
          // Swipe up: next reel
          setCurrentReelIndex(prev => prev + 1);
        } else if (diff < 0) {
          // Swipe down: previous reel or at first reel
          if (currentReelIndex > 0) {
            setCurrentReelIndex(prev => prev - 1);
          } else {
            // At first reel, prevent pull-to-refresh
            e.preventDefault();
          }
        }
        setTimeout(() => {
          scrollThrottle.current = false;
        }, 600);
      }
      touchStartY.current = null;
    }
  };

  window.addEventListener("touchstart", handleTouchStart, { passive: false });
  window.addEventListener("touchend", handleTouchEnd, { passive: false });
  return () => {
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchend", handleTouchEnd);
  };
}, [activeTab, selectedRestaurant, currentReelIndex, filteredReels.length]);
// ...existing code...

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab === "home" && !selectedRestaurant) {
        if (e.key === "ArrowDown" && currentReelIndex < filteredReels.length - 1) {
          setCurrentReelIndex(prev => prev + 1);
        } else if (e.key === "ArrowUp" && currentReelIndex > 0) {
          setCurrentReelIndex(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, selectedRestaurant, currentReelIndex, filteredReels.length]);

  const handleLike = (reelId: string) => {
    setReels(prev => prev.map(reel => 
      reel.id === reelId 
        ? { 
            ...reel, 
            isLiked: !reel.isLiked,
            likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
          }
        : reel
    ));
    toast.success(reels.find(r => r.id === reelId)?.isLiked ? "Removed from likes" : "Added to likes");
  };

  const handleSaveReel = (reelId: string) => {
    setReels(prev => prev.map(reel => 
      reel.id === reelId 
        ? { ...reel, isSaved: !reel.isSaved }
        : reel
    ));
    toast.success(reels.find(r => r.id === reelId)?.isSaved ? "Removed from saved" : "Saved for later");
  };

  const handleSaveRestaurant = (restaurantId: string) => {
    setSavedRestaurants(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
    toast.success(
      savedRestaurants.includes(restaurantId) 
        ? "Restaurant removed from saved" 
        : "Restaurant saved"
    );
  };

  const handleRestaurantClick = (restaurantId: string) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      setSelectedRestaurant(restaurant);
    }
  };

  const handleSearchChange = (query: string) => {
    if (!query.trim()) {
      setFilteredReels(mockReels);
      return;
    }
    
    const filtered = mockReels.filter(reel => {
      const restaurant = restaurants.find(r => r.id === reel.restaurantId);
      return (
        reel.title.toLowerCase().includes(query.toLowerCase()) ||
        reel.description.toLowerCase().includes(query.toLowerCase()) ||
        restaurant?.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant?.cuisine.toLowerCase().includes(query.toLowerCase()) ||
        reel.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    });
    
    setFilteredReels(filtered);
    setCurrentReelIndex(0);
  };

  const handleFiltersChange = (filters: any) => {
    let filtered = mockReels;
    
    // Apply cuisine filter
    if (filters.cuisine) {
      filtered = filtered.filter(reel => {
        const restaurant = restaurants.find(r => r.id === reel.restaurantId);
        return restaurant?.cuisine === filters.cuisine;
      });
    }
    
    // Apply price level filter
    filtered = filtered.filter(reel => {
      const restaurant = restaurants.find(r => r.id === reel.restaurantId);
      return restaurant && restaurant.priceLevel >= filters.priceLevel[0] && restaurant.priceLevel <= filters.priceLevel[1];
    });
    
    // Apply distance filter
    filtered = filtered.filter(reel => {
      const restaurant = restaurants.find(r => r.id === reel.restaurantId);
      return restaurant && restaurant.distance <= filters.distance[0];
    });
    
    // Apply open now filter
    if (filters.openNow) {
      filtered = filtered.filter(reel => {
        const restaurant = restaurants.find(r => r.id === reel.restaurantId);
        return restaurant?.isOpen;
      });
    }
    
    setFilteredReels(filtered);
    setCurrentReelIndex(0);
  };

  const renderContent = () => {
    if (selectedRestaurant) {
      return (
        <RestaurantDetail
          restaurant={selectedRestaurant}
          onBack={() => setSelectedRestaurant(null)}
          onSave={handleSaveRestaurant}
          isSaved={savedRestaurants.includes(selectedRestaurant.id)}
        />
      );
    }

    switch (activeTab) {
      case "home":
        return (
          <div className="h-screen overflow-hidden">
            {filteredReels.length > 0 ? (
              <div 
                className="h-full transition-transform duration-300 ease-out"
                style={{ 
                  transform: `translateY(-${currentReelIndex * 100}vh)` 
                }}
              >
                {filteredReels.map((reel, index) => {
                  const restaurant = restaurants.find(r => r.id === reel.restaurantId);
                  if (!restaurant) return null;
                  
                  return (
                    <ReelCard
                      key={reel.id}
                      reel={reel}
                      restaurant={restaurant}
                      onLike={handleLike}
                      onSave={handleSaveReel}
                      onRestaurantClick={handleRestaurantClick}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="h-screen flex items-center justify-center bg-background">
                <div className="text-center p-8">
                  <h2 className="text-2xl font-bold mb-4">No reels found</h2>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              </div>
            )}
          </div>
        );
      
      case "search":
        return (
          <div className="min-h-screen bg-background pt-4">
            <SearchFilters 
              onSearchChange={handleSearchChange}
              onFiltersChange={handleFiltersChange}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Search Results</h2>
              {filteredReels.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {filteredReels.map((reel) => {
                    const restaurant = restaurants.find(r => r.id === reel.restaurantId);
                    if (!restaurant) return null;
                    
                    return (
                      <div 
                        key={reel.id}
                        className="bg-card rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleRestaurantClick(restaurant.id)}
                      >
                        <div 
                          className="h-32 bg-cover bg-center"
                          style={{ backgroundImage: `url(${reel.imageUrl})` }}
                        />
                        <div className="p-3">
                          <h3 className="font-semibold text-sm mb-1">{restaurant.name}</h3>
                          <p className="text-xs text-muted-foreground">{restaurant.cuisine}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No results found</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case "saved":
        const savedReels = reels.filter(reel => reel.isSaved);
        return (
          <div className="min-h-screen bg-background p-4">
            <h1 className="text-2xl font-bold mb-6 pt-4">Saved</h1>
            {savedReels.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {savedReels.map((reel) => {
                  const restaurant = restaurants.find(r => r.id === reel.restaurantId);
                  if (!restaurant) return null;
                  
                  return (
                    <div 
                      key={reel.id}
                      className="bg-card rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => handleRestaurantClick(restaurant.id)}
                    >
                      <div 
                        className="h-32 bg-cover bg-center"
                        style={{ backgroundImage: `url(${reel.imageUrl})` }}
                      />
                      <div className="p-3">
                        <h3 className="font-semibold text-sm mb-1">{restaurant.name}</h3>
                        <p className="text-xs text-muted-foreground">{restaurant.cuisine}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No saved items yet</p>
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground">This feature is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground max-w-md mx-auto">
      {renderContent()}
      
      {!selectedRestaurant && (
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      )}
    </div>
  );
};

export default Index;
