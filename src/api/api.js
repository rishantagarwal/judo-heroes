var express = require('express')
var router = express.Router();
var MailParser = require('mailparser').MailParser;
var mailparser = new MailParser({
  defaultCharset:'UTF-8'
});

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  // console.log(JSON.stringify(req.body.mail));
  next()
})
// define the home page route
router.post('/mail', function (req, res) {
    mailparser.write(req.body.mail);
    mailparser.end();
    res.send("Done");
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

mailparser.on("end",function(mail_object){
  var from = mail_object.from;
  var subject = mail_object.subject;
  var text = mail_object.text;
  console.log("-------------------------------");
  console.log(from,subject,text);
  // console.log("From:", mail_object.from); //[{address:'sender@example.com',name:'Sender Name'}]
  // console.log("Subject:", mail_object.subject); // Hello world!
  // console.log("Text body:", mail_object.text); // How are you today?
});

module.exports = router
