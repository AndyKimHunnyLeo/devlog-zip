interface CalloutProps {
  type?: "info" | "tip" | "warning" | "danger";
  children: React.ReactNode;
}

const styles = {
  info: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
  tip: "border-green-500 bg-green-50 dark:bg-green-950/30",
  warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30",
  danger: "border-red-500 bg-red-50 dark:bg-red-950/30",
};

const icons = {
  info: "i",
  tip: "v",
  warning: "!",
  danger: "x",
};

export default function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div className={`my-4 rounded-r-lg border-l-4 p-4 ${styles[type]}`}>
      <div className="flex gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-current/10 text-xs font-bold">
          {icons[type]}
        </span>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
