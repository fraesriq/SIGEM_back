function info(message, metadata) {
  console.info(JSON.stringify({
    level: 'info',
    message,
    ...(metadata ? { metadata } : {}),
    timestamp: new Date().toISOString()
  }));
}

function error(message, metadata) {
  console.error(JSON.stringify({
    level: 'error',
    message,
    ...(metadata ? { metadata } : {}),
    timestamp: new Date().toISOString()
  }));
}

module.exports = { info, error };
