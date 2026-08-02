import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ColorPaletteCard() {
  return (
    <Card className="p-6 max-w-4xl mx-auto bg-card text-card-foreground border-border shadow-sm mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Active Theme Color Palette
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          A visual breakdown of your primary, secondary, muted, and accent
          tokens.
        </p>
      </CardHeader>

      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Primary Color Sample */}
        <div className="p-5 rounded-xl bg-primary text-primary-foreground flex flex-col justify-between h-36 shadow-sm transition-all">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider opacity-90">
              Primary Token
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-black/10 font-mono">
              bg-primary
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight">Brand / Action</p>
            <p className="text-xs opacity-90 mt-1">
              Drives main buttons, borders, checkboxes, and core highlights.
            </p>
          </div>
        </div>

        {/* Secondary Color Sample */}
        <div className="p-5 rounded-xl bg-secondary text-secondary-foreground flex flex-col justify-between h-36 shadow-sm border border-border transition-all">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Secondary Token
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-muted font-mono">
              bg-secondary
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight">
              Auxiliary Surface
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Used for alternative badges, tags, and secondary containers.
            </p>
          </div>
        </div>

        {/* Muted Color Sample */}
        <div className="p-5 rounded-xl bg-muted text-muted-foreground flex flex-col justify-between h-36 shadow-sm border border-border transition-all">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider">
              Muted Token
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-background font-mono">
              bg-muted
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight text-foreground">
              Soft Background
            </p>
            <p className="text-xs">
              Used for quiet backgrounds, code blocks, and input field fillers.
            </p>
          </div>
        </div>

        {/* Accent Color Sample */}
        <div className="p-5 rounded-xl bg-accent text-accent-foreground flex flex-col justify-between h-36 shadow-sm border border-border transition-all">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider">
              Accent Token
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-muted font-mono">
              bg-accent
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight">Hover State</p>
            <p className="text-xs text-muted-foreground mt-1">
              Used for dropdown items, hover highlights, and selections.
            </p>
          </div>
        </div>
      </CardContent>

      <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-3 items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Component interaction test:
        </span>
        <div className="flex gap-3">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
        </div>
      </div>
    </Card>
  );
}
