"use client";

import { useState, useRef } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const language = className?.replace("language-", "") ?? "";

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      {language && (
        <span className="absolute left-4 top-2 text-xs text-gray-400">
          {language}
        </span>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md border border-gray-600 bg-gray-800 px-2 py-1 text-xs text-gray-300 opacity-0 transition-opacity hover:bg-gray-700 group-hover:opacity-100"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre ref={preRef} className={className}>
        {children}
      </pre>
    </div>
  );
}
