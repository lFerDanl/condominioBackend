import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { QrService } from './qr.service';
import { CreateQrDto } from './dto/create-qr.dto';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Post('generar')
  @HttpCode(HttpStatus.CREATED)
  async generar(@Body() createQrDto: CreateQrDto) {
    return this.qrService.generarQR(createQrDto);
  }
}

