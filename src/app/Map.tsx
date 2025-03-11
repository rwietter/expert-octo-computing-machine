'use client';

import L from 'leaflet';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { universities } from './data';

// Dynamic imports for React Leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });
const ZoomControl = dynamic(() => import('react-leaflet').then((mod) => mod.ZoomControl), { ssr: false });

// Create icon instance outside component to avoid recreation
const DefaultIcon = L.icon({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  shadowUrl: '/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const UniversityMap = () => {
  useEffect(() => {
    // Set default icon for all markers
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  return (
    <section className='w-full h-full mt-6'>
      <h2 className='text-3xl text-gray-200 font-bold text-center py-4'>Universidades com artigos selecionados</h2>
      <MapContainer
        center={[0, 0]}
        touchZoom={false}
        dragging={true}
        fadeAnimation={true}
        markerZoomAnimation={false}
        zoomAnimation={false}
        zoomControl={false}
        zoom={2}
        style={{ height: '80vh', zIndex: '0!important' }}
      >
        <MapboxTile />
        <ZoomControl position="topright" />
        {universities.map((uni, index) => (
          <Marker
            key={index}
            position={[uni.latitude, uni.longitude]}
            title='Universidade'
            draggable={false}
          >
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

const MAPBOX_API = process.env.MAPBOX_API;


function DarkTile() {
  return (
    <TileLayer
      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
    />
  )
}
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