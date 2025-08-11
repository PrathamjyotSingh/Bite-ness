import { useState } from "react";
import { Search, Filter, MapPin, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { getCuisineTypes, getPriceLevels } from "@/data/mockData";

interface SearchFiltersProps {
  onSearchChange: (query: string) => void;
  onFiltersChange: (filters: any) => void;
}

export const SearchFilters = ({ onSearchChange, onFiltersChange }: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    cuisine: "",
    priceLevel: [1, 4],
    distance: [5],
    openNow: false,
    delivery: false
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      cuisine: "",
      priceLevel: [1, 4],
      distance: [5],
      openNow: false,
      delivery: false
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value !== "";
    if (Array.isArray(value)) return value[0] !== 1 || value[1] !== 4;
    return false;
  }).length;

  return (
    <div className="space-y-4 p-4 bg-background border-b border-border">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search restaurants, dishes..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-12 bg-secondary border-0 focus:ring-2 focus:ring-primary"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
            >
              <Filter className="w-4 h-4" />
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center bg-primary text-primary-foreground">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              {/* Cuisine Type */}
              <div>
                <label className="text-sm font-medium mb-2 block">Cuisine Type</label>
                <Select value={filters.cuisine} onValueChange={(value) => handleFilterChange("cuisine", value)}>
                  <SelectTrigger className="bg-secondary border-0">
                    <SelectValue placeholder="All cuisines" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All cuisines</SelectItem>
                    {getCuisineTypes().map((cuisine) => (
                      <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Level */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Price Range: {getPriceLevels().slice(filters.priceLevel[0] - 1, filters.priceLevel[1]).map(p => p.label).join(" - ")}
                </label>
                <Slider
                  value={filters.priceLevel}
                  onValueChange={(value) => handleFilterChange("priceLevel", value)}
                  max={4}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Distance */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Distance: {filters.distance[0]}km
                </label>
                <Slider
                  value={filters.distance}
                  onValueChange={(value) => handleFilterChange("distance", value)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Quick Filters */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Open Now</span>
                  </div>
                  <Switch
                    checked={filters.openNow}
                    onCheckedChange={(checked) => handleFilterChange("openNow", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Delivery Available</span>
                  </div>
                  <Switch
                    checked={filters.delivery}
                    onCheckedChange={(checked) => handleFilterChange("delivery", checked)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={clearFilters} className="flex-1">
                  Clear All
                </Button>
                <Button className="flex-1 bg-gradient-primary text-primary-foreground">
                  Apply Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.cuisine && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.cuisine}
              <button
                onClick={() => handleFilterChange("cuisine", "")}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.openNow && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Open Now
              <button
                onClick={() => handleFilterChange("openNow", false)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.delivery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Delivery
              <button
                onClick={() => handleFilterChange("delivery", false)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};