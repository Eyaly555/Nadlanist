"use client";
import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { NadlanistMap } from "@/components/ui/NadlanistMap";
import { ChevronDown, ChevronUp } from "lucide-react";
import { API_STATUS_TO_HEBREW_MAP, type ApiStatus } from "@/components/ui/status.constants";
import { ContactButton } from "@/components/shared/contact-button";
import { ContactForm } from "@/components/shared/contact-form";
import Script from 'next/script';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { StatusTag } from "@/components/ui/ProjectInfoWindowContent";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { FunFactsInfographic, CityComparisonRadar } from "@/components/ui/DashboardNewCharts";

interface KpiData {
  totalTowers: number | null;
  tallestTower: { name: string; height: number; floors: number } | null;
  towersAbove200m: number | null;
  towersUnderConstruction: number | null;
  towersCompleted: number | null;
}

interface TowerData {
  id: number | string;
  created_at?: string;
  updated_at?: string;
  project_id: number | string;
  floors: number;
  height_m: number;
  tower_specific_count_field?: number;
  tower_status: string;
  tower_identifier?: string;
  project_name?: string;
  project_name_il: string;
  effective_city: string;
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

interface TowerListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  towers: TowerData[];
  title: string;
  isLoading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  count: number;
  onPageChange: (newPage: number) => void;
}

function getShortName(project_name_il?: string, project_name?: string, maxWords = 5): string {
  const name = project_name_il || project_name || 'שם לא זמין';
  if (!name) return 'שם לא זמין';
  const words = name.split(' ');
  if (words.length <= maxWords) return name;
  return words.slice(0, maxWords).join(' ') + '...';
}

