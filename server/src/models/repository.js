"use strict";

const Promise = require("bluebird");
const DbConstant = require("../utils/dbConstant");
const datastore = require("./index").datastore;

/**
 * Create a new Entity
 * @param Model {GStore Model}
 * @param data {Object}
 *  eg:
 *    {
 *      key: 'value'
 *    }
 * @param ancestors {Array}
 *  eg: ['AncestorKind', AncestorKey]
 * @return {Promise}
 *  resolve{Entity}
 *  reject{Error}
 */
function create(Model, data, ancestors) {
  return new Promise((resolve, reject) => {
    datastore.allocateIds(datastore.key([Model.entityKind]), 1, function(
      errOnIdCreation,
      ids
    ) {
      if (!errOnIdCreation) {
        const id = ids[0].id;
        const dataSanitized = Model.sanitize(data);
        const model = new Model(
          dataSanitized,
          id,
          ancestors,
          DbConstant.NAMESPACE
        );
        return model.save(function(errOnEntityCreation, createdEntity) {
          if (!errOnEntityCreation) {
            resolve(parseSingleEntity(createdEntity));
          } else {
            reject(errOnEntityCreation);
          }
        });
      } else {
        reject(errOnIdCreation);
      }
    });
  });
}

/**
 * Provides the filter query
 * @param Kind {GStore Model}, not a string
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
function list(Kind, queryParams, filterableProperties, ancestors) {
  return new Promise((resolve, reject) => {
    let query = Kind.query(DbConstant.NAMESPACE)
      .limit(parseInt(queryParams.limit) || DbConstant.DEFAULT_ENTITY_PER_PAGE)
      .offset(parseInt(queryParams.offset) || 0);
    if (ancestors) {
      query.hasAncestor(
        datastore.key({
          namespace: DbConstant.NAMESPACE,
          path: ancestors
        })
      );
    }
    delete queryParams.limit;
    delete queryParams.offset;

    return Promise.each(Object.keys(queryParams), function(key) {
      let value = queryParams[key];
      if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      }
      if (filterableProperties.indexOf(key) > -1) {
        query = query.filter(key, "=", value);
      } else {
        reject(new Error(`${key} properties is not present.`));
      }
    })
      .then(() => {
        query.run(
          {
            showKey: true
          },
          function(errOnList, listedEntities) {
            if (errOnList) {
              reject(errOnList);
            } else if (listedEntities.entities.length) {
              listedEntities.entities.forEach(entity => {
                if (entity.__key.parent) {
                  const path = entity.__key.parent.path;
                  for (let i = 0; i < path.length; i = i + 2) {
                    entity[path[i].toLowerCase()] = {
                      id: parseInt(path[i + 1])
                    };
                  }
                }
                delete entity.__key;
              });
              resolve(listedEntities.entities);
            } else {
              resolve([]);
            }
          }
        );
      })
      .catch(err => reject(err));
  });
}

/**
 * Create a new Entity
 * @param Model {GStore Model}
 * @param id {Integer}
 * @param ancestors {Array}
 *  eg: ['AncestorKind', AncestorKey]
 * @return {Promise}
 *  resolve{Entity}
 *  reject{Error}
 */
function remove(Model, id, ancestors) {
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
 * Create a new Entity
 * @param Model {GStore Model}
 * @param id {Integer}
 * @param ancestors {Array}
 *  eg: ['AncestorKind', AncestorKey]
 * @return {Promise}
 *  resolve{Entity}
 *  reject{Error}
 */
function retrieve(Model, id, ancestors) {
  return Model.get(id, ancestors, DbConstant.NAMESPACE).then(
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
function update(Model, id, data, ancestors) {
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
