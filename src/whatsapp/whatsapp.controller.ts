// src/whatsapp.controller.ts

import { Controller, Get, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { Request, Response } from 'express';

@Controller('webhook')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

    /**
   * ✅ 1) Endpoint para verificar el Webhook cuando Meta hace GET
   */
    @Get()
    verify(@Query() query: any, @Res() res: Response) {
      const mode = query['hub.mode'];
      const token = query['hub.verify_token'];
      const challenge = query['hub.challenge'];

        // ✅ Aquí mismo: logs detallados
     console.log('👉 mode:', mode);
     console.log('👉 token recibido:', token);
     console.log('👉 challenge recibido:', challenge);
     console.log('👉 token esperado:', process.env.WHATSAPP_VERIFY_TOKEN);
  
      if (mode && token) {
        if (mode === 'subscribe' && token === 'pruebaQR2024') {
          console.log('🌐 Webhook verificado correctamente');
          return res.status(HttpStatus.OK).send(challenge);
        } else {
          return res.sendStatus(HttpStatus.FORBIDDEN);
        }
      }
      return res.sendStatus(HttpStatus.BAD_REQUEST);
    }
  

  @Post()
  async handleMessage(@Req() req: Request, @Res() res: Response) {
    await this.whatsappService.processMessage(req.body);
    return res.sendStatus(200);
  }
}
