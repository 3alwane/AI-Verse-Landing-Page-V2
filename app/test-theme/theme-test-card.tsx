import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, MoreVertical } from "lucide-react";

export default function ThemeTestCard() {
  return (
    <div className="p-8   max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-background/70 text-foreground/70">
      {/* Card 1: Stats & Chart Overview */}
      <Card className="bg-card text-card-foreground border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total earning
          </CardTitle>
          <MoreVertical className="h-4 w-4 text-muted-foreground cursor-pointer" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight">87%</span>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-0.5" /> +38%
            </span>
          </div>

          {/* Dynamic Theme-Aware Bar Chart Preview */}
          <div className="mt-6 h-36 flex items-end justify-between gap-2 px-3 py-4 bg-muted/40 rounded-lg">
            {[40, 65, 80, 60, 45, 90, 75, 50].map((height, i) => (
              <div
                key={i}
                className="w-full bg-muted rounded-t relative h-full flex items-end"
              >
                <div
                  className="w-full bg-primary rounded-t transition-all"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-semibold">Total revenue</p>
                <p className="text-xs text-muted-foreground">
                  Successful payments
                </p>
              </div>
              <span className="text-sm font-semibold text-primary">+$250</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-semibold">Total sales</p>
                <p className="text-xs text-muted-foreground">Refund</p>
              </div>
              <span className="text-sm font-semibold text-primary">+$80</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Plan Selection & Checkout */}
      <Card className="bg-card text-card-foreground border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">
            For Business Shark
          </CardTitle>
          <MoreVertical className="h-4 w-4 text-muted-foreground cursor-pointer" />
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Here, I focus on a range of items and features that we use in life
            without them.
          </p>

          <div className="space-y-2 pt-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Choose a plan to get started
            </div>

            {/* Plan Options */}
            {[
              { name: "BRANDING", price: "$60", active: false },
              { name: "MARKETING", price: "$120", active: true },
              { name: "WEB DEVELOPMENT", price: "$250", active: false },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  plan.active
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-card hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked={plan.active}
                    className="rounded border-input accent-primary h-4 w-4 cursor-pointer"
                  />
                  <span className="text-sm font-semibold tracking-wide">
                    {plan.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-primary">
                  {plan.price}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Taxes</span>
              <span>$32</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total amount</span>
              <span>$152</span>
            </div>
          </div>

          <Button className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2">
            PAY NOW
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
