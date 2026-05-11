import React, { type ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  return <div className="container mx-auto py-8">{children}</div>;
}
