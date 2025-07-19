import { NextRequest, NextResponse } from 'next/server'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user)
      return NextResponse.json(
        {
          message:
            'Não foi possível verificar suas credenciais. Tente novamente.',
        },
        { status: 404 },
      )

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid)
      return NextResponse.json(
        {
          message:
            'Não foi possível verificar suas credenciais. Tente novamente.',
        },
        { status: 400 },
      )

    const secret = process.env.JWT_SECRET as string

    if (!secret)
      return NextResponse.json(
        { message: 'Server misconfiguration.' },
        { status: 500 },
      )

    const token = jwt.sign(
      { userId: user.id, email, role: user.role },
      secret,
      {
        expiresIn: '7d',
      },
    )

    const response = NextResponse.json(
      {
        message:
          'Você fez login com sucesso. Redirecionando para o seu painel.',
      },
      { status: 200 },
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { message: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 },
    )
  }
}
