import Image from 'next/image';
import { UserIcon, CalendarIcon } from '@/components/icons';
import Head from 'next/head';
import Link from 'next/link';

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

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Find the blog post by slug
  const post = blogPosts.find(p => p.id.toString() === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
            <p className="text-gray-600 mb-8">Bài viết bạn đang tìm kiếm không tồn tại.</p>
            <Link href="/blog" className="inline-block bg-[#FD5E32] text-white px-6 py-3 rounded-lg hover:bg-[#e54d2a] transition-colors">
              Quay lại trang blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const url = `https://yourdomain.com/blog/${post.id}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": `https://yourdomain.com${post.image}`,
    "datePublished": post.date,
    "author": { "@type": "Person", "name": "Admin" },
    "description": post.excerpt,
    "url": url
  };

  return (
    <>
      <Head>
        <title>{post.title} | MyCar Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={url} />
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`https://yourdomain.com${post.image}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center justify-center gap-4 text-lg">
                <span className="flex items-center gap-2">
                  <UserIcon className="text-[#FD5E32]" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarIcon className="text-[#FD5E32]" />
                  {post.date}
                </span>
                <span className="bg-[#FD5E32] px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tóm tắt bài viết</h3>
                <p className="text-gray-700">
                  {post.excerpt}
                </p>
              </div>

              <p className="text-gray-600">
                Nội dung chi tiết của bài viết sẽ được hiển thị ở đây...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 