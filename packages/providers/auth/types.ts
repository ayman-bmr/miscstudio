import { z } from "zod";

/* SignIn types & constrainst */
export const signInSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export type SignInFormFields = z.infer<typeof signInSchema>;

/* SignUp types & constrainst */
export const signUpSchema = z.object({

    email: z.string().email('Invalid email address'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    password: z.string(), //.min(8, 'Password must be at least 8 characters')
    confirmPassword: z.string(),
    role: z.enum(['User', 'Admin'], { required_error: 'Please select a role' }),
    profilePicture: z.any().optional(),
    // *** adding preferences later ***
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword'],
  });
  
export type SignUpFormFields = z.infer<typeof signUpSchema>;

/* Snackbar */
export interface SnackbarState {
    open: boolean;
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
}