"use client";

import { useState, useRef, useEffect } from "react";
import {
  Check,
  ChevronDown,
  Search,
  Star,
  Shuffle,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeName, themes } from "../themes";
import { useTheme } from "next-themes";

interface ThemeDropdownProps {
  currentTheme: ThemeName;
  onSelectTheme: (theme: ThemeName) => void;
}

export default function ThemeDropdown({
  currentTheme,
  onSelectTheme,
}: ThemeDropdownProps) {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "dark" : "light";

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<
    Partial<Record<ThemeName, boolean>>
  >({});

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus the input safely when the dropdown opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Clear search query optionally when closed
      setSearchQuery("");
    }
  }, [open]);

  // Clean labels for your themes
  const themeLabels: Record<ThemeName, string> = {
    default: "Default",
    fintech: "Fintech",
    saas: "SaaS",
    terracotta: "Terracotta",
    studio: "Studio",
    editorial: "Editorial",
    playful: "Playful",
  };

  const activeThemeData = themes[currentTheme][mode];

  // Helper function to extract color tokens safely
  const getThemeColors = (themeKey: ThemeName) => {
    const data = themes[themeKey][mode];
    return {
      primary: data["--primary"] ? `hsl(${data["--primary"]})` : "currentColor",
      bg: data["--background"] ? `hsl(${data["--background"]})` : "transparent",
      card: data["--card"] ? `hsl(${data["--card"]})` : "transparent",
      border: data["--border"] ? `hsl(${data["--border"]})` : "currentColor",
    };
  };

  const activeColors = getThemeColors(currentTheme);

  // Toggle favorite status for a theme
  const toggleFavorite = (themeKey: ThemeName, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [themeKey]: !prev[themeKey],
    }));
  };

  // Shuffle handler to pick a random theme
  const handleShuffle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const keys = Object.keys(themes) as ThemeName[];
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    onSelectTheme(randomKey);
  };

  // Reset handler to default theme
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectTheme("default");
  };

  // Filter themes based on search query
  const filteredThemes = (Object.keys(themes) as ThemeName[]).filter((key) => {
    const label = themeLabels[key] || key;
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Separate favorites and non-favorites for clean grouping and separator placement
  const favoriteThemes = filteredThemes.filter((key) => favorites[key]);
  const otherThemes = filteredThemes.filter((key) => !favorites[key]);

  const renderThemeItem = (themeKey: ThemeName) => {
    const themeData = themes[themeKey][mode];
    const isSelected = currentTheme === themeKey;
    const colors = getThemeColors(themeKey);
    const isFavorite = !!favorites[themeKey];

    return (
      <DropdownMenuItem
        key={themeKey}
        onClick={() => onSelectTheme(themeKey)}
        className={`flex items-center justify-between cursor-pointer py-2 px-2.5 rounded-md transition-colors ${
          isSelected
            ? "bg-accent text-accent-foreground font-medium"
            : "hover:bg-muted/60 text-foreground"
        }`}
      >
        <div className="flex items-center gap-2.5 truncate pr-2">
          {/* 2x2 Color Swatch Grid */}
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4 rounded p-0.5 border border-border bg-muted/40 shrink-0">
            <div
              className="rounded-[1px]"
              style={{ backgroundColor: colors.primary }}
            />
            <div
              className="rounded-[1px]"
              style={{ backgroundColor: colors.bg }}
            />
            <div
              className="rounded-[1px]"
              style={{ backgroundColor: colors.card }}
            />
            <div
              className="rounded-[1px]"
              style={{ backgroundColor: colors.border }}
            />
          </div>

          {/* Theme Name rendered in its respective font */}
          <span
            className="text-sm truncate"
            style={{ fontFamily: themeData.fontFamily as string }}
          >
            {themeLabels[themeKey] || themeKey}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isSelected && (
            <Check className="h-3.5 w-3.5 text-muted-foreground" />
          )}
          <button
            type="button"
            onClick={(e) => toggleFavorite(themeKey, e)}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title={isFavorite ? "Unfavorite" : "Favorite"}
          >
            <Star
              className={`h-3.5 w-3.5 ${
                isFavorite ? "fill-primary text-primary" : ""
              }`}
            />
          </button>
        </div>
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-between w-52 bg-card text-card-foreground border-border"
        >
          <div className="flex items-center gap-2.5 truncate">
            {/* Active Theme 2x2 Color Swatch Grid */}
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4 rounded p-0.5 border border-border bg-muted/40 shrink-0">
              <div
                className="rounded-[1px]"
                style={{ backgroundColor: activeColors.primary }}
              />
              <div
                className="rounded-[1px]"
                style={{ backgroundColor: activeColors.bg }}
              />
              <div
                className="rounded-[1px]"
                style={{ backgroundColor: activeColors.card }}
              />
              <div
                className="rounded-[1px]"
                style={{ backgroundColor: activeColors.border }}
              />
            </div>

            {/* Active Theme Name in its Font */}
            <span
              className="truncate text-sm"
              style={{ fontFamily: activeThemeData.fontFamily as string }}
            >
              {themeLabels[currentTheme] || currentTheme}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50 ml-2 shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 bg-card text-card-foreground border-border shadow-lg p-0 overflow-hidden">
        {/* Top Header Row with Search Bar on Left and Action Icons on Right */}
        <div className="flex items-center justify-between px-2 py-1.5 border-b border-border bg-muted/30 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className="w-full h-8 pl-8 pr-2.5 py-1 border-none bg-transparent text-xs rounded-md border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={handleShuffle}
              title="Shuffle Theme"
            >
              <Shuffle className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={handleReset}
              title="Reset to Default"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Themes List Container (Increased max-height to max-h-80) */}
        <div className="max-h-80 overflow-y-auto p-1.5 space-y-0.5">
          {filteredThemes.length === 0 ? (
            <div className="py-4 text-center text-xs text-muted-foreground">
              No themes found
            </div>
          ) : (
            <>
              {favoriteThemes.map((themeKey) => renderThemeItem(themeKey))}
              {favoriteThemes.length > 0 && otherThemes.length > 0 && (
                <DropdownMenuSeparator className="bg-border my-1" />
              )}
              {otherThemes.map((themeKey) => renderThemeItem(themeKey))}
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
