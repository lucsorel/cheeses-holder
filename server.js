const Hapi = require('hapi')
const Path = require('path')

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

server.register(require('inert'), err => {
  if (err) {
    throw err
  }

  // adds the routes
  server.route({
    method: 'GET',
    path: '/plateaux',
    handler: {
      file: './public/index.html'
    }
  })
  server.route({
    method: 'GET',
    path: '/plateaux.js',
    handler: {
      file: './public/plateaux.js'
    }
  })
  server.route({
    method: 'GET',
    path: '/svg.js',
    handler: {
      file: './node_modules/svg.js/dist/svg.js'
    }
  })

  // Start the server
  server.start(err => {
    if (err) {
      throw err
    }
    console.log('Server running at:', server.info.uri)
  })
})

// const server = new Hapi.Server({
//   connections: {
//     routes: {
//       files: {
//         relativeTo: Path.join(__dirname, 'public')
//       }
//     }
//   }
// })
//
// server.register(require('inert'), err => {
//   if (err) {
//     throw err
//   }
//
//   server.route({
//     method: 'GET',
//     path: '/{param*}',
//     handler: {
//       directory: {
//         path: 'public'
//       }
//     }
//   })
//
//   server.start(err => {
//     if (err) {
//       throw err
//     }
//
//     console.log('Server running at:', server.info.uri)
//   })
// })
