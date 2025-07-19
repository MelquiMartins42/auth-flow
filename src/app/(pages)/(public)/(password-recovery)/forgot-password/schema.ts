import z from 'zod/v4'

export const forgotPasswordSchema = z.object({
  email: z.email('E-mail inválido'),
})

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
