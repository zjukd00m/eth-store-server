import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { EthereumModule } from 'src/ethereum/ethereum.module';

@Module({
    imports: [EthereumModule],
    controllers: [NotificationsController],
    providers: [NotificationsService],
})
export class NotificationsModule {}
