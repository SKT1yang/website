// 各个参数代表的意思:
 
// printWidth：每行代码的最大长度限制。
// tabWidth：选项用于控制制表符的宽度。
// useTabs：指定是否使用制表符代替空格。
// semi：指定是否在语句的末尾添加分号。
// singleQuote：指定是否使用单引号或双引号来定义字符串。
// quoteProps：指定对象字面量的键是否需要引号。设置为 "as-needed" 表示只有在必要时才添加引号。
// jsxSingleQuote：指定在JSX中是否使用单引号或双引号来定义字符串。
// trailingComma：指定在多行数组或对象字面量中是否添加尾随逗号。
// bracketSpacing：指定是否在对象字面量中的大括号前后添加空格。
// bracketSameLine：指定大括号是否与声明在同一行。
// arrowParens：指定箭头函数的参数是否添加括号。
// proseWrap：指定是否在Markdown文件中启用折行。
// htmlWhitespaceSensitivity：指定HTML文件中空格处理的敏感度。
// vueIndentScriptAndStyle：指定Vue文件中的脚本和样式标签是否缩进。
// endOfLine：指定文件行尾的换行符类型。
// embeddedLanguageFormatting：指定在嵌入语言（如HTML或JSX）中的代码格式化方式。
// singleAttributePerLine：指定在HTML或JSX属性中是否每行只放置一个属性。
// 这些选项可以根据个人喜好和团队规范进行调整和配置。

export default {
  // jsx也使用单引号
  jsxSingleQuote: true,
  // 'crlf' for all Windows developer
  endOfLine: 'crlf',
  // 单行长度
  printWidth: 100,
  // 单行超出指定宽度是否换行
  proseWrap: 'never',
  // 句末使用分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象或数组末尾不加逗号
  trailingComma: 'none',
  // 缩进字节（2 空格代替 tab, 主流）
  tabWidth: 2,
  // 使用空格代替tab缩进
  useTabs: false,
  plugins: ['prettier-plugin-packagejson'],
  overrides: [
    {
      files: '.*rc',
      options: {
        parser: 'json',
      },
    },
  ],
};
