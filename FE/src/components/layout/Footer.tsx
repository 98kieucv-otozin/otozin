import { LocationDotIcon, PhoneIcon, EnvelopeIcon } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="bg-[#F3F3F3] text-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Thông tin công ty */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm tracking-widest">VỀ CHÚNG TÔI</h3>
            <p className="text-sm mb-4">Nền tảng mua bán xe uy tín hàng đầu Việt Nam. Kết nối người mua và người bán với hơn 100,000 xe đa dạng từ xe mới đến xe cũ chất lượng cao.</p>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-center gap-2"><LocationDotIcon className="w-4 h-4" /> Phú Lương, Hà Nội</li>
              <li className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" /> 0968 625 682</li>
              <li className="flex items-center gap-2"><EnvelopeIcon className="w-4 h-4" /> support@otozin.vn</li>
            </ul>
            <div className="mt-4">
              <p className="text-xs text-gray-600 mb-2">Theo dõi chúng tôi:</p>
              <div className="flex gap-2">
                <a href="#" className="text-gray-600 hover:text-[#FD5E32] transition-colors">Facebook</a>
                <a href="#" className="text-gray-600 hover:text-[#FD5E32] transition-colors">Instagram</a>
                <a href="#" className="text-gray-600 hover:text-[#FD5E32] transition-colors">YouTube</a>
              </div>
            </div>
          </div>
          {/* Mua xe */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm tracking-widest">MUA XE</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/new-cars" className="hover:text-[#FD5E32] transition-colors">Xe mới</a></li>
              <li><a href="/used-cars" className="hover:text-[#FD5E32] transition-colors">Xe cũ</a></li>
              <li><a href="/electric-cars" className="hover:text-[#FD5E32] transition-colors">Xe điện</a></li>
              <li><a href="/luxury-cars" className="hover:text-[#FD5E32] transition-colors">Xe sang</a></li>
              <li><a href="/compare" className="hover:text-[#FD5E32] transition-colors">So sánh xe</a></li>
            </ul>
          </div>
          {/* Bán xe */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm tracking-widest">BÁN XE</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/sell-car" className="hover:text-[#FD5E32] transition-colors">Đăng bán xe</a></li>
              <li><a href="/valuation" className="hover:text-[#FD5E32] transition-colors">Định giá xe</a></li>
              <li><a href="/showroom" className="hover:text-[#FD5E32] transition-colors">Đăng ký showroom</a></li>
              <li><a href="/promotion" className="hover:text-[#FD5E32] transition-colors">Chương trình khuyến mãi</a></li>
              <li><a href="/guide" className="hover:text-[#FD5E32] transition-colors">Hướng dẫn bán xe</a></li>
            </ul>
          </div>
          {/* Hỗ trợ */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm tracking-widest">HỖ TRỢ</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/contact" className="hover:text-[#FD5E32] transition-colors">Liên hệ</a></li>
              <li><a href="/faq" className="hover:text-[#FD5E32] transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="/guide-buy" className="hover:text-[#FD5E32] transition-colors">Hướng dẫn mua xe</a></li>
              <li><a href="/warranty" className="hover:text-[#FD5E32] transition-colors">Chính sách bảo hành</a></li>
              <li><a href="/insurance" className="hover:text-[#FD5E32] transition-colors">Bảo hiểm xe</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-300 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 MyApp. Tất cả quyền được bảo lưu.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/privacy" className="hover:text-[#FD5E32] transition-colors">Chính sách bảo mật</a>
              <a href="/terms" className="hover:text-[#FD5E32] transition-colors">Điều khoản sử dụng</a>
              <a href="/cookies" className="hover:text-[#FD5E32] transition-colors">Chính sách Cookie</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 