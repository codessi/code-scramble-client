let apiUrl
const apiUrls = {
  production: 'https://frozen-bayou-71751.herokuapp.com',
  development: 'http://localhost:4741'
  // development: 'https://frozen-bayou-71751.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
