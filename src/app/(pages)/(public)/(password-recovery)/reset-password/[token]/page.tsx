'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { useParams, useRouter } from 'next/navigation'

import AuthForm from '@/app/components/common/Form'
import { useAlert } from '@/app/contexts/AlertContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'

import axiosConfig from '@/lib/axiosConfig'

import { ResetPasswordData, resetPasswordSchema } from '../schema'

const ResetPassword: React.FC = () => {
  const router = useRouter()

  const params = useParams()
  const token = params.token

  const { addAlert } = useAlert()
  const [isPanding, startTranstion] = useTransition()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = (data: ResetPasswordData) => {
    startTranstion(async () => {
      try {
        const response = await axiosConfig.put('/reset-password', {
          password: data.password,
          token,
        })
        addAlert({
          status: 'success',
          title: 'Redefinição de senha bem-sucedida!',
          description: response.data.message,
        })

        setTimeout(() => router.push('/sign-in'), 1000)
      } catch (err) {
        if (isAxiosError(err)) {
          addAlert({
            status: 'error',
            title: 'Falha na redefinição da senha',
            description: err.response?.data.message,
          })
        } else {
          console.error('Erro inesperado:', err)
        }
      }
    })
  }

  return (
    <AuthForm.Root onClick={handleSubmit(onSubmit)}>
      <AuthForm.Header
        title="Redefinir sua senha"
        description="Digite sua nova senha abaixo. Certifique-se de que ela seja forte e segura."
        customDescriptionClassName="text-center"
      />

      <AuthForm.Group legend="Defina sua senha">
        <ul className="flex flex-col w-full gap-4">
          <li>
            <AuthForm.Field
              type="password"
              label="Senha"
              {...register('password')}
              errorMessage={errors.password?.message}
              placeholder="Digite sua senha"
            />
          </li>
          <li>
            <AuthForm.Field
              type="password"
              label="Confirmar Senha"
              {...register('confirmPassword')}
              errorMessage={errors.confirmPassword?.message}
              placeholder="Confirme sua senha"
            />
          </li>
        </ul>
      </AuthForm.Group>

      <AuthForm.Submit isLoading={isPanding}>Resetar Senha</AuthForm.Submit>
    </AuthForm.Root>
  )
}

export default ResetPassword
