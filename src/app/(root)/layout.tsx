import Navbar from "@/components/Navbar";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="bg-[radial-gradient(ellipse_at_top,rgba(126,48,225,0.3)_0%,rgba(73,16,139,0.2)_45%,rgba(0,0,0,0.1)_100%)] min-h-screen">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
