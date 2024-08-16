import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Stack, Toolbar } from "@mui/material";
import Link from "next/link";
import StickyAppbar from "./StickyAppbar";
// import NavItems from "./NavItems";
import MobileAppbar from "./MobileAppbar";
import ProfileButton from "./ProfileButton";
import MenuButton from "./MenuButton";

export default function Navbar() {
  return (
    <Box component="header">
      <StickyAppbar>
        <AppBar component="nav" color="inherit" elevation={0} sx={{}}>
          <Container fixed maxWidth="xl">
            {/* ********Navbar***** */}
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              paddingBlock={1}
            >
              {/* **********(xs-sm)-Hamburgur********* */}
              <MenuButton />
              {/* *************Task Managaement Logo********** */}
              <Box
                sx={{
                  marginY: "auto",
                  textDecoration: "none",
                  flexGrow: { xs: 1, sm: 0 },
                  textAlign: { xs: "center", sm: "start" },
                }}
                component={Link}
                href="/"
              >
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "secondary.main",
                    display: "inline",
                    fontWeight: "fontWeightBold",
                  }}
                >
                  Task
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "primary.main",
                    display: "inline",
                    fontWeight: "fontWeightBold",
                  }}
                >
                  Manager
                </Typography>
              </Box>
              {/* ***************(md start) SignUp and Sign in************* */}
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <ProfileButton />
              </Stack>
            </Stack>
            {/* ************************* */}
          </Container>
        </AppBar>
      </StickyAppbar>
      <MobileAppbar />
      <Toolbar />
    </Box>
  );
}
