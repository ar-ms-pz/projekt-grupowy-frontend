import { Circle } from 'react-leaflet';

interface Props {
    latitude: number;
    longitude: number;
    radius: number;
}

export const MapRadius = ({ latitude, longitude, radius }: Props) => {
    return <Circle center={[latitude, longitude]} radius={radius} />;
};
