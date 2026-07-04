// apps/web/src/components/demo/StormMap.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface StormMapProps {
  storms: any[];
  selectedStorm: string | null;
  onStormSelect: (stormId: string) => void;
}

export function StormMap({ storms, selectedStorm, onStormSelect }: StormMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-97.5);
  const [lat, setLat] = useState(32.7);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom,
      interactive: true
    });

    // Add storm markers
    storms.forEach((storm) => {
      const color = getStormColor(storm.severity);
      
      // Create marker element
      const el = document.createElement('div');
      el.className = 'storm-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.backgroundColor = color;
      el.style.borderRadius = '50%';
      el.style.border = '3px solid white';
      el.style.cursor = 'pointer';

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([storm.location.lng, storm.location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-4 min-w-[200px]">
                <h3 class="font-bold text-lg">${storm.name}</h3>
                <div class="space-y-1 text-sm">
                  <div>Hail: <strong>${storm.hailSize}"</strong></div>
                  <div>Wind: <strong>${storm.windSpeed} mph</strong></div>
                  <div>Properties: <strong>${storm.affectedProperties}</strong></div>
                  <div class="mt-2">
                    <button 
                      onclick="window.selectStorm('${storm.id}')"
                      class="w-full bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            `)
        )
        .addTo(map.current!);
    });

    // Add damage heatmap layer
    map.current.on('load', () => {
      if (map.current && selectedStorm) {
        map.current.addSource('damage-heatmap', {
          type: 'geojson',
          data: generateDamageHeatmapData(selectedStorm)
        });

        map.current.addLayer({
          id: 'damage-heat',
          type: 'heatmap',
          source: 'damage-heatmap',
          paint: {
            'heatmap-weight': {
              property: 'damageScore',
              type: 'exponential',
              stops: [
                [0, 0],
                [100, 1]
              ]
            },
            'heatmap-intensity': 1,
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(33,102,172,0)',
              0.2, 'rgb(103,169,207)',
              0.4, 'rgb(209,229,240)',
              0.6, 'rgb(253,219,199)',
              0.8, 'rgb(239,138,98)',
              1, 'rgb(178,24,43)'
            ],
            'heatmap-radius': 30,
            'heatmap-opacity': 0.6
          }
        });
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [storms, selectedStorm]);

  // Expose function to window for popup buttons
  useEffect(() => {
    (window as any).selectStorm = onStormSelect;
  }, [onStormSelect]);

  function getStormColor(severity: number): string {
    if (severity >= 8) return '#ef4444';
    if (severity >= 5) return '#f97316';
    return '#eab308';
  }

  function generateDamageHeatmapData(stormId: string) {
    // Generate mock heatmap data for demo
    return {
      type: 'FeatureCollection',
      features: Array.from({ length: 50 }, (_, i) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            -96.7970 + (Math.random() - 0.5) * 0.1,
            32.7767 + (Math.random() - 0.5) * 0.1
          ]
        },
        properties: {
          damageScore: Math.floor(Math.random() * 100)
        }
      }))
    };
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden border border-slate-700">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm p-3 rounded-lg border border-slate-700">
        <div className="text-white font-semibold mb-2">Storm Severity</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-gray-300">High (8-10)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-gray-300">Medium (5-7)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-gray-300">Low (1-4)</span>
          </div>
        </div>
      </div>
    </div>
  );
}