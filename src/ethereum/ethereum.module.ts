import { Module } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { EthereumFactoryProvider } from './ethereum.provider';
import { ETHEREUM_PROVIDER } from './ethereum.constants';

@Module({
    providers: [EthereumFactoryProvider, EthereumService],
    exports: [ETHEREUM_PROVIDER, EthereumService],
})
export class EthereumModule {}
