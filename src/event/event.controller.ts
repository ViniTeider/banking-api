import { Body, Controller, Post } from '@nestjs/common';
import { GenericEventDto } from './dto/event.dto';
import { EventService } from './event.service';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('event')
  createEvent(@Body() event: GenericEventDto) {
    return this.eventService.processEvent(event);
  }
}
