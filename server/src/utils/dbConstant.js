'use strict';

const envConf = require('../../config/env/envConf');

module.exports = {
  DEFAULT_ENTITY_PER_PAGE: 10,
  kind: {
    COMPANY: 'Company',
    PROFILE: 'Profile',
    TAXTYPE: 'TaxType'
  },
  NAMESPACE: 'Transaction',
  RETRIEVE: 'retrieve',
  CREATE: 'create',
  UPDATE: 'update'
};