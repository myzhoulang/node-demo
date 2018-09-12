const log4js = require('log4js');

log4js.configure({
  // 定义日志输出类型 可以写日志到本地 邮件发送 发送远程
  appenders: {
    cheese: {
      type: 'dateFile',
      filename: './logs/myLog.log',
      // 配置 layout，此处使用自定义模式 pattern
      layout: {
        type: "pattern",
        // 配置模式，下面会有介绍
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
      },
      alwaysIncludePattern: true
    },
    debug: { type: 'stdout'}
  },

  // 定义分类 便于getLogger 生成的logger 使用
  categories: {
    default: {appenders: ['debug'], level: 'debug'},
    err: { appenders: ['cheese'], level: 'error'}
  }
})

const logger = log4js.getLogger('err');

logger.debug('debug');
logger.info('info');
logger.error('error');
logger.fatal('fatal');
logger.trace('trace');
logger.warn('warn')