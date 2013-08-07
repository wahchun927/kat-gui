basePath = '../';

files = [
  //ANGULAR_SCENARIO,
  //ANGULAR_SCENARIO_ADAPTER,
  'test/lib/angular/*.js',
  'test/e2e/**/*.js'
];

frameworks = ["requirejs"];
//frameworks = ["ng-scenario"];

autoWatch = false;

browsers = ['Chrome'];

singleRun = true;

proxies = {
  '/': 'http://localhost:8000/'
};

junitReporter = {
  outputFile: 'test_out/e2e.xml',
  suite: 'e2e'
};
