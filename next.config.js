module.exports = {
  ...(process.env.NETLIFY === 'true' && { target: 'serverless' }),
}
