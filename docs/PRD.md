# Project Requirements Document (PRD) for נדלניסט AI

## 1. Product Overview

נדלניסט AI היא פלטפורמת אינטרנטית לאוטומציית תהליכי נדל"ן, המאפשרת ייעול תהליכי קנייה, מכירה, וליווי מקצועי באמצעות בינה מלאכותית.

### 1.2 Target Audience

- רוכשי ומוכרי נדל"ן בישראל
- יזמים, מתווכים, ומשקיעים
- צוותי פיתוח בתחום הנדל"ן

## 2. Product Features

### 2.1 Project Configuration

#### Core Features

- ממשק הזנת פרטי פרויקט
- בחירת פלטפורמה (ווב/מובייל)
- בחירת טכנולוגיות
- התאמה דינמית של תהליכים ומסמכים

#### Documentation Assistance

- יצירת מסמכי PRD, קוד סטייל, חוקים, משימות ומעקב התקדמות

### 2.2 Technical Architecture

- Frontend: Next.js עם TypeScript
- Backend: Supabase
- UI: Tailwind CSS + ShadcN UI
- Authentication: Supabase Auth
- Database: Supabase PostgreSQL

## 3. User Flows

### 3.1 Project Creation Flow

1. משתמש נכנס ל-nadlanist.ai
2. מזין שם ותיאור פרויקט
3. בוחר פלטפורמה וטכנולוגיות
4. בוחר כלים נוספים
5. מאשר ומקבל מסמכים מותאמים

### 3.2 Documentation Assistance Flow

1. טעינת תבניות מסמכים
2. התאמה דינמית לפי קלט המשתמש
3. תצוגה מקדימה
4. אפשרות לעריכה ידנית
5. הורדה/סנכרון

## 4. Feature Requirements

### 4.1 Project Configuration

- שם ותיאור פרויקט
- בחירת פלטפורמה וטכנולוגיה
- בחירת רישיון

### 4.2 Documentation Assistance

- תבניות מסמכים דינמיות
- התאמה לפי פרטי הפרויקט

## 5. Non-Functional Requirements

### 5.1 Performance

- טעינה מהירה
- עדכון דינמי של מסמכים
- תמיכה במובייל ודסקטופ

## 6. Future Considerations

### 6.1 Planned Enhancements

- Template customization
- Team collaboration features
- Integration with additional IDEs
- Custom rule creation
- AI-powered suggestions

### 6.2 Integration Points

- Version control systems (GitHub, GitLab, etc.)
- CI/CD platforms
- Project management tools
- Code quality tools

## 7. Success Metrics

- User adoption rate
- Prompt customization accuracy
- User satisfaction scores
- Time saved in project setup
- Quality of resulting documentation

## 8. Timeline and Milestones

- Phase 1: Core project configuration (Week 1-2)
- Phase 2: Documentation generation (Week 3-4)
- Phase 3: Integration features (Week 5-6)
- Phase 4: Testing and refinement (Week 7-8)
- Phase 5: Launch and monitoring (Week 9-10)
