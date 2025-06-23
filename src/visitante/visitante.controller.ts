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
  import { VisitanteService } from './visitante.service';
  import { CreateVisitanteDto } from './dto/create-visitante.dto';
  import { UpdateVisitanteDto } from './dto/update-visitante.dto';

  
  @Controller('visitante')
  export class VisitanteController {
    constructor(private readonly visitanteService: VisitanteService) {}
  
    @Post()
    create(@Body() createVisitanteDto: CreateVisitanteDto) {
      return this.visitanteService.create(createVisitanteDto);
    }
  
    @Get()
    findAll() {
      return this.visitanteService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.visitanteService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateVisitanteDto: UpdateVisitanteDto,
    ) {
      return this.visitanteService.update(id, updateVisitanteDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.visitanteService.remove(id);
    }

    @Get('ci/:ci')
    findByCi(@Param('ci') ci: string) {
      return this.visitanteService.findByCi(ci);
    }
  }
  