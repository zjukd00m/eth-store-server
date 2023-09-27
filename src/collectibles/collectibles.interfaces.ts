export interface CollectibleAttributes {
    display_type?: 'number' | 'boost_percentage' | 'boot_number' | 'date';
    trait_type: string;
    value: string | number;
    max_value?: number;
}

export interface CollectibleMetadata {
    image: string;
    external_url: string;
    description: string;
    name: string;
    attributes?: CollectibleAttributes[];
    background_color?: string;
    animation_url?: string;
    youtube_url?: string;
}

// The collectible that's stored in the EVM
export interface CollectibleData {
    id: number;
}
