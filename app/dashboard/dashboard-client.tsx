"use client";
import { useEffect, useState, useMemo } from "react";
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

interface KpiData {
  totalTowers: number | null;
  tallestTower: { name: string; height: number; floors: number } | null;
  towersAbove200m: number | null;
  towersUnderConstruction: number | null;
  towersCompleted: number | null;
}

interface TowerData {
  id: number | string;
  project_id: number | string;
  tower_id?: string;
  floors: number;
  height_m: number;
  tower_status: string;
  project_name: string;
  city: string;
  full_address: string;
}

interface ApiTower {
  id: number | string;
  project_id: number | string;
  tower_id?: string;
  floors: number;
  height_m: number;
  tower_status: string;
}

interface ApiProject {
  id: number | string;
  project_name: string;
  city: string;
  full_address: string;
  towers: ApiTower[];
}

interface TowerListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  towers: TowerData[];
  title: string;
}

function getShortName(name: string, maxWords = 5): string {
  const words = name.split(' ');
  if (words.length <= maxWords) return name;
  return words.slice(0, maxWords).join(' ') + '...';
}

function TowerListDialog({ open, onOpenChange, towers, title }: TowerListDialogProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const sortedTowers = useMemo(() => [...towers].sort((a, b) => b.height_m - a.height_m), [towers]);
  const totalPages = Math.ceil(sortedTowers.length / itemsPerPage);
  const pagedTowers = sortedTowers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  useEffect(() => { setPage(1); }, [towers, open]);

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
            {pagedTowers.length === 0 ? (
              <div className="text-center text-gray-500 py-8">לא נמצאו מגדלים מתאימים.</div>
            ) : (
              <ul className="flex flex-col gap-3">
                {pagedTowers.map((tower) => (
                  <li key={tower.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg border bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex-1 min-w-0">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="font-semibold text-base text-gray-900 break-words max-w-xs cursor-pointer text-right">{getShortName(tower.project_name)}</div>
                          </TooltipTrigger>
                          <TooltipContent side="top" align="center">
                            <span className="text-sm font-medium text-gray-900">{tower.project_name}</span>
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
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                הקודם
              </Button>
              <span className="text-sm">עמוד {page} מתוך {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
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
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [heightRange, setHeightRange] = useState<[number]>([0]);

  const [uniqueCities, setUniqueCities] = useState<string[]>([]);
  const [uniqueStatuses, setUniqueStatuses] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortBy, setSortBy] = useState<'height' | 'floors'>('height');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [openTowerDialog, setOpenTowerDialog] = useState<null | number>(null); // 150, 250, 350 or null

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
    async function fetchTableData() {
      setIsLoadingTable(true);
      setTableError(null);
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.error || `שגיאה בטעינת נתוני טבלה: ${res.status}`);
        }
        const projects: ApiProject[] = await res.json();
        // Flatten towers with project info
        const towers: TowerData[] = [];
        projects.forEach((project) => {
          (project.towers || []).forEach((tower) => {
            towers.push({
              ...tower,
              project_name: project.project_name,
              city: project.city,
              full_address: project.full_address,
            });
          });
        });
        if (isMounted) setTableData(towers);
      } catch (error: unknown) {
        if (isMounted) {
          if (typeof error === "object" && error !== null && "message" in error && typeof (error as { message?: unknown }).message === "string") {
            setTableError((error as { message: string }).message);
          } else {
            setTableError("אירעה שגיאה לא צפויה בטעינת נתוני הטבלה.");
          }
          setTableData([]);
        }
      } finally {
        if (isMounted) setIsLoadingTable(false);
      }
    }
    fetchTableData();
    return () => { isMounted = false; };
  }, []);

  // Compute unique cities and statuses
  useEffect(() => {
    if (tableData.length > 0) {
      const cities = [...new Set(tableData.map(tower => tower.city))].sort();
      const statuses = [...new Set(tableData.map(tower => tower.tower_status))].sort();
      setUniqueCities(cities);
      setUniqueStatuses(statuses);
    } else {
      setUniqueCities([]);
      setUniqueStatuses([]);
    }
  }, [tableData]);

  // Filtered data
  const filteredTableData = useMemo(() => {
    return tableData.filter(tower => {
      const searchLower = searchText.toLowerCase();
      const searchMatch = searchText === "" ||
        (tower.project_name?.toLowerCase().includes(searchLower));
      const cityMatch = selectedCity === "" || tower.city === selectedCity;
      const statusMatch = selectedStatus === "" || tower.tower_status === selectedStatus;
      const heightMatch = tower.height_m >= heightRange[0];
      return searchMatch && cityMatch && statusMatch && heightMatch;
    });
  }, [tableData, searchText, selectedCity, selectedStatus, heightRange]);

  // מיון
  const sortedData = useMemo(() => {
    return [...filteredTableData].sort((a, b) => {
      const aValue = sortBy === 'height' ? a.height_m : a.floors;
      const bValue = sortBy === 'height' ? b.height_m : b.floors;
      if (sortOrder === 'asc') return aValue - bValue;
      return bValue - aValue;
    });
  }, [filteredTableData, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  // Reset page on filter/sort change
  useEffect(() => { setCurrentPage(1); }, [searchText, selectedCity, selectedStatus, heightRange, sortBy, sortOrder]);

  function handleSort(column: 'height' | 'floors') {
    if (sortBy === column) setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    else {
      setSortBy(column);
      setSortOrder('desc');
    }
  }

  function translateStatus(status: string): string {
    return API_STATUS_TO_HEBREW_MAP[status as ApiStatus] || status;
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#F6F8FB" }} dir="rtl">
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
          <h1 className="text-4xl md:text-5xl lg:text-[48px] font-extrabold tracking-tight mb-4 leading-tight" style={{ color: "#00A6A2" }}>
            הדשבורד החכם של נדלניסט AI
          </h1>
          <div className="w-24 h-1 mx-auto mb-6 rounded-full" style={{ background: "#00A6A2" }}></div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium" style={{ color: "#222D3A" }}>
            הדשבורד החדשני והמקיף בישראל למעקב חכם אחר פרויקטי נדל&quot;ן בבנייה ובביצוע. כאן תמצאו נתונים עדכניים, סטטיסטיקות מתקדמות ותצוגות ויזואליות מהמובילות בתחום – הכל במקום אחד, בפשטות ובדיוק מקסימלי.<br className="hidden md:inline" />
            <span className="block mt-4 text-base font-semibold" style={{ color: "#222D3A" }}>בקרוב נרחיב את המערכת עם מידע ופיצ&#39;רים נוספים שישדרגו את חוויית הנדל&quot;ן הדיגיטלית בישראל.</span>
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
                    <NadlanistMap />
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* KPI Containers - left side on desktop */}
            <div className="flex flex-col gap-4 order-1 lg:order-2">
              {/* סה&quot;כ בניינים */}
              <Card className="bg-white/90 border-0 shadow rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-secondary">סה&quot;כ בניינים</CardTitle>
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
              {/* מגדלים מעל 150 מ&apos; */}
              <Dialog open={openTowerDialog === 150} onOpenChange={open => setOpenTowerDialog(open ? 150 : null)}>
                <DialogTrigger asChild>
                  <Card className="bg-white/90 border-0 shadow rounded-2xl cursor-pointer hover:shadow-lg transition" onClick={() => setOpenTowerDialog(150)}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-secondary">מגדלים מעל 150 מ&apos;</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingTable ? (
                        <Skeleton className="h-8 w-1/2" />
                      ) : tableData.length > 0 ? (
                        <div className="text-2xl font-bold">{tableData.filter(t => t.height_m > 150).length}</div>
                      ) : tableError ? (
                        <p className="text-xs text-red-500">שגיאה</p>
                      ) : (
                        <div className="text-2xl font-bold">-</div>
                      )}
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <TowerListDialog
                  open={openTowerDialog === 150}
                  onOpenChange={open => setOpenTowerDialog(open ? 150 : null)}
                  towers={tableData.filter(t => t.height_m > 150)}
                  title="מגדלים מעל 150 מ'"
                />
              </Dialog>
              {/* מגדלים מעל 250 מ&apos; */}
              <Dialog open={openTowerDialog === 250} onOpenChange={open => setOpenTowerDialog(open ? 250 : null)}>
                <DialogTrigger asChild>
                  <Card className="bg-white/90 border-0 shadow rounded-2xl cursor-pointer hover:shadow-lg transition" onClick={() => setOpenTowerDialog(250)}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-secondary">מגדלים מעל 250 מ&apos;</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingTable ? (
                        <Skeleton className="h-8 w-1/2" />
                      ) : tableData.length > 0 ? (
                        <div className="text-2xl font-bold">{tableData.filter(t => t.height_m > 250).length}</div>
                      ) : tableError ? (
                        <p className="text-xs text-red-500">שגיאה</p>
                      ) : (
                        <div className="text-2xl font-bold">-</div>
                      )}
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <TowerListDialog
                  open={openTowerDialog === 250}
                  onOpenChange={open => setOpenTowerDialog(open ? 250 : null)}
                  towers={tableData.filter(t => t.height_m > 250)}
                  title="מגדלים מעל 250 מ'"
                />
              </Dialog>
              {/* מגדלים מעל 350 מ&apos; */}
              <Dialog open={openTowerDialog === 350} onOpenChange={open => setOpenTowerDialog(open ? 350 : null)}>
                <DialogTrigger asChild>
                  <Card className="bg-white/90 border-0 shadow rounded-2xl cursor-pointer hover:shadow-lg transition" onClick={() => setOpenTowerDialog(350)}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-secondary">מגדלים מעל 350 מ&apos;</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingTable ? (
                        <Skeleton className="h-8 w-1/2" />
                      ) : tableData.length > 0 ? (
                        <div className="text-2xl font-bold">{tableData.filter(t => t.height_m > 350).length}</div>
                      ) : tableError ? (
                        <p className="text-xs text-red-500">שגיאה</p>
                      ) : (
                        <div className="text-2xl font-bold">-</div>
                      )}
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <TowerListDialog
                  open={openTowerDialog === 350}
                  onOpenChange={open => setOpenTowerDialog(open ? 350 : null)}
                  towers={tableData.filter(t => t.height_m > 350)}
                  title="מגדלים מעל 350 מ'"
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

        {/* KPI Row below map */}
        <section className="w-full max-w-screen-2xl mx-auto px-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* המגדל הגבוה ביותר */}
            <Card className="bg-white/90 border-0 shadow rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary">המגדל הגבוה ביותר</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingKpis ? (
                  <Skeleton className="h-8 w-1/2" />
                ) : kpiData?.tallestTower ? (
                  <>
                    <div className="text-lg font-bold mb-2 truncate" title={kpiData.tallestTower.name}>{kpiData.tallestTower.name}</div>
                    <div className="flex flex-row items-center justify-between gap-4">
                      <div className="flex-1 text-right">
                        <span className="text-base font-semibold">{kpiData.tallestTower.height} מ&apos;</span>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-base font-semibold">{kpiData.tallestTower.floors} קומות</span>
                      </div>
                    </div>
                  </>
                ) : kpiError ? (
                  <p className="text-xs text-red-500">שגיאה</p>
                ) : (
                  <div className="text-2xl font-bold">-</div>
                )}
              </CardContent>
            </Card>
            {/* מגדלים בבנייה */}
            <Card className="bg-white/90 border-0 shadow rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary">מגדלים בבנייה</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingKpis ? (
                  <Skeleton className="h-8 w-1/2" />
                ) : kpiData?.towersUnderConstruction !== null && kpiData?.towersUnderConstruction !== undefined ? (
                  <div className="text-2xl font-bold">{kpiData.towersUnderConstruction}</div>
                ) : kpiError ? (
                  <p className="text-xs text-red-500">שגיאה</p>
                ) : (
                  <div className="text-2xl font-bold">-</div>
                )}
              </CardContent>
            </Card>
            {/* מגדלים שהושלמו */}
            <Card className="bg-white/90 border-0 shadow rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary">מגדלים שהושלמו</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingKpis ? (
                  <Skeleton className="h-8 w-1/2" />
                ) : kpiData?.towersCompleted !== null && kpiData?.towersCompleted !== undefined ? (
                  <div className="text-2xl font-bold">{kpiData.towersCompleted}</div>
                ) : kpiError ? (
                  <p className="text-xs text-red-500">שגיאה</p>
                ) : (
                  <div className="text-2xl font-bold">-</div>
                )}
              </CardContent>
            </Card>
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
                  {uniqueCities.map(city => (
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
                  {uniqueStatuses.map(status => (
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
                setSelectedCity("");
                setSelectedStatus("");
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
                    <TableHead className="text-right" style={{ color: "#222D3A" }}>פרויקט</TableHead>
                    <TableHead className="hidden sm:table-cell text-right" style={{ color: "#222D3A" }}>עיר</TableHead>
                    <TableHead
                      className="text-right cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('height')}
                      aria-sort={sortBy === 'height' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : undefined}
                      role="columnheader"
                      tabIndex={0}
                    >
                      <div className="flex items-center justify-end gap-1">
                        גובה (מ׳)
                        {sortBy === 'height' && (
                          sortOrder === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead
                      className="hidden md:table-cell text-right cursor-pointer hover:bg-muted/50"
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
                    <TableHead className="hidden sm:table-cell text-right" style={{ color: "#222D3A" }}>סטטוס</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoadingTable ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                      <TableRow key={idx}>
                        <TableCell colSpan={5} className="text-right"><Skeleton className="h-6 w-full" /></TableCell>
                      </TableRow>
                    ))
                  ) : tableError ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-right text-red-600 font-bold">
                        {tableError}
                      </TableCell>
                    </TableRow>
                  ) : currentPageData.length > 0 ? (
                    currentPageData.map(tower => (
                      <TableRow key={tower.id}>
                        <TableCell className="text-right break-words max-w-xs">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="cursor-pointer text-right">{getShortName(tower.project_name)}</div>
                              </TooltipTrigger>
                              <TooltipContent side="top" align="center">
                                <span className="text-sm font-medium text-gray-900">{tower.project_name}</span>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-right">{tower.city}</TableCell>
                        <TableCell className="text-right">{tower.height_m?.toFixed(1)}</TableCell>
                        <TableCell className="hidden md:table-cell text-right">{tower.floors}</TableCell>
                        <TableCell className="hidden sm:table-cell text-right">{translateStatus(tower.tower_status)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-right">
                        {tableData.length > 0 ? "לא נמצאו מגדלים התואמים את הסינון הנוכחי." : "לא נטענו נתונים להצגה."}
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
                  מציג {startIndex + 1}-{Math.min(endIndex, sortedData.length)} מתוך {sortedData.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  הקודם
                </Button>
                <span className="text-sm">עמוד {currentPage} מתוך {totalPages}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
            <span className="text-lg font-semibold text-secondary">גובה ממוצע: </span>
            <span className="text-lg font-bold mx-2" style={{ color: "#00A6A2" }}>
              {filteredTableData.length > 0
                ? `${Math.round(
                    filteredTableData.reduce((sum, t) => sum + t.height_m, 0) /
                    filteredTableData.length
                  )} מטר`
                : "-"}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center bg-muted/60 rounded-2xl p-6 shadow border-0">
            <span className="text-lg font-semibold text-secondary">קומות בממוצע: </span>
            <span className="text-lg font-bold mx-2" style={{ color: "#00A6A2" }}>
              {filteredTableData.length > 0
                ? `${(
                    filteredTableData.reduce((sum, t) => sum + t.floors, 0) /
                    filteredTableData.length
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