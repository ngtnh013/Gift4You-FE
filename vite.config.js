import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Lắng nghe trên tất cả các địa chỉ IP
    port: 5173,       // Cổng mà Vite sẽ chạy
    strictPort: true, // Ngăn không cho Vite chuyển sang cổng khác nếu cổng đã chiếm
    watch: {
      usePolling: true, // Bật sử dụng polling để phát hiện thay đổi
      interval: 100,    // Tùy chọn thời gian kiểm tra
    },
  },
})
