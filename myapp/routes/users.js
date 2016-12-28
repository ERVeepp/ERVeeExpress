var express = require('express');
var router = express.Router();

var data={
	a:"HelloWorld"
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(data);
});

module.exports = router;
