"use client";

import { ReactNode, useEffect, useMemo, useReducer, useState } from "react";
import { Alert, Slide, Snackbar } from "@mui/material";
import { AppActionType, AppAlertInterface } from "@/types/appContext";
import appReducer, { appInitialState } from "@/reducers/appReducer";
import { AppContext } from "./useAppContext";

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  // Store the data in state.
  const [state, dispatch] = useReducer(appReducer, appInitialState);
  const [alert, setAlert] = useState<AppAlertInterface>();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  function clearAlert() {
    setAlert(undefined);
  }

  // Memoize the data and refresh function so that they are not recreated on every render.
  const value = useMemo(
    () => ({ state, mobileOpen, dispatch, handleDrawerToggle }),
    [state, mobileOpen]
  );

  useEffect(() => {
    if (state.alerts.length > 0 && !alert) {
      setTimeout(() => {
        // Set the alert to the first item in the array.
        setAlert(state.alerts[0]);
        // Remove the alert from the queue.
        dispatch({
          type: AppActionType.REMOVE_ALERT,
          payload: state.alerts[0]?.id,
        });
      }, 100);
    }
  }, [state.alerts, alert]);

  return (
    <AppContext.Provider value={value}>
      {children}
      <Snackbar
        open={!!alert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={clearAlert}
        TransitionComponent={Slide}
        sx={{
          zIndex: 999999,
        }}
      >
        <Alert
          onClose={clearAlert}
          severity={alert?.type}
          sx={{ width: "100%" }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </AppContext.Provider>
  );
}
export default AppProvider;
