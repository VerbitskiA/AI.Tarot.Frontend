import { type Config } from "prettier"

const config: Config = {
  trailingComma: "none",
  singleQuote: false,
  semi: false,
  tabWidth: 4,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/global.css",
}

export default config
