// "use client";

// import React from "react";
// import { TNavItem } from ".";
// import { Button } from "@mui/material";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// interface NavItemsProps {
//   data: TNavItem;
// }

// function NavItems({ data }: NavItemsProps) {
//   const pathname = usePathname();
//   return (
//     <Button
//       component={Link}
//       href={data.href}
//       sx={{
//         color: pathname === data.href ? "primary.main" : "secondary.main",
//         fontWeight: pathname === data.href ? "fontWeightBold" : "",
//         fontSize: 13,
//         marginRight: { sm: 0.75, md: 1.5 },
//         textAlign: "end",
//       }}
//     >
//       {data.label}
//     </Button>
//   );
// }

// export default NavItems;
