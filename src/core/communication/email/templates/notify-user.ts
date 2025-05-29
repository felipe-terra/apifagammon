export function getTodayAppointmentReminderTemplate(
  userName: string,
  appointmentTime: string,
  placeName: string,
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
    <div class="header">
      <h2>Lembrete de agendamento</h2>
    </div>
    <div class="content">
      <div class="info">
        Olá, ${userName},<br><br>
        Este é um lembrete de que você possui um agendamento para hoje às <strong>${appointmentTime}</strong> no ambiente <strong>${placeName}</strong>.<br>
      </div>
    </div>
    <div class="footer">
      Este é um email automático. Por favor, não responda.
    </div>
  </div>
</body>
</html>
`;
}
