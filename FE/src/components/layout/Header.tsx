'use client';
import { useMegaMenu } from '@/hooks/useMegaMenu';
import { MEGA_MENU_COLUMNS } from '@/constants/menuData';
import ProvinceDropdown from '../ui/ProvinceDropdown';

export default function Header() {
  const {
    isMegaMenuOpen,
    setIsMegaMenuOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    megaMenuRef,
    buttonRef,
  } = useMegaMenu();

  return (
    <header className="relative z-60 overflow-visible bg-[#F3F3F3] dark:bg-[#F3F3F3] backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center py-3">
          <div className="flex items-center mr-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MyApp
              </h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm text-[#FD5E32]" aria-label="Main navigation">

            {/* Mega menu Pages */}
            <div className="relative group flex items-center">
              <button
                ref={buttonRef}
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="tracking-wide px-4 py-2 transition-colors duration-200 flex items-center font-medium text-[#FD5E32]"
                style={{ height: '40px' }}
              >
                XE ĐANG BÁN
              </button>
              <div
                ref={megaMenuRef}
                className={`absolute left-0 top-full w-[1000px] md:w-[1000px] w-[95vw] bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-700 rounded-sm px-2 py-4 z-[9999]
                  transition-all duration-200
                  ${isMegaMenuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
                  md:group-hover:opacity-100 md:group-hover:scale-100 md:group-hover:pointer-events-auto
                `}>
                <div className="grid grid-cols-6 gap-0">
                  {MEGA_MENU_COLUMNS.map((column, index) => (
                    <div key={index} className="px-3">
                      <div className="text-gray-900 mb-2 pb-1 border-b border-[#FF2400]">{column.title}</div>
                      <ul className="space-y-1">
                        {column.data.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <a href="#" className="text-gray-800 text-md font-normal hover:text-[#FF7F50] hover:text-base leading-7 transition-all duration-200">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* End Mega menu */}
            <a href="#" className="transition-colors duration-200 px-4 py-2  uppercase tracking-wide flex items-center text-[#FD5E32] font-medium">
              VỀ CHÚNG TÔI
            </a>
            <a href="#" className="transition-colors duration-200 px-4 py-2 uppercase tracking-wide flex items-center text-[#FD5E32] font-medium">
              KÊNH NGƯỜI BÁN
            </a>
            <a href="#" className="transition-colors duration-200 px-4 py-2 uppercase tracking-wide flex items-center text-[#FD5E32] font-medium">
              LIÊN HỆ
            </a>
            <ProvinceDropdown />
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#FD5E32] hover:text-[#FF2400]"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="mb-3">
                <ProvinceDropdown />
              </div>
              <div>
                <button
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-[#FD5E32] hover:text-[#FF2400] dark:hover:text-[#FF2400]"
                >
                  XE ĐANG BÁN
                </button>
                {/* Mobile Mega Menu */}
                {isMegaMenuOpen && (
                  <div className="mt-2 ml-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {MEGA_MENU_COLUMNS.map((column, index) => (
                        <div key={index}>
                          <div className="text-gray-900 dark:text-white mb-2 text-sm border-b border-[#FF2400]">{column.title}</div>
                          <ul className="space-y-1">
                            {column.data.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <a href="#" className="text-gray-700 dark:text-gray-300 text-sm hover:text-[#FF2400]">
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <a href="#" className="block px-3 py-2 text-base font-medium text-[#FD5E32] hover:text-[#FF2400] dark:hover:text-[#FF2400] ">
                VỀ CHÚNG TÔI
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-[#FD5E32] hover:text-[#FF2400] dark:hover:text-[#FF2400] ">
                BÁN XE NGAY
              </a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-[#FD5E32] hover:text-[#FF2400] dark:hover:text-[#FF2400] ">
                LIÊN HỆ
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}