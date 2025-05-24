import { describe, it, expect, vi } from 'vitest';
import * as projectService from './projectService';

vi.mock('@/lib/supabase/serverClient', async () => {
  const actual = await vi.importActual('@/lib/supabase/serverClient');
  return {
    ...actual,
    supabase: {
      from: vi.fn(() => ({
        select: vi.fn(() => ({ data: [{ id: 1, name: 'Test Project' }], error: null }))
      }))
    }
  };
});

describe('projectService', () => {
  it('getAllProjects מחזיר מערך תקין', async () => {
    const projects = await projectService.getAllProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects[0].name).toBe('Test Project');
  });

  it('getAllProjects זורק שגיאה אם יש error', async () => {
    vi.mocked((await import('@/lib/supabase/serverClient')).supabase.from).mockReturnValueOnce({
      select: vi.fn(() => ({ data: null, error: { message: 'DB error' } }))
    });
    await expect(projectService.getAllProjects()).rejects.toThrow('DB error');
  });
}); 