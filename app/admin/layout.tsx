import AdminNav from "../components/Admin/AdminNav";

export const metadata = {
  title: "Tempo Zegara Admin",
  description: "Panel Admina",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
