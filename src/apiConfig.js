let apiUrl
const apiUrls = {
  production: 'https://frozen-bayou-71751.herokuapp.com',
  development: 'http://localhost:4742'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
