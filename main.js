/**
 * Traversy Media
 * Axios Crash Course | HTTP Library
 * YouTube: https://youtu.be/6LyagkoRWYA
 */

// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// GET REQUEST
function getTodos() {
  // Normal API: GET request
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 5,
  //   },
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err))

  // Method aliases: axios.get() GET request
  // axios
  //   .get('https://jsonplaceholder.typicode.com/todos', {
  //     _limit: 5,
  //   })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err))

  // Put params into url
  // axios
  //   .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err))

  // Set timeout
  axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5', { timeout: 5 })
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

// POST REQUEST
function addTodo() {
  // Normal API: POST Request
  // axios({
  //   method: 'post',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   data: {
  //     title: 'New Todo',
  //     completed: false,
  //   },
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err))

  // Method aliases: axios.post() POST Request
  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'New Todo',
      completed: false,
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  // PUT request
  // axios
  //   .put('https://jsonplaceholder.typicode.com/todos/1', {
  //     title: 'Updated Todo',
  //     completed: true,
  //   })
  //   .then(res => showOutput(res))
  //   .catch(err => console.error(err))

  // PATCH request
  axios
    .patch('https://jsonplaceholder.typicode.com/todos/1', {
      title: 'Updated Todo',
      completed: true,
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
    ])
    .then(
      axios.spread((todos, posts) => showOutput(posts))
      // res => {
      // console.log(res[0])
      // console.log(res[1])
      // showOutput(res[1]) }
    )
    .catch(err => console.error(err))
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken',
    },
  }

  axios
    .post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        title: 'New Todo',
        completed: false,
      },
      config
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World',
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase()
      return data
    }),
  }
  axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get('https://jsonplaceholder.typicode.com/todoss', {
      validateStatus: function (status) {
        return status < 500 // Reject only if status is greater or eqeual to 500
      },
    })
    .then(res => showOutput(res))
    .catch(err => {
      // Server responded with a status other than 200 range
      console.log('error data: ', err.response?.data)
      console.log('error status: ', err.response?.status)
      console.log('error headers: ', err.response?.headers)

      console.log(err.request && `error request: ${err.request}`)
      console.log('error message: ', err.message)
      // console.error(err)
    })
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source()

  axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5', {
      cancelToken: source.token,
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      axios.isCancel(thrown) &&
        console.log('Request canceled: ', thrown.message)
    })

  source.cancel('Request canceled!')
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    )
    return config
  },
  error => Promise.reject(error)
)

// AXIOS INSTANCES
// const axiosInstance = axios.create({
//   // Custom config
//   baseURL: 'https://jsonplaceholder.typicode.com',
// })

// axiosInstance.get('/comments?_limit=5').then(res => showOutput(res))

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos)
document.getElementById('post').addEventListener('click', addTodo)
document.getElementById('update').addEventListener('click', updateTodo)
document.getElementById('delete').addEventListener('click', removeTodo)
document.getElementById('sim').addEventListener('click', getData)
document.getElementById('headers').addEventListener('click', customHeaders)
document
  .getElementById('transform')
  .addEventListener('click', transformResponse)
document.getElementById('error').addEventListener('click', errorHandling)
document.getElementById('cancel').addEventListener('click', cancelToken)
