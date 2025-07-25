"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface SafeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
}

export function SafeLink({ href, children, className, prefetch = false }: SafeLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      router.push(href);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to window.location
      window.location.href = href;
    }
  };

  return (
    <Link 
      href={href} 
      className={className} 
      prefetch={prefetch}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
