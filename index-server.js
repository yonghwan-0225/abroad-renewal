const express = require('express')
const server = express()
const http = require('http').Server(server)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const request = require('superagent')
const portNo = 17315
const crawlingURL = 'http://10.1.44.48:80'
const businessURL = 'http://10.1.41.228:80'

server.use('/', express.static('./public'))
server.use(bodyParser.urlencoded({ extended: false }))
server.get('/api/renew', (req, res) => {
  request.get(crawlingURL + '/api/renew').query({ dummy: req.query.dummy }).accept('application/json').end((err, proxyRes) => {
    if (err) {
      res.json({
        status: false,
        message: 'Crawling서버가 고장났습니다.'
      })
    } else {
      res.json(proxyRes.body)
    }
  })
  // res.json({
  //   entry: ['$', '€', '元', '￥'],
  //   excData: {
  //     '$': [  // test data
  //       {
  //         bank: '신한은행',
  //         fromW: 1100.3,
  //         toW: 1060.12
  //       },
  //       {
  //         bank: '하나은행',
  //         fromW: 1097.6,
  //         toW: 1063.42
  //       },
  //       {
  //         bank: '우리은행',
  //         fromW: 1098.5,
  //         toW: 1061.3
  //       },
  //       {
  //         bank: '농협은행',
  //         fromW: 1101.3,
  //         toW: 1061.12
  //       },
  //       {
  //         bank: '기업은행',
  //         fromW: 1098.6,
  //         toW: 1064.42
  //       },
  //       {
  //         bank: '국민은행',
  //         fromW: 1099.5,
  //         toW: 1062.3
  //       }
  //     ],
  //     '€': [  // test data
  //       {
  //         bank: '신한은행',
  //         fromW: 1354.3,
  //         toW: 1301.12
  //       },
  //       {
  //         bank: '하나은행',
  //         fromW: 1351.06,
  //         toW: 1303.24
  //       },
  //       {
  //         bank: '우리은행',
  //         fromW: 1348.74,
  //         toW: 1306.2
  //       },
  //       {
  //         bank: '농협은행',
  //         fromW: 1355.3,
  //         toW: 1300.12
  //       },
  //       {
  //         bank: '기업은행',
  //         fromW: 1352.06,
  //         toW: 1304.24
  //       },
  //       {
  //         bank: '국민은행',
  //         fromW: 1349.74,
  //         toW: 1307.2
  //       }
  //     ],
  //     '元': [
  //       {
  //         bank: '신한은행',
  //         fromW: 173.3,
  //         toW: 161.2
  //       },
  //       {
  //         bank: '하나은행',
  //         fromW: 171.2,
  //         toW: 160.41
  //       },
  //       {
  //         bank: '우리은행',
  //         fromW: 174.63,
  //         toW: 162.8
  //       },
  //       {
  //         bank: '농협은행',
  //         fromW: 174.3,
  //         toW: 160.2
  //       },
  //       {
  //         bank: '기업은행',
  //         fromW: 172.2,
  //         toW: 161.41
  //       },
  //       {
  //         bank: '국민은행',
  //         fromW: 173.63,
  //         toW: 163.8
  //       }
  //     ],
  //     '￥': [
  //       {
  //         bank: '신한은행',
  //         fromW: 1011.67,
  //         toW: 981.3
  //       },
  //       {
  //         bank: '하나은행',
  //         fromW: 1008.2,
  //         toW: 977.4
  //       },
  //       {
  //         bank: '우리은행',
  //         fromW: 1012.51,
  //         toW: 978.3
  //       },
  //       {
  //         bank: '농협은행',
  //         fromW: 1010.67,
  //         toW: 980.3
  //       },
  //       {
  //         bank: '기업은행',
  //         fromW: 1009.2,
  //         toW: 978.4
  //       },
  //       {
  //         bank: '국민은행',
  //         fromW: 1011.51,
  //         toW: 979.3
  //       }
  //     ]
  //   },
  //   measure: {
  //     '$': 1,
  //     '€': 1,
  //     '元': 1,
  //     '￥': 100
  //   },
  //   serviceRate: {
  //     '$': {
  //       fromW: 1090,
  //       toW: 1070
  //     },
  //     '€': {
  //       fromW: 1344.3,
  //       toW: 1310.42
  //     },
  //     '元': {
  //       fromW: 170.1,
  //       toW: 165.5
  //     },
  //     '￥': {
  //       fromW: 1000.3,
  //       toW: 986.73
  //     }
  //   }
  // })
})
server.post('/api/login', (req, res) => {
  // request.post(businessURL + '/api/login').type('form').send(req.body).end((err, proxyRes) => {
  //   if (err) {
  //       res.json({
  //         status: false,
  //         message: 'Business서버가 고장났습니다.'
  //       })
  //     }
  //   res.json(proxyRes.body)
  // })
  res.json({
    status: true,
    userData: {
      id: 'liebebe',
      pw: '12341234',
      name: '김연재',
      email: 'liebe3060@gmail.com',
      phone: '01023983060',
      address: '경기도 군포시 산본동 1052 주공11단지 1103동 311호'
    },
    orderData: [
      {
        orderNo: 3714,
        orderType: 1,
        status: '배송완료',
        amount: '1500000',
        serviceRate: '1075.52',
        total: '1395',
        time: '2018-03-29 16:04:52'
      },
      {
        orderNo: 4082,
        orderType: 2,
        status: '결제완료',
        amount: '120',
        serviceRate: '1057.07',
        total: '126900',
        time: '2018-04-10 10:52:08'
      }
    ]
  })
})
server.post('/api/join', (req, res) => {  // for test
  request.post(businessURL + '/api/join').type('form').send(req.body).end((err, proxyRes) => {
    if (err) {
      res.json({
        status: false,
        message: 'Business서버가 고장났습니다.'
      })
    }
    res.json(proxyRes.body)
  })
  // res.json({
  //   status: true
  // })
})
server.post('/api/edit', (req, res) => {
  request.post(businessURL + '/api/edit').type('form').send(req.body).end((err, proxyRes) => {
    if (err) {
        res.json({
          status: false,
          message: 'Business서버가 고장났습니다.'
        })
      }
    res.json(proxyRes.body)
  })
})
server.post('/api/exchange', (req, res) => {
  request.post(businessURL + '/api/exchange').type('form').send(req.body).end((err, proxyRes) => {
    if (err) {
        res.json({
          status: false,
          message: 'Business서버가 고장났습니다.'
        })
      }
    res.json(proxyRes.body)
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
