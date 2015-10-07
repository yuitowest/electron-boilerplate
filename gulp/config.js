const config = {
  srcDir: 'src',
  tmpDir: '.tmp',
  tmpDistDir: '.tmp/dist',
  relDir: 'rel',
  distDir: 'dist',
  babelOptions: {
    stage: 0,
    optional: ["utility.inlineEnvironmentVariables"]
  }
}

module.exports = config
