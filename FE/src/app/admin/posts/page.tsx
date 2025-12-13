'use client';

import React from 'react';
import Link from 'next/link';

const posts = [
  { id: 1, title: '5 Kinh nghiệm mua xe cũ không thể bỏ qua', date: '2024-06-10', author: 'Admin' },
  { id: 2, title: 'So sánh xe điện và xe xăng: Đâu là lựa chọn tối ưu?', date: '2024-06-08', author: 'Admin' },
  { id: 3, title: 'Bảo dưỡng xe định kỳ: Những điều cần biết', date: '2024-06-05', author: 'Admin' },
];

export default function AdminPostsPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Danh sách bài viết</h1>
        <Link href="/admin/posts/new">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition">+ Thêm mới bài viết</button>
        </Link>
      </div>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 text-left">Tiêu đề</th>
              <th className="px-4 py-2 text-left">Ngày đăng</th>
              <th className="px-4 py-2 text-left">Tác giả</th>
              <th className="px-4 py-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="border-b last:border-b-0">
                <td className="px-4 py-2 font-medium text-gray-900">{post.title}</td>
                <td className="px-4 py-2">{post.date}</td>
                <td className="px-4 py-2">{post.author}</td>
                <td className="px-4 py-2">
                  <Link href={`/admin/posts/${post.id}`} className="text-blue-600 hover:underline mr-3">Xem</Link>
                  <button className="text-red-600 hover:underline">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
} 