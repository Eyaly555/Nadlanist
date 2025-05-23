"use client";

import { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, type LoadScriptProps } from "@react-google-maps/api";
import Image from "next/image";
import { ProjectInfoWindowContent } from "./ProjectInfoWindowContent";
import {
  API_STATUSES,
  ApiStatus,
  API_STATUS_ORDER,
  API_STATUS_MARKER_MAP
} from "./status.constants";

interface TowerData {
  id: number | string;
  tower_identifier?: string;
  floors: number;
  height_m: number;
  tower_status: ApiStatus | string;
}

interface ProjectData {
  id: number | string;
  project_name: string;
  latitude: number;
  longitude: number;
  project_description?: string;
  city: string;
  num_towers: number;
  full_address: string;
  overall_project_status?: string;
  towers: TowerData[];
}

const MAP_CENTER = { lat: 31.771959, lng: 35.217018 };
const MAPS_LIBRARIES: NonNullable<LoadScriptProps["libraries"]> = ["places"];

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

export function NadlanistMap() {
  const { isLoaded } = useJsApiLoader({
    id: "nadlanist-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: MAPS_LIBRARIES,
    language: "he",
    region: "IL",
  });

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [hasError, setHasError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ProjectData | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  useEffect(function fetchProjects() {
    let isMounted = true;
    async function getProjects() {
      setIsLoadingProjects(true);
      setHasError(null);
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("שגיאה בטעינת פרויקטים");
        const data = await res.json();
        if (isMounted) setProjects(data || []);
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "message" in error && typeof (error as { message?: unknown }).message === "string") {
          setHasError((error as { message: string }).message);
        } else {
          setHasError("שגיאה בטעינת פרויקטים");
        }
      } finally {
        if (isMounted) setIsLoadingProjects(false);
      }
    }
    getProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isLoaded || isLoadingProjects)
    return (
      <div className="flex items-center justify-center h-96 text-secondary">
        { !isLoaded ? "טוען מפה..." : "טוען פרויקטים..." }
      </div>
    );

  if (hasError)
    return (
      <div className="flex items-center justify-center h-96 text-red-600 font-bold">
        {hasError}
      </div>
    );

  // Center map on first project if available
  const mapCenter = projects.length > 0
    ? { lat: Number(projects[0].latitude), lng: Number(projects[0].longitude) }
    : MAP_CENTER;

  return (
    <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-light shadow-lg">
      {/* Branding */}
      <div className="absolute top-6 left-6 z-10 bg-white/90 rounded-xl px-4 py-2 flex items-center gap-3 shadow-md border border-[#DBEDED]">
        <Image src="/mark-teal.svg" alt="סמל נדלניסט" width={32} height={32} />
        <Image src="/logo-teal.svg" alt="לוגו נדלניסט" width={80} height={32} />
      </div>
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={mapCenter}
        zoom={12}
        onLoad={setMapRef}
        options={{
          mapId: "e370b603b970ca2eea908fe6",
          disableDefaultUI: true,
          gestureHandling: "greedy",
          clickableIcons: false,
          backgroundColor: "#F5F7F9",
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
                  mapRef.panTo({ lat: Number(project.latitude), lng: Number(project.longitude) });
                }
              }}
              icon={{
                url: API_STATUS_MARKER_MAP[overallApiStatus] || API_STATUS_MARKER_MAP[API_STATUSES.UNKNOWN],
                scaledSize: new window.google.maps.Size(60, 60),
              }}
              title={project.project_name}
            />
          );
        })}
        {selected && (
          <InfoWindow
            position={{ lat: Number(selected.latitude), lng: Number(selected.longitude) }}
            onCloseClick={() => setSelected(null)}
            options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
          >
            <ProjectInfoWindowContent project={selected} />
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
} 