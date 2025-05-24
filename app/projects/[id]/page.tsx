import { type Metadata } from 'next';
import Script from 'next/script';
import { ApiProject } from '../api-project.types';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const res = await fetch('https://www.nadlanist.ai/api/projects');
  const projects: ApiProject[] = await res.json();
  const top100 = projects.slice(0, 100);
  return top100.map(proj => ({ id: proj.id.toString() }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch('https://www.nadlanist.ai/api/projects');
  const projects: ApiProject[] = await res.json();
  const project = projects.find(p => p.id.toString() === id);
  if (!project) return { title: 'פרויקט לא נמצא' };

  return {
    title: `${project.project_name} – ${project.city}`,
    description: `פרויקט ${project.project_name} בעיר ${project.city}. סטטוס: ${project.towers[0]?.tower_status || 'לא ידוע'}.`,
    alternates: {
      canonical: `https://www.nadlanist.ai/projects/${id}`
    },
    openGraph: {
      title: project.project_name,
      description: `פרויקט ב${project.city}, סטטוס: ${project.towers[0]?.tower_status}`,
      url: `https://www.nadlanist.ai/projects/${id}`,
      siteName: 'Nadlanist AI',
      locale: 'he_IL',
      type: 'website',
      images: [{
        url: 'https://www.nadlanist.ai/og-default-project.png',
        width: 1200, height: 630, alt: project.project_name
      }]
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const res = await fetch('https://www.nadlanist.ai/api/projects');
  const projects: ApiProject[] = await res.json();
  const project = projects.find(p => p.id.toString() === id);

  if (!project) {
    return <div className="text-center text-lg mt-10">הפרויקט לא נמצא</div>;
  }

  return (
    <>
      <Script id="ld-project" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": project.project_name,
          "url": `https://www.nadlanist.ai/projects/${project.id}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": project.city
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": project.latitude,
            "longitude": project.longitude
          },
          "itemOffered": {
            "@type": "Offer"
          },
          "numberOfRooms": 0, // אין נתון כזה, דוגמה בלבד
          "floorSize": {
            "@type": "QuantitativeValue",
            "value": project.towers[0]?.height_m,
            "unitCode": "MTR"
          },
          "towers": project.towers.map(t => ({
            "height": t.height_m,
            "numberOfFloors": t.floors,
            "url": `https://www.nadlanist.ai/projects/${project.id}`
          }))
        })
      }} />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8" dir="rtl">
        <h1 className="text-3xl font-bold mb-2">{project.project_name}</h1>
        <p className="mb-1">עיר: {project.city}</p>
        <p className="mb-1">מגדלים בבנייה: {project.towers.filter(t => t.tower_status === 'בנייה').length}</p>
        {/* ניתן להוסיף כאן מידע נוסף לפי הצורך */}
      </div>
    </>
  );
} 