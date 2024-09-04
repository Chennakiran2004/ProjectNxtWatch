// const codeCoverage = require('@cypress/code-coverage/task');
// module.exports = (on, config) => {
//   codeCoverage(on, config);
//   return config;
// };

const { config } = require("cypress/types/bluebird");


module.exports = (on: any, config: any) => {
  on('task', require('@cypress/code-coverage/task'))
}