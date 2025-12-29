import { Metadata, MetadataRoute } from 'next';
import { INITIATIVES, LOCATIONS, COMPARISONS } from '@/data/seo';
import { CODEX } from '@/data/codex';

const BASE_URL = 'https://rensnce.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/about',
        '/contact',
        '/token',
        '/initiatives',
        '/locations',
        '/comparisons',
        '/codex',
        '/podcast',
        '/shop',
        '/publications',
        '/portal',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }));

    const initiativeRoutes = INITIATIVES.map((ind) => ({
        url: `${BASE_URL}/initiatives/${ind.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    const locationRoutes = LOCATIONS.map((loc) => ({
        url: `${BASE_URL}/locations/${loc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const comparisonRoutes = COMPARISONS.map((comp) => ({
        url: `${BASE_URL}/comparisons/${comp.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const codexRoutes = CODEX.map((term) => ({
        url: `${BASE_URL}/codex/${term.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [
        ...routes,
        ...initiativeRoutes,
        ...locationRoutes,
        ...comparisonRoutes,
        ...codexRoutes,
    ];
}
