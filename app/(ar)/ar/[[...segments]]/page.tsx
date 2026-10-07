import PageView from "@/components/PageView";
import { allRoutes } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() { return allRoutes.map((segments) => ({ segments })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ segments?: string[] }> }) { const { segments = [] } = await params; return pageMetadata("ar", segments); }
export default async function Page({ params }: { params: Promise<{ segments?: string[] }> }) { const { segments = [] } = await params; return <PageView locale="ar" segments={segments} />; }
