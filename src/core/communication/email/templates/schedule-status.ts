export function scheduleStatusTemplate(
  titulo: string,
  nomeCliente: string,
  sala: string,
  data: string,
  horario: string,
  statusClass?: string,
) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      background-color: #ffffff;
      margin: 30px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #4CAF50;
      color: white;
      padding: 15px;
      text-align: center;
      border-radius: 6px 6px 0 0;
    }
    .header.cancelado {
      background-color: #e53935;
    }
    .content {
      padding: 20px;
    }
    .info {
      margin: 15px 0;
      line-height: 1.6;
    }
    .label {
      font-weight: bold;
    }
    .footer {
      font-size: 13px;
      text-align: center;
      color: #888;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header ${statusClass ? statusClass : ''}">
      <h2>${titulo}</h2>
    </div>
    <div class="content">
      <p>Olá,</p>
      <p>Segue os detalhes do agendamento:</p>
      <div class="info">
        <p><span class="label">Pessoa:</span> ${nomeCliente}</p>
        <p><span class="label">Sala:</span> ${sala}</p>
        <p><span class="label">Data:</span> ${data}</p>
        <p><span class="label">Horário:</span> ${horario}</p>
      </div>
    </div>
    <div class="footer">
      Este é um email automático. Por favor, não responda.
    </div>
  </div>
</body>
</html>`;
}
