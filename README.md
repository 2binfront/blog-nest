# blog-backend

This is a blog backend for a blog.

## R2 image uploads

The editor uploads images as multipart form data to `POST /api/blog/article/upload`. The backend validates the authenticated user, image type, file signature, and 10 MB size limit before uploading the buffer to R2. Configure `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, and `R2_PUBLIC_URL` in the backend environment. The R2 token should only have object write access to this bucket.

## functions:

获取文章
