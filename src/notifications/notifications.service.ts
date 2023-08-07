import { BehaviorSubject, map } from 'rxjs';
import { AlchemyProvider } from 'ethers';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Notification } from './notifications.interfaces';
import { ETHEREUM_PROVIDER } from 'src/ethereum/ethereum.constants';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NotificationsService {
    private readonly notificationsBehavioralSubject =
        new BehaviorSubject<Notification>(null);

    constructor(
        private readonly eventEmitter: EventEmitter2,
        @Inject(ETHEREUM_PROVIDER)
        private readonly ethClient: AlchemyProvider,
    ) {
        this.eventEmitter.on('notification.new', (event) => {
            const { data } = event;

            this.notificationsBehavioralSubject.next({
                id: uuidv4(),
                ...data,
            });
        });
    }

    getNotifications() {
        return this.notificationsBehavioralSubject.pipe(
            map((data) => ({ data })),
        );
    }
}
