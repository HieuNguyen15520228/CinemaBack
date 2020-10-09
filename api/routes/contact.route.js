var express = require('express');
var router = express.Router();
var Contact = require('../../models/contact')
router.post('/', (req, res) => {
    console.log(req.body);
    const { email, name, message } = req.body;
    const contact = new Contact({ email, name, message })
    contact.save();
    res.status(200).json('Cảm ơn vì lời góp ý của bạn');
});

module.exports = router;

