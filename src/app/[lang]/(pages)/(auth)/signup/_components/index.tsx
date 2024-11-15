import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import SignupForm from "./SignupForm";

function Signup() {
  return (
    <Box>
      <Container fixed maxWidth="sm">
        <Paper variant="outlined" sx={{ padding: 4 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", pb: 5, fontWeight: "bold" }}
          >
            Sign-Up Form
          </Typography>
          <SignupForm />
        </Paper>
      </Container>
    </Box>
  );
}

export default Signup;
