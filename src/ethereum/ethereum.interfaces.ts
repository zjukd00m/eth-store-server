import { ethers } from 'ethers';

export interface VerifySignatureInput {
    message: string;
    wallet: ethers.AddressLike;
    signature: ethers.SignatureLike;
}
