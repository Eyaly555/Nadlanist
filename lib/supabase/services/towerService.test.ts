import { describe, it, expect, vi } from 'vitest';
import * as towerService from './towerService';

vi.mock('@/lib/supabase/serverClient', async () => {
  const actual = await vi.importActual('@/lib/supabase/serverClient');
  return {
    ...actual,
    supabase: {
      from: vi.fn(() => ({
        select: vi.fn(() => ({ data: [{ id: 1, project_id: 1, name: 'Tower 1' }], error: null }))
      }))
    }
  };
});

describe('towerService', () => {
  it('getAllTowers מחזיר מערך תקין', async () => {
    const towers = await towerService.getAllTowers();
    expect(Array.isArray(towers)).toBe(true);
    expect(towers[0].name).toBe('Tower 1');
  });

  it('getAllTowers זורק שגיאה אם יש error', async () => {
    vi.mocked((await import('@/lib/supabase/serverClient')).supabase.from).mockReturnValueOnce({
      select: vi.fn(() => ({ data: null, error: { message: 'DB error' } }))
    });
    await expect(towerService.getAllTowers()).rejects.toThrow('DB error');
  });
}); 