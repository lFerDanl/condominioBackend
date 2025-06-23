import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {
  private sessions = {}; // Simula sesión por número

  constructor(private readonly http: HttpService) {}

  async processMessage(body: any) {
    const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message) return;

    const from = message.from; // número de teléfono del usuario
    const text = message.text?.body?.trim();

    if (!this.sessions[from]) {
      this.sessions[from] = { step: 0 };
    }

    const session = this.sessions[from];

    switch (session.step) {
      case 0:
        await this.sendMessage(from, '¡Hola! Empecemos tu registro. Por favor, dime tu *nombre*.');
        session.step = 1;
        break;
      case 1:
        session.nombre = text;
        await this.sendMessage(from, `Perfecto ${session.nombre}. Ahora, dime tu *apellido*.`);
        session.step = 2;
        break;
      case 2:
        session.apellido = text;
        await this.sendMessage(from, `Gracias. Ahora tu *correo electrónico*.`);
        session.step = 3;
        break;
      case 3:
        session.email = text;
        await this.sendMessage(from, `Perfecto. Finalmente, dime tu *edad*.`);
        session.step = 4;
        break;
      case 4:
        session.edad = text;
        await this.sendMessage(from, `✅ Registro completado:\nNombre: ${session.nombre} ${session.apellido}\nEmail: ${session.email}\nEdad: ${session.edad}`);
        // Aquí podrías guardar en DB real.
        delete this.sessions[from];
        break;
      default:
        await this.sendMessage(from, `Si deseas reiniciar tu registro, escribe "Hola".`);
    }
  }

  async sendMessage(to: string, text: string) {
    const payload = {
      messaging_product: 'whatsapp',
      to,
      text: { body: text },
    };

    await lastValueFrom(
      this.http.post(
        `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          },
        },
      ),
    );
  }
}
