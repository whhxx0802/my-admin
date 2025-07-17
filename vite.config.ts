import { type ConfigEnv, loadEnv, defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import UnoCSS from 'unocss/vite'

import { resolve } from "path";

const pathSrc = resolve(__dirname, "src");
// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());
  const isProduction = mode === "production";

  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        eslintrc: {
          enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false 
          filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
        },
        dts: resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({}),
        ],
        vueTemplate: true, // 是否在 vue 模板中自动导入
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"] // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          }),
        ],
        //dirs: ['src/views'], // 设置自动导入的目录，默认是components
        dts: resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
      // svg整合
      createSvgIconsPlugin({
          // 指定需要缓存的图标文件夹
          iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
          // 指定symbolId格式
          symbolId: 'icon-[dir]-[name]',
        }),
      // unocss整合
      UnoCSS({ /* options */ }),
    ],
    // 预加载项目必需的组件
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "element-plus",
        "pinia",
        "axios",
        "@vueuse/core",
        "codemirror-editor-vue3",
        "default-passive-events",
        "exceljs",
        "path-to-regexp",
        "echarts/core",
        "echarts/renderers",
        "echarts/charts",
        "echarts/components",
        "vue-i18n",
        "nprogress",
        "sortablejs",
        "qs",
        "path-browserify",
        "@stomp/stompjs",
        "@element-plus/icons-vue",
        "element-plus/es",
        "element-plus/es/locale/lang/en",
        "element-plus/es/locale/lang/zh-cn",
        "element-plus/es/components/alert/style/index",
        "element-plus/es/components/avatar/style/index",
        "element-plus/es/components/backtop/style/index",
        "element-plus/es/components/badge/style/index",
        "element-plus/es/components/base/style/index",
        "element-plus/es/components/breadcrumb-item/style/index",
        "element-plus/es/components/breadcrumb/style/index",
        "element-plus/es/components/button/style/index",
        "element-plus/es/components/card/style/index",
        "element-plus/es/components/cascader/style/index",
        "element-plus/es/components/checkbox-group/style/index",
        "element-plus/es/components/checkbox/style/index",
        "element-plus/es/components/col/style/index",
        "element-plus/es/components/color-picker/style/index",
        "element-plus/es/components/config-provider/style/index",
        "element-plus/es/components/date-picker/style/index",
        "element-plus/es/components/descriptions-item/style/index",
        "element-plus/es/components/descriptions/style/index",
        "element-plus/es/components/dialog/style/index",
        "element-plus/es/components/divider/style/index",
        "element-plus/es/components/drawer/style/index",
        "element-plus/es/components/dropdown-item/style/index",
        "element-plus/es/components/dropdown-menu/style/index",
        "element-plus/es/components/dropdown/style/index",
        "element-plus/es/components/empty/style/index",
        "element-plus/es/components/form-item/style/index",
        "element-plus/es/components/form/style/index",
        "element-plus/es/components/icon/style/index",
        "element-plus/es/components/image-viewer/style/index",
        "element-plus/es/components/image/style/index",
        "element-plus/es/components/input-number/style/index",
        "element-plus/es/components/input-tag/style/index",
        "element-plus/es/components/input/style/index",
        "element-plus/es/components/link/style/index",
        "element-plus/es/components/loading/style/index",
        "element-plus/es/components/menu-item/style/index",
        "element-plus/es/components/menu/style/index",
        "element-plus/es/components/message-box/style/index",
        "element-plus/es/components/message/style/index",
        "element-plus/es/components/notification/style/index",
        "element-plus/es/components/option/style/index",
        "element-plus/es/components/pagination/style/index",
        "element-plus/es/components/popover/style/index",
        "element-plus/es/components/progress/style/index",
        "element-plus/es/components/radio-button/style/index",
        "element-plus/es/components/radio-group/style/index",
        "element-plus/es/components/radio/style/index",
        "element-plus/es/components/row/style/index",
        "element-plus/es/components/scrollbar/style/index",
        "element-plus/es/components/select/style/index",
        "element-plus/es/components/skeleton-item/style/index",
        "element-plus/es/components/skeleton/style/index",
        "element-plus/es/components/step/style/index",
        "element-plus/es/components/steps/style/index",
        "element-plus/es/components/sub-menu/style/index",
        "element-plus/es/components/switch/style/index",
        "element-plus/es/components/tab-pane/style/index",
        "element-plus/es/components/table-column/style/index",
        "element-plus/es/components/table/style/index",
        "element-plus/es/components/tabs/style/index",
        "element-plus/es/components/tag/style/index",
        "element-plus/es/components/text/style/index",
        "element-plus/es/components/time-picker/style/index",
        "element-plus/es/components/time-select/style/index",
        "element-plus/es/components/timeline-item/style/index",
        "element-plus/es/components/timeline/style/index",
        "element-plus/es/components/tooltip/style/index",
        "element-plus/es/components/tree-select/style/index",
        "element-plus/es/components/tree/style/index",
        "element-plus/es/components/upload/style/index",
        "element-plus/es/components/watermark/style/index",
      ],
    },
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        //define global scss variable
        scss: {
            additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: +env.VITE_APP_PORT,
      open: true,
      proxy: {
        // 代理 /dev-api 的请求
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 代理目标地址：https://api.youlai.tech
          target: env.VITE_APP_API_URL,
          rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
  }
})
