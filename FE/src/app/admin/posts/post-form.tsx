'use client';

import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface PostFormProps {
  mode: 'create' | 'edit';
  postId?: string;
}

export default function PostForm({ mode, postId }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Giả lập fetch dữ liệu khi edit
  useEffect(() => {
    if (mode === 'edit' && postId) {
      setLoading(true);
      setTimeout(() => {
        setTitle('Tiêu đề bài viết mẫu #' + postId);
        setContent('<h2>Tiêu đề phụ</h2><p><strong>Nội dung</strong> <em>bài viết</em> <u>mẫu</u>...</p>');
        setLoading(false);
      }, 500);
    }
  }, [mode, postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `${mode === 'create' ? 'Tạo mới' : 'Cập nhật'} bài viết thành công!\nTiêu đề: ${title}\nNội dung: ${content}`
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        {mode === 'create' ? 'Thêm mới bài viết' : 'Chỉnh sửa bài viết'}
      </h1>
      {loading ? (
        <div className="text-gray-500">Đang tải dữ liệu...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Tiêu đề</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Nội dung</label>
            <Editor
              apiKey="1khpfxmpsnhl9alsxx0das31zt40yfvvbgop6iatzkowdkhs"
              value={content}
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                  'table',
                  'image', // Đảm bảo luôn có plugin image
                ],
                toolbar:
                  'undo redo | formatselect | bold italic underline strikethrough | ' +
                  'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
                  'link image media table | removeformat | code fullscreen',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
              }}
              onEditorChange={setContent}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition"
          >
            {mode === 'create' ? 'Tạo mới' : 'Lưu thay đổi'}
          </button>
        </form>
      )}
    </section>
  );
} 