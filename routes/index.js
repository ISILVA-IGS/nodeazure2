var express = require('express');
var router = express.Router();
var C_dashBoard = require('../controller/controller_dashBoard');

/* GET home page. */
router.get('/', function(req, res, next) {
  C_dashBoard.exibirDash().then(rs=>{

    var start = rs;
    res.render('monitoramento',{start});

  })
});

module.exports = router;
