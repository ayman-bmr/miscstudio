import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { SignInFormFields, SignUpFormFields } from "./types";
import authHelpers from "@repo/providers/helpers/authHelpers";
import { useRouter } from "next/navigation";

export function useSignIn() {
  const { push } = useRouter();

  return useMutation({
    mutationFn: async (credentials: SignInFormFields) => {
      const { data } = await axios.post("/api/auth/signin", {
        username: credentials.username,
        password: credentials.password,
      });
      return data;
    },
    onSuccess: (res) => {
      authHelpers.setAuthToken(res.token);
      authHelpers.setUser(res.user);
      push("/");
      return res;
    },
  });
}

export function useSignOut() {
  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: async (credentials: SignUpFormFields) => {
      const formData = new FormData();
      formData.append("email", credentials.email);
      formData.append("username", credentials.username);
      formData.append("firstName", credentials.firstName);
      formData.append("lastName", credentials.lastName);
      formData.append("password", credentials.password);
      formData.append("role", credentials.role);
      if (credentials.profilePicture) {
        formData.append("profilePicture", credentials.profilePicture);
      }

      const response = await axios.post("/api/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.error) {
        return response.data?.error;
      }

      return response.data?.message;
    },
  });
}
