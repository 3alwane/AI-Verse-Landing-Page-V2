"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ChartTestComponent() {
  const charts = [
    {
      name: "Chart 1",
      varName: "--chart-1",
      desc: "Primary trend / Main metric",
    },
    {
      name: "Chart 2",
      varName: "--chart-2",
      desc: "Secondary metric / Teal accent",
    },
    { name: "Chart 3", varName: "--chart-3", desc: "Dark teal / Deep data" },
    {
      name: "Chart 4",
      varName: "--chart-4",
      desc: "Gold highlight / Warning level",
    },
    {
      name: "Chart 5",
      varName: "--chart-5",
      desc: "Vibrant orange / Distribution",
    },
  ];

  return (
    <Card className="w-full max-w-2xl bg-card text-card-foreground border-border shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Chart Color Palette Test
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Visualizing the active theme&apos;s custom chart variables
          (`--chart-1` through `--chart-5`).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Bar Graph Simulation */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Relative Distribution Preview</h4>
          <div className="h-8 w-full flex rounded-md overflow-hidden border border-border p-0.5 bg-muted/30 gap-0.5">
            <div
              className="h-full rounded-sm transition-all duration-300 hover:opacity-90 flex-1"
              style={{ backgroundColor: "hsl(var(--chart-1))" }}
              title="Chart 1"
            />
            <div
              className="h-full rounded-sm transition-all duration-300 hover:opacity-90 flex-1"
              style={{ backgroundColor: "hsl(var(--chart-2))" }}
              title="Chart 2"
            />
            <div
              className="h-full rounded-sm transition-all duration-300 hover:opacity-90 flex-1"
              style={{ backgroundColor: "hsl(var(--chart-3))" }}
              title="Chart 3"
            />
            <div
              className="h-full rounded-sm transition-all duration-300 hover:opacity-90 flex-1"
              style={{ backgroundColor: "hsl(var(--chart-4))" }}
              title="Chart 4"
            />
            <div
              className="h-full rounded-sm transition-all duration-300 hover:opacity-90 flex-1"
              style={{ backgroundColor: "hsl(var(--chart-5))" }}
              title="Chart 5"
            />
          </div>
        </div>

        {/* Individual Swatch Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {charts.map((chart) => (
            <div
              key={chart.varName}
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50"
            >
              <div
                className="w-10 h-10 rounded-md shrink-0 border border-border shadow-2xs"
                style={{ backgroundColor: `hsl(var(${chart.varName}))` }}
              />
              <div className="overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium truncate">
                    {chart.name}
                  </span>
                  <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-mono shrink-0">
                    {chart.varName}
                  </code>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {chart.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
