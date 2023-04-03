import { UserConfig } from "vite";

export function makeOffline() {

  return {
    name: 'iife' as const,
    apply: 'build' as const,
    enforce: 'post' as const,

    config: (config: UserConfig) => {
      config.base = "./"
      config.build = {
        rollupOptions: {
          output: {
            format: "iife"
          }
        }
      }
    },

    transformIndexHtml(html: string) {
      return html.replace(' type="module" crossorigin ', ' defer ');
    },
  }
}
