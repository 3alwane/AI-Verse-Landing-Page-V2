"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";

export type ListCardData = {
  labelName: string;
  progressNumber: number;
  valueName: string;
  progressBarColors?: { indicatorColor: string; bgColor: string };
};

type ListCardBaseProps = {
  className?: string;
  data: ListCardData[];
  showValues?: boolean;
  progressBarHeight?: number;
  footer?: ReactNode;
  rightSideElement?: ReactNode;
  rowHeight?: number;
  showSeperators?: boolean;
  showFooter?: boolean;
  isLoading?: boolean;
};

type ListCardProps = ListCardBaseProps &
  (
    | {
        title: { label?: ReactNode; className?: string };
        description?: { label?: string; className?: string };
      }
    | {
        title?: undefined;
        description?: never;
      }
  );

const rightSideElement_default = (
  <Button variant={"link"} className="px-0">
    See More
  </Button>
);

const default_card_footer = (footer: ReactNode | undefined) => {
  if (footer) {
    return <div className="p-6 pb-7">{footer}</div>;
  }
  return (
    <div className="p-6 pt-1 pb-7">
      <div className="flex items-center justify-between pt-4">
        <span className="text-sm text-muted-foreground">Average rating</span>
        <div className="flex items-center gap-1">
          <span className="font-medium">4.2</span>
          <span className="text-sm text-muted-foreground">/ 5</span>
        </div>
      </div>
    </div>
  );
};

const ListCard2: React.FC<ListCardProps> = ({
  data,
  className,
  title,
  description,
  showValues = true,
  progressBarHeight = 7,
  footer,
  rightSideElement = rightSideElement_default,
  rowHeight = 18,
  showSeperators = false,
  showFooter = true,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card className={className}>
        {title && (
          <CardHeader className="flex justify-between">
            <div className="flex justify-between w-full">
              <div className="space-y-2">
                <Skeleton className="h-7 w-[200px]" />
                {description && <Skeleton className="h-4 w-[150px]" />}
              </div>
              <Skeleton className="h-9 w-[80px]" />
            </div>
          </CardHeader>
        )}

        <CardContent className={title ? "mt-7" : ""}>
          <table className="w-full">
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr
                  key={index}
                  className={index !== 4 && showSeperators ? "border-b" : ""}
                  style={{ height: `${rowHeight}px` }}
                >
                  <td className="py-2 pr-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-[80px]" />
                  </td>
                  <td className="py-2 px-4 w-full">
                    <Skeleton className="h-2 w-full" />
                  </td>
                  {showValues && (
                    <td className="py-2 pl-4 whitespace-nowrap text-right">
                      <Skeleton className="h-4 w-[40px] ml-auto" />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        {showFooter && (
          <div className="p-6 pb-7">
            <div className="flex items-center justify-between pt-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[50px]" />
            </div>
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card className={` ${className}`}>
      {title && (
        <CardHeader className="flex justify-between">
          <div className="flex justify-between w-full">
            <div>
              <CardTitle className={`text-2xl ${title.className}`}>
                {title.label}
              </CardTitle>
              {description && (
                <CardDescription className={description.className}>
                  {description.label}
                </CardDescription>
              )}
            </div>
            <div>{rightSideElement}</div>
          </div>
        </CardHeader>
      )}

      <CardContent className={title ? "mt-7" : ""}>
        <table className="w-full">
          <tbody>
            {data.map((item: ListCardData, index) => {
              const {
                progressBarColors = {
                  bgColor: "bg-primary/15",
                  indicatorColor: "bg-primary",
                },
              } = item;

              return (
                <tr
                  key={index}
                  className={
                    index !== data.length - 1 && showSeperators
                      ? "border-b"
                      : ""
                  }
                  style={{ height: `${rowHeight}px` }}
                >
                  {/* Label column - will expand with content */}
                  <td className="py-2 pr-4 whitespace-nowrap">
                    <span className="text-sm font-medium">
                      {item.labelName}
                    </span>
                  </td>

                  {/* Progress bar column - takes remaining space */}
                  <td className="py-2 px-4 w-full">
                    <Progress
                      value={item.progressNumber}
                      className={`h-full ${progressBarColors.bgColor}`}
                      indicatorClassName={`${progressBarColors.indicatorColor} h-full`}
                      style={{ height: `${progressBarHeight}px` }}
                    />
                  </td>

                  {/* Value column - will shrink to fit content */}
                  {showValues && (
                    <td className="py-2 pl-4 whitespace-nowrap text-right">
                      <span className="text-sm text-muted-foreground">
                        {item.valueName}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
      {showFooter && default_card_footer(footer)}
    </Card>
  );
};

export default ListCard2;
