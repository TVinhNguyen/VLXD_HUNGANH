/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Quét tất cả các file .ejs trong thư mục views
  ],
  theme: {
    extend: {
      // Mở rộng theme với màu sắc và font chữ tùy chỉnh
      colors: {
        'primary': '#FFC107', // Màu vàng chủ đạo (giống màu máy xây dựng)
        'secondary': '#2C3E50', // Màu xanh đen cho sự vững chãi, chuyên nghiệp
        'accent': '#3498DB', // Màu xanh dương cho các link hoặc điểm nhấn
      },
      fontFamily: {
        // Sử dụng một font chữ đẹp từ Google Fonts
        'sans': ['Be Vietnam Pro', 'sans-serif'],

      }
    },
  },
  plugins: [],
}