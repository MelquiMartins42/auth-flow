'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import AuthForm from '@/app/components/common/Form'
import { useAlert } from '@/app/contexts/AlertContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'

import axiosConfig from '@/lib/axiosConfig'

import { loginSchema, LoginSchema } from './schema'

const SignIn: React.FC = () => {
  const router = useRouter()
  const { addAlert } = useAlert()
  const [isPanding, startTranstion] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = (data: LoginSchema) => {
    startTranstion(async () => {
      try {
        const response = await axiosConfig.post('/sign-in', {
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        })

        addAlert({
          status: 'success',
          title: 'Bem vindo de volta!',
          description: response.data.message,
        })
        setTimeout(() => router.push('/'), 1000)
      } catch (err) {
        if (isAxiosError(err)) {
          addAlert({
            status: 'error',
            title: 'Falha no login',
            description: err.response?.data.message,
          })
        } else {
          console.log(err)
        }
      }
    })
  }

  return (
    <>
      <AuthForm.Root onSubmit={handleSubmit(onSubmit)}>
        <AuthForm.Header
          title="Bem vindo de volta"
          description="Olá amigo, por favor insira seus dados"
        />

        <AuthForm.Group legend="Informações de login">
          <ul className="flex flex-col w-full gap-4">
            <li>
              <AuthForm.Field
                label="E-mail"
                {...register('email')}
                errorMessage={errors.email?.message}
                placeholder="Digite seu endereço de e-mail"
              />
            </li>
            <li>
              <AuthForm.Field
                type="password"
                label="Senha"
                {...register('password')}
                errorMessage={errors.password?.message}
                placeholder="Digite sua senha"
              >
                <Link
                  href="/forgot-password"
                  className="text-sm transition-all duration-200 text-theme-100 hover:text-white hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </AuthForm.Field>
            </li>
          </ul>
        </AuthForm.Group>

        <AuthForm.Submit isLoading={isPanding}>Entrar</AuthForm.Submit>

        <Link href="/sign-up" className="text-sm text-theme-100">
          Não tem uma conta?{' '}
          <span className="font-medium text-white underline">Inscrever-se</span>
        </Link>
      </AuthForm.Root>
    </>
  )
}

export default SignIn
