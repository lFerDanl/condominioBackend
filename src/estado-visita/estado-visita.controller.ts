import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EstadoVisitaService } from './estado-visita.service';
import { CreateEstadoVisitaDto } from './dto/create-estado-visita.dto';
import { UpdateEstadoVisitaDto } from './dto/update-estado-visita.dto';

@Controller('estado-visita')
export class EstadoVisitaController {
  constructor(private readonly estadoVisitaService: EstadoVisitaService) {}

  @Post()
  create(@Body() dto: CreateEstadoVisitaDto) {
    return this.estadoVisitaService.create(dto);
  }

  @Get()
  findAll() {
    return this.estadoVisitaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.estadoVisitaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEstadoVisitaDto,
  ) {
    return this.estadoVisitaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.estadoVisitaService.remove(id);
  }
} 