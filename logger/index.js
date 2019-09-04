class Logger {
  constructor() {
    const envProviders = {
      testing: [console],
      development: [console],
      production: [],
    };
    this._allowDebug = process.env.NODE_ENV === 'development';
    this.providers = envProviders[process.env.NODE_ENV || 'development'] || [];
  }

  _eachProvider(fn, ...args) {
    for (const provider of this.providers) {
      provider[fn](...args);
    }
  }

  log(...args) {
    this._eachProvider('log', ...args);
  }

  debug(...args) {
    if (this._allowDebug) {
      this._eachProvider('log', ...args);
    }
  }

  error(...args) {
    this._eachProvider('error', ...args);
  }
}

module.exports = new Logger();
