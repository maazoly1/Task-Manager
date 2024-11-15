"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { PropsWithChildren, useMemo } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import theme from "./theme";
import { prefixer } from 'stylis';
import rtlPlugin from "stylis-plugin-rtl";

const options = {
  key: "task-management",
};

// Create rtl cache
const optionRtl = {
  key: 'task-management-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
};

interface ThemeProviderProps extends PropsWithChildren {
  isRtl?: boolean
}

function ThemeProvider({ isRtl = false, children }: ThemeProviderProps) {
  const themeValue = useMemo(() => theme(isRtl), [isRtl]);
  return (
    <AppRouterCacheProvider options={isRtl ? optionRtl : options}>
      <MuiThemeProvider theme={themeValue}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
export default ThemeProvider;
