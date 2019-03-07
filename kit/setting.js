const HOST = '180.101.147.89',
      PORT = 8743,
      ID = 'XdbNkfbFSRYPJhs4H2EJ4G12w6Aa',
      SECRET = 'N5fUGGNl9aJIDapXNVkI3SVIfCYa';

module.exports = {
  host: HOST,
  port: PORT,
  appId: ID,
  secret: SECRET,
  secBaseUrl: `https://${HOST}:${PORT}/iocm/app/sec/v1.1.0/`,
  cmdBaseUrl: `https://${HOST}:${PORT}/iocm/app/cmd/v1.4.0/`,

}