/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                custom: '0px 0px 10px 0px rgba(0, 0, 0, 0.00), 0px 0px 9px 0px rgba(0, 0, 0, 0.01), 0px 0px 8px 0px rgba(0, 0, 0, 0.03), 0px 0px 6px 0px rgba(0, 0, 0, 0.04), 0px 0px 3px 0px rgba(0, 0, 0, 0.05), 0px 0px 0px 0px rgba(0, 0, 0, 0.05)',
            },
        },
    },
    plugins: [],
};
