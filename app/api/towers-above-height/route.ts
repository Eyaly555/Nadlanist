import { NextRequest, NextResponse } from "next/server";
import { getTowersAboveHeight } from "@/lib/supabase/services/towerService";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const minHeight = parseInt(searchParams.get("minHeight") || "", 10);
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
  const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")!, 10) : 10;

  if (isNaN(minHeight) || minHeight <= 0) {
    return NextResponse.json({ message: "פרמטר minHeight חסר או לא תקין" }, { status: 400 });
  }

  try {
    const result = await getTowersAboveHeight({ minHeight, page, pageSize });
    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "שגיאה בשרת" },
      { status: 500 }
    );
  }
} 