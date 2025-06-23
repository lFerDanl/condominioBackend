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
import { GuardiaService } from './guardia.service';
import { CreateGuardiaDto } from './dto/create-guardia.dto';
import { UpdateGuardiaDto } from './dto/update-guardia.dto';

@Controller('guardias')
export class GuardiaController {
  constructor(private readonly guardiaService: GuardiaService) {}

  @Post()
  create(@Body() dto: CreateGuardiaDto) {
    return this.guardiaService.create(dto);
  }

  @Get()
  findAll() {
    return this.guardiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.guardiaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGuardiaDto,
  ) {
    return this.guardiaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.guardiaService.remove(id);
  }
}
