import { IsString } from 'class-validator';

export class SendNotificationDTO {
    @IsString()
    title: string;

    @IsString()
    description: string;
}
