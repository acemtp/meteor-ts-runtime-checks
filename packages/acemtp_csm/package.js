Package.describe({
  name: 'acemtp:csm',
  summary: 'Organize files in module structure',
  version: '1.0.3',
  git: 'https://github.com/acemtp/meteor-csm.git'
});

Npm.depends({
  'ts-runtime-checks': '0.6.1',
});

Package.registerBuildPlugin({
  name: 'csmFilters',
  use: ['babel-compiler', 'react-fast-refresh'],
  sources: ['csm.js'],
  npmDependencies: {
    'ts-runtime-checks': '0.6.1',
  },
});

Package.onUse(api => {
  api.versionsFrom(['3.0']);
  api.use(['isobuild:compiler-plugin@1.0.0', 'babel-compiler', 'react-fast-refresh']);
});
