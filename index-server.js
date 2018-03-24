const express = require('express')
const server = express()
const http = require('http').Server(server)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const request = require('superagent')
const portNo = 17315
const crawlingURL = 'http://10.1.41. :80'
const businessURL = 'http://10.1.41.228:80'

server.use('/', express.static('./public'))
server.use(bodyParser.urlencoded({ extended: false }))
server.get('/login', (req, res) => {
  res.redirect('/')
})
server.get('/user', (req, res) => {
  res.redirect('/')
})
server.get('/order', (req, res) => {
  res.redirect('/')
})
server.get('/join', (req, res) => {
  res.redirect('/')
})
server.get('/api/renew', (req, res) => {  // for test
  res.json({
    entry: ['$', '€', '元', '￥'],
    erData: {
      '$': [  // test data
        {
          bank: 'SHINHAN',
          fromW: 1100.3,
          toW: 1060.12
        },
        {
          bank: 'HANA',
          fromW: 1097.6,
          toW: 1063.42
        },
        {
          bank: 'WOORI',
          fromW: 1098.5,
          toW: 1061.3
        },
        {
          bank: 'NH',
          fromW: 1101.3,
          toW: 1061.12
        },
        {
          bank: 'IBK',
          fromW: 1098.6,
          toW: 1064.42
        },
        {
          bank: 'KB',
          fromW: 1099.5,
          toW: 1062.3
        }
      ],
      '€': [  // test data
        {
          bank: 'SHINHAN',
          fromW: 1354.3,
          toW: 1301.12
        },
        {
          bank: 'HANA',
          fromW: 1351.06,
          toW: 1303.24
        },
        {
          bank: 'WOORI',
          fromW: 1348.74,
          toW: 1306.2
        },
        {
          bank: 'NH',
          fromW: 1355.3,
          toW: 1300.12
        },
        {
          bank: 'IBK',
          fromW: 1352.06,
          toW: 1304.24
        },
        {
          bank: 'KB',
          fromW: 1349.74,
          toW: 1307.2
        }
      ],
      '元': [
        {
          bank: 'SHINHAN',
          fromW: 173.3,
          toW: 161.2
        },
        {
          bank: 'HANA',
          fromW: 171.2,
          toW: 160.41
        },
        {
          bank: 'WOORI',
          fromW: 174.63,
          toW: 162.8
        },
        {
          bank: 'NH',
          fromW: 174.3,
          toW: 160.2
        },
        {
          bank: 'IBK',
          fromW: 172.2,
          toW: 161.41
        },
        {
          bank: 'KB',
          fromW: 173.63,
          toW: 163.8
        }
      ],
      '￥': [
        {
          bank: 'SHINHAN',
          fromW: 1011.67,
          toW: 981.3
        },
        {
          bank: 'HANA',
          fromW: 1008.2,
          toW: 977.4
        },
        {
          bank: 'WOORI',
          fromW: 1012.51,
          toW: 978.3
        },
        {
          bank: 'NH',
          fromW: 1010.67,
          toW: 980.3
        },
        {
          bank: 'IBK',
          fromW: 1009.2,
          toW: 978.4
        },
        {
          bank: 'KB',
          fromW: 1011.51,
          toW: 979.3
        }
      ]
    },
    measure: {
      '$': 1,
      '€': 1,
      '元': 1,
      '￥': 100
    },
    serviceRate: {
      '$': {
        fromW: 1090,
        toW: 1070
      },
      '€': {
        fromW: 1344.3,
        toW: 1310.42
      },
      '元': {
        fromW: 170.1,
        toW: 165.5
      },
      '￥': {
        fromW: 1000.3,
        toW: 986.73
      }
    }
  })
})
server.post('/api/signin', (req, res) => {
  // request.post(businessURL + '/api/signin').type('form').send(req.body).end((err, { body }) => {
  //   console.log(businessURL + '/api/signin')
  //   console.log('sended')
  // })
  res.json({
    status: true,
    userData: {
      id: 'liebebe',
      pw: '12341234',
      email: 'liebe3060@gmail.com',
      phone: '01023983060',
      name: 'Kim Yeonjae',
      address: '경기도 군포시 산본동 1052 주공11단지 1103동 311호'
    },
    orderData: [
    ]
  })
})
server.post('/api/signup', (req, res) => {  // for test
  // request.post(businessURL + '/api/signup').type('form').send(req.body).end((err, { body }) => {
  //   console.log(businessURL + '/api/signup')
  //   console.log('sended')
  // })
  res.json({
    status: true
  })
})
server.post('/callback/address', (req, res) => {  // address callback
  io.emit('address', req.body)
})
http.listen(portNo, () => {
  console.log('====================================================')
  console.log()
  console.log(`   server is running at: 'http://localhost:${portNo}'`)
  console.log()
  console.log('====================================================')
  console.log()
})
