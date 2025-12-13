import Image from 'next/image';
import Link from 'next/link';
import { UserIcon, CalendarIcon } from '@/components/icons';

const blogPosts = [
  {
    id: 1,
    title: 'Hướng dẫn mua xe cũ an toàn',
    excerpt: 'Những lưu ý quan trọng khi mua xe cũ để tránh rủi ro...',
    image: 'https://media.otozin.vn/old-car.webp',
    date: '2024-01-15',
    author: 'Admin',
    category: 'Hướng dẫn'
  },
  {
    id: 2,
    title: 'Xu hướng xe điện 2024',
    excerpt: 'Khám phá những mẫu xe điện mới nhất và công nghệ tiên tiến...',
    image: 'https://media.otozin.vn/electric.webp',
    date: '2024-01-12',
    author: 'Admin',
    category: 'Công nghệ'
  },
  {
    id: 3,
    title: 'So sánh xe mới và xe như mới',
    excerpt: 'Phân tích ưu nhược điểm giữa xe mới và xe đã qua sử dụng...',
    image: 'https://media.otozin.vn/like-new-car.webp',
    date: '2024-01-10',
    author: 'Admin',
    category: 'So sánh'
  },
  {
    id: 4,
    title: 'Top 10 xe bán chạy nhất 2024',
    excerpt: 'Danh sách những mẫu xe được ưa chuộng nhất trong năm...',
    image: 'https://media.otozin.vn/new-car.webp',
    date: '2024-01-08',
    author: 'Admin',
    category: 'Top list'
  }
];

export default function BlogSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">TIN TỨC XE</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-white rounded-sm p-1 flex flex-col h-full border border-gray-200 hover:shadow-lg transition-shadow relative">
            <Link href={`/blog/${post.id}`} className="block group mb-3">
              <div className="w-full h-40 bg-gray-100 rounded-sm overflow-hidden mb-3">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={180}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-2 group-hover:text-[#FD5E32] transition-colors">
                {post.title}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {post.category}
              </span>
              <Link href={`/blog/${post.id}`} className="text-[#FD5E32] text-sm font-medium hover:underline">
                Đọc thêm &gt;
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/blog" className="inline-block px-6 py-2 bg-[#FD5E32] text-white font-semibold rounded hover:bg-[#ff7f50] transition-colors text-base shadow-md">Xem thêm bài viết</Link>
      </div>
    </section>
  );
} 