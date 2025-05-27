import Menu from "../../Pages/HomePage/Menu";

export default function Layout({ children }) {
  return (
    <>
      <Menu />
      {children}
    </>
  );
}
