// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { cn } from "../cn";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: (search) => ({
    ...(typeof search.bank === "string" && search.bank !== ""
      ? { bank: search.bank }
      : {}),
    ...(typeof search.accountName === "string" && search.accountName !== ""
      ? { accountName: search.accountName }
      : {}),
  }),
});

function Home() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const formValues = useRef(search);
  const changeSearchParams = useDebouncedCallback((arg: typeof search) => {
    void navigate({
      to: "/",
      search: arg,
      replace: true,
      resetScroll: false,
    });
  }, 500);

  const handleFieldChange = (
    field: keyof typeof search
  ): React.ChangeEventHandler<HTMLInputElement> => {
    return (e) => {
      formValues.current[field] = e.target.value || undefined;
      void changeSearchParams(formValues.current);
    };
  };

  return (
    <div className="grid grid-cols-2 gap-2 text-right pt-10 mx-auto max-w-md">
      <label htmlFor="bank">Bank</label>
      <Input
        id="bank"
        defaultValue={search.bank}
        type="text"
        onChange={handleFieldChange("bank")}
      />
      <label htmlFor="accountName">Account Name</label>
      <Input
        type="text"
        id="accountName"
        defaultValue={search.accountName}
        onChange={handleFieldChange("accountName")}
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
