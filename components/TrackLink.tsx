import Link from "next/link";

export default function TrackLink({ href, event, children, className, ...rest }: { href: string; event: string; children: React.ReactNode; className?: string; target?: string; rel?: string; download?: string }) {
  return <Link href={href} data-track={event} className={className} {...rest}>{children}</Link>;
}
