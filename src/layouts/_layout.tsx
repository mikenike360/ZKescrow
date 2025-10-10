import { useWindowScroll } from '@/hooks/use-window-scroll';
import { useIsMounted } from '@/hooks/use-is-mounted';
import React, { useState, useEffect } from 'react';
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import { HomeIcon } from '@/components/icons/home';
import { Twitter } from '@/components/icons/twitter';
import { Discord } from '@/components/icons/discord';
import { useTheme } from 'next-themes';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

require('@demox-labs/aleo-wallet-adapter-reactui/dist/styles.css');

// Define the list of DaisyUI themes you want to offer
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "synthwave",
];

// ThemeSelector component using Next Themes
function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  // Use a mount flag to avoid SSR mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="select select-bordered max-w-xs"
    >
      {themes.map((t) => (
        <option key={t} value={t}>
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </option>
      ))}
    </select>
  );
}

function HeaderRightArea() {
  return (
    <div className="relative order-last flex shrink-0 items-center gap-3 sm:gap-6 lg:gap-8 btn-primary-content text-primary">
      {/* Use the updated ThemeSelector */}
      <ThemeSelector />
      <WalletMultiButton />
    </div>
  );
}

export function Header() {
  const windowScroll = useWindowScroll();
  const isMounted = useIsMounted();
  const router = useRouter();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/board', label: 'Board' },
    { href: '/examples', label: 'Examples' },
  ];

  return (
    <nav
      className={`fixed top-0 z-30 w-full bg-base-200 transition-all duration-300 ${
        isMounted && windowScroll.y > 10 ? 'shadow-card backdrop-blur' : ''
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5 gap-4">
        {/* Left: Social Icons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {process.env.URL && (
            <a
              className="bg-base-300 bg-opacity-20 rounded-full p-2 hover:bg-opacity-40 transition-all"
              href={`${process.env.URL}`}
            >
              <HomeIcon />
            </a>
          )}
          {process.env.TWITTER && (
            <a
              className="bg-base-300 bg-opacity-20 rounded-full p-2 hover:bg-opacity-40 transition-all"
              href={`${process.env.TWITTER}`}
            >
              <Twitter width="18" height="18" />
            </a>
          )}
          {process.env.DISCORD && (
            <a
              className="bg-base-300 bg-opacity-20 rounded-full p-2 hover:bg-opacity-40 transition-all"
              href={`${process.env.DISCORD}`}
            >
              <Discord width="18" height="18" />
            </a>
          )}
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-auto">
          <div className="flex items-center gap-6 bg-base-300 bg-opacity-30 rounded-full px-6 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                  router.pathname === link.href
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                    : 'text-base-content hover:bg-base-100 hover:shadow-sm'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Theme Selector & Wallet */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <HeaderRightArea />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-4 pb-4 flex justify-center">
        <div className="flex items-center gap-3 bg-base-300 bg-opacity-30 rounded-full px-4 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                router.pathname === link.href
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-base-content hover:bg-base-100 hover:shadow-sm'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

interface LayoutProps {}

export default function Layout({
  children,
}: React.PropsWithChildren<LayoutProps>) {
  return (
    // Use DaisyUI tokens for the background and text color
    <div className="bg-base-100 text-base-content flex min-h-screen flex-col">
      <Header />
      <main className="mb-12 flex flex-grow flex-col pt-4 sm:pt-12 bg-primary">
        {children}
      </main>
      <Footer />
    </div>
  );
}
