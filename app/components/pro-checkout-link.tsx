"use client";

import { track } from "@vercel/analytics";

export function ProCheckoutLink({
  href,
  className,
  children,
  source,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  source: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track("pro_checkout_clicked", { source })}
    >
      {children}
    </a>
  );
}
