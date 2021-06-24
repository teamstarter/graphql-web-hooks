exports.cleanupTestsEnv = () => {
  process.env.NO_ASYNC = true
}

exports.getMetadataFromContext = (context) => {
  return context.headers.userid
    ? { userId: parseInt(context.headers.userid, 10) }
    : null
}

function removeTimestampFromObject(obj, additionnalFieldsToRemove) {
  const { createdAt, updatedAt, deletedAt, ...rest } = obj.get
    ? obj.get({
        plain: true,
      })
    : obj

  if (additionnalFieldsToRemove) {
    for (const field of additionnalFieldsToRemove) {
      if (rest[field]) {
        rest[field] = 'redacted'
      }
    }
  }

  return {
    ...rest,
    createdAt: createdAt ? 'redacted' : createdAt,
    updatedAt: updatedAt ? 'redacted' : updatedAt,
    deletedAt: deletedAt ? 'redacted' : deletedAt,
  }
}

/**
 * Remove timestamps from given array/obj
 * @param {any[] | any]} objInArray An array of objects or an object
 * @param {*} additionnalFieldsToRemove
 * @returns anything, trimed from there timestamps
 */
exports.removeTimestamps = function (objInArray, additionnalFieldsToRemove) {
  if (objInArray.length) {
    return objInArray.map((obj) => {
      return removeTimestampFromObject(obj, additionnalFieldsToRemove)
    })
  }
  return removeTimestampFromObject(objInArray, additionnalFieldsToRemove)
}
