import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import AppProvider from "@/context/AppProvider";
import ReactQueryProvider from "@/context/ReactQueryProvider";
import { Box } from "@mui/material";
import ThemeProvider from "@/context/ThemeProvider";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Task Management",
  description: "Manage your task like a Pro",
};

function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <AppRouterCacheProvider
        options={{
          key: "task-management",
        }}
      >
        <AppProvider>
          <ThemeProvider>
            <Box component="body">
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </Box>
          </ThemeProvider>
        </AppProvider>
      </AppRouterCacheProvider>
    </html>
  );
}

export default RootLayout;
