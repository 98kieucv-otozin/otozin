import { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../services/api/client";
import TipTapEditor from "../../components/TipTapEditor";

export default function CreatePost() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const response = await apiClient.post("/cms-post", {
        title: values.title,
        content: values.content,
        author: values.author || "Admin",
      });

      if (response.data) {
        message.success("Tạo bài viết thành công!");
        form.resetFields();
        // Có thể navigate về danh sách bài viết nếu có
        // navigate("/admin/posts");
      }
    } catch (error: any) {
      console.error("Error creating post:", error);
      message.error(error?.message || "Có lỗi xảy ra khi tạo bài viết");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Card title="Tạo bài viết mới" style={{ marginBottom: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề bài viết" },
              { max: 255, message: "Tiêu đề không được vượt quá 255 ký tự" },
            ]}
          >
            <Input placeholder="Nhập tiêu đề bài viết" size="large" />
          </Form.Item>

          <Form.Item
            label="Nội dung"
            name="content"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung bài viết" },
            ]}
          >
            <TipTapEditor
              placeholder="Nhập nội dung bài viết..."
              onChange={(html) => {
                form.setFieldsValue({ content: html });
              }}
            />
          </Form.Item>

          <Form.Item
            label="Tác giả"
            name="author"
            initialValue="Admin"
          >
            <Input placeholder="Nhập tên tác giả" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              style={{ marginRight: 8 }}
            >
              Tạo bài viết
            </Button>
            <Button
              onClick={() => form.resetFields()}
              size="large"
            >
              Làm mới
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

