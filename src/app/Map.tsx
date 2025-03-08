'use client';

import { Icon, IconOptions } from 'leaflet';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { universities } from './data';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });
const ZoomControl = dynamic(() => import('react-leaflet').then((mod) => mod.ZoomControl), { ssr: false });

const UniversityMap = () => {
  const [defaultIcon, setDefaultIcon] = useState<Icon<IconOptions>>({} as Icon<IconOptions>);

  useEffect(() => {
    const f = async () => {
      if (typeof window === 'undefined') return;
      const icon = await import('leaflet').then((L) => L.icon);
      const Icon = icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })
      setDefaultIcon(Icon);
    }
    f();
  }, []);

  return (
    <section className='w-full h-full mt-6'>
      <h2 className='text-3xl text-gray-200 font-bold text-center py-4'>Universidades com artigos</h2>
      <MapContainer
        center={[0, 0]} // Coordenadas iniciais (latitude, longitude)
        touchZoom={false}
        dragging={true}
        fadeAnimation={true}
        markerZoomAnimation={false}
        zoomAnimation={false}
        zoomControl={false}
        zoom={2} // Nível de zoom inicial
        style={{ height: '100vh', zIndex: '0!important' }}
      >
        <MapboxTile />
        <ZoomControl position="topright" />
        {universities.map((uni, index) => (
          <Marker key={index} position={[uni.latitude, uni.longitude]} {...(defaultIcon ? { icon: defaultIcon } : {})} title='Universidade' draggable={false}>
            <Popup>
              <div>
                <a href={uni.link} target='_blank' rel='noreferrer' className='text-lg font-bold text-blue-500'>
                  {uni.university}
                </a>
                <p className='text-lg'><strong>Artigos: {uni.articles}</strong></p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};

export default UniversityMap;

function LightTile() {
  return (
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
  )
}

function DarkTile() {
  return (
    <TileLayer
      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
    />
  )
}

const MAPBOX_API = process.env.MAPBOX_API;

function MapboxTile() {
  const styles = ['light-v11', 'dark-v11', 'streets-v12', 'outdoors-v12', 'satellite-v9', 'satellite-streets-v12'];

  if (!MAPBOX_API) return <DarkTile />;

  return (
    <TileLayer
      url={`https://api.mapbox.com/styles/v1/mapbox/${styles[5]}/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API}`}
      attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
    />
  )
}