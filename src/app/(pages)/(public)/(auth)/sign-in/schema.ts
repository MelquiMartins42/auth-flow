import z from 'zod/v4'

export const loginSchema = z.object({
  email: z.email({ message: 'E-mail inválido' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
  rememberMe: z.boolean(),
})

export type LoginSchema = z.infer<typeof loginSchema>
