import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import authHelpers from "../helpers/authHelpers";

const fetchWelcomeUser = async (router: any) => {
  try {
    const response = await axios.get(`/api/welcome-user`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      authHelpers.clearAuth();
      router.push("/welcome");
    }
  }
};


export const useWelcomeUser = () => {
  const router = useRouter();
  return useQuery({
    queryKey: ["welcome-user"],
    queryFn: () => fetchWelcomeUser(router),
  });
};
