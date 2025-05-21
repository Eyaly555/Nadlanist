# נדלניסט AI

המערכת החכמה לחיפוש וניהול נכסי נדל"ן

## לוגואים ותמונות

נדלניסט AI כוללת מספר לוגואים ותמונות לשימוש באתר:

### קבצי לוגו

- **לוגו מילולי (logo-*.svg)**: לוגו עם טקסט לשימוש בכותרות גדולות ואזורי תוכן.
  - `logo-black.svg` - לרקע בהיר
  - `logo-white.svg` - לרקע כהה
  - `logo-teal.svg` - גרסת צבע המותג

- **אייקון (mark-*.svg)**: לוגו קומפקטי לשימוש בפאביקון ואזורים קטנים.
  - `mark-black.svg` - לרקע בהיר
  - `mark-white.svg` - לרקע כהה
  - `mark-teal.svg` - גרסת צבע המותג

### הנחיות שימוש

| קובץ | מיקום באתר | מטרה | alt-text מומלץ |
|------|------------|------|-------------|
| mark-*.svg | Header (בפינה הימנית), Favicon, כל אייקון קטן בתפריטים וב-Footer | ייצוג איקוני קומפקטי של המותג | "לוגו נדלניסט AI – אייקון בית מחייך" |
| Linkedin Cover.png | תמונת Hero במסך הבית, תמונת שיתוף ברשתות (Open Graph / Twitter Card), באנר בדפי נחיתה | ייצוג מילולי מלא עם המסר "קונים? מוכרים? נדלניסט" | "באנר נדלניסט AI – קונים? מוכרים? נדלניסט" |

#### כללים עיצוביים

- **יחס logo-mark מומלץ**: 56×56 px ב-Header, 32×32 px לפאביקון.
- **logo-cover** להשתמש ברוחב מלא (100 vw), גובה ≈ 300 px במובייל ו-450 px בדסקטופ.
- **ריווח**: שמור ריווח מינימלי סביב logo-mark: ‎8 px מכל צד.
- **ניגודיות**: ב-Header על רקע לבן; ב-Footer וב-Hero ניתן להציג על רקע כהה או רך (Soft).
- **נגישות**: ודא ניגודיות AA: אם logo-cover מוצג כ-Hero, הטקסט הלבן מעליו חייב להיות #FFFFFF.

## דרישות מערכת

- Node.js 18+
- pnpm

## התחלה מהירה

1. שכפל את הפרויקט:

```bash
git clone https://github.com/your-username/nadlanist-ai.git
cd nadlanist-ai
```

2. התקן את החבילות הנדרשות:

```bash
pnpm install
```

3. הגדר משתני סביבה:

```bash
cp .env.example .env.local
```

4. הפעל את שרת הפיתוח:

```bash
pnpm dev
```

5. פתח את [http://localhost:3000](http://localhost:3000) בדפדפן שלך.

## מבנה הפרויקט

```
app/                  # תיקיית האפליקציה Next.js 13+
  (auth)/            # נתיבי אימות
  api/               # נתיבי API
components/          # רכיבי React
  ui/               # רכיבי ממשק משתמש
  forms/            # רכיבי טפסים
  projects/         # רכיבים ספציפיים לפרויקט
  shared/           # רכיבים משותפים
lib/                # שירותים וכלים
  supabase/        # שירותי Supabase
  store/           # ניהול מצב
  hooks/           # Hooks מותאמים
  utils/           # פונקציות עזר
public/             # נכסים סטטיים
scripts/            # סקריפטים לבנייה ושירות
supabase/           # הגדרות Supabase
  migrations/      # הגירות מסד נתונים
docs/               # תיעוד
```

## Development Guidelines

### Code Style

- Follow TypeScript best practices with strict type checking
- Use ESLint and Prettier for code formatting
- Follow component naming conventions (PascalCase)
- Organize imports according to the style guide
- Write comprehensive documentation for new features

### State Management

- Use Zustand for global state
- Keep state close to where it's used
- Use React Query for server state
- Implement proper caching strategies

### Testing

- Write tests for all new features
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Test edge cases and error scenarios

### Performance

- Implement proper code splitting
- Use Next.js Image component for images
- Implement proper caching strategies
- Minimize bundle size
- Use proper lazy loading

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software licensed under the Nadlanist AI Proprietary License - see the [LICENSE](LICENSE) file for details. The software is not open source and requires a valid license for use. For licensing inquiries, please contact info@nadlanist.ai.
