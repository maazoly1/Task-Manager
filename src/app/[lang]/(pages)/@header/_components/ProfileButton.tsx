import { actionGetAuthUser } from "@/actions/authAction";
import { Button } from "@mui/material";
import Link from "next/link";
import SignoutButton from "./SignoutButton";

async function ProfileButton() {
  const data = await actionGetAuthUser();
  if ("error" in data) {
    return (
      <>
        <Button
          LinkComponent={Link}
          href={"/signin"}
          variant={"text"}
          sx={{ borderRadius: 5 }}
        >
          Sign In
        </Button>
        <Button
          LinkComponent={Link}
          href={"/signup"}
          variant={"contained"}
          sx={{ borderRadius: 5, color: "white" }}
          disableElevation
        >
          Sign Up
        </Button>
      </>
    );
  }

  const userName = !!data && `Hi ${data.data.firstName}`;

  return (
    <>
      <SignoutButton />
      <Button
        LinkComponent={Link}
        href={"/"}
        variant={"contained"}
        sx={{ borderRadius: 5, color: "white" }}
        disableElevation
      >
        {userName}
      </Button>
    </>
  );
}

export default ProfileButton;
