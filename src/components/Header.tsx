import { Shield, Scan, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse-glow rounded-lg" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                <Shield className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">DeepGuard</span>
              <span className="text-xs text-muted-foreground font-mono">AI Detection System</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#analyze" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Analyze
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Documentation
            </Button>
            <Button variant="hero" size="sm">
              <Scan className="h-4 w-4" />
              Start Analysis
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4 animate-fade-in">
            <nav className="flex flex-col gap-3">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                How It Works
              </a>
              <a href="#analyze" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
                Analyze
              </a>
              <Button variant="hero" size="sm" className="mt-2">
                <Scan className="h-4 w-4" />
                Start Analysis
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
