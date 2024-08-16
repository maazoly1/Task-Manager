import { Metadata } from "next";
import { ReactNode } from "react";

interface RootLayoutProps {
  header: ReactNode;
  children: ReactNode;
}

function PagesLayout({ header, children }: RootLayoutProps) {
  return (
    <>
      {header}
      {children}
    </>
  );
}

export default PagesLayout;
