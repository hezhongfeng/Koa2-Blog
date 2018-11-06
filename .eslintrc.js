module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
    parser: 'babel-eslint'
  },
  env: {
    browser: false
  },
  'extends': [
    'standard'
  ],
  plugins: ['vue'],
  rules: {
    // always使用分号，增加代码的可读性和歧义
    semi: ['error', 'always'],
    // 使用let或者const代替
    'no-var': 'error',
    // 去除函数括号前的空格缩进
    'space-before-function-paren': 0,
    // 箭头函数只有一个参数的情况下可以省略括号
    'arrow-parens': ['error', 'as-needed'],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
