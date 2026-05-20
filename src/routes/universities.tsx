import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route — renders either /universities (index) or /universities/$slug (detail)
export const Route = createFileRoute("/universities")({
  component: () => <Outlet />,
});
