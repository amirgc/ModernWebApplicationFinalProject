"use strict";

const Promise = require("bluebird");
const DbConstant = require("../utils/dbConstant");

/**
 * Create a new Entity
 * @param Model {Model}
 *  eg:
 *    {
 *      key: 'value'
 *    }
 * @return {Promise}
 *  resolve{Entity}
 *  reject{Error}
 */
function create(Model) {
  return new Promise((resolve, reject) => {
    Model.save(function(err, user) {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
}

/**
 * Provides the filter query
 * @param Kind {Model}, not a string
 *  eg: Company
 * @param queryParams{Object},
 *  eg:
 *    {
 *      limit: 10
 *      offset: 10,
 *      active: true,
 *      email: 'me@email.com'
 *    }
 * @param filterableProperties{Array}, properties that can be filtered for the provided Model
 *  eg: ['active', 'email', 'name']
 * @param ancestors{Array}
 *  eg: ['AncestorKind', AncestorKey]
 * @return {Promise}
 *  resolve{Entity[]}
 *  reject{Error}
 */
function list(Kind, queryParams, filterableProperties) {
  return new Promise((resolve, reject) => {
    let query = Kind.query(DbConstant.NAMESPACE)
      .limit(parseInt(queryParams.limit) || DbConstant.DEFAULT_ENTITY_PER_PAGE)
      .offset(parseInt(queryParams.offset) || 0);
  });
}

/**
 * remove entity
 * @param Model {Model}
 * @param id {Integer}
 *  eg: ['AncestorKind', AncestorKey]
 * @return {Promise}
 *  resolve{Entity}
 *  reject{Error}
 */
function remove(Model, id) {
  return new Promise((resolve, reject) => {
    Model.delete(id, ancestors, DbConstant.NAMESPACE)
      .then(response => {
        if (!response.success) {
          throw new Error(
            "No entity deleted. There is not Entity with the id provided"
          );
        }
        resolve({
          message: "Record deleted successfully."
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * Get a new Entity by Id
 * @param Model {Model}
 * @param id {Integer}
 * @return {Promise}
 *  resolve{Entity}
 *  reject{Error}
 */
function retrieve(Model, id) {
  return Model.get(id).then(
    retrievedEntity => {
      return parseSingleEntity(retrievedEntity);
    }
  );
}

/**
 * Update the entity parameter of the provide entity id
 * @param Model {GStore Model}
 * @param id {Integer}
 * @param data {Object}
 *  eg:
 *    {
 *      key: value
 *    }
 * @param ancestors {Array}
 *  eg: ['AncestorKind', AncestorKey]
 * @return {Promise}
 *  resolve{Entity}
 *  reject{Error}
 */
function update(Model, id, data) {
  const dataSanitized = Model.sanitize(data);
  return Model.update(id, dataSanitized, ancestors, DbConstant.NAMESPACE)
    .then(updatedEntity => {
      return parseSingleEntity(updatedEntity);
    })
    .catch(error => {
      return error;
    });
}

module.exports = {
  create,
  list,
  remove,
  retrieve,
  update
};

/*******************Private Method ********************************/
function parseSingleEntity(response) {
  return new Promise(resolve => {
    let responseEntity = response.plain();
    let path = response.entityKey.path;
    path = path.splice(0, path.length - 2);
    return Promise.each(path, function(item, index) {
      if (index % 2 === 0) {
        responseEntity[item.toLowerCase()] = {
          id: parseInt(path[index + 1])
        };
      }
    })
      .then(() => resolve(responseEntity))
      .catch(error => resolve(error));
  });
}
