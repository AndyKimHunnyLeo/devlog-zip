"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="group flex items-center gap-1 text-xl font-bold tracking-tight transition-colors"
        >
          <span className="text-foreground">DevLog</span>
          <span className="text-accent transition-transform group-hover:scale-110">.zip</span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-all duration-200 ${
              pathname === "/"
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            Posts
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-all duration-200 ${
              pathname === "/about"
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
