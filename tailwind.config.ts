import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				heading: 'var(--font-heading)',
				body: 'var(--font-body)',
				inter: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				'royal-purple': {
					DEFAULT: 'hsl(var(--royal-purple))',
					light: 'hsl(var(--royal-purple-light))',
					dark: 'hsl(var(--royal-purple-dark))',
				},
				'fresh-teal': {
					DEFAULT: 'hsl(var(--fresh-teal))',
					light: 'hsl(var(--fresh-teal-light))',
					dark: 'hsl(var(--fresh-teal-dark))',
				},
				grey: {
					50: 'hsl(var(--grey-50))',
					100: 'hsl(var(--grey-100))',
					200: 'hsl(var(--grey-200))',
					300: 'hsl(var(--grey-300))',
					400: 'hsl(var(--grey-400))',
					500: 'hsl(var(--grey-500))',
					600: 'hsl(var(--grey-600))',
					700: 'hsl(var(--grey-700))',
					800: 'hsl(var(--grey-800))',
					900: 'hsl(var(--grey-900))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'subtle': 'var(--shadow-subtle)',
				'medium': 'var(--shadow-medium)',
				'large': 'var(--shadow-large)',
				'purple': 'var(--shadow-purple)',
				'teal': 'var(--shadow-teal)',
			},
			backgroundImage: {
				'hero-gradient': 'var(--gradient-hero)',
				'accent-gradient': 'var(--gradient-accent)',
				'subtle-gradient': 'var(--gradient-subtle)',
			},
			keyframes: {
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'hover-lift': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-4px)' }
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'scale-in': 'scale-in 0.4s ease-out forwards',
				'hover-lift': 'hover-lift 0.3s ease-out forwards',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;