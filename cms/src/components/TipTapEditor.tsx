import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { useEffect, useRef, useState } from "react";
import { message } from "antd";
import { uploadApi } from "../services/api/endpoints/upload";
import "./TipTapEditor.css";
import { extractUuidFromUrl, getImageUrl } from "../utils/url";

interface TipTapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

export default function TipTapEditor({
  content = "",
  onChange,
  placeholder = "Nhập nội dung bài viết...",
}: TipTapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "tiptap-editor",
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const fileArray = Array.from(files);

      // Get presigned URLs (giống cách UploadCar làm)
      const { uploadUrls } = await uploadApi.getUploadUrls(
        fileArray.length,
        "cms-posts"
      );

      // Upload từng file lên presigned URL và chèn vào editor ngay sau khi upload thành công
      // (giống cách UploadCar xử lý từng file một)
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        const presignedUrl = uploadUrls[i];

        try {
          // Upload file lên presigned URL
          await uploadApi.uploadImageToPresignedUrl(presignedUrl, file);

          // Tạo URL từ presigned URL (bỏ query params) - giống cách UploadCar làm
          const imageUrl = presignedUrl.split("?")[0];
          const imageUuid = extractUuidFromUrl(imageUrl[0]);
          const imageUrlShow = getImageUrl(imageUuid, "cms-posts");
          console.log(imageUrlShow);

          // Chèn ảnh vào editor ngay sau khi upload thành công
          editor?.chain().focus().setImage({ src: imageUrl }).run();
        } catch (uploadError) {
          console.error(`Error uploading file ${i + 1}:`, uploadError);
          message.error(`Lỗi khi tải ảnh ${file.name}`);
        }
      }

      message.success(`Đã tải lên ${fileArray.length} ảnh thành công`);
    } catch (error: any) {
      console.error("Error uploading images:", error);
      message.error(error?.message || "Có lỗi xảy ra khi tải ảnh lên");
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-wrapper">
      <div className="tiptap-toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
          title="Strike"
        >
          <s>S</s>
        </button>
        <div className="toolbar-divider" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
          title="Heading 3"
        >
          H3
        </button>
        <div className="toolbar-divider" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          title="Ordered List"
        >
          1.
        </button>
        <div className="toolbar-divider" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
          title="Blockquote"
        >
          "
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          ─
        </button>
        <div className="toolbar-divider" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          title="Chèn ảnh"
        >
          📷
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <div className="toolbar-divider" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          ↷
        </button>
      </div>
      <EditorContent editor={editor} className="tiptap-content" />
    </div>
  );
}

