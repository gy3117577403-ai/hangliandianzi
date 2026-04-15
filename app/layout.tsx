import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "智造專家｜高壓線束工藝落地",
  description:
    "從工藝圖紙到批量交付，極速響應、深度 DFM 優化與電性能全檢，服務儲能與工控領域。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-[#f1f5f9] font-sans text-[#0f172a] dark:bg-[#020617] dark:text-slate-100">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
