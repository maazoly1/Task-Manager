"use client";

import SimpleTextField from "@/components/SimpleTextField";
import { TSignUpForm, signUpSchema } from "@/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, InputAdornment, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React from "react";
import { useForm } from "react-hook-form";
import { actionPostSignup } from "@/actions/authAction";
import { useMutation } from "@tanstack/react-query";
import CircularLoading from "@/components/CircularLoading";
import useAppContext from "@/context/AppProvider/useAppContext";
import { AppActionType } from "@/types/appContext";
import { useRouter } from "next/navigation";

function SignupForm() {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData: TSignUpForm) => {
      const res = await actionPostSignup(formData);
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

  const onSubmit = (formData: TSignUpForm) => {
    mutation.mutate(formData);
  };

  return (
    <Grid
      container
      onSubmit={handleSubmit(onSubmit)}
      component={"form"}
      spacing={3}
    >
      <Grid item xs={12} md={6}>
        <SimpleTextField
          control={control}
          label="First name"
          name="firstName"
          sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
          InputPropsComponent={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SimpleTextField
          control={control}
          label="Last name"
          name="lastName"
          sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
          InputPropsComponent={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
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
              <InputAdornment position="start">
                <VisibilityOffIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <SimpleTextField
          control={control}
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
          InputPropsComponent={{
            endAdornment: (
              <InputAdornment position="start">
                <VisibilityOffIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={mutation.isPending}
          fullWidth
          variant="contained"
          type="submit"
          sx={{ borderRadius: 5 }}
        >
          {mutation.isPending ? (
            <CircularLoading />
          ) : (
            <Typography variant="subtitle1" fontWeight={600}>
              Sign Up
            </Typography>
          )}
        </Button>
      </Grid>
    </Grid>
  );
}

export default SignupForm;
