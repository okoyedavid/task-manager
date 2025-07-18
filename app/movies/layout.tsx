import { Header } from "../components/Layout/Header";
import { Sidebar } from "../components/Layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        {/* Dashboard Content */}
        <main className={`flex-1 overflow-y-auto bg-black`}>{children}</main>
      </div>
    </div>
  );
}
