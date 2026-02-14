"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    );
    const items = elements.map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block">
      <div className="sticky top-28">
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
          On This Page
        </h4>
        <ul className="space-y-2.5 text-sm">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${h.id}`}
                className={`group relative block py-1 transition-colors ${
                  activeId === h.id
                    ? "font-medium text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span
                  className={`absolute -left-3 top-0 h-full w-0.5 rounded-full transition-all ${
                    activeId === h.id
                      ? "bg-accent"
                      : "bg-transparent group-hover:bg-muted"
                  }`}
                />
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
