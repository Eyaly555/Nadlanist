import type { Meta, StoryObj } from '@storybook/react';
import { ProjectInfoWindowContent } from './ProjectInfoWindowContent';

const meta: Meta<typeof ProjectInfoWindowContent> = {
  title: 'Components/Project Info Window Content',
  component: ProjectInfoWindowContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    project: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: {
      id: 1,
      project_name: 'פרויקט הדגמה בסטוריבוק',
      latitude: 32.0853,
      longitude: 34.7818,
      city: 'תל אביב-יפו',
      num_towers: 2,
      full_address: 'דרך מנחם בגין 123',
      project_description: 'זהו תיאור לדוגמה של הפרויקט כפי שיוצג בחלון המידע. אפשר לבדוק כאן איך טקסט מתנהג. התיאור הזה ארוך במיוחד כדי לבדוק את פונקציית קרא עוד.',
      towers: [
        {
          id: 101,
          tower_identifier: 'A',
          floors: 30,
          height_m: 110,
          tower_status: 'בבנייה',
        },
        {
          id: 102,
          tower_identifier: 'B',
          floors: 25,
          height_m: 95,
          tower_status: 'בתכנון',
        },
      ],
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    project: {
      id: 2,
      project_name: 'פרויקט ללא תיאור כלל',
      latitude: 31.7719,
      longitude: 35.2170,
      city: 'ירושלים',
      num_towers: 1,
      full_address: 'רחוב יפו 1',
      project_description: undefined,
      towers: [
        {
          id: 201,
          tower_identifier: undefined,
          floors: 18,
          height_m: 60,
          tower_status: 'בתכנון',
        },
      ],
    },
  },
};

export const ManyTowers: Story = {
  args: {
    project: {
      id: 3,
      project_name: 'פרויקט עם הרבה מגדלים',
      latitude: 32.1,
      longitude: 34.8,
      city: 'חולון',
      num_towers: 7,
      full_address: 'רחוב ראשי 10',
      project_description: 'פרויקט עם הרבה מגדלים לבדיקת הצגת +X נוספים.',
      towers: [
        { id: 301, tower_identifier: 'A', floors: 20, height_m: 70, tower_status: 'בבנייה' },
        { id: 302, tower_identifier: 'B', floors: 22, height_m: 75, tower_status: 'בתכנון' },
        { id: 303, tower_identifier: 'C', floors: 18, height_m: 60, tower_status: 'מאושר/ברישוי' },
        { id: 304, tower_identifier: 'D', floors: 25, height_m: 90, tower_status: 'הסתיים/אוכלס' },
        { id: 305, tower_identifier: 'E', floors: 15, height_m: 50, tower_status: 'בבנייה' },
        { id: 306, tower_identifier: 'F', floors: 17, height_m: 55, tower_status: 'בתכנון' },
        { id: 307, tower_identifier: 'G', floors: 19, height_m: 65, tower_status: 'מאושר/ברישוי' },
      ],
    },
  },
}; 