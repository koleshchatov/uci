import { useAuthContext } from "../Auth/AuthContext";

export default function LayoutMenu() {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated && <>{children}</>;
}
