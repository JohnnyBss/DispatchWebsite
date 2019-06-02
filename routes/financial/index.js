let express = require('express');
let router = express.Router();
let commonService = require('../../service/commonService');

router.get('/', function(req, res, next) {
  res.render('financial/index', { title: '理财经理业务主页' });
});

router.get('/clock', function(req, res, next) {
  let service = new commonService.commonInvoke('clock');
  service.get(req.query.userID, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        clockInfo: result.content.responseData
      });
    }
  });
});

router.get('/business', function(req, res, next) {
  let service = new commonService.commonInvoke('receiveBusiness');
  service.get(req.query.userID, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        businessList: result.content.responseData
      });
    }
  });
});

router.get('/business/latest', function(req, res, next) {
  let service = new commonService.commonInvoke('latestBusiness');
  service.get(req.query.userID, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        latestBusiness: result.content.responseData
      });
    }
  });
});

router.post('/', function (req, res, next) {
  let service = new commonService.commonInvoke('clock');
  let data = {
    clockUserID: req.body.userID,
    clockUserStatus: req.body.clockStatus,
    loginUser: req.body.loginUser
  };

  service.add(data, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage
      });
    }
  });
});

router.put('/business/callback', function (req, res, next) {
  let service = new commonService.commonInvoke('businessCallBack');
  let data = {
    businessID: req.body.businessID,
    businessStatus: req.body.businessStatus,
    callBackMessage: req.body.callBackMessage,
    loginUser: req.body.loginUser
  };

  service.change(data, function (result) {
    if(result.err){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage
      });
    }
  });
});

module.exports = router;