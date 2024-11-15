"use client";

import FormattedMessage from "@/components/FormattedMessage";
import { Typography } from "@mui/material";
import React from "react";

function TaskHeading() {
  return (
    <>
      <Typography
        variant="h4"
        component={"span"}
        sx={{
          textAlign: { xs: "start", sm: "center" },

          fontWeight: "bold",
        }}
      >
        <FormattedMessage id="Task" defaultMessage="Task" />
      </Typography>
      <Typography
        variant="h4"
        component={"span"}
        sx={{
          textAlign: { xs: "start", sm: "center" },
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        <FormattedMessage id="List" defaultMessage="List" />
      </Typography>
    </>
  );
}

export default TaskHeading;
