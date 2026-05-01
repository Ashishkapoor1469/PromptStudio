import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PromptStudio — 50x AI Productivity Platform",
  description: "Expert prompt library, workflow builder, and auto-prompt generation engine. Make any AI model behave like a 50x more productive senior engineer.",
  keywords: ["AI", "prompts", "productivity", "developer tools", "prompt engineering"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
