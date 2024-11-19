import { useRetrieveAddress } from '@/api/address/use-retrive-address';
import { MapRadius } from '@/components/map/map-radius';
import { useSearch } from '@tanstack/react-router';

export const RadiusConnector = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { distance = 1, mapboxId }: Record<string, any> = useSearch({
        from: '/search',
    });

    const { data: address, isLoading } = useRetrieveAddress();

    if (isLoading || !address || !mapboxId) return null;

    return (
        <MapRadius
            longitude={address.geometry.coordinates[0]}
            latitude={address.geometry.coordinates[1]}
            radius={distance * 1000}
        />
    );
};
