import { ReactNode } from 'react';

interface SkipLinkProps {
  href: string;
  children: ReactNode;
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#FF2400] text-white px-4 py-2 rounded-lg z-50"
    >
      {children}
    </a>
  );
}

interface VisuallyHiddenProps {
  children: ReactNode;
}

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className="sr-only">{children}</span>;
}

interface FocusTrapProps {
  children: ReactNode;
  isActive?: boolean;
}

export function FocusTrap({ children, isActive = false }: FocusTrapProps) {
  if (!isActive) return <>{children}</>;

  return (
    <div
      className="focus-trap"
      onKeyDown={(e) => {
        if (e.key === 'Tab') {
          const focusableElements = e.currentTarget.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }}
    >
      {children}
    </div>
  );
} 