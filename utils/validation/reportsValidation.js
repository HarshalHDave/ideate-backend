/**
 * reportsValidation.js
 * @description :: validate each post and put request as per reports model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of reports */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  lat: joi.string().allow(null).allow(''),
  long: joi.string().allow(null).allow(''),
  img: joi.string().allow(null).allow(''),
  text: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  pocnum: joi.string().allow(null).allow(''),
  pocname: joi.string().allow(null).allow(''),
  hash: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of reports for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  lat: joi.string().allow(null).allow(''),
  long: joi.string().allow(null).allow(''),
  img: joi.string().allow(null).allow(''),
  text: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  pocnum: joi.string().allow(null).allow(''),
  pocname: joi.string().allow(null).allow(''),
  hash: joi.string().allow(null).allow(''),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of reports for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      lat: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      long: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      text: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      pocnum: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      pocname: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      hash: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
