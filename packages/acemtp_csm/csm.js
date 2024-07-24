// // *.js
// Plugin.registerSourceHandler('c.js', { archMatching: 'os' }, function () {});
// Plugin.registerSourceHandler('s.js', { archMatching: 'web' }, function () {});
// Plugin.registerSourceHandler('client.js', { archMatching: 'os' }, function () {});
// Plugin.registerSourceHandler('server.js', { archMatching: 'web' }, function () {});

// // *.coffee
// Plugin.registerSourceHandler('c.coffee', { archMatching: 'os' }, function () {});
// Plugin.registerSourceHandler('s.coffee', { archMatching: 'web' }, function () {});
// Plugin.registerSourceHandler('client.coffee', { archMatching: 'os' }, function () {});
// Plugin.registerSourceHandler('server.coffee', { archMatching: 'web' }, function () {});

/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */

// const TsRuntimeChecks = require("ts-runtime-checks").default;

// options: {
//     getCustomTransformers: program => {
//         before: [TsRuntimeChecks(program)];
//     };
// }

Plugin.registerCompiler({
    extensions: ["ts", "tsx"],
  }, function () {
    return new TypeScriptCompiler({
      react: true,
      typescript: true,
    }, (babelOptions, file) => {
      if (file.hmrAvailable()) {
        babelOptions.plugins = babelOptions.plugins || [];
        babelOptions.plugins.push(...ReactFastRefresh.getBabelPluginConfig());
      }
    });
  });
  
  class TypeScriptCompiler extends BabelCompiler {
    processFilesForTarget(inputFiles) {
      // console.log(inputFiles[0]);

      for (const inputFile of inputFiles) {
        let content = inputFile.getContentsAsString();
        // console.log(content);

        // content += 'console.log("Hello from TypeScript!");';

        // content = 'console.log("Hello from TypeScript!");';

        inputFile._resourceSlot.inputResource._data = Buffer.from(content, 'utf8');
        // console.log('AF', inputFile.getContentsAsString());
      }
      
      super.processFilesForTarget(inputFiles.filter(
        // TypeScript .d.ts declaration files look like .ts files, but it's
        // important that we do not compile them using the TypeScript
        // compiler, as it will fail with a cryptic error message.
        file => ! file.getPathInPackage().endsWith(".d.ts")
      ));

      for (const inputFile of inputFiles) {
        // console.log('BF', inputFile._resourceSlot.jsOutputResources);
      }
    }
  }





// inspired by https://github.com/meteor/meteor/blob/6872d21d4e0d221b7157057f003e470af96a0dc3/packages/typescript/plugin.js#L15

class CompileServerOnly extends BabelCompiler {
    processFilesForTarget(inputFiles) {
      return super.processFilesForTarget(inputFiles.filter(
        file => file.getArch().substr(0, 3) === 'os.',
      ));
    }
  }
  
  Plugin.registerCompiler({
    extensions: ['server.js'],
  }, () => new CompileServerOnly({
    react: true,
  }, (babelOptions, file) => {
    if (file.hmrAvailable()) {
      babelOptions.plugins = babelOptions.plugins || [];
      // eslint-disable-next-line no-undef
      babelOptions.plugins.push(...ReactFastRefresh.getBabelPluginConfig());
    }
  }));
  
  
  class CompileClientOnly extends BabelCompiler {
    processFilesForTarget(inputFiles) {
      return super.processFilesForTarget(inputFiles.filter(
        file => file.getArch().substr(0, 4) === 'web.',
      ));
    }
  }
  
  Plugin.registerCompiler({
    extensions: ['client.js', 'client.jsx'],
  }, () => new CompileClientOnly({
    react: true,
  }, (babelOptions, file) => {
    if (file.hmrAvailable()) {
      babelOptions.plugins = babelOptions.plugins || [];
      // eslint-disable-next-line no-undef
      babelOptions.plugins.push(...ReactFastRefresh.getBabelPluginConfig());
    }
  }));
  