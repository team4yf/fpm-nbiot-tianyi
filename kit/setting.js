const HOST = '180.101.147.89',
      PORT = 8743,
      ID = 'XdbNkfbFSRYPJhs4H2EJ4G12w6Aa',
      SECRET = 'N5fUGGNl9aJIDapXNVkI3SVIfCYa';

const URL_PERFIX = `https://${HOST}:${PORT}/iocm/app`;

module.exports = {
  host: HOST,
  port: PORT,
  appId: ID,
  secret: SECRET,
  secBaseUrl: `${URL_PERFIX}/sec/v1.1.0/`,
  cmdBaseUrl: `${URL_PERFIX}/cmd/v1.4.0/`,
  subBaseUrl: `${URL_PERFIX}/sub/v1.2.0/`,
  cmdDeviceUrl: `${URL_PERFIX}/reg/v1.1.0/`,

}