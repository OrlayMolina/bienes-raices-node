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

const emailOlvidePassword = async (datos) => {

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
      subject: 'Restablece tu password en bienesraices.com',
      text: 'Restablece tu password en bienesraices.com',
      html: `<p>Hola ${nombre}, Has solicitado reestablecer tu password en bienesraices.com</p>
      
          <p>Sigue el siguiente enlace para generar un password nuevo:
          <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Restablecer Password</a></p>
          
          <p>Sí tu no solicitaste el cambio de password puedes ignorar este mensaje</p>`
    })

}

export {
    emaillRegistro,
    emailOlvidePassword
}