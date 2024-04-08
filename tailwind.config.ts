import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/flowbite-react/lib/esm/**/*.js',
    ],
    theme: {
        extend: {
            screens: {
                pointerhover: {
                    raw: '(hover: hover) and (pointer: fine)',
                },
            },
            keyframes: {
                likeIconKF: {
                    '0%': {
                        transform: 'scale(0)',
                    },

                    '50%': {
                        transform: 'scale(1.2)',
                    },

                    '100%': {
                        transform: 'scale(1)',
                    },
                },
                slideUpKF: {
                    from: {
                        transform: 'translateY(-50%)',
                    },
                    to: {
                        transform: 'translateY(50%)',
                    },
                },
                slideDownKF: {
                    from: {
                        transform: 'translateY(50%)',
                    },
                    to: {
                        transform: 'translateY(-50%)',
                    },
                },
                blinkBorderKF: {
                    '0%': {
                        maxHeight: '0',
                        boxShadow: '0 0 0 0 #3F83F8',
                        opacity: '0',
                    },
                    '50%': {
                        maxHeight: '100rem',
                        boxShadow: '0 0 0 3px #3F83F8',
                    },
                    '100%': {
                        boxShadow: '0 0 0 3px transparent',
                        opacity: '1',
                    },
                },
            },
            animation: {
                likeIcon: 'likeIconKF 400ms ease',
                slideUp: 'slideUpKF 400ms ease forwards',
                slideDown: 'slideDownKF 400ms ease forwards',
                blinkBorder: 'blinkBorderKF 1200ms ease-in-out forwards',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
export default config;
