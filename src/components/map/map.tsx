import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './use-map';
import { TBookingLocation, TCompanyLocation } from '../../types';
import { SPETERBURG } from '../../const';

export type MapProps = {
  bookingLocations: TBookingLocation[] | TCompanyLocation[];
  activeLocation: TBookingLocation | TCompanyLocation;
};

const defaultCustomIcon = new Icon({
  iconUrl: '/img/svg/pin-default.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: '/img/svg/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

function Map(props: MapProps): JSX.Element {
  const {bookingLocations, activeLocation} = props;

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
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, bookingLocations, activeLocation]);

  return <div className='map__container' ref={mapRef}/>;
}

export default Map;
