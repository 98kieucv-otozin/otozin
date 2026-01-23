'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaThLarge, FaCar, FaThLarge as FaBrand, FaChartPie, FaUserCircle, FaEnvelope } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const menuItems = [
  { label: 'Xe đang bán', key: 'cars', icon: <FaCar /> },
  {
    label: 'Hãng xe', key: 'brands', icon: <FaBrand />, hasDropdown: true, submenu: [
      { label: 'Toyota', key: 'toyota' },
      { label: 'Honda', key: 'honda' },
      { label: 'Ford', key: 'ford' },
    ]
  },
  { label: 'Hiệu xe', key: 'models', icon: <FaChartPie /> },
  {
    label: 'User', key: 'users', icon: <FaUserCircle />, hasDropdown: true, submenu: [
      { label: 'Admin', key: 'admin' },
      { label: 'Khách', key: 'guest' },
      { label: 'Đại lý', key: 'dealer' },
    ]
  },
  { label: 'Bài viết', key: 'posts', icon: <FaEnvelope /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
        const currentPath = window.location.pathname + window.location.search;
        router.replace(`/login?redirect=${encodeURIComponent(currentPath)}`);
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 flex items-center px-4 py-2 justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <FaThLarge className="inline-block" /> Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative">
            <FaEnvelope className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">5</span>
          </button>
          <Image
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full border-2 border-blue-400"
          />
        </div>
      </header>
      <div className="flex flex-1">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden fixed top-16 left-4 z-30 p-2 rounded bg-white border border-gray-200 shadow-lg"
          onClick={() => setMenuOpen(true)}
          aria-label="Mở menu quản trị"
        >
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Sidebar */}
        <aside
          className={`
            bg-white border-r border-gray-200 flex flex-col py-6 px-2
            w-60 z-40
            fixed md:static top-0 left-0 h-full
            transition-transform duration-300
            ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
          `}
          style={{ minHeight: '100vh' }}
        >
          <div className="flex md:hidden justify-end mb-4">
            <button onClick={() => setMenuOpen(false)} aria-label="Đóng menu">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1">
            <ul className="space-y-1">
              {menuItems.map(item => (
                <li key={item.key}>
                  <div className="relative">
                    {item.hasDropdown ? (
                      <button
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded text-gray-700 font-medium transition-colors
                          hover:bg-blue-50 hover:text-blue-600
                        `}
                        onClick={() => setOpenDropdown(openDropdown === item.key ? null : item.key)}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="flex-1">{item.label}</span>
                        <svg className={`w-3 h-3 ml-1 transition-transform ${openDropdown === item.key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link href={`/admin/${item.key === 'cars' ? '' : item.key}`.replace(/\/$/, '')} legacyBehavior>
                        <a
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded text-gray-700 font-medium transition-colors
                            hover:bg-blue-50 hover:text-blue-600
                          `}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="flex-1">{item.label}</span>
                        </a>
                      </Link>
                    )}
                    {/* Submenu */}
                    {item.hasDropdown && openDropdown === item.key && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.submenu?.map(sub => (
                          <li key={sub.key}>
                            <Link href={`/admin/${item.key}/${sub.key}`} legacyBehavior>
                              <a
                                className={`w-full text-left px-3 py-1 rounded text-sm transition-colors block
                                  text-gray-700 hover:bg-blue-50 hover:text-blue-600
                                `}
                              >
                                {sub.label}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Overlay khi mở menu trên mobile */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
