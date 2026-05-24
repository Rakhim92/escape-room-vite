import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './use-map';
import { TBookingLocation, TCompanyLocation } from '../../types';
import { SPETERBURG } from '../../const';
import pinDefault from '/img/svg/pin-default.svg';
import pinActive from '/img/svg/pin-active.svg';

export type MapProps = {
  bookingLocations: TBookingLocation[] | TCompanyLocation[];
  activeLocation: TBookingLocation | TCompanyLocation;
  onLocationChange?: (id: string) => void;
};

const defaultCustomIcon = new Icon({
  iconUrl: pinDefault,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: pinActive,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function Map(props: MapProps): JSX.Element {
  const {bookingLocations, activeLocation, onLocationChange} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, SPETERBURG);

  useEffect(() => {
    if (map) {
      map.setView([SPETERBURG.location.latitude, SPETERBURG.location.longitude], SPETERBURG.location.zoom);
    }
  }, [map]);

  useEffect(() => {
    if (map && bookingLocations) {
      const markerLayer = layerGroup().addTo(map);

      bookingLocations.forEach((location) => {
        const marker = new Marker({
          lat: location.location.coords[0],
          lng: location.location.coords[1]
        });

        const isCurrent = !!activeLocation && location.id === activeLocation.id;

        marker
          .setIcon(isCurrent ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
        // Исправлено: навешиваем обработчик клика на маркер
        if (onLocationChange) {
          marker.on('click', () => {
            onLocationChange(location.id);
          });
        }
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, bookingLocations, activeLocation, onLocationChange]);

  return <div className='map__container' ref={mapRef}/>;
}

export default Map;
