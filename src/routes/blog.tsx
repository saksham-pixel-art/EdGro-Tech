import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route — renders either /blog (index) or /blog/$slug (detail)
export const Route = createFileRoute("/blog")({
  component: () => <Outlet />,
});
