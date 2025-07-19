import { NextRequest, NextResponse } from 'next/server'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import prisma from '@/lib/prisma'

export async function PUT(request: NextRequest) {
  try {
    const { password, token } = await request.json()

    const secret = process.env.JWT_SECRET as string

    if (!secret)
      return NextResponse.json(
        { message: 'Não foi possível recuperar a senha, tente novamente.' },
        { status: 500 },
      )

    const payload = jwt.verify(token, secret) as {
      email: string
      type: string
    }

    if (payload.type !== 'password-reset')
      return NextResponse.json({ message: 'Token inválido.' }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    })

    if (!user)
      return NextResponse.json(
        { message: 'Não foi possível recuperar a senha, tente novamente.' },
        { status: 401 },
      )

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (isPasswordValid)
      return NextResponse.json(
        {
          message: 'Sua nova senha não pode ser igual à anterior.',
        },
        { status: 400 },
      )

    const hashPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { email: payload.email },
      data: { password: hashPassword },
    })

    return NextResponse.json(
      { message: 'Password restored successfully.' },
      { status: 200 },
    )
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { message: 'Internal server error. Please try again later.' },
      { status: 500 },
    )
  }
}
