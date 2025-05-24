// app/api/dashboard-stats/route.ts
import { NextResponse } from 'next/server';
import { getAllProjects } from '@/lib/supabase/services/projectService';
import { getAllTowers } from '@/lib/supabase/services/towerService';
import { API_STATUSES } from '@/components/ui/status.constants';

// ממשק לנתוני מגדל כפי שהם יתקבלו מקוננים בתוך הפרויקט
// חשוב לוודא שהשדות פה תואמים לשדות הנבחרים בשאילתה עבור towers
interface TowerRow {
  id: number | string;
  project_id: number | string; // Supabase ישלים זאת, זה אמור להיות ה-ID של הפרויקט האב
  tower_id?: string;
  floors: number;
  height_m: number;
  tower_status: string;
}

// ממשק לפרויקט כפי שהוא יתקבל עם המגדלים המקוננים שלו
interface ProjectWithNestedTowers {
  id: number | string;
  project_name: string;
  towers: TowerRow[]; // המגדלים ישויכו לכאן על ידי Supabase
}

// ממשק לנתוני מגדל לאחר הוספת השם המחושב (לצורך חישוב סטטיסטיקות)
interface TowerWithComputedName extends TowerRow {
  computed_name: string;
}

export async function GET() {
  try {
    const projects = await getAllProjects();
    const towers = await getAllTowers();
    if (!projects || projects.length === 0) {
      return NextResponse.json({
        totalTowers: 0,
        tallestTower: null,
        towersAbove200m: 0,
        towersUnderConstruction: 0,
        towersCompleted: 0,
      });
    }
    // שיוך טאורים לפרויקטים
    const towersByProject: Record<string | number, TowerRow[]> = {};
    (towers || []).forEach((tower: TowerRow) => {
      if (!towersByProject[tower.project_id]) towersByProject[tower.project_id] = [];
      towersByProject[tower.project_id].push(tower);
    });

    // 4. בניית מערך פרויקטים עם טאורים
    const projectsWithTowers: ProjectWithNestedTowers[] = projects.map((project: { id: number | string; project_name: string }) => ({
      ...project,
      towers: towersByProject[project.id] || [],
    }));

    // 5. שיטוח המגדלים והוספת computed_name
    const towersWithComputedName: TowerWithComputedName[] = [];
    projectsWithTowers.forEach((project) => {
      if (project.towers && project.towers.length > 0) {
        const projectName = project.project_name || `פרויקט (${project.id})`;
        project.towers.forEach((tower, idx) => {
          const identifier = tower.tower_id ? tower.tower_id : `מגדל ${idx + 1}`;
          towersWithComputedName.push({
            ...tower,
            computed_name: `${projectName} - ${identifier}`,
          });
        });
      }
    });

    if (towersWithComputedName.length === 0) {
      return NextResponse.json({
        totalTowers: 0,
        tallestTower: null,
        towersAbove200m: 0,
        towersUnderConstruction: 0,
        towersCompleted: 0,
      });
    }

    // 6. חישובי KPIs
    const totalTowers = towersWithComputedName.length;
    const tallestTowerData = towersWithComputedName.reduce(
      (max, t) => (t.height_m > (max?.height_m ?? -Infinity) ? t : max),
      null as null | TowerWithComputedName
    );
    // Count towers above 200m
    const towersAbove200m = towersWithComputedName.filter(t => t.height_m > 200).length;
    const towersUnderConstruction = towersWithComputedName.filter(
      t => t.tower_status === API_STATUSES.UNDER_CONSTRUCTION || t.tower_status === API_STATUSES.PREPARATION
    ).length;
    const towersCompleted = towersWithComputedName.filter(
      t => t.tower_status === API_STATUSES.COMPLETED
    ).length;

    return NextResponse.json({
      totalTowers,
      tallestTower: tallestTowerData ? { name: tallestTowerData.computed_name, height: tallestTowerData.height_m, floors: tallestTowerData.floors } : null,
      towersAbove200m,
      towersUnderConstruction,
      towersCompleted,
    });
  } catch (error) {
    console.error('Error in /api/dashboard-stats GET handler:', error);
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const err = error as { message?: string; code?: string; details?: string; hint?: string };
      return NextResponse.json(
        {
          message: err.message || 'Server error processing dashboard stats',
          code: err.code,
          details: err.details,
          hint: err.hint,
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}