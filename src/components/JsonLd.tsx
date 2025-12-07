export default function JsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CalmGames',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free mental wellness games for anxiety relief, stress management, and mindfulness. 10 calming activities designed by mental health principles.',
    url: 'https://calmgames.vercel.app',
    image: 'https://calmgames.vercel.app/og-image.png',
    author: {
      '@type': 'Person',
      name: 'Ronit Goswami',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CalmGames',
      logo: {
        '@type': 'ImageObject',
        url: 'https://calmgames.vercel.app/logo.svg',
      },
    },
    inLanguage: 'en-US',
    keywords: 'anxiety relief, stress management, mental wellness, calming games, meditation, breathing exercises, mindfulness',
    isAccessibleForFree: true,
    potentialAction: {
      '@type': 'UseAction',
      target: 'https://calmgames.vercel.app',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CalmGames',
    url: 'https://calmgames.vercel.app',
    logo: 'https://calmgames.vercel.app/logo.svg',
    description: 'Providing free mental wellness tools for anxiety, stress, and focus support.',
    founder: {
      '@type': 'Person',
      name: 'Ronit Goswami',
    },
    sameAs: [
      'https://github.com/ronitg57/CalmGames',
    ],
  };

  const mentalHealthSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'CalmGames - Mental Wellness Activities',
    description: 'Evidence-based calming activities for anxiety relief, stress reduction, and emotional wellness.',
    mainEntity: {
      '@type': 'MedicalCondition',
      name: 'Anxiety and Stress Management',
      possibleTreatment: {
        '@type': 'TherapeuticProcedure',
        name: 'Mindfulness and Breathing Exercises',
        howPerformed: 'Interactive web-based calming games including guided breathing, journaling, and cognitive reframing.',
      },
    },
    specialty: 'Mental Health',
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: 13,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mentalHealthSchema) }}
      />
    </>
  );
}
