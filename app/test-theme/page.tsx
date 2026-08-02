"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ThemeName, themes } from "../themes";
import ThemeChartCard from "./chartCards";
import ColorPaletteCard from "./color-palette";
import ThemeTestCard from "./theme-test-card";
import SmartDeviceCard from "./device-card";
import ThemeDropdown from "./theme-dropdown";
import ChartTestComponent from "./chartTestComponent";

export default function Page() {
  const [theme, setTheme] = useState<ThemeName>("terracotta");
  const { resolvedTheme, setTheme: setSystemTheme } = useTheme();

  // Automatically select light or dark styles based on next-themes state
  const activeMode = resolvedTheme === "dark" ? "dark" : "light";
  const currentThemeStyle = themes[theme][activeMode];

  return (
    <div className="p-8 space-y-6 bg-background min-h-screen">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <ThemeDropdown currentTheme={theme} onSelectTheme={setTheme} />

        <button
          onClick={() =>
            setSystemTheme(resolvedTheme === "dark" ? "light" : "dark")
          }
          className="px-4 py-2 text-sm font-medium border border-border rounded-md bg-card text-card-foreground hover:bg-muted transition-colors"
        >
          Toggle Dark Mode ({activeMode})
        </button>
      </div>

      {/* Themed Wrapper Container */}
      <div
        style={currentThemeStyle as React.CSSProperties}
        className="transition-colors duration-200 grid grid-cols-2 gap-4"
      >
        <ThemeTestCard />
        <ColorPaletteCard />
        <ThemeChartCard />
        <SmartDeviceCard />
        <ChartTestComponent />
      </div>
    </div>
  );
}
