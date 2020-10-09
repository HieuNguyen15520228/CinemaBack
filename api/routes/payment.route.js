var express = require('express');
var router = express.Router();
const paypal = require('paypal-rest-sdk');
var Film = require('../../models/film');
var passport = require('passport');
var config = require('../../config/URL_config')
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AdAiC1He4Z_8JZcub97QSzSaKNYdHD8n7cGFGiOvApQY7hb4X3GA7RtS6_cdDrKNB4Vz5_zvYypv3dFd',
    'client_secret': 'EJex4W8iR-YNgINUXG6IZ90Jv0lI65Q_8_CoDKQutHm3Pbp3g8TDaz69wgcvF9Ei2ncfhy-x_MSXcqFN'
});
router.post('/pay', passport.authenticate('jwt', { session: false }), (req, res) => {

    // req.body.map(i => {console.log(i)})
    var total = 0;
    // var itemPrice = 0
    
    // var items = [];
    // req.body.map(i => {
      
    //     items.push({
    //         name: i.vTitle,
    //         sku: i.seatID,
    //         price: i.price,
    //         currency: 'USD',
    //         quantity: "1",
    //         description: i.cinema + " " + i.date + " " + i.time
    //     })

    //     total = total + parseInt(i.price);
    //     console.log(total);
    // }
    total = Number(req.body.total);
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": config.URL+"/payment-success",
            "cancel_url": config.URL
        },
        "transactions": [
            {
                "amount": {
                    "total": total,
                    "currency": "USD",

                },
                "description": "ĐÃ THANH TOÁN THÀNH CÔNG",

                "item_list": {
                    "items": [
                        {
                            "name": "THANH TOÁN ĐẶT VÉ TỪ UITCINEMA",
                            "sku": "VÉ XEM PHIM",
                            "price": total,
                            "currency": "USD",
                            "quantity": "1",
                            "description": "VÉ XEM PHIM",
                        }
                    ]
                }
            }
        ]
    };

    paypal.payment.create(create_payment_json,  (error, payment) =>{
        if (error) {
            console.log(total)
            // throw error;
            console.log(error);
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.json(payment.links[i].href);
                }
            }
        }
    });

});

router.post('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    var total = req.body.total
    console.log("Tổng "+total);
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": Number(total)
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            // throw error;
            res.json('Hóa đơn này đã thanh toán rồi. Xin quý khách hãy tiếp tục đặt vé')
        } else {
            res.json(payment.transactions[0].description);
        }
    });
});

module.exports = router;
