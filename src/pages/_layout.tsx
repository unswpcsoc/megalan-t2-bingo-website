interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className="h-screen w-full">{children}</div>;
};

export default Layout;
