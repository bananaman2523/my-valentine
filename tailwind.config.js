/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["valentine"], // บังคับใช้ธีมวาเลนไทน์ สีชมพูน่ารักทันที
  },
}