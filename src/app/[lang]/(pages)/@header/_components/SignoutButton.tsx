"use client";

import { actionSignout } from "@/actions/authAction";
import CircularLoading from "@/components/CircularLoading";
import useAppContext from "@/context/AppProvider/useAppContext";
import { AppActionType } from "@/types/appContext";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";

function SignoutButton() {
  const { dispatch } = useAppContext();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await actionSignout();
      if (!("data" in res)) {
        dispatch({
          type: AppActionType.ADD_ALERT,
          payload: {
            message: res.message,
            type: "error",
          },
        });
        return res;
      }
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: res.message as string,
          type: "success",
        },
      });
      window.location.reload();
    },
  });
  const handleSignout = () => {
    mutation.mutate();
  };
  return (
    <Button
      disabled={mutation.isPending}
      onClick={handleSignout}
      variant={"text"}
      sx={{ borderRadius: 5 }}
    >
      Sign Out
    </Button>
  );
}

export default SignoutButton;
