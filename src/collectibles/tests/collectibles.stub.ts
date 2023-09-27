import { ContractType } from 'src/common/enums/contract.enum';
import { Collectible } from '../collectibles.entity';
import { User } from 'src/users/users.entity';
import { Collection } from 'src/collections/collection.entity';

export function getCollectiblesWithNoID(
    amount: number,
    collectionIds: string[],
): Collectible[] {
    if (collectionIds?.length !== amount) {
        throw new Error(
            'The amount of collection Ids must match the amount parameter',
        );
    }

    return [...Array(amount).keys()]?.map((_, index) => {
        const collectible = new Collectible();

        // Set the deployer entity
        const deployer = new User();
        deployer.wallet = '0x89ACF29bEED95eF65206118c6a44009fAb6D2776';

        // Set the collection entity
        const collection = new Collection();
        collection.id = collectionIds[index];
        collection.isDeployed = false;

        collectible.collection = collection;

        collectible.id = null;
        collectible.contractType = ContractType.ERC721;
        collectible.deployedAt = new Date();
        collectible.supply = 0;
        collectible.metadata = null;
        collectible.address = null;
        collectible.deployer = deployer;
        collectible.isDeployed = false;
        collectible.frozenMetadata = false;

        return collectible;
    });
}
