'use client';

import PostForm from '../post-form';
import { useParams } from 'next/navigation';

export default function EditPostPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  return <PostForm mode="edit" postId={id} />;
} 