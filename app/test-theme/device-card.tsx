"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sun, Thermometer, Volume2, Clock } from "lucide-react";

export default function SmartDeviceCard() {
  const [activeMode, setActiveMode] = useState("Cooking");
  const [isOn, setIsOn] = useState(true);
  const [brightness, setBrightness] = useState(80);
  const [colorTemp, setColorTemp] = useState(65);
  const [volume, setVolume] = useState(40);
  const [fade, setFade] = useState(10);

  return (
    <Card className="p-6 max-w-xl mx-auto bg-card text-card-foreground border-border shadow-sm mt-6">
      <CardHeader className="flex flex-row items-start justify-between pb-4 p-0">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Kitchen Island</h2>
          <p className="text-sm text-muted-foreground">Hue Color Ambient</p>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => setIsOn(!isOn)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
            isOn ? "bg-primary" : "bg-muted"
          }`}
          aria-label="Toggle Device"
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              isOn ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </CardHeader>

      <CardContent className="p-0 space-y-6 pt-4">
        {/* Mode Selection Buttons */}
        <div className="flex flex-wrap gap-2">
          {["Cooking", "Dining", "Nightlight", "Focus"].map((mode) => {
            const isActive = activeMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${
                  isActive
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-foreground hover:bg-muted/50"
                }`}
              >
                {mode}
              </button>
            );
          })}
        </div>

        {/* Sliders Container */}
        <div className="space-y-3 pt-2">
          {/* Brightness */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 w-32">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Brightness</span>
            </div>
            <div className="flex-1 max-w-[220px] flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg appearance-none"
              />
            </div>
          </div>

          {/* Color Temp */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 w-32">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Color Temp</span>
            </div>
            <div className="flex-1 max-w-[220px] flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={colorTemp}
                onChange={(e) => setColorTemp(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg appearance-none"
              />
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 w-32">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Volume</span>
            </div>
            <div className="flex-1 max-w-[220px] flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg appearance-none"
              />
            </div>
          </div>

          {/* Fade */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 w-32">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Fade</span>
            </div>
            <div className="flex-1 max-w-[220px] flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={fade}
                onChange={(e) => setFade(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg appearance-none"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
