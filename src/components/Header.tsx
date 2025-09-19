'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  Sparkles,
  CheckSquare,
  FileText,
  ShieldCheck,
  Globe,
  BadgeCheck,
  History,
  Key,
  Gift,
  User,
  Menu
} from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'Humanize', href: '/humanize-ai', icon: Sparkles },
  { name: 'Detect Text', href: '/ai-checker', icon: CheckSquare },
  { name: 'Grammar', href: '/grammar-checker', icon: FileText },
  { name: 'Plagiarism', href: '/plagiarism-checker', icon: ShieldCheck },
  { name: 'Translator', href: '/ai-translator', icon: Globe },
];

const secondaryNavItems = [
  { name: 'Plans & Features', href: '/pricing', icon: BadgeCheck },
  { name: 'API', href: '/api', icon: Key },
  { name: 'History', href: '/history', icon: History },
  { name: 'Loyalty Rewards', href: '/loyalty-rewards', icon: Gift },
];

export const Header = () => {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    `transition-colors hover:text-primary ${
      pathname.startsWith(href) ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 text-muted-foreground shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <h1 className="text-xl font-bold text-primary">Integrity AI</h1>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className={linkClasses(item.href)}>
                {item.name}
              </Link>
            ))}
            {secondaryNavItems.map((item) => (
              <Link key={item.name} href={item.href} className={linkClasses(item.href)}>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Button variant="secondary" className="hidden md:flex">
            <Link href="/account/profile" className="flex items-center text-muted-foreground transition-colors hover:text-primary">
              <User className="mr-2 h-4 w-4" />
              Account
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background/95 text-foreground sm:w-[400px]">
              <div className="flex flex-col space-y-4 pt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-border/70 pt-4">
                  {secondaryNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="mt-2 flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  <div className="mt-6 flex items-center justify-between">
                    <ThemeToggle />
                    <Link
                      href="/account/profile"
                      className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <User className="mr-3 h-5 w-5" />
                      Account
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
