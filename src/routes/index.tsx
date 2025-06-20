// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { cn } from "../cn";

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: (search) => ({
    ...(typeof search.bank === "string" && search.bank !== ""
      ? { bank: search.bank }
      : {}),
  }),
});

function Home() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <div className="grid grid-cols-2 gap-2 text-right pt-10 mx-auto max-w-md">
      <label htmlFor="bank">Bank</label>
      <Input
        key="bank"
        id="bank"
        value={search.bank ?? ""}
        type="text"
        onChange={(e) => {
          void navigate({
            to: "/",
            search: { ...(e.target.value ? { bank: e.target.value } : {}) },
            replace: true,
            resetScroll: false,
          });
        }}
      />
    </div>
  );
}

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "border-2 pl-1 rounded-md focus-within:outline-1 outline-gray-300 ",
        className
      )}
      {...props}
    />
  );
}
