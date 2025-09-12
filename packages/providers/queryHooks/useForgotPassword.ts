import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useForgotPassword() {
    const mutationFn = async (email: string): Promise<any> => {
        try {
            const { data } = await axios.post('/api/auth/forgot-password', { email });
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to send forgot password request');
        }
    };
    return useMutation({
        mutationFn
    });
}