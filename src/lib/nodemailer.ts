import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendHtmlEmail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: `"Memora" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    })

    return info
  } catch (err) {
    console.error(err)
    throw err
  }
}
