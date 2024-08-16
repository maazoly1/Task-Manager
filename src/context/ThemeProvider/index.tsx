"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import theme from "./theme";

const options = {
  key: "task-management",
};

function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider options={options}>
      <MuiThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
export default ThemeProvider;
