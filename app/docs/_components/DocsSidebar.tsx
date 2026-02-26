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
      className={`block py-1.5 pl-4 border-l text-sm transition-colors ${
        isActive
          ? 'border-accent-500 dark:border-accent-dark-500 text-accent-600 dark:text-accent-dark-400 font-medium bg-accent-50 dark:bg-accent-dark-950/30'
          : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600'
      }`}
    >
      {item.title}
    </Link>
  );
}

function NavSectionComponent({ 
  section, 
  isOpen, 
  onToggle,
  onClick 
}: { 
  section: NavSection; 
  isOpen: boolean;
  onToggle: () => void;
  onClick?: () => void;
}) {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 px-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
      >
        {section.title}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
  
  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden p-3 rounded-full bg-accent-500 dark:bg-accent-dark-500 text-white shadow-lg hover:bg-accent-600 dark:hover:bg-accent-dark-600 transition-colors"
        aria-label="Toggle documentation menu"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-72 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto transition-transform lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] md:lg:top-20 md:lg:h-[calc(100vh-5rem)] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20 lg:pt-6">
          <Link
            href="/docs"
            className="block text-lg font-semibold text-zinc-900 dark:text-white mb-6 hover:text-accent-600 dark:hover:text-accent-dark-400 transition-colors"
          >
            Documentation
          </Link>
          
          <nav>
            {docsNavigation.map((section, index) => (
              <NavSectionComponent
                key={section.title}
                section={section}
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
