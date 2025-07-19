'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import Link from 'next/link'

import AuthForm from '@/app/components/common/Form'
import { useAlert } from '@/app/contexts/AlertContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'

import axiosConfig from '@/lib/axiosConfig'

import { forgotPasswordSchema, ForgotPasswordData } from './schema'

const ForgotPassword: React.FC = () => {
  const { addAlert } = useAlert()

  const [isPanding, startTranstion] = useTransition()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: ForgotPasswordData) => {
    startTranstion(async () => {
      try {
        const response = await axiosConfig.post('/forgot-password', {
          email: data.email,
        })
        console.log(response.data.link)

        addAlert({
          status: 'success',
          title: 'E-mail de recuperação enviado!',
          description: response.data.message,
        })
      } catch (err) {
        if (isAxiosError(err)) {
          addAlert({
            status: 'error',
            title: 'Não é possível enviar e-mail de recuperação',
            description: err.response?.data.message,
          })
        } else {
          console.error('Erro inesperado:', err)
        }
      }
    })
  }

  return (
    <AuthForm.Root onSubmit={handleSubmit(onSubmit)}>
      <AuthForm.Header
        title="Esqueceu sua senha?"
        description="Não se preocupe, isso acontece. Insira seu e-mail e enviaremos um link para redefinir sua senha."
        customDescriptionClassName="text-center"
      />

      <AuthForm.Group legend="Informações de recuperação de senha">
        <AuthForm.Field
          label="E-mail"
          {...register('email')}
          errorMessage={errors.email?.message}
          placeholder="Digite seu endereço de e-mail"
        />
      </AuthForm.Group>

      <AuthForm.Submit isLoading={isPanding}>
        Recuperar minha senha
      </AuthForm.Submit>

      <Link href="/sign-in" className="text-theme-100 text-sm">
        Lembrou da sua senha?{' '}
        <span className="font-medium text-white underline">Entre aqui</span>
      </Link>
    </AuthForm.Root>
  )
}

export default ForgotPassword
