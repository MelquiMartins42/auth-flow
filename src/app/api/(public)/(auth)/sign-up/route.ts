import { NextRequest, NextResponse } from 'next/server'

import bcrypt from 'bcryptjs'

import prisma from '@/lib/prisma'

export async function PUT(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (user)
      return NextResponse.json(
        {
          message:
            'Já existe uma conta com este e-mail ou algo deu errado. Tente novamente.',
        },
        { status: 409 },
      )

    const hashPassowrd = await bcrypt.hash(password, 10)

    await prisma.user.create({ data: { name, email, password: hashPassowrd } })

    return NextResponse.json(
      {
        message:
          'Sua conta foi criada com sucesso. Agora você pode fazer login e começar.',
      },
      { status: 201 },
    )
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { message: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 },
    )
  }
}
