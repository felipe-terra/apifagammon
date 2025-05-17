export function getForgotPasswordTemplate(token: string) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Recuperação de Senha</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="400" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <h2 style="color: #333; margin: 0;">Recuperação de Senha</h2>
            </td>
          </tr>
          <tr>
            <td style="color: #555; font-size: 16px; padding-bottom: 24px;">
              Olá,<br><br>
              Recebemos uma solicitação para redefinir sua senha.<br>
              Para continuar, clique no botão abaixo:
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <a href="http://127.0.0.1:5500/pages/redefinir_senha.html?token=${token}" target="_blank"
                 style="display: inline-block; padding: 14px 32px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-size: 16px; font-weight: bold;">
                Redefinir Senha
              </a>
            </td>
          </tr>
          <tr>
            <td style="color: #888; font-size: 14px;">
              Se você não solicitou a alteração, ignore este e-mail.<br>
              Este link é válido por uma hora.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
