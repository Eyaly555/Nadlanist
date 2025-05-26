import { useState, useRef, useEffect } from "react";
import {
  API_STATUSES,
  ApiStatus,
  API_STATUS_TO_HEBREW_MAP,
  API_STATUS_GRADIENT_MAP
} from "./status.constants";

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

interface ProjectData {
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

export interface ProjectInfoWindowContentProps {
  project: ProjectData;
  onClose?: () => void;
}

export function StatusTag({ status }: { status: ApiStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-1 text-xs font-semibold text-white ${API_STATUS_GRADIENT_MAP[status] || API_STATUS_GRADIENT_MAP[API_STATUSES.UNKNOWN]}`}
      aria-label={API_STATUS_TO_HEBREW_MAP[status]}
    >
      {API_STATUS_TO_HEBREW_MAP[status]}
    </span>
  );
}

function TowerStatusTagsList({ towers }: { towers: TowerData[] }) {
  const maxTags = 4;
  const showMore = towers.length > maxTags;
  return (
    <div className="flex flex-wrap gap-1 mt-1 mb-2" aria-label="סטטוסי מגדלים">
      {towers.slice(0, maxTags).map((tower) => (
        <StatusTag
          key={tower.id}
          status={tower.tower_status as ApiStatus}
        />
      ))}
      {showMore && (
        <span className="rounded px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-700">
          +{towers.length - maxTags} נוספים
        </span>
      )}
    </div>
  );
}

function TowersList({ towers }: { towers: TowerData[] }) {
  if (!towers.length) return <div className="text-gray-500 text-base">אין מגדלים לפרויקט זה.</div>;
  return (
    <ul className="flex flex-col gap-2" aria-label="רשימת מגדלים">
      {towers.map((tower, idx) => (
        <li
          key={tower.id}
          className="flex items-center gap-4 p-2 rounded-lg transition-colors hover:bg-gray-50"
        >
          <span className="flex items-center gap-1 min-w-[60px] font-medium text-gray-900 text-base">
            {`מגדל ${idx + 1}`}
          </span>
          <StatusTag status={tower.tower_status as ApiStatus} />
          <span className="flex items-center gap-1 text-sm text-gray-700">
            <span role="img" aria-label="קומות">🧱</span> {tower.floors} קומות
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-700">
            <span role="img" aria-label="גובה">📏</span> {tower.height_m} מטר
          </span>
        </li>
      ))}
    </ul>
  );
}

const TABS = [
  { key: 'overview', label: 'סקירה כללית' },
  { key: 'about', label: 'קצת על הפרויקט' },
  { key: 'towers', label: 'מגדלים' },
] as const;

type TabKey = typeof TABS[number]['key'];

const infoWindowStyles = `
  .gm-style-iw {
    padding: 0 !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  }
  
  .gm-style-iw-d {
    overflow: visible !important;
  }
  
  .gm-style-iw-t::after {
    display: none !important;
  }
  
  @media (max-width: 640px) {
    .gm-style-iw {
      max-width: 280px !important;
    }
  }
`;

/**
 * ProjectInfoWindowContent - חלונית מידע אינטראקטיבית לפרויקט במפה
 * @param {ProjectInfoWindowContentProps} props
 */
export function ProjectInfoWindowContent({ project, onClose }: ProjectInfoWindowContentProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const desc = project.project_description || "אין תיאור לפרויקט זה.";
  const isLongDesc = desc.length > 90;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = infoWindowStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  function handleTabChange(tab: TabKey) {
    setActiveTab(tab);
    setIsExpanded(true);
    if (tab === 'about') setShowFullDesc(false);
  }

  function handleExpandDesc() {
    setShowFullDesc(true);
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  }

  // Header
  function renderHeader() {
    return (
      <div className={`flex flex-col gap-2 mb-4 transition-all duration-300 ${isExpanded ? 'mb-2' : 'mb-4'}`}>
        <span className="text-lg font-bold text-gray-900 tracking-tight leading-tight">{project.project_name_il}</span>
        <div className="flex items-start gap-2 text-sm font-medium text-gray-600">
          <span role="img" aria-label="מיקום" className="mt-0.5">📍</span>
          <span className="line-clamp-2">{project.full_address}</span>
        </div>
      </div>
    );
  }

  // Dynamic Content
  function renderTabContent() {
    if (activeTab === 'overview') {
      return (
        <div className="flex flex-col gap-2">
          <TowerStatusTagsList towers={project.towers} />
          <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
            <span>מספר מגדלים:</span>
            <span className="font-semibold">{project.num_towers}</span>
          </div>
        </div>
      );
    }
    if (activeTab === 'about') {
      return (
        <div className="text-base font-normal text-gray-800 leading-relaxed transition-all duration-300 ease-in-out max-h-60 overflow-auto">
          {showFullDesc || !isLongDesc ? desc : desc.slice(0, 90) + "..."}
          {isLongDesc && !showFullDesc && (
            <button
              className="ml-2 text-primary underline text-xs"
              onClick={handleExpandDesc}
            >קרא עוד</button>
          )}
        </div>
      );
    }
    if (activeTab === 'towers') {
      return <TowersList towers={project.towers} />;
    }
    return null;
  }

  // Tabs Footer
  function renderTabs() {
    return (
      <div className="flex border-t border-gray-200 pt-2 bg-gray-50 sticky bottom-0 z-10">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`flex-1 py-2 text-center font-medium transition-colors
              ${activeTab === tab.key ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
            onClick={() => handleTabChange(tab.key)}
            aria-current={activeTab === tab.key ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="font-sans bg-white rounded-lg shadow-lg border border-gray-200 max-w-sm p-4 relative flex flex-col transition-all duration-200 ease-in-out"
      style={{ 
        minWidth: 280, 
        maxWidth: 320, 
        maxHeight: 420,
        fontSize: '14px'
      }}
      aria-label={project.project_name_il}
    >
      {onClose && (
        <button
          aria-label="סגור"
          onClick={onClose}
          className="absolute left-3 top-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
        >×</button>
      )}
      {renderHeader()}
      <div className="flex-1 min-h-0 overflow-y-auto mb-2">{renderTabContent()}</div>
      {renderTabs()}
    </div>
  );
} 