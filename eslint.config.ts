import fs from "node:fs";
let autoImportGlobals = {};
try {
  autoImportGlobals =
    JSON.parse(fs.readFileSync("./.eslintrc-auto-import.json", "utf-8")).globals || {};
} catch (error) {
  // 文件不存在或解析错误时使用空对象
  console.warn("Could not load auto-import globals", error);
}
export default [
    // 忽略文件配置
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/*.min.*",
      "**/auto-imports.d.ts",
      "**/components.d.ts",
    ],
  },
    // 全局配置
  {
    ...autoImportGlobals, // 自动导入的 API 函数
  },
]