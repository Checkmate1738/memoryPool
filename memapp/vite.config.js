import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfig from "vite-jsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsconfig()],
  server: {
    host: "172.31.169.68", //"localhost",//"192.168.100.56",
    port: 1738,
  },
});
