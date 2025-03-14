import Link from "next/link";

interface BreadcrumbLink {
  link: string;
  label: string;
}

interface BreadcrumbLinkArray {
  links: BreadcrumbLink[];
}

export default function Breadcrumb({ links }: BreadcrumbLinkArray) {
  return (
    <div className="space-x-2">
      {links.map((item: BreadcrumbLink, index) => (
        <span key={index}>
          {index === links.length - 1 ? (
            <span className="text-sm sm:text-base text-rose-600">
              {item.label}
            </span>
          ) : (
            <>
              <Link href={item.link} className="hover:underline text-sm sm:text-base">
                {item.label}
              </Link>
              <span className="text-sm sm:text-base"> {'>'}</span>
            </>
          )}
        </span>
      ))}
    </div>
  );
}
