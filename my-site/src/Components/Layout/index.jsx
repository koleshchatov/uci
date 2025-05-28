import Menu from "../../pages/HomePage/Menu";

export default function Layout({ children }) {
  return (
    <>
      <Menu />
      {children}
    </>
  );
}
