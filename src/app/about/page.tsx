import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        About
      </h1>
      <div className="prose mt-8 text-gray-600 dark:text-gray-300">
        <p>
          안녕하세요! <strong>DevLog.zip</strong>을 운영하고 있는 개발자입니다.
        </p>
        <p>
          이 블로그는 개발하면서 배운 것들을 압축해서 기록하고 공유하는 공간입니다.
          주로 웹 개발, TypeScript, React, Next.js 관련 내용을 다룹니다.
        </p>

        <h2>Tech Stack</h2>
        <ul>
          <li>Next.js (App Router)</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>MDX</li>
          <li>Vercel</li>
        </ul>

        <h2>Contact</h2>
        <ul>
          <li>
            GitHub:{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com
            </a>
          </li>
          <li>
            Email:{" "}
            <a href="mailto:hello@example.com">hello@example.com</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
