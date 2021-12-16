const config = require('./config');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const path = require('path');
const fs = require('fs');
const babel = require('@babel/core');

// console.log('config',config);

// 解析模块信息
function getModuleInfo(filename) {
  // console.log('filename',filename);
  try {
    // 读文件
    const entryStr = fs.readFileSync(filename, 'utf-8');

    // 生成 ast
    const ast = parser.parse(entryStr, {
      sourceType: 'module' //表示我们要解析的是ES模块
    });

    // 收集依赖
    const deps = {};
    traverse.default(ast, {
      ImportDeclaration({ node }) { // 对type类型为ImportDeclaration的节点的处理   
        const url = node.source.value;
        // 相对路径
        deps[url] = url;
      }
    });

    // 转成 es5
    const { code } = babel.transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
    })

    const newCode = `function(require,module,exports){${code}}`;

    return {
      filename,
      // ast,
      deps,
      code: newCode,
    }

  } catch (e) {
    console.error('error', e.message);
    return {};
  }
};


// const obj = getModuleInfo(config.entry);


// 解析文件入口
function parseModules(file) {

  // 获取入口文件
  const entry = getModuleInfo(file);

  const temp = [entry];

  // 处理依赖
  const { deps } = entry;

  for (let i in deps) {
    // 处理以来的内容
    temp.push(getModuleInfo(deps[i]));
  }


  // console.log(temp);

  let modules = {};

  for (let item of temp) {
    modules[item.filename] = item.code;
  }

  // console.log('modules', modules);

  let newModules = `{`;

  Object.keys(modules).forEach(key => {
    // 记得引号，逗号
    newModules += `'${key}': ${modules[key]},\n`
  })

  newModules += `}`;


  // console.log(newModules)

  // 自执行函数
  const bundle = `(function(modules){

    var installedModules = {};

    function require(filename){
      // 方便起见，输出一下 filename
      console.log(filename);

      if(installedModules[filename]) {           
        return installedModules[filename].exports;   
      };

      var fn = modules[filename];
      var module = installedModules[filename] = {   	
        exports: {}                                
      };
      fn(require, module, module.exports);
      
      console.log(filename,module.exports);
      return module.exports;
    };

    // 执行入口文件
    require('${file}');

  })(${newModules})`;

  // console.log(bundle);

  console.log(bundle);

  // eval(bundle);

}

parseModules(config.entry);