import buildCmd from "./cmd";

const isExecutedAsScript = require.main === module;
if (isExecutedAsScript) {
  const cmd = buildCmd();

  cmd.parse(process.argv);
}