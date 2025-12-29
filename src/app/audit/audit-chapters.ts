import { rensncedaodmnd } from './sections/1-rensncedaodmnd';
import { rensncedrctry } from './sections/2-rensncedrctry';
import { rensncerpstry } from './sections/3-rensncerpstry';
import { rensnceundrwrtr } from './sections/4-rensnceundrwrtr';
import { mkvlimnt } from './sections/5-mkvlimnt';
import { rensncersrv } from './sections/6-rensncersrv';
import { auditRubric } from './sections/7-audit-rubric';
import { executiveSummary } from './sections/0-executive-summary';

export interface ChapterSection {
    heading: string;
    content: string;
}

export interface ChapterData {
    id: string;
    number: string;
    title: string;
    subtitle: string;
    color: string;
    symbol: string;
    image?: string;
    pullQuote: string;
    score?: string; // e.g. "9.8/10"
    riskLevel?: 'Low' | 'Medium' | 'High' | 'Critical' | 'None';
    sections: ChapterSection[];
}

export const auditChapters: ChapterData[] = [
    executiveSummary,
    rensncedaodmnd,
    rensncedrctry,
    rensncerpstry,
    rensnceundrwrtr,
    mkvlimnt,
    rensncersrv,
    auditRubric
];

