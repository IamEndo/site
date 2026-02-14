export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const docsNavigation: NavSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Hardware Requirements', href: '/docs/getting-started/hardware' },
      { title: 'Software Setup', href: '/docs/getting-started/prerequisites' },
    ],
  },
  {
    title: 'Installation',
    items: [
      { title: 'Installing VS Code', href: '/docs/installation/vscode' },
      { title: 'Installing PlatformIO', href: '/docs/installation/platformio' },
      { title: 'USB Drivers', href: '/docs/installation/usb-drivers' },
      { title: 'Building Firmware', href: '/docs/installation/building' },
      { title: 'First Boot', href: '/docs/installation/first-boot' },
    ],
  },
  {
    title: 'Setup',
    items: [
      { title: 'WiFi Configuration', href: '/docs/setup/wifi' },
      { title: 'Rostrum Servers', href: '/docs/setup/rostrum' },
      { title: 'Running Your Own Server', href: '/docs/setup/own-server' },
      { title: 'Network Security', href: '/docs/setup/network-security' },
    ],
  },
  {
    title: 'Wallet',
    items: [
      { title: 'Wallet Options', href: '/docs/wallet/options' },
      { title: 'Manual Address', href: '/docs/wallet/manual-address' },
      { title: 'Generating a Seed', href: '/docs/wallet/seed-generation' },
      { title: 'Understanding Entropy', href: '/docs/wallet/entropy' },
      { title: 'Seed Verification', href: '/docs/wallet/verification' },
      { title: 'Importing a Seed', href: '/docs/wallet/import-seed' },
      { title: 'Importing an xPub', href: '/docs/wallet/import-xpub' },
    ],
  },
  {
    title: 'Privacy',
    items: [
      { title: 'Why Privacy Matters', href: '/docs/privacy/why-privacy' },
      { title: 'Address Derivation', href: '/docs/privacy/derivation' },
      { title: 'Enabling Privacy Mode', href: '/docs/privacy/enabling' },
      { title: 'Privacy vs Convenience', href: '/docs/privacy/tradeoffs' },
    ],
  },
  {
    title: 'Security',
    items: [
      { title: 'PIN Setup', href: '/docs/security/pin-setup' },
      { title: 'PIN Best Practices', href: '/docs/security/pin-practices' },
      { title: 'Security Model', href: '/docs/security/model' },
      { title: 'Production Mode', href: '/docs/security/production-mode' },
    ],
  },
  {
    title: 'Usage',
    items: [
      { title: 'Receiving Payments', href: '/docs/usage/receiving' },
      { title: 'Invoice Creation', href: '/docs/usage/invoices' },
      { title: 'Payment Confirmation', href: '/docs/usage/confirmation' },
    ],
  },
  {
    title: 'Maintenance',
    items: [
      { title: 'Settings', href: '/docs/maintenance/settings' },
      { title: 'Factory Reset', href: '/docs/maintenance/factory-reset' },
      { title: 'Troubleshooting', href: '/docs/maintenance/troubleshooting' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { title: 'Technical Specifications', href: '/docs/reference/specifications' },
      { title: 'Glossary', href: '/docs/reference/glossary' },
    ],
  },
];

export function getDocTitle(pathname: string): string {
  for (const section of docsNavigation) {
    for (const item of section.items) {
      if (item.href === pathname) {
        return item.title;
      }
    }
  }
  return 'Documentation';
}

export function getNextDoc(pathname: string): NavItem | null {
  const allItems = docsNavigation.flatMap(s => s.items);
  const currentIndex = allItems.findIndex(item => item.href === pathname);
  if (currentIndex >= 0 && currentIndex < allItems.length - 1) {
    return allItems[currentIndex + 1];
  }
  return null;
}

export function getPrevDoc(pathname: string): NavItem | null {
  const allItems = docsNavigation.flatMap(s => s.items);
  const currentIndex = allItems.findIndex(item => item.href === pathname);
  if (currentIndex > 0) {
    return allItems[currentIndex - 1];
  }
  return null;
}
