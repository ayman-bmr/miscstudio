import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import authHelpers from "../../../helpers/authHelpers";

interface PrivateRouteProps {
  children: ReactNode;
}

const UNSECURE_ROUTE = ["/auth/signin", "/signup"];

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isSecureRoute = !UNSECURE_ROUTE.includes(pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isSecureRoute) {
      const auth = authHelpers.isAuthenticated();
      setIsAuthenticated(auth);

      if (!auth) {
        router.push("/welcome");
      }
    }
  }, [router]);

  return isAuthenticated || !isSecureRoute ? children : null;
}
