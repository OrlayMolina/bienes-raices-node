import nodemailer from 'nodemailer'

const emaillRegistro = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const { email, nombre, token} = datos

      //Enviar Email
      await transport.sendMail({
        from: 'bienesraices.com',
        to: email,
        subject: 'Confirma tu Cuenta en bienesraices.com',
        text: 'Confirma tu cuenta en bienesraices.com',
        html: `<p>Hola ${nombre}, comprueba tu cuenta en bienesraices.com</p>
        
            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a></p>
            
            <p>Sí tu no creaste esta cuenta puedes ignorar este mensaje</p>`
      })

}

export {
    emaillRegistro
}