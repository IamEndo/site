'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docsNavigation, NavSection, NavItem } from '../_data/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  
  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`block py-1.5 pl-4 border-l text-sm transition-colors ${
        isActive
          ? 'border-accent-500 dark:border-accent-dark-500 text-accent-600 dark:text-accent-dark-400 font-medium bg-accent-50 dark:bg-accent-dark-950/30'
          : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600'
      }`}
    >
      {item.title}
    </Link>
  );
}

function NavSectionComponent({ 
  section, 
  panelId,
  isOpen, 
  onToggle,
  onClick 
}: { 
  section: NavSection; 
  panelId: string;
  isOpen: boolean;
  onToggle: () => void;
  onClick?: () => void;
}) {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between py-2 px-1 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors"
      >
        {section.title}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        // Collapsed links must not be reachable by Tab or screen readers.
        inert={!isOpen}
        className={`overflow-hidden transition-all duration-200 motion-reduce:transition-none ${
          isOpen ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-0.5 pb-2">
          {section.items.map((item) => (
            <NavLink key={item.href} item={item} onClick={onClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DocsSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  
  // Find which section contains the current page
  const getActiveSectionIndex = () => {
    return docsNavigation.findIndex(section => 
      section.items.some(item => item.href === pathname)
    );
  };
  
  // Track which sections are open - default to active section
  const [openSections, setOpenSections] = useState<Set<number>>(() => {
    const activeIndex = getActiveSectionIndex();
    return new Set(activeIndex >= 0 ? [activeIndex] : [0]);
  });
  
  // Update open sections when pathname changes
  useEffect(() => {
    const activeIndex = getActiveSectionIndex();
    if (activeIndex >= 0) {
      setOpenSections(prev => new Set([...prev, activeIndex]));
    }
  }, [pathname]);
  
  const toggleSection = (index: number) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
  
  // Prevent scroll when mobile menu is open; Escape closes it
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  // Below the lg breakpoint the sidebar is an off-canvas drawer: while it is
  // closed its links must not take keyboard focus.
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden p-3 rounded-full bg-accent-500 dark:bg-accent-dark-500 text-white shadow-lg hover:bg-accent-600 dark:hover:bg-accent-dark-600 transition-colors"
        aria-label={mobileOpen ? 'Close documentation menu' : 'Open documentation menu'}
        aria-expanded={mobileOpen}
        aria-controls="docs-sidebar"
      >
        {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="docs-sidebar"
        inert={!isDesktop && !mobileOpen}
        className={`fixed top-0 left-0 z-40 h-screen w-72 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto transition-transform lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] md:lg:top-20 md:lg:h-[calc(100vh-5rem)] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20 lg:pt-6">
          <Link
            href="/docs"
            className="block text-lg font-semibold text-neutral-900 dark:text-white mb-6 hover:text-accent-600 dark:hover:text-accent-dark-400 transition-colors"
          >
            Documentation
          </Link>
          
          <nav aria-label="Documentation">
            {docsNavigation.map((section, index) => (
              <NavSectionComponent
                key={section.title}
                section={section}
                panelId={`docs-nav-section-${index}`}
                isOpen={openSections.has(index)}
                onToggle={() => toggleSection(index)}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
