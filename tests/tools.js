exports.cleanupTestsEnv = () => {
  process.env.NO_ASYNC = true
}

exports.getMetadataFromContext = (context) => {
  return context.headers.userid
    ? { userId: parseInt(context.headers.userid, 10) }
    : null
}
