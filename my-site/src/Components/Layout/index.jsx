import Menu from "../../Pages/HomePage/Menu/Menu";

export default function Layout({ children }) {
  return (
    <>
      <Menu />
      {children}
    </>
  );
}
