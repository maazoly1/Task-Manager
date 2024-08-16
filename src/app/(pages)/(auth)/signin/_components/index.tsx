import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import SigninForm from "./SigninForm";

function Signin() {
  return (
    <Box>
      <Container fixed maxWidth="sm">
        <Paper variant="outlined" sx={{ padding: 4 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", pb: 5, fontWeight: "bold" }}
          >
            Sign-In Form
          </Typography>
          <SigninForm />
        </Paper>
      </Container>
    </Box>
  );
}

export default Signin;
