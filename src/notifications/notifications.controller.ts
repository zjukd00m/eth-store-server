import { Controller, Sse } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('api/notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Sse('')
    getNotifications() {
        return this.notificationsService.getNotifications();
    }
}
