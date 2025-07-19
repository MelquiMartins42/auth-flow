'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowLeft } from 'react-icons/fi'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Checkbox from '@/app/components/common/Checkbox'
import AuthForm from '@/app/components/common/Form'
import { useAlert } from '@/app/contexts/AlertContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'

import axiosConfig from '@/lib/axiosConfig'

import {
  ProfileData,
  profileSchema,
  CreatePasswordData,
  createPasswordSchema,
} from './schema'

const SignUp: React.FC = () => {
  const router = useRouter()
  const { addAlert } = useAlert()

  const [step, setStep] = useState(0)
  const [isPanding, startTranstion] = useTransition()

  const steps = [
    {
      title: 'Criar uma conta',
      description: 'Vamos começar sua jornada conosco hoje',
      button: 'Continuar',
    },
    {
      title: 'Crie sua senha',
      description: 'Crie uma senha forte para manter sua conta segura',
      button: 'Inscrever-se',
    },
  ]

  const personalInfoForm = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const createPasswordForm = useForm<CreatePasswordData>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
    },
  })

  const handleNextStep = () => {
    startTranstion(async () => {
      try {
        const isValid = await personalInfoForm.trigger()
        if (isValid) setStep(1)
      } catch (err) {
        console.log(err)
      }
    })
  }

  const handleBackStep = () => {
    setStep(0)
    createPasswordForm.reset()
  }

  const onFinalSubmit = (createPasswordData: CreatePasswordData) => {
    startTranstion(async () => {
      try {
        const isStepValid = await personalInfoForm.trigger()

        if (!isStepValid) {
          setStep(0)
          return
        }

        const personalInfoData = personalInfoForm.getValues()

        const mergedData = {
          ...createPasswordData,
          ...personalInfoData,
        }

        const response = await axiosConfig.put('/sign-up', {
          name: mergedData.name,
          email: mergedData.email,
          password: mergedData.password,
        })

        addAlert({
          status: 'success',
          title: 'Bem vindo de volta!',
          description: response.data.message,
        })
        setTimeout(() => router.push('/sign-in'), 1000)
      } catch (err) {
        console.error(err)

        if (isAxiosError(err)) {
          addAlert({
            status: 'error',
            title: 'Falha no registro',
            description: err.response?.data.message,
          })
        } else {
          console.error(err)
        }
      }
    })
  }

  return (
    <>
      <AuthForm.Root onSubmit={createPasswordForm.handleSubmit(onFinalSubmit)}>
        <AuthForm.Group
          legend="Cabeçalho do formulário"
          customClassName="flex-col gap-4"
        >
          {step > 0 && (
            <button
              type="button"
              onClick={handleBackStep}
              className="p-2 text-2xl text-white transition-colors duration-200 border cursor-pointer w-fit rounded-xl bg-theme-500 hover:bg-theme-400 border-theme-300 hover:border-theme-200"
            >
              <FiArrowLeft />
            </button>
          )}

          <AuthForm.Header
            title={steps[step].title}
            description={steps[step].description}
          />
        </AuthForm.Group>

        <AuthForm.Group
          legend="Informações de inscrição"
          customClassName="flex-col gap-6"
        >
          <AuthForm.StepProgressBar current={step} maxStep={steps.length} />

          {step === 0 && (
            <AuthForm.Group legend="Informações pessoais">
              <ul className="flex flex-col w-full gap-4">
                <li>
                  <AuthForm.Field
                    label="Nome"
                    {...personalInfoForm.register('name')}
                    errorMessage={
                      personalInfoForm.formState.errors.name?.message
                    }
                    placeholder="Digite seu nome e sobrenome"
                  />
                </li>
                <li>
                  <AuthForm.Field
                    label="E-mail"
                    {...personalInfoForm.register('email')}
                    errorMessage={
                      personalInfoForm.formState.errors.email?.message
                    }
                    placeholder="Digite seu endereço de e-mail"
                  />
                </li>
              </ul>
            </AuthForm.Group>
          )}

          {step === 1 && (
            <AuthForm.Group legend="Defina sua senha">
              <ul className="flex flex-col w-full gap-4">
                <li>
                  <AuthForm.Field
                    type="password"
                    label="Senha"
                    {...createPasswordForm.register('password')}
                    errorMessage={
                      createPasswordForm.formState.errors.password?.message
                    }
                    placeholder="Digite sua senha"
                  />
                </li>
                <li>
                  <AuthForm.Field
                    type="password"
                    label="Confirmar Senha"
                    {...createPasswordForm.register('confirmPassword')}
                    errorMessage={
                      createPasswordForm.formState.errors.confirmPassword
                        ?.message
                    }
                    placeholder="Confirme sua senha"
                  />
                </li>
                <li>
                  <Checkbox
                    control={createPasswordForm.control}
                    name="acceptedTerms"
                  >
                    Eu concordo com os{' '}
                    <Link href="" className="underline">
                      Termos de Serviço
                    </Link>{' '}
                    e reconhecer{' '}
                    <Link href="" className="underline">
                      política de Privacidade
                    </Link>{' '}
                    da Memora.
                  </Checkbox>
                </li>
              </ul>
            </AuthForm.Group>
          )}
        </AuthForm.Group>

        {step === 0 && (
          <AuthForm.Submit
            type="button"
            isLoading={isPanding}
            onClick={handleNextStep}
          >
            {steps[step].button}
          </AuthForm.Submit>
        )}

        {step === 1 && (
          <AuthForm.Submit isLoading={isPanding}>
            {steps[step].button}
          </AuthForm.Submit>
        )}

        <Link href="/sign-in" className="text-sm text-theme-100">
          Você já tem uma conta?{' '}
          <span className="font-medium text-white underline">Entre aqui</span>
        </Link>
      </AuthForm.Root>
    </>
  )
}

export default SignUp
