const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const request = require('superagent')
const portNo = process.env.PORT || 17315
const crawlingURL = 'http://ec2-52-78-119-228.ap-northeast-2.compute.amazonaws.com'
const businessURL = 'http://52.79.76.134:8080/abroad_business2'

server.use('/', express.static('./public'))
server.use(bodyParser.urlencoded({ extended: false }))
server.get('/api/exchange-rate', (req, res) => {
  request.get(crawlingURL + '/api/exchange-rate').query({ dummy: req.query.dummy }).accept('application/json').end((err, proxyRes) => {
    if (err) {
      res.json({
        status: false,
        message: 'Crawling서버 응답 오류'
      })
    } else {
      res.json(proxyRes.body)
    }
  })
})
server.post('/api/login', (req, res) => {
  request.post(businessURL + '/api/login').type('form').send(req.body).end((err, proxyRes) => {
    if (err) {
      res.json({
        status: false,
        message: 'Business서버 응답 오류'
      })
    } else {
      res.json(proxyRes.body)
    }
  })
})
server.post('/api/join', (req, res) => {
  request.post(businessURL + '/api/join').type('form').send(req.body).end((err, proxyRes) => {
    if (err) {
      res.json({
        status: false,
        message: 'Business서버 응답 오류'
      })
    } else {
      res.json(proxyRes.body)
    }
  })
})
server.post('/api/edit', (req, res) => {
  request.post(businessURL + '/api/edit').type('form').send(req.body).end((err, proxyRes) => {
    if (err) {
      res.json({
        status: false,
        message: 'Business서버 응답 오류'
      })
    } else {
      res.json(proxyRes.body)
    }
  })
})
server.post('/api/exchange', (req, res) => {
  request.post(businessURL + '/api/exchange').type('form').send(req.body).end((err, proxyRes) => {
    if (err) {
      res.json({
        status: false,
        message: 'Business서버 응답 오류'
      })
    } else {
      res.json(proxyRes.body)
    }
  })
})
server.get('/api/address', (req, res) => {
  res.redirect('/pop/address-pop.html')
})
server.post('/api/address', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE>
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <script language="javascript">
          window.onload = init
          function init () {
            opener.callbackAddress('${req.body.zipNo}', '${req.body.roadFullAddr}')
          }
        </script>
        <body>
          TEST
        </body>
      </html>
  `)
})
server.listen(portNo, () => {
  console.log('====================================================')
  console.log()
  console.log(`   server is running at: 'http://localhost:${portNo}'`)
  console.log()
  console.log('====================================================')
  console.log()
})
