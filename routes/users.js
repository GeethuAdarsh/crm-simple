var express = require('express');
var router = express.Router();
const users = require ('../controllers/users.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/test', function(req, res, next) {
  res.send('respond with a test');
});
router.post('/register',users.register);
router.post('/login',users.login);
router.post('/createEnquiry',users.createEnquiry);
router.put('/saveEnquiry/:id',users.saveEnquiry);
router.get('/showEnquiry/search',users.enquirySearch);
router.get('/showEnquiry',users.showEnquiry);

module.exports = router;
