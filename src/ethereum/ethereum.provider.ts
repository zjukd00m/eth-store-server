import { ethers } from 'ethers';
import { FactoryProvider } from '@nestjs/common';
import { ETHEREUM_PROVIDER } from './ethereum.constants';
import { ConfigService } from '@nestjs/config';

export const EthereumFactoryProvider: FactoryProvider<ethers.AlchemyProvider> =
    {
        provide: ETHEREUM_PROVIDER,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            const alchemyAPIKey = configService.get('alchemyAPIKey');
            const provider = new ethers.AlchemyProvider(
                'goerli',
                alchemyAPIKey,
            );
            return provider;
        },
    };
