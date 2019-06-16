var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const secret = 'fjksldfgjklsfsl';
const refreshSecret = 'asdadadasdad';

function makeAccessToken(email) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60),
    payload: {
      email: email,
    }
  }, secret);
}


function makeRefreshToken(email) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60),
    payload: {
      email: email,
    }
  }, refreshSecret);
}
function verify(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    req.user = {
      email: decoded.payload.email
    }
    next();
  } catch (err) {
    res.status(401).json({'message': '인증 실패'})
  }
}

/* GET home page. */
router.post('/auth/sign-in', function (req, res, next) {
  // email, password
  // accessToken & refreshToken
  const email = req.body.email;
  const password = req.body.password;
  if(email === 'ajh3166@naver.com' && password ==='1234') {
    res.json({
      accessToken : makeAccessToken(email)
    })
  } else {
    res.status(404).json({message: '유저를 찾을 수 없습니다.'})
  }
});

router.post('/auth/sign-up', function (req, res, next) {
  // email & password
  const email = req.body.email;
  const password = req.body.password;
  res.json({
    email: email,
    password: password
  })
});

router.post('/auth/refresh', function (req, res, next) {
  // refreshToken

  // accessToken
  res.json({})
});

router.get('/users', verify, function (req, res, next) {
  // accessToken
  res.json({"request" : "success"})
});

module.exports = router;