function TowerListDialog({ open, onOpenChange, towers, title, isLoading, error, page, pageSize, count, onPageChange }: TowerListDialogProps) {
  const totalPages = Math.ceil(count / pageSize);

  function handlePageChange(newPage: number) {
    onPageChange(newPage);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full p-0 rounded-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <DialogTitle className="text-lg font-bold text-primary">{title}</DialogTitle>
            <button
              aria-label="סגור"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            >×</button>
          </div>
          <div className="overflow-y-auto px-4 py-2 max-h-[60vh] min-h-[120px]">
            {isLoading ? (
              <div className="text-center text-gray-500 py-8">טעינת נתונים...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : towers.length === 0 ? (
              <div className="text-center text-gray-500 py-8">לא נמצאו מגדלים מתאימים.</div>
            ) : (
              <ul className="flex flex-col gap-3">
                {towers.map((tower) => (
                  <li key={tower.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex-1 min-w-0">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="font-semibold text-base text-gray-900 break-words max-w-xs cursor-pointer text-right">{getShortName(tower.project_name_il, tower.project_name)}</div>
                          </TooltipTrigger>
                          <TooltipContent side="top" align="center">
                            <span className="text-sm font-medium text-gray-900">{tower.project_name_il || tower.project_name || 'שם לא זמין'}</span>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="text-sm text-gray-700 truncate">{tower.full_address}</div>
                    </div>
                    <div className="flex flex-row flex-wrap gap-2 items-center">
                      <span className="text-sm text-gray-700 whitespace-nowrap"><span role="img" aria-label="קומות">🧱</span> {tower.floors} קומות</span>
                      <span className="text-sm text-gray-700 whitespace-nowrap"><span role="img" aria-label="גובה">📏</span> {tower.height_m} מ&apos;</span>
                      <StatusTag status={tower.tower_status as ApiStatus} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-3 border-t mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
              >
                הקודם
              </Button>
              <span className="text-sm">עמוד {page} מתוך {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
              >
                הבא
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function DashboardClientComponent() {
  const [kpiData, setKpiData] = useState<KpiData | null>(null);
  const [isLoadingKpis, setIsLoadingKpis] = useState(true);
  const [kpiError, setKpiError] = useState<string | null>(null);

  // Table data state
  const [tableData, setTableData] = useState<TowerData[]>([]);
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [tableError, setTableError] = useState<string | null>(null);

  // Filters state
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [heightRange, setHeightRange] = useState<[number]>([0]);

  const [uniqueCities, setUniqueCities] = useState<string[]>([]);
  const [uniqueStatuses, setUniqueStatuses] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [totalTowers, setTotalTowers] = useState(0);

  // --- State for all map projects ---
  const [allMapProjects, setAllMapProjects] = useState<ProjectData[]>([]);
  const [isLoadingMapProjects, setIsLoadingMapProjects] = useState(true);
  const [mapProjectsError, setMapProjectsError] = useState<string | null>(null);

  // --- State for towers above height dialog ---
  interface TowersAboveHeightState {
    towers: TowerData[];
    count: number;
    page: number;
    pageSize: number;
    isLoading: boolean;
    error: string | null;
  }
  const [towersAboveHeight, setTowersAboveHeight] = useState<TowersAboveHeightState>({
    towers: [],
    count: 0,
    page: 1,
    pageSize: 8,
    isLoading: false,
    error: null,
  });
  const [currentDialogHeight, setCurrentDialogHeight] = useState<number | null>(null);

  const [sortBy, setSortBy] = useState<'height_m' | 'floors'>('height_m');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [towersCount150, setTowersCount150] = useState<number | null>(null);
  const [towersCount250, setTowersCount250] = useState<number | null>(null);
  const [towersCount350, setTowersCount350] = useState<number | null>(null);

  // Add state for all towers for fun facts
  const [allTowers, setAllTowers] = useState<TowerData[]>([]);

  const fetchTowersAboveHeight = useCallback(async (minHeight: number, page = 1, pageSize = 8) => {
    setTowersAboveHeight(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch(`/api/towers-above-height?minHeight=${minHeight}&page=${page}&pageSize=${pageSize}`);
      if (!res.ok) throw new Error("שגיאה בטעינת מגדלים לדיאלוג");
      const data = await res.json();
      setTowersAboveHeight({
        towers: data.data,
        count: data.count,
        page: data.page,
        pageSize: data.pageSize,
        isLoading: false,
        error: null,
      });
    } catch (error: unknown) {
      setTowersAboveHeight(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "שגיאה לא צפויה בטעינת מגדלים לדיאלוג",
      }));
    }
  }, []);

  useEffect(() => {
    if (currentDialogHeight !== null) {
      fetchTowersAboveHeight(currentDialogHeight, 1, towersAboveHeight.pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDialogHeight]);

  function handleDialogPageChange(newPage: number) {
    if (currentDialogHeight !== null) {
      fetchTowersAboveHeight(currentDialogHeight, newPage, 8);
    }
  }

  // Fetch KPI data
  useEffect(() => {
    let isMounted = true;
    async function fetchKpiData() {
      setIsLoadingKpis(true);
      setKpiError(null);
      try {
        const res = await fetch("/api/dashboard-stats");
        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || `שגיאה בטעינת נתוני KPI: ${res.status}`);
        }
        const data = await res.json();
        if (isMounted) setKpiData(data);
      } catch (error: unknown) {
        if (isMounted) {
          if (typeof error === "object" && error !== null && "message" in error && typeof (error as { message?: unknown }).message === "string") {
            setKpiError((error as { message: string }).message);
          } else {
            setKpiError("אירעה שגיאה לא צפויה בטעינת נתוני KPI.");
          }
          setKpiData(null);
        }
      } finally {
        if (isMounted) setIsLoadingKpis(false);
      }
    }
    fetchKpiData();
    return () => { isMounted = false; };
  }, []);

  // Fetch table data (towers)
  useEffect(() => {
    let isMounted = true;
    async function fetchProjectsAndTowers() {
      setIsLoadingTable(true);
      setTableError(null);
      try {
        const queryParams = new URLSearchParams({
          page: String(currentPage),
          pageSize: String(itemsPerPage),
          search: searchText,
          city: selectedCity,
          status: selectedStatus,
          minHeight: String(heightRange[0]),
          sortBy,
          sortOrder,
        });
        const res = await fetch(`/api/towers?${queryParams.toString()}`);
        if (!res.ok) throw new Error('שגיאה בטעינת מגדלים');
        const towersJson = await res.json();
        if (isMounted) {
          setTotalTowers(towersJson.count || 0);
          setTableData(towersJson.data || []);
        }
      } catch {
        if (isMounted) {
          setTableError('אירעה שגיאה בטעינת נתוני הטבלה.');
          setTableData([]);
        }
      } finally {
        if (isMounted) setIsLoadingTable(false);
      }
    }
    fetchProjectsAndTowers();
    return () => { isMounted = false; };
  }, [currentPage, itemsPerPage, searchText, selectedCity, selectedStatus, heightRange, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(totalTowers / itemsPerPage);

  // Compute unique cities and statuses
  useEffect(() => {
    if (tableData.length > 0) {
      const cities = [...new Set(tableData.map(tower => tower.effective_city))].sort();
      const statuses = [...new Set(tableData.map(tower => tower.tower_status))].sort();
      setUniqueCities(cities);
      setUniqueStatuses(statuses);
    } else {
      setUniqueCities([]);
      setUniqueStatuses([]);
    }
  }, [tableData]);

  function handleSort(column: 'height_m' | 'floors') {
    if (sortBy === column) setSortOrder((prev: 'asc' | 'desc') => prev === 'asc' ? 'desc' : 'asc');
    else {
      setSortBy(column);
      setSortOrder('desc');
    }
  }

  function translateStatus(status: string): string {
    return API_STATUS_TO_HEBREW_MAP[status as ApiStatus] || status;
  }

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);
  }

  useEffect(() => {
    let isMounted = true;
    async function fetchAllMapProjects() {
      setIsLoadingMapProjects(true);
      setMapProjectsError(null);
      try {
        const res = await fetch("/api/map-projects");
        if (!res.ok) throw new Error("שגיאה בטעינת כל הפרויקטים למפה");
        const data = await res.json();
        if (isMounted) setAllMapProjects(data);
      } catch (error: unknown) {
        if (isMounted) setMapProjectsError(error instanceof Error ? error.message : "שגיאה לא צפויה בטעינת פרויקטים למפה");
      } finally {
        if (isMounted) setIsLoadingMapProjects(false);
      }
    }
    fetchAllMapProjects();
    return () => { isMounted = false; };
  }, []);

  // Fetch counts for each height threshold on mount
  useEffect(() => {
    async function fetchCounts() {
      const fetchCount = async (minHeight: number) => {
        const res = await fetch(`/api/towers-above-height?minHeight=${minHeight}&page=1&pageSize=1`);
        const data = await res.json();
        return data.count;
      };
      setTowersCount150(await fetchCount(150));
      setTowersCount250(await fetchCount(250));
      setTowersCount350(await fetchCount(350));
    }
    fetchCounts();
  }, []);

  // Filter table data to exclude rows with missing height or floors
  const filteredTableData = tableData.filter(t => t.height_m > 0 && t.floors > 0 && !!t.project_name_il);

  // Fetch all towers for fun facts
  useEffect(() => {
    async function fetchAllTowers() {
      try {
        const res = await fetch('/api/towers?all=true');
        if (!res.ok) throw new Error('שגיאה בטעינת כל המגדלים');
        const towersJson = await res.json();
        setAllTowers(towersJson.data || []);
      } catch {
        setAllTowers([]);
      }
    }
    fetchAllTowers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-black" style={{ background: "#F6F8FB" }} dir="rtl">
      <Script id="ld-towers-list" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": [] // ניתן להחליף ברשימת פרויקטים סטטית או דינמית בגרסה עתידית
        })
      }} />
      {/* Dashboard Title & Description */}
      <header
        className="w-full max-w-screen-2xl mx-auto px-4 pt-12 pb-10 text-center relative rounded-3xl shadow-xl mb-8 border-0 animate-fade-in overflow-hidden"
        style={{ background: "linear-gradient(120deg, #C8F1EF 0%, #E0ECF1 100%)" }}
      >
        {/* Gradient accent bar - מוסר, הגרדיאנט עכשיו ב-style */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-[48px] font-extrabold tracking-tight mb-4 leading-tight text-black">
            הדשבורד החכם של נדלניסט AI
          </h1>
          <div className="w-24 h-1 mx-auto mb-6 rounded-full bg-black"></div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium text-black">
            הדשבורד החדשני והמקיף בישראל למעקב חכם אחר פרויקטי נדל&quot;ן בבנייה ובביצוע. כאן תמצאו נתונים עדכניים, סטטיסטיקות מתקדמות ותצוגות ויזואליות מהמובילות בתחום – הכל במקום אחד, בפשטות ובדיוק מקסימלי.<br className="hidden md:inline" />
            <span className="block mt-4 text-base font-semibold text-black">בקרוב נרחיב את המערכת עם מידע ופיצ&apos;רים נוספים שישדרגו את חוויית הנדל&quot;ן הדיגיטלית בישראל.</span>
          </p>
        </div>
      </header>
      <div className="w-full max-w-screen-2xl mx-auto px-4 pb-8">
        {/* Map + KPI Section */}
        <section className="w-full max-w-screen-2xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Map - right side on desktop */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <Card className="h-full bg-white/90 border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-b from-primary-10 to-white rounded-t-3xl">
                  <CardTitle className="text-primary text-2xl md:text-3xl font-bold">מפת המגדלים החכמה של נדלניסט AI</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] w-full rounded-b-3xl overflow-hidden bg-muted">
                    <NadlanistMap
                      projects={allMapProjects}
                      isLoading={isLoadingMapProjects}
                      error={mapProjectsError}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* KPI Containers - left side on desktop */}
            <div className="flex flex-col gap-4 order-1 lg:order-2">
              {/* סה&quot;כ בניינים */}
              <Card className="bg-white/90 border-0 shadow rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-black">סה&quot;כ בניינים</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingKpis ? (
                    <Skeleton className="h-8 w-1/2" />
                  ) : kpiData?.totalTowers !== null && kpiData?.totalTowers !== undefined ? (
                    <div className="text-2xl font-bold">{kpiData.totalTowers}</div>
                  ) : kpiError ? (
                    <p className="text-xs text-red-500">שגיאה</p>
                  ) : (
                    <div className="text-2xl font-bold">-</div>
                  )}
                </CardContent>
              </Card>
              {/* מגדלים מעל 150 מ' */}
              <Dialog
                open={currentDialogHeight === 150}
                onOpenChange={open => {
                  if (!open) setCurrentDialogHeight(null);
                }}
              >
                <DialogTrigger asChild>
                  <Card
                    className="bg-white/90 border-0 shadow rounded-2xl cursor-pointer hover:shadow-lg transition"
                    onClick={() => {
                      if (currentDialogHeight !== 150) setCurrentDialogHeight(150);
                    }}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-black">מגדלים מעל 150 מ&apos;</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{towersCount150 ?? '-'}</div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <TowerListDialog
                  open={currentDialogHeight === 150}
                  onOpenChange={open => setCurrentDialogHeight(open ? 150 : null)}
                  towers={towersAboveHeight.towers}
                  title={currentDialogHeight ? `מגדלים מעל ${currentDialogHeight} מ'` : ''}
                  isLoading={towersAboveHeight.isLoading}
                  error={towersAboveHeight.error}
                  page={towersAboveHeight.page}
                  pageSize={8}
                  count={towersAboveHeight.count}
                  onPageChange={handleDialogPageChange}
                />
              </Dialog>
              {/* מגדלים מעל 250 מ' */}
              <Dialog
                open={currentDialogHeight === 250}
                onOpenChange={open => {
                  if (!open) setCurrentDialogHeight(null);
                }}
              >
                <DialogTrigger asChild>
                  <Card
                    className="bg-white/90 border-0 shadow rounded-2xl cursor-pointer hover:shadow-lg transition"
                    onClick={() => {
                      if (currentDialogHeight !== 250) setCurrentDialogHeight(250);
                    }}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-black">מגדלים מעל 250 מ&apos;</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{towersCount250 ?? '-'}</div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <TowerListDialog
                  open={currentDialogHeight === 250}
                  onOpenChange={open => setCurrentDialogHeight(open ? 250 : null)}
                  towers={towersAboveHeight.towers}
                  title={currentDialogHeight ? `מגדלים מעל ${currentDialogHeight} מ'` : ''}
                  isLoading={towersAboveHeight.isLoading}
                  error={towersAboveHeight.error}
                  page={towersAboveHeight.page}
                  pageSize={8}
                  count={towersAboveHeight.count}
                  onPageChange={handleDialogPageChange}
                />
              </Dialog>
              {/* מגדלים מעל 350 מ' */}
              <Dialog
                open={currentDialogHeight === 350}
                onOpenChange={open => {
                  if (!open) setCurrentDialogHeight(null);
                }}
              >
                <DialogTrigger asChild>
                  <Card
                    className="bg-white/90 border-0 shadow rounded-2xl cursor-pointer hover:shadow-lg transition"
                    onClick={() => {
                      if (currentDialogHeight !== 350) setCurrentDialogHeight(350);
                    }}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-black">מגדלים מעל 350 מ&apos;</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{towersCount350 ?? '-'}</div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <TowerListDialog
                  open={currentDialogHeight === 350}
                  onOpenChange={open => setCurrentDialogHeight(open ? 350 : null)}
                  towers={towersAboveHeight.towers}
                  title={currentDialogHeight ? `מגדלים מעל ${currentDialogHeight} מ'` : ''}
                  isLoading={towersAboveHeight.isLoading}
                  error={towersAboveHeight.error}
                  page={towersAboveHeight.page}
                  pageSize={8}
                  count={towersAboveHeight.count}
                  onPageChange={handleDialogPageChange}
                />
              </Dialog>
            </div>
          </div>
          {/* Lead Form - מוצב בנפרד מתחת למפה, ללא התנגשות עם התוכן */}
          <div className="mt-8 w-full md:flex md:justify-center">
            <ContactButton
              buttonText="אני מחפש / מציע נכס"
              formTitle="השאירו פרטים ונחזור אליכם"
              variant="primary"
              className="w-full md:w-2/3 lg:w-1/2"
              source="dashboard_lead_row"
            />
          </div>
        </section>

        {/* Dashboard Charts Row - New */}
        <section className="w-full max-w-screen-2xl mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FunFactsInfographic allData={allTowers} filteredData={tableData} />
            <CityComparisonRadar />
          </div>
        </section>
 
        {/* Filters + Table */}
        <div className="lg:col-span-5 flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="w-full lg:w-1/4 space-y-6 rounded-2xl border-0 bg-white/80 p-6 text-card-foreground shadow-md">
            <h3 className="text-lg font-semibold tracking-tight text-primary">סינון מגדלים</h3>
            <div className="space-y-2">
              <Label htmlFor="searchInput">חיפוש חופשי</Label>
              <Input
                id="searchInput"
                placeholder="חפש מגדל או פרויקט..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="citySelect">עיר</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger id="citySelect" aria-label="בחר עיר">
                  <SelectValue placeholder="כל הערים" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הערים</SelectItem>
                  {uniqueCities.filter(Boolean).map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="statusSelect">סטטוס בנייה</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger id="statusSelect" aria-label="בחר סטטוס">
                  <SelectValue placeholder="כל הסטטוסים" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הסטטוסים</SelectItem>
                  {uniqueStatuses.filter(Boolean).map(status => (
                    <SelectItem key={status} value={status}>{translateStatus(status)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="heightSlider">גובה מינימלי (מטרים)</Label>
              <Slider
                id="heightSlider"
                min={0}
                max={400}
                step={10}
                value={heightRange}
                onValueChange={value => setHeightRange([value[0]])}
              />
              <p className="text-sm text-muted-foreground pt-1">גובה נבחר: {heightRange[0]} מ׳ ומעלה</p>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => {
                setSearchText("");
                setSelectedCity("all");
                setSelectedStatus("all");
                setHeightRange([0]);
              }}
            >
              אפס סינונים
            </Button>
          </div>
          {/* Table */}
          <div className="w-full lg:w-3/4 rounded-2xl border-0 bg-white flex flex-col shadow-lg">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right text-black">פרויקט</TableHead>
                    <TableHead className="hidden sm:table-cell text-right text-black">עיר</TableHead>
                    <TableHead
                      className="text-right cursor-pointer hover:bg-muted/50 text-black"
                      onClick={() => handleSort('height_m')}
                      aria-sort={sortBy === 'height_m' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : undefined}
                      role="columnheader"
                      tabIndex={0}
                    >
                      <div className="flex items-center justify-end gap-1">
                        גובה (מ׳)
                        {sortBy === 'height_m' && (
                          sortOrder === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="hidden md:table-cell text-right cursor-pointer hover:bg-muted/50 text-black"
                      onClick={() => handleSort('floors')}
                      aria-sort={sortBy === 'floors' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : undefined}
                      role="columnheader"
                      tabIndex={0}
                    >
                      <div className="flex items-center justify-end gap-1">
                        קומות
                        {sortBy === 'floors' && (
                          sortOrder === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="hidden sm:table-cell text-right text-black">סטטוס</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingTable ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                      <TableRow key={idx}>
                        <TableCell colSpan={10} className="text-right"><Skeleton className="h-6 w-full" /></TableCell>
                      </TableRow>
                    ))
                  ) : tableError ? (
                    <TableRow>
                      <TableCell colSpan={10} className="h-24 text-right text-red-600 font-bold">
                        {tableError}
                      </TableCell>
                    </TableRow>
                  ) : filteredTableData.length > 0 ? (
                    filteredTableData.map(tower => (
                      <TableRow key={tower.id}>
                        <TableCell className="text-right break-words max-w-xs text-black">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="cursor-pointer text-right">{getShortName(tower.project_name_il, tower.project_name)}</div>
                              </TooltipTrigger>
                              <TooltipContent side="top" align="center">
                                <span className="text-sm font-medium text-gray-900">{tower.project_name_il || tower.project_name || 'שם לא זמין'}</span>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-right text-black">{tower.effective_city}</TableCell>
                        <TableCell className="text-right text-black">{tower.height_m?.toFixed(1)}</TableCell>
                        <TableCell className="hidden md:table-cell text-right text-black">{tower.floors}</TableCell>
                        <TableCell className="hidden sm:table-cell text-right text-black">{translateStatus(tower.tower_status)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-right">
                        {filteredTableData.length > 0 ? "לא נמצאו מגדלים התואמים את הסינון הנוכחי." : "לא נטענו נתונים להצגה."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  מציג {currentPage * itemsPerPage - itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalTowers)} מתוך {totalTowers}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  הקודם
                </Button>
                <span className="text-sm">עמוד {currentPage} מתוך {totalPages}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  הבא
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Dashboard Insights & Charts --- */}
      <section className="w-full max-w-screen-2xl mx-auto px-4 mt-8 mb-16">
        {/* Averages Row */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 flex items-center justify-center bg-muted/60 rounded-2xl p-6 shadow border-0">
            <span className="text-lg font-semibold text-black">גובה ממוצע: </span>
            <span className="text-lg font-bold mx-2 text-black">
              {tableData.length > 0
                ? `${Math.round(
                    tableData.reduce((sum, t) => sum + t.height_m, 0) /
                    tableData.length
                  )} מטר`
                : "-"}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center bg-muted/60 rounded-2xl p-6 shadow border-0">
            <span className="text-lg font-semibold text-black">קומות בממוצע: </span>
            <span className="text-lg font-bold mx-2 text-black">
              {tableData.length > 0
                ? `${(
                    tableData.reduce((sum, t) => sum + t.floors, 0) /
                    tableData.length
                  ).toFixed(1)}`
                : "-"}
            </span>
          </div>
        </div>
      </section>
      {/* --- End Dashboard Insights & Charts --- */}
      {/* Lead Form Section - at the bottom of the page */}
      <section className="w-full max-w-screen-2xl mx-auto px-4 mt-12 mb-8 flex flex-col items-center">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto">
          <ContactForm
            title="השאירו פרטים ונחזור אליכם"
            buttonText="דברו איתי"
            source="dashboard_lead_footer"
            compact={true}
            className="bg-white border-0 shadow-2xl rounded-2xl px-6 py-8 mx-auto flex flex-col items-center gap-4 ring-1 ring-primary/10"
          />
        </div>
      </section>
      {/* Add global style for fade-in animation at the end of the JSX tree */}
      <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        body {
          background: #F6F8FB;
        }
      `}</style>
    </div>
  );
} 