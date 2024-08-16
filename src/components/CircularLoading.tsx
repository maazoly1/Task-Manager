import {
  Box,
  CircularProgress,
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material";

export default function CircularLoading(props: CircularProgressProps) {
  return (
    <Box sx={{ position: "relative", height: 18, my: 0.4 }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={15}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: "common.white",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={15}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
