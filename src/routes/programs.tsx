import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route — renders either /programs (index) or /programs/$slug (detail)
export const Route = createFileRoute("/programs")({
  component: () => <Outlet />,
});
