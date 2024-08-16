"use client";

import SimpleTextField from "@/components/SimpleTextField";
import { TSignInForm, signInSchema } from "@/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, InputAdornment, Typography } from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React from "react";
import { useForm } from "react-hook-form";
import CircularLoading from "@/components/CircularLoading";
import { actionPostSignin } from "@/actions/authAction";
import { useMutation } from "@tanstack/react-query";
import useAppContext from "@/context/AppProvider/useAppContext";
import { AppActionType } from "@/types/appContext";
import { useRouter } from "next/navigation";

function SigninForm() {
  const { dispatch } = useAppContext();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<TSignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData: TSignInForm) => {
      const res = await actionPostSignin(formData);
      if (!("token" in res)) {
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
          message: res.message,
          type: "success",
        },
      });
      router.push("/");
    },
  });

  const onSubmit = (formData: TSignInForm) => {
    mutation.mutate(formData);
  };

  return (
    <Grid
      container
      onSubmit={handleSubmit(onSubmit)}
      component={"form"}
      spacing={3}
    >
      <Grid item xs={12}>
        <SimpleTextField
          control={control}
          label="Email"
          type="email"
          name="email"
          sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
          InputPropsComponent={{
            startAdornment: (
              <InputAdornment position="start">
                <MarkEmailUnreadIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <SimpleTextField
          control={control}
          label="Password"
          type="password"
          name="password"
          sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
          InputPropsComponent={{
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityOffIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ borderRadius: 5 }}
        >
          {mutation.isPending ? (
            <CircularLoading />
          ) : (
            <Typography variant="subtitle1" fontWeight={600}>
              Sign In
            </Typography>
          )}
        </Button>
      </Grid>
    </Grid>
  );
}

export default SigninForm;
