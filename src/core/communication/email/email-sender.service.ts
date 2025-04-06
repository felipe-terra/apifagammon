import { Injectable } from '@nestjs/common';
import { MailerService as MailerMain } from '@nestjs-modules/mailer';
import { EmailSenderDto } from './dto/email-sender.dto';

@Injectable()
export class EmailSenderService {
  constructor(private readonly mailerMain: MailerMain) {}

  async sendMail(content: EmailSenderDto): Promise<void> {
    const from = await this.UpdateSender();
    if (from) await this._processSendEmail(content.to, content.subject, content.text, content.body, from);
  }

  private async _processSendEmail(
    to: string,
    subject: string,
    text: string,
    body: string,
    from: string,
  ): Promise<void> {
    await this.mailerMain
      .sendMail({
        to: to,
        subject: subject,
        from,
        transporterName: 'transporter',
        text: text,
        html: body,
      })
      .then(() => {
        console.log('Email sent' + to);
      })
      .catch((e) => {
        console.log('Error sending email', e);
      });
  }

  private async UpdateSender() {
    this.mailerMain.addTransporter('transporter', {
      host: process.env.HOST,
      port: Number(process.env.PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    return process.env.EMAIL;
  }
}
