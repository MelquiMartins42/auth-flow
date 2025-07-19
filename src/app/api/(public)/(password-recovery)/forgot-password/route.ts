import { NextRequest, NextResponse } from 'next/server'

import jwt from 'jsonwebtoken'

import { sendHtmlEmail } from '@/lib/nodemailer'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user)
      return NextResponse.json(
        {
          message:
            'Não foi possível enviar o e-mail de recuperação de senha. Tente novamente.',
        },
        { status: 404 },
      )

    const secret = process.env.JWT_SECRET as string

    if (!secret)
      return NextResponse.json(
        { message: 'Server misconfiguration.' },
        { status: 500 },
      )

    const token = jwt.sign({ email, type: 'password-reset' }, secret, {
      expiresIn: '3m',
    })

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    const link = `${baseUrl}reset-password/${token}`

    const html = `
      <!DOCTYPE html>
      <html>
        <body style="margin: 0; padding: 0; background-color: #ffffff;">
          <table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff;">
            <tr>
              <td align="center" valign="middle">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #000000; border: 1px solid #242424; border-radius: 24px; padding: 32px;">
                  <tr>
                    <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 36px; font-weight: 600; line-height: 44px; padding-bottom: 24px;">
                      Hora de recuperar sua senha
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 18px; line-height: 28px; padding-bottom: 24px;">
                      Recebemos uma solicitação para redefinir a senha associada à sua conta. Para prosseguir com a recuperação de senha, por favor, clique no botão abaixo:
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-bottom: 24px;">
                      <a href="${link}" style="text-decoration: none; display: inline-block; background-color: #ffffff; color: black; font-family: Arial, sans-serif; font-size: 16px; font-weight: 500; text-decoration: none; padding: 12px 24px; border-radius: 999px;">
                        Recuperar Minha Senha
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 18px; line-height: 28px;">
                      Se você não solicitou a redefinição de senha, ignore este e-mail. Nenhuma alteração será feita em sua conta.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `
    await sendHtmlEmail(email, 'Recuperação de Senha', html)

    return NextResponse.json(
      {
        message: 'Enviamos um link de recuperação de senha para seu e-mail.',
      },
      { status: 200 },
    )
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { message: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 },
    )
  }
}
