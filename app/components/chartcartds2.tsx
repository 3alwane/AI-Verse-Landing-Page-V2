"use client";

import * as React from "react";

import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ColorName =
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "orange"
  | "purple"
  | "pink"
  | "teal"
  | "cyan"
  | "lime"
  | "indigo"
  | "brown"
  | "gray"
  | "black"
  | "white"
  | "magenta"
  | "violet"
  | "gold"
  | "silver";
type OpacityColor = "25%" | "50%" | "75%" | "100%";
type HSLColor = `hsl(${string}, ${string}, ${string}${string}`;

const getHSLColor = (
  color: ColorName,
  opacity: OpacityColor = "100%",
): HSLColor => {
  const opacityMap: Record<OpacityColor, string> = {
    "25%": ", 25%)",
    "50%": ", 50%)",
    "75%": ", 75%)",
    "100%": ")",
  };

  const colorMap: Record<ColorName, string> = {
    red: "hsl(0, 70%, 50%",
    green: "hsl(120, 70%, 50%",
    blue: "hsl(210, 70%, 50%",
    yellow: "hsl(38, 98%, 51%",
    orange: "hsl(30, 100%, 50%",
    purple: "hsl(270, 70%, 50%",
    pink: "hsl(330, 100%, 70%",
    teal: "hsl(180, 70%, 50%",
    cyan: "hsl(180, 100%, 50%",
    lime: "hsl(90, 70%, 50%",
    indigo: "hsl(240, 70%, 50%",
    brown: "hsl(20, 50%, 40%",
    gray: "hsl(0, 0%, 50%",
    black: "hsl(0, 0%, 0%",
    white: "hsl(0, 0%, 100%",
    magenta: "hsl(300, 70%, 50%",
    violet: "hsl(280, 70%, 50%",
    gold: "hsl(50, 100%, 50%",
    silver: "hsl(0, 0%, 75%",
  };

  return `${colorMap[color]}${opacityMap[opacity]}` as HSLColor;
};

type ColorConfig = {
  colorName: ColorName;
  opacity: OpacityColor;
};

export type ChartDataItem<
  Tcategory extends string,
  Tkeyvalue extends string,
> = Record<Tcategory, string | number> &
  Record<Tkeyvalue, number> & { color: ColorConfig };

type CiruclarChartData<T extends string, U extends string> = {
  [K in T]: string | number;
} & { [K in U]: number } & { color: ColorConfig };

interface CircularChartProps<T extends string, U extends string> {
  data: Array<CiruclarChartData<T, U>>;
  categoryKey: T;
  valueKey: U;
  title?: React.ReactNode | string;
  description?: string;
  innerRadius?: number;
  showTrend?: boolean;
  trendText?: string;
  footerText?: string;
  config?: ChartConfig;
  showLegend?: boolean;
  className?: string;
  size?: {
    width?: number;
    height?: number;
    outerRadius?: number;
    innerRadius?: number; // You already have this, can move it here
  };
  totalValueSize?: number;
  rightSection?: React.ReactNode;
}

export function CircularChart<T extends string, U extends string>({
  data,
  categoryKey,
  valueKey,
  title = "Pie Chart - Donut with Text",
  description,
  showLegend = false,
  totalValueSize = 28,
  config,
  className = "",
  size = {
    width: 300,
    height: 300,
    outerRadius: 100,
    innerRadius: 60, // Default innerRadius moved here
  },
  rightSection,
}: CircularChartProps<T, U>) {
  // Process the data with colors
  const processedData = React.useMemo(() => {
    return data.map((item, index) => {
      console.log(index);

      return {
        ...item,
        fill: getHSLColor(item.color.colorName, item.color.opacity),
      };
    });
  }, [data]);

  const totalValue = React.useMemo(() => {
    return processedData.reduce((acc, curr) => acc + Number(curr[valueKey]), 0);
  }, [processedData, valueKey]);

  const defaultConfig = React.useMemo(() => {
    const config: ChartConfig = {
      [valueKey as string]: {
        label: String(valueKey),
      },
    };

    data.forEach((item, index) => {
      const category = String(item[categoryKey]);
      console.log(index);

      config[category] = {
        label: category,
        color: getHSLColor(item.color.colorName, item.color.opacity),
      };
    });

    return config;
  }, [data, categoryKey, valueKey]);

  const chartConfig = config ?? defaultConfig;

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader className="">
        <div className="flex justify-between items-start">
          {/* header title and description */}
          <div className="mb-4">
            <CardTitle>
              {typeof title === "string" ? title : <>{title}</>}
            </CardTitle>
            <CardDescription className="mt-1">
              {description && description}
            </CardDescription>
          </div>
          {rightSection && <>{rightSection}</>}
        </div>
      </CardHeader>
      <CardContent className="flex-1" style={{ minHeight: size.height }}>
        <ChartContainer
          style={{
            width: size.width,
            height: size.height,
            maxWidth: "100%",
          }}
          config={chartConfig}
          className="mx-auto" // Removed conflicting classes
        >
          <PieChart
            width={size.width}
            height={size.height}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={processedData}
              dataKey={String(valueKey)}
              nameKey={String(categoryKey)}
              innerRadius={size.innerRadius}
              outerRadius={size.outerRadius}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className={`fill-foreground  after: font-bold `}
                          style={{ fontSize: totalValueSize }}
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground mt-4"
                          style={{ fontSize: totalValueSize / 2 }}
                        >
                          {String(valueKey)}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {showLegend && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-1 ">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-[2px]"
                    style={{
                      backgroundColor: getHSLColor(
                        item.color.colorName,
                        item.color.opacity,
                      ),
                    }}
                  />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {item[categoryKey].toString().charAt(0).toUpperCase()}
                    {item[categoryKey].toString().slice(1)}
                  </span>
                </div>
                <span className="font-semibold text-[15px]">
                  {item[valueKey]}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
