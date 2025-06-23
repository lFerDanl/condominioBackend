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
import { ResidenteService } from './residente.service';
import { CreateResidenteDto } from './dto/create-residente.dto';
import { UpdateResidenteDto } from './dto/update-residente.dto';

@Controller('residente')
export class ResidenteController {
  constructor(private readonly residenteService: ResidenteService) {}

  @Post()
  create(@Body() dto: CreateResidenteDto) {
    return this.residenteService.create(dto);
  }

  @Get()
  findAll() {
    return this.residenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.residenteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateResidenteDto,
  ) {
    return this.residenteService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.residenteService.remove(id);
  }
} 