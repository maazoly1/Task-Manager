"use client";

import useAppContext from "@/context/AppProvider/useAppContext";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function MenuButton() {
  const { handleDrawerToggle } = useAppContext();
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ display: { sm: "none" } }}
    >
      <MenuIcon />
    </IconButton>
  );
}

export default MenuButton;
