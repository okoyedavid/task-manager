import { Toaster } from "react-hot-toast";

export default function ToastElement() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        // Default style (success, info, etc.)
        style: {
          border: "1px solid rgba(34,197,94,0.2)", // green-400/20
          background: "rgba(0,0,0,0.4)", // bg-black/40
          backdropFilter: "blur(12px)", // backdrop-blur-xl
          borderRadius: "0.5rem", // rounded-lg
          color: "white",
          padding: "16px",
        },
        iconTheme: {
          primary: "#22c55e", // green
          secondary: "#000000",
        },
        // Error toast customization
        error: {
          style: {
            border: "1px solid rgba(239,68,68,0.2)", // red-500/20
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(12px)",
            borderRadius: "0.5rem",
            color: "white",
            padding: "16px",
          },
          iconTheme: {
            primary: "#ef4444", // red-500
            secondary: "#000000",
          },
        },
      }}
    />
  );
}
