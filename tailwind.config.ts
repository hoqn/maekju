import type { Config } from 'tailwindcss'
import { generateColorVars } from './scripts/generate-color-vars'

import pluginTypography from "@tailwindcss/typography";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        current: "currentColor",
        inherit: "inherit",
        primary: generateColorVars("el-salva"),
        base: generateColorVars("emperor"),
      }
    },
  },
  plugins: [
    pluginTypography,
  ],
}
export default config
