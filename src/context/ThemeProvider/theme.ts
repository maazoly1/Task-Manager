import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Poppins } from "next/font/google";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: `
      html{
        font-size: 14px;
        scroll-behaviour: smooth;
      },
      .gm-style iframe + div { border:none !important; }
      @keyframes bounceY {
        0% {
            transform: translatey(0)
        }
    
        50% {
            transform: translatey(-20px)
        }
    
        to {
            transform: translatey(0)
        }
    }
      `,
      },
      MuiBadge: {
        styleOverrides: {
          root: {
            "& .MuiBadge-badge": {
              lineHeight: 0,
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            color: "#313131",
          },
        },
        defaultProps: {
          underline: "none",
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: "outlined" },
                style: {
                  border: "1px solid #F2F2F2",
                },
              },
            ],
          },
        },
      },
    },
    typography: {
      fontFamily: poppins.style.fontFamily,
    },
    palette: {
      secondary: {
        main: "#313131",
      },
      grey: {
        50: "#F8F8F8",
        100: "#E2E2E2",
        200: "#F2F1F0",
        300: "#B0B0B0",
        400: "#909090",
      },
    },
  })
);

export default theme;
