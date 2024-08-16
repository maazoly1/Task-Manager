"use client";

import React from "react";
import useAppContext from "@/context/AppProvider/useAppContext";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { actionGetAuthUser, TAuthUserResponse } from "@/actions/authAction";
import CircularLoading from "@/components/CircularLoading";
import SignoutButton from "./SignoutButton";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

interface MobileAppbarProps extends Props {}

function MobileAppbar({ window }: MobileAppbarProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["actionGetAuth"],
    queryFn: async () => {
      const response = await actionGetAuthUser();
      return response;
    },
  });
  const isData = !(!!data && "error" in data);
  const userName =
    !!data && `Hi ${(data as TAuthUserResponse)?.data?.firstName}`;

  const drawerWidth = 250;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const { mobileOpen, handleDrawerToggle } = useAppContext();

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Box
        sx={{ textDecoration: "none", display: "inline-block" }}
        component={Link}
        href="/"
        textAlign={"center"}
        padding={2}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "fontWeightBold",
            display: "inline",
            color: "secondary.main",
            marginBlock: 1.5,
          }}
        >
          Task
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "fontWeightBold",
            color: "primary.main",
            display: "inline",
          }}
        >
          Manager
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding disableGutters>
          {isData ? (
            <ListItemButton>
              <SignoutButton />
            </ListItemButton>
          ) : (
            <ListItemButton component={Link} href={"/signin"}>
              <ListItemText
                primaryTypographyProps={{
                  fontWeight: 600,
                  textAlign: "center",
                }}
                primary={"Sign In"}
              />
            </ListItemButton>
          )}
        </ListItem>
        <ListItem disablePadding disableGutters>
          <ListItemButton component={Link} href={isData ? "/" : "/signup"}>
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 600,
                bgcolor: "primary.main",
                color: "white",
                textAlign: "center",
                paddingBlock: 1,
                borderRadius: 25,
              }}
              primary={
                isLoading ? (
                  <CircularLoading />
                ) : (
                  <>{isData ? userName : "Sign Up"}</>
                )
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <nav>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
}

export default MobileAppbar;
