exports.cleanupTestsEnv = () => {
  process.env.NO_ASYNC = true
}

exports.isEventAllowed = ({ eventSecurityContext, eventType, webhook }) => {
  const { userId } = eventSecurityContext

  return (userId > 1) ? false : true
}
