import { actionSignout } from "@/actions/authAction";

async function page() {
  await actionSignout();
}

export default page;
