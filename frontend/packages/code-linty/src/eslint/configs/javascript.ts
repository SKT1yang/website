/**
 * JavaScript 基础 ESLint 配置
 * 包含 JavaScript 语言的基础规则和最佳实践
 */
import globals from 'globals'
import { pluginUnusedImports } from '../plugins'
import { isInEditor } from '../env'
import type { Linter } from 'eslint'

/**
 * 限制使用的 JavaScript 语法
 * 包含被认为不安全的语法结构
 */
export const restrictedSyntaxJs = [
  'ForInStatement', // 避免使用 for-in 循环
  'LabeledStatement', // 避免使用标签语句
  'WithStatement' // 避免使用 with 语句
]

/**
 * 生成 JavaScript 基础 ESLint 配置
 * @returns 返回 ESLint 配置数组
 */
export function javascript(): Linter.Config[] {
  return [
    {
      name: 'javascript', // 配置名称
      languageOptions: {
        // 全局变量配置
        globals: {
          ...globals.browser, // 浏览器环境全局变量
          ...globals.es2021, // ES2021 全局变量
          ...globals.node // Node.js 全局变量
        },
        // 解析器选项
        parserOptions: {
          ecmaFeatures: {
            jsx: true // 支持 JSX 语法
          },
          sourceType: 'module' // 使用 ES 模块
        },
        sourceType: 'module' // 使用 ES 模块
      },
      // 插件配置
      plugins: {
        'unused-imports': pluginUnusedImports // 未使用导入检查插件
      },
      rules: {
        /**
         * 数组回调函数必须返回
         * 确保数组方法（如 map、filter）的回调函数有返回值
         * 反例：[1, 2, 3].map(x => { x * 2 }) // 缺少 return
         * 正例：[1, 2, 3].map(x => x * 2)
         */
        'array-callback-return': 'error',
        
        /**
         * 强制使用块级作用域变量
         * 避免变量提升带来的潜在问题
         * 反例：if (true) var x = 1; console.log(x) // 变量提升
         * 正例：if (true) { let x = 1; console.log(x) }
         */
        'block-scoped-var': 'error',
        
        /**
         * 禁止在构造函数中使用 super() 之前使用 this
         * 确保类继承的正确初始化顺序
         * 反例：class A extends B { constructor() { this.x = 1; super() } }
         * 正例：class A extends B { constructor() { super(); this.x = 1 } }
         */
        'constructor-super': 'error',
        
        /**
         * 建议使用点号访问对象属性
         * 提高代码可读性，除非需要动态属性名
         * 反例：obj['property'] 
         * 正例：obj.property
         */
        'dot-notation': 'warn',
        
        /**
         * 强制使用 === 和 !==，但允许与 null 比较
         * 避免类型转换带来的意外行为
         * 反例：if (x == 1) {}
         * 正例：if (x === 1) {}
         */
        eqeqeq: ['error', 'smart'],
        
        /**
         * 禁止 for 循环方向错误
         * 防止无限循环
         * 反例：for (let i = 0; i < 10; i--) {}
         * 正例：for (let i = 0; i < 10; i++) {}
         */
        'for-direction': 'error',
        
        /**
         * getter 必须返回值
         * 确保 getter 方法的正确使用
         * 反例：get name() { console.log('called') }
         * 正例：get name() { return this._name }
         */
        'getter-return': 'error',
        
        /**
         * 建议避免使用 alert
         * 生产环境应使用更合适的日志系统
         * 反例：alert('message')
         * 正例：console.log('message')
         */
        'no-alert': 'warn',
        
        /**
         * 禁止使用异步的 Promise executor
         * 防止 Promise 构造函数中的异步操作导致意外行为
         * 反例：new Promise(async (resolve) => { await something(); resolve() })
         * 正例：new Promise((resolve) => { something().then(resolve) })
         */
        'no-async-promise-executor': 'error',
        
        /**
         * 禁止在 case 语句中声明变量
         * 避免变量声明提升导致的意外行为
         * 反例：switch (x) { case 1: let y = 2; break }
         * 正例：let y; switch (x) { case 1: y = 2; break }
         */
        'no-case-declarations': 'error',
        
        /**
         * 禁止修改类声明
         * 保持类的不可变性
         * 反例：class A {}; A = 1
         * 正例：class A {}; const a = new A()
         */
        'no-class-assign': 'error',
        
        /**
         * 禁止与 -0 比较
         * JavaScript 中 0 和 -0 表现不同
         * 反例：if (x === -0) {}
         * 正例：if (Object.is(x, -0)) {}
         */
        'no-compare-neg-zero': 'error',
        
        /**
         * 禁止条件表达式中出现赋值操作
         * 防止意外赋值
         * 反例：if (x = 1) {}
         * 正例：if (x === 1) {}
         */
        'no-cond-assign': 'error',
        
        /**
         * 禁止使用 console，但允许 warn 和 error
         * 生产环境应移除调试代码
         * 反例：console.log('message')
         * 正例：console.error('error message')
         */
        'no-console': ['error', { allow: ['warn', 'error'] }],
        
        /**
         * 禁止修改 const 声明的变量
         * 确保常量的不可变性
         * 反例：const x = 1; x = 2
         * 正例：const x = 1; let y = 2
         */
        'no-const-assign': 'error',
        
        /**
         * 禁止在条件中使用常量表达式
         * 防止无意义的条件判断
         * 反例：if (true) {}
         * 正例：if (x === 1) {}
         */
        'no-constant-condition': 'error',
        
        /**
         * 禁止在正则表达式中使用控制字符
         * 防止正则表达式中的意外行为
         * 反例：/\cX/
         * 正例：/\d/
         */
        'no-control-regex': 'error',
        
        /**
         * 建议避免使用 debugger
         * 生产环境应移除调试代码
         * 反例：debugger
         * 正例：console.log('debug info')
         */
        'no-debugger': 'warn',
        
        /**
         * 禁止删除变量
         * 防止意外的变量删除
         * 反例：const x = 1; delete x
         * 正例：const x = 1; x = null
         */
        'no-delete-var': 'error',
        
        /**
         * 禁止函数参数重复
         * 防止参数覆盖导致的意外行为
         * 反例：function foo(a, a) {}
         * 正例：function foo(a, b) {}
         */
        'no-dupe-args': 'error',
        
        /**
         * 禁止类成员重复
         * 防止类方法被意外覆盖
         * 反例：class A { foo() {} foo() {} }
         * 正例：class A { foo() {} bar() {} }
         */
        'no-dupe-class-members': 'error',
        
        /**
         * 禁止重复的 else-if 条件
         * 防止逻辑错误
         * 反例：if (x) {} else if (x) {}
         * 正例：if (x) {} else if (y) {}
         */
        'no-dupe-else-if': 'error',
        
        /**
         * 禁止对象字面量中重复的键
         * 防止属性覆盖
         * 反例：const obj = { a: 1, a: 2 }
         * 正例：const obj = { a: 1, b: 2 }
         */
        'no-dupe-keys': 'error',
        
        /**
         * 禁止重复的 case 标签
         * 防止 switch 语句中的逻辑错误
         * 反例：switch (x) { case 1: break; case 1: break }
         * 正例：switch (x) { case 1: break; case 2: break }
         */
        'no-duplicate-case': 'error',
        
        /**
         * 允许重复导入
         * 某些情况下需要重复导入
         * 反例：import x from 'x'; import x from 'x'
         * 正例：import x from 'x'; import y from 'y'
         */
        'no-duplicate-imports': 'off',
        
        /**
         * 禁止空语句块，但允许空的 catch 块
         * 防止无意义的代码块
         * 反例：if (x) {}
         * 正例：if (x) { doSomething() }
         */
        'no-empty': ['error', { allowEmptyCatch: true }],
        
        /**
         * 禁止在正则表达式中使用空字符类
         * 防止无效的正则表达式
         * 反例：/[]/
         * 正例：/[a-z]/
         */
        'no-empty-character-class': 'error',
        
        /**
         * 禁止空的对象模式
         * 防止无意义的解构赋值
         * 反例：const {} = obj
         * 正例：const { prop } = obj
         */
        'no-empty-pattern': 'error',
        
        /**
         * 禁止对异常重新赋值
         * 防止异常对象被意外修改
         * 反例：try {} catch (e) { e = 1 }
         * 正例：try {} catch (e) { console.log(e) }
         */
        'no-ex-assign': 'error',
        
        /**
         * 禁止不必要的布尔转换
         * 简化条件表达式
         * 反例：if (!!x) {}
         * 正例：if (x) {}
         */
        'no-extra-boolean-cast': 'error',
        
        /**
         * 禁止 case 语句穿透，除非有注释说明
         * 防止意外的 case 穿透
         * 反例：switch (x) { case 1: doSomething(); case 2: break }
         * 正例：switch (x) { case 1: doSomething(); break; case 2: break }
         */
        'no-fallthrough': ['warn', { commentPattern: String.raw`break[\s\w]*omitted` }],
        
        /**
         * 禁止对函数声明重新赋值
         * 防止函数被意外覆盖
         * 反例：function foo() {}; foo = 1
         * 正例：function foo() {}; const bar = foo
         */
        'no-func-assign': 'error',
        
        /**
         * 禁止对全局变量重新赋值
         * 防止全局命名空间污染
         * 反例：undefined = 1
         * 正例：const x = undefined
         */
        'no-global-assign': 'error',
        
        /**
         * 禁止对导入的模块重新赋值
         * 防止模块被意外修改
         * 反例：import x from 'x'; x = 1
         * 正例：import x from 'x'; const y = x
         */
        'no-import-assign': 'error',
        
        /**
         * 禁止在嵌套块中声明函数
         * 防止函数声明提升导致的意外行为
         * 反例：if (x) { function foo() {} }
         * 正例：function foo() {}; if (x) { foo() }
         */
        'no-inner-declarations': 'error',
        
        /**
         * 禁止无效的正则表达式
         * 防止正则表达式语法错误
         * 反例：new RegExp('[')
         * 正例：new RegExp('[a-z]')
         */
        'no-invalid-regexp': 'error',
        
        /**
         * 禁止不规则的空白符
         * 保持代码格式一致性
         * 反例：const x = 1\u2028
         * 正例：const x = 1
         */
        'no-irregular-whitespace': 'error',
        
        /**
         * 禁止不必要的嵌套 if 语句
         * 简化条件逻辑
         * 反例：if (x) { if (y) {} }
         * 正例：if (x && y) {}
         */
        'no-lonely-if': 'error',
        
        /**
         * 禁止精度丢失的数字
         * 防止数字精度问题
         * 反例：const x = 9007199254740993
         * 正例：const x = 9007199254740992
         */
        'no-loss-of-precision': 'error',
        
        /**
         * 禁止在正则表达式中使用可能产生歧义的字符类
         * 防止正则表达式匹配错误
         * 反例：/[a-z]/i
         * 正例：/[a-z]/
         */
        'no-misleading-character-class': 'error',
        
        /**
         * 禁止多行字符串
         * 建议使用模板字符串代替
         * 反例：const x = 'line1\
         * line2'
         * 正例：const x = `line1
         * line2`
         */
        'no-multi-str': 'error',
        
        /**
         * 禁止非八进制十进制转义序列
         * 防止转义序列混淆
         * 反例：'\8'
         * 正例：'\\8'
         */
        'no-nonoctal-decimal-escape': 'error',
        
        /**
         * 禁止将全局对象作为函数调用
         * 防止意外的全局对象调用
         * 反例：Math()
         * 正例：Math.random()
         */
        'no-obj-calls': 'error',
        
        /**
         * 禁止八进制字面量
         * 防止数字表示混淆
         * 反例：const x = 0123
         * 正例：const x = 0o123
         */
        'no-octal': 'error',
        
        /**
         * 禁止直接调用 Object.prototype 的方法
         * 防止对象原型方法被覆盖导致的意外行为
         * 反例：obj.hasOwnProperty('prop')
         * 正例：Object.prototype.hasOwnProperty.call(obj, 'prop')
         */
        'no-prototype-builtins': 'error',
        /**
         * 禁止重复声明变量
         * 防止变量被意外覆盖
         * 反例：let x = 1; let x = 2
         * 正例：let x = 1; let y = 2
         */
        'no-redeclare': 'error',
        
        /**
         * 禁止正则表达式中的多个空格
         * 保持正则表达式格式一致性
         * 反例：/a  b/
         * 正例：/a b/
         */
        'no-regex-spaces': 'error',
        
        /**
         * 禁止使用受限语法
         * 防止使用不安全的语法结构
         * 反例：for (x in obj) {}
         * 正例：for (const x of Object.keys(obj)) {}
         */
        'no-restricted-syntax': ['error', ...restrictedSyntaxJs],
        
        /**
         * 禁止自我赋值
         * 防止无意义的赋值操作
         * 反例：x = x
         * 正例：x = y
         */
        'no-self-assign': 'error',
        
        /**
         * setter 必须返回值
         * 确保 setter 方法的正确使用
         * 反例：set x(value) { this._x = value }
         * 正例：set x(value) { this._x = value; return }
         */
        'no-setter-return': 'error',
        
        /**
         * 禁止覆盖受限名称
         * 防止覆盖 JavaScript 保留字
         * 反例：const undefined = 1
         * 正例：const x = undefined
         */
        'no-shadow-restricted-names': 'error',
        
        /**
         * 禁止稀疏数组
         * 防止数组中的空元素
         * 反例：[1,,3]
         * 正例：[1,2,3]
         */
        'no-sparse-arrays': 'error',
        
        /**
         * 禁止在 super() 之前使用 this
         * 确保类继承的正确初始化顺序
         * 反例：class A extends B { constructor() { this.x = 1; super() } }
         * 正例：class A extends B { constructor() { super(); this.x = 1 } }
         */
        'no-this-before-super': 'error',
        
        /**
         * 禁止未声明的变量
         * 防止使用未定义的变量
         * 反例：console.log(x) // x 未定义
         * 正例：const x = 1; console.log(x)
         */
        'no-undef': 'error',
        
        /**
         * 禁止意外的多行表达式
         * 防止自动分号插入导致的意外行为
         * 反例：function foo() { return 
         *  1 }
         * 正例：function foo() { return 1 }
         */
        'no-unexpected-multiline': 'error',
        
        /**
         * 禁止不可达代码
         * 防止死代码
         * 反例：function foo() { return; console.log('unreachable') }
         * 正例：function foo() { return console.log('reachable') }
         */
        'no-unreachable': 'error',
        
        /**
         * 禁止在 finally 块中使用 return/throw
         * 防止异常处理逻辑被覆盖
         * 反例：try {} finally { return 1 }
         * 正例：try {} finally { console.log('cleanup') }
         */
        'no-unsafe-finally': 'error',
        
        /**
         * 禁止不安全的否定表达式
         * 防止逻辑错误
         * 反例：if (!x in y) {}
         * 正例：if (!(x in y)) {}
         */
        'no-unsafe-negation': 'error',
        
        /**
         * 禁止不安全的可选链操作
         * 防止可选链导致的意外行为
         * 反例：obj?.a?.b = 1
         * 正例：if (obj?.a?.b) { obj.a.b = 1 }
         */
        'no-unsafe-optional-chaining': 'error',
        /**
         * 禁止未使用的表达式
         * 防止无意义的表达式
         * 反例：1 + 1
         * 正例：const x = 1 + 1
         */
        'no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true, // 允许短路求值
            allowTaggedTemplates: true, // 允许标签模板
            allowTernary: true // 允许三元表达式
          }
        ],
        
        /**
         * 禁止未使用的标签
         * 防止无意义的标签声明
         * 反例：outer: while(true) { break }
         * 正例：while(true) { break }
         */
        'no-unused-labels': 'error',
        
        /**
         * 禁止未使用的变量
         * 防止声明未使用的变量
         * 反例：const x = 1
         * 正例：const x = 1; console.log(x)
         */
        'no-unused-vars': 'error',
        
        /**
         * 禁止无用的反向引用
         * 防止正则表达式中的无效反向引用
         * 反例：/(a)\2/
         * 正例：/(a)\1/
         */
        'no-useless-backreference': 'error',
        
        /**
         * 禁止无用的 catch 块
         * 防止空的 catch 块
         * 反例：try {} catch {}
         * 正例：try {} catch (e) { console.log(e) }
         */
        'no-useless-catch': 'error',
        
        /**
         * 禁止无用的转义字符
         * 防止不必要的转义
         * 反例：const x = '\a'
         * 正例：const x = 'a'
         */
        'no-useless-escape': 'error',
        
        /**
         * 禁止 void 操作符
         * 防止使用 void 操作符
         * 反例：void 0
         * 正例：undefined
         */
        'no-void': 'error',
        
        /**
         * 禁止 with 语句
         * 防止使用 with 语句
         * 反例：with (obj) { x = 1 }
         * 正例：const x = obj.x
         */
        'no-with': 'error',
        /**
         * 强制使用对象简写语法
         * 提高代码简洁性和可读性
         * 反例：const obj = { foo: function() {} }
         * 正例：const obj = { foo() {} }
         */
        'object-shorthand': ['error', 'always', { 
          avoidQuotes: true, // 避免不必要的引号
          ignoreConstructors: false // 不忽略构造函数
        }],
        
        /**
         * 建议使用箭头函数作为回调
         * 简化回调函数语法，自动绑定 this
         * 反例：setTimeout(function() {}, 100)
         * 正例：setTimeout(() => {}, 100)
         */
        'prefer-arrow-callback': ['error', { 
          allowNamedFunctions: false, // 不允许命名函数
          allowUnboundThis: true // 允许未绑定的 this
        }],
        
        /**
         * 建议使用 const 声明不会重新赋值的变量
         * 提高代码可维护性和可预测性
         * 反例：let x = 1; x = 2
         * 正例：const x = 1
         */
        'prefer-const': ['warn', { 
          destructuring: 'all', // 对所有解构赋值进行检查
          ignoreReadBeforeAssign: true // 忽略先读后赋的情况
        }],
        
        /**
         * 建议使用 ** 操作符代替 Math.pow()
         * 使用更简洁的语法进行幂运算
         * 反例：Math.pow(2, 3)
         * 正例：2 ** 3
         */
        'prefer-exponentiation-operator': 'error',
        
        /**
         * 建议使用正则表达式字面量
         * 提高正则表达式的可读性
         * 反例：new RegExp('\\d+')
         * 正例：/\d+/
         */
        'prefer-regex-literals': ['error', { 
          disallowRedundantWrapping: true // 禁止不必要的包装
        }],
        
        /**
         * 建议使用 rest 参数代替 arguments
         * 使用更现代的语法处理函数参数
         * 反例：function sum() { return Array.from(arguments).reduce((a, b) => a + b) }
         * 正例：function sum(...args) { return args.reduce((a, b) => a + b) }
         */
        'prefer-rest-params': 'error',
        
        /**
         * 建议使用扩展运算符代替 apply()
         * 使用更简洁的语法展开数组
         * 反例：Math.max.apply(null, [1, 2, 3])
         * 正例：Math.max(...[1, 2, 3])
         */
        'prefer-spread': 'error',
        
        /**
         * 建议使用模板字符串代替字符串拼接
         * 提高字符串拼接的可读性和可维护性
         * 反例：'Hello ' + name + '!'
         * 正例：`Hello ${name}!`
         */
        'prefer-template': 'error',
        
        /**
         * 禁止没有 await 的 async 函数
         * 防止不必要的异步函数声明
         * 反例：async function foo() { return 1 }
         * 正例：async function foo() { await someAsync() }
         */
        'require-await': 'error',
        
        /**
         * 禁止没有 yield 的 generator 函数
         * 防止不必要的 generator 函数声明
         * 反例：function* foo() { return 1 }
         * 正例：function* foo() { yield 1 }
         */
        'require-yield': 'error',
        /**
         * 强制 import 语句排序
         * 保持导入语句的整洁和一致性
         * 反例：import b from 'b'; import a from 'a'
         * 正例：import a from 'a'; import b from 'b'
         */
        'sort-imports': [
          'error',
          {
            allowSeparatedGroups: false, // 不允许分组
            ignoreCase: false, // 区分大小写
            ignoreDeclarationSort: true, // 忽略声明排序
            ignoreMemberSort: false, // 强制成员排序
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'] // 排序顺序
          }
        ],
        
        /**
         * 禁止 Unicode BOM
         * 防止文件编码问题
         * 反例：\uFEFFconst x = 1
         * 正例：const x = 1
         */
        'unicode-bom': ['error', 'never'],
        
        /**
         * 禁止未使用的导入
         * 防止导入未使用的模块
         * 反例：import x from 'x' // x 未使用
         * 正例：import x from 'x'; console.log(x)
         */
        'unused-imports/no-unused-imports': isInEditor ? 'off' : 'error',
        
        /**
         * 强制使用 isNaN() 检查 NaN
         * 正确判断 NaN 值
         * 反例：if (x === NaN) {}
         * 正例：if (isNaN(x)) {}
         */
        'use-isnan': ['error', { 
          enforceForIndexOf: true, // 强制在 indexOf 中使用
          enforceForSwitchCase: true // 强制在 switch case 中使用
        }],
        
        /**
         * 强制 typeof 表达式与有效字符串进行比较
         * 防止 typeof 操作符的误用
         * 反例：typeof x === 'strnig'
         * 正例：typeof x === 'string'
         */
        'valid-typeof': ['error', { 
          requireStringLiterals: true // 要求使用字符串字面量
        }],
        
        /**
         * 强制变量声明放在作用域顶部
         * 提高代码可读性和可维护性
         * 反例：function foo() { console.log(x); var x = 1 }
         * 正例：function foo() { var x = 1; console.log(x) }
         */
        'vars-on-top': 'error'
      }
    },
        /**
         * 针对脚本文件的特殊配置
         * 允许在脚本中使用 console
         */
        {
          files: ['**/scripts/*', '**/cli.*'], // 匹配脚本文件
          rules: {
            'no-console': 'off' // 允许在脚本中使用 console
          }
        },
        /**
         * 针对测试文件和语言文件的特殊配置
         * 允许在测试和语言文件中使用未使用的表达式
         */
        {
          files: ['**/*.{test,spec}.js?(x)', '**/{useLanguage}.js?(x)', '**/{useLanguage}.ts?(x)'], // 匹配测试文件和语言文件
          rules: {
            'no-unused-expressions': 'off' // 允许未使用的表达式
          }
        }
  ]
}
