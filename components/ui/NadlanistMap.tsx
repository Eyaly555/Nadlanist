"use client";

import { useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, type LoadScriptProps } from "@react-google-maps/api";
import Image from "next/image";
import { ProjectInfoWindowContent } from "./ProjectInfoWindowContent";
import {
  API_STATUSES,
  ApiStatus,
  API_STATUS_ORDER,
  API_STATUS_MARKER_MAP
} from "./status.constants";
import { Expand, Minimize } from "lucide-react";

interface TowerData {
  id: number | string;
  created_at?: string;
  updated_at?: string;
  project_id?: number | string;
  floors: number;
  height_m: number;
  tower_specific_count_field?: number;
  tower_status: string;
  tower_identifier?: string;
  project_name?: string;
  project_name_il?: string;
  effective_city?: string;
  original_city?: string;
  project_status?: string;
  full_address?: string;
  project_description?: string;
  num_towers?: number;
}

export interface ProjectData {
  id: number | string;
  created_at?: string;
  updated_at?: string;
  project_name: string;
  project_name_il: string;
  latitude: number;
  longitude: number;
  project_description?: string;
  effective_city: string;
  original_city?: string;
  num_towers: number;
  full_address?: string;
  project_status?: string;
  overall_project_status?: string;
  project_identifier: string;
  source_url?: string;
  towers: TowerData[];
}

export interface MapProjectData extends ProjectData {
  towers: Array<{
    id: number | string;
    project_id: number | string;
    floors: number;
    height_m: number;
    tower_status: string;
    tower_identifier?: string;
  }>;
}

const MAP_CENTER = { lat: 32.0749425, lng: 34.800611 };
const MAPS_LIBRARIES: NonNullable<LoadScriptProps["libraries"]> = ["places", "geometry"];

function getMostAdvancedStatus(towers: TowerData[]): ApiStatus {
  if (!towers?.length) return API_STATUSES.UNKNOWN;
  for (const status of API_STATUS_ORDER) {
    if (status === API_STATUSES.UNKNOWN) continue;
    if (status === API_STATUSES.COMPLETED) {
      if (towers.every(t => t.tower_status === status)) return status;
    } else {
      if (towers.some(t => t.tower_status === status)) return status;
    }
  }
  return API_STATUSES.UNKNOWN;
}

interface NadlanistMapProps {
  projects: ProjectData[];
  isLoading: boolean;
  error: string | null;
}

export function NadlanistMap({ projects, isLoading, error }: NadlanistMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "nadlanist-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: MAPS_LIBRARIES,
    language: "he",
    region: "IL",
  });

  const [selected, setSelected] = useState<ProjectData | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isLoaded || isLoading)
    return (
      <div className="flex items-center justify-center h-96 text-secondary">
        { !isLoaded ? "טוען מפה..." : "טוען פרויקטים..." }
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-96 text-red-600 font-bold">
        {error}
      </div>
    );

  // Center map on first project if available
  const mapCenter = projects.length > 0
    ? { lat: Number(projects[0].latitude), lng: Number(projects[0].longitude) }
    : MAP_CENTER;

  return (
    <div
      className={[
        "flex flex-col w-full rounded-2xl overflow-hidden bg-light shadow-lg transition-all duration-300",
        isFullscreen
          ? "fixed inset-0 w-screen h-screen z-[9999] rounded-none !m-0 !p-0"
          : "relative h-[70vh]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Fullscreen Toggle Button */}
      <div className="pointer-events-none absolute top-4 right-4 z-50">
        <button
          type="button"
          aria-label={isFullscreen ? "צא ממסך מלא" : "הצג מסך מלא"}
          onClick={() => setIsFullscreen((v) => !v)}
          className="pointer-events-auto bg-white/95 hover:bg-gray-100 rounded-full p-2 sm:p-3 shadow-xl border border-gray-300 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
          style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)' }}
        >
          {isFullscreen ? (
            <Minimize className="w-6 h-6 text-teal-700" />
          ) : (
            <Expand className="w-6 h-6 text-teal-700" />
          )}
        </button>
      </div>
      {/* Branding */}
      <div className="absolute top-6 left-6 z-10 bg-white/90 rounded-xl px-4 py-2 flex items-center gap-3 shadow-md border border-[#DBEDED]">
        <Image src="/mark-teal.svg" alt="סמל נדלניסט" width={32} height={32} />
        <Image src="/logo-teal.svg" alt="לוגו נדלניסט" width={80} height={32} />
      </div>
      <GoogleMap
        mapContainerClassName={[
          "w-full h-full",
          isFullscreen && "min-h-screen min-w-screen",
        ].filter(Boolean).join(" ")}
        center={mapCenter}
        zoom={12}
        onLoad={setMapRef}
        options={{
          mapId: "e370b603b970ca2eea908fe6",
          disableDefaultUI: true,
          gestureHandling: "greedy",
          clickableIcons: false,
          backgroundColor: "#F5F7F9",
          zoomControl: true,
          zoomControlOptions: {
            position: 11
          },
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
      >
        {projects.map((project) => {
          const overallApiStatus: ApiStatus = getMostAdvancedStatus(project.towers);
          return (
            <Marker
              key={project.id}
              position={{ lat: Number(project.latitude), lng: Number(project.longitude) }}
              onClick={() => {
                setSelected(project);
                if (mapRef) {
                  const bounds = mapRef.getBounds();
                  const center = mapRef.getCenter();
                  const projectLatLng = { lat: Number(project.latitude), lng: Number(project.longitude) };
                  if (bounds && center) {
                    const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                      new window.google.maps.LatLng(center.lat(), center.lng()),
                      new window.google.maps.LatLng(projectLatLng.lat, projectLatLng.lng)
                    );
                    if (distance > 500) {
                      mapRef.panTo(projectLatLng);
                    }
                  }
                }
              }}
              icon={{
                url: API_STATUS_MARKER_MAP[overallApiStatus] || API_STATUS_MARKER_MAP[API_STATUSES.UNKNOWN],
                scaledSize: new window.google.maps.Size(60, 60),
              }}
              title={project.project_name_il}
            />
          );
        })}
        {selected && (
          <InfoWindow
            position={{ lat: Number(selected.latitude), lng: Number(selected.longitude) }}
            onCloseClick={() => setSelected(null)}
            options={{
              disableAutoPan: false,
              maxWidth: 320,
              pixelOffset: new window.google.maps.Size(0, -10)
            }}
          >
            <ProjectInfoWindowContent project={selected} />
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
} 