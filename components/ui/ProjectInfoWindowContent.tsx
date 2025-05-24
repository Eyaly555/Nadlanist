import { useState, useRef } from "react";
import {
  API_STATUSES,
  ApiStatus,
  API_STATUS_TO_HEBREW_MAP,
  API_STATUS_GRADIENT_MAP
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

export interface ProjectInfoWindowContentProps {
  project: ProjectData;
  onClose?: () => void;
}

function StatusTag({ status }: { status: ApiStatus }) {
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
            {tower.tower_identifier || `מגדל ${idx + 1}`}
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
        <span className="text-2xl font-bold text-gray-900 tracking-tight">{project.project_name}</span>
        {!isExpanded && (
          <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
            <span role="img" aria-label="מיקום">📍</span>
            <span>{project.full_address}</span>
          </div>
        )}
        {isExpanded && (
          <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
            <span role="img" aria-label="מיקום">📍</span>
            <span>{project.full_address}</span>
          </div>
        )}
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
      className="font-sans bg-gray-50 rounded-2xl shadow-xl border border-gray-200 max-w-xs p-6 relative flex flex-col transition-all duration-300 ease-in-out"
      style={{ minWidth: 300, maxHeight: 480 }}
      aria-label={project.project_name}
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