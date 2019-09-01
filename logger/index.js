module.exports = class Logger {
  constructor(provider) {
    this.provider = provider;
  }

  log(...args) {
    this.provider.log(...args);
  }

  error(...args) {
    this.provider.error(...args);
  }
};
