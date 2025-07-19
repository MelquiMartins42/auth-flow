import z from 'zod/v4'

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Nome completo é obrigatório' })
    .refine((name) => name.trim().split(' ').length >= 2, {
      message: 'Por favor, digite seu nome completo (nome e sobrenome)',
    })
    .pipe(
      z.string().transform((name) =>
        name
          .trim()
          .split(' ')
          .filter(Boolean)
          .map(
            (word) =>
              word[0].toLocaleUpperCase() + word.substring(1).toLowerCase(),
          )
          .join(' '),
      ),
    ),
  email: z.email({ message: 'E-mail inválido' }),
})

export type ProfileData = z.infer<typeof profileSchema>

export const createPasswordSchema = z
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
    acceptedTerms: z.boolean().refine((val) => val === true, {
      message: 'Você deve aceitar os termos',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  })

export type CreatePasswordData = z.infer<typeof createPasswordSchema>
