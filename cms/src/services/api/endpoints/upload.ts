import { apiClient } from "../client";

export const uploadApi = {
  /**
   * Get presigned URLs for uploading images
   */
  async getUploadUrls(count: number, subfolder?: string): Promise<{
    uploadUrls: string[];
    keys: string[];
    publicUrls: string[];
    count: number;
  }> {
    const response = await apiClient.post<{
      success: boolean;
      uploadUrls: string[];
      keys: string[];
      publicUrls: string[];
      count: number;
    }>("/upload/presigned-urls", {
      count,
      subfolder: subfolder || "cms-posts",
    });

    if (!response.data || !response.data.success) {
      throw new Error("Failed to get upload URLs");
    }

    return response.data;
  },

  /**
   * Upload image to presigned URL
   */
  async uploadImageToPresignedUrl(presignedUrl: string, file: File): Promise<void> {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }
  },
};

