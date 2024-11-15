import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AppProvider from "@/context/AppProvider";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { Box } from "@mui/material";
import ThemeProvider from "@/context/ThemeProvider";
import { PropsWithChildren } from "react";
import NextIntlProvider from "@/context/NextIntlProvider";

export const metadata: Metadata = {
  title: "Task Management",
  description: "Manage your task like a Pro",
};

interface RootLayoutProps extends PropsWithChildren {
  params: {
    lang: string;
  };
}

export default async function RootLayout({
  params,
  children,
}: RootLayoutProps) {
  console.log(params.lang);
  const messages = await import(`../../translations/${params.lang}.json`);
  console.log(messages);
  return (
    <html lang={params.lang} dir={params.lang === "ar" ? "rtl" : "ltr"}>
      <AppRouterCacheProvider
        options={{
          key: "task-management",
        }}
      >
        <AppProvider>
          <ThemeProvider isRtl={params.lang === "ar"}>
            <Box component="body">
              <ReactQueryProvider>
                <NextIntlProvider
                  lang={params.lang === "ar" ? "ar-SA" : params.lang}
                  messages={messages.default}
                >
                  {children}
                </NextIntlProvider>
              </ReactQueryProvider>
            </Box>
          </ThemeProvider>
        </AppProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
