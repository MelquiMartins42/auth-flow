import z from 'zod/v4'

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: 'A senha deve ter pelo menos 8 caracteres' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'A senha deve conter pelo menos um caractere especial',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Por favor confirme sua senha' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  })

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
