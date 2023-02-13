const express = require("express");
const router = express.Router();
const sendMailMethod = require("./sendMail");
//  Post  request  to  send  an  email
router.post("/", async (req, res) => {
    try {
        const result = await sendMailMethod(req.body);
        //  send  the  response
        res.json({
            status: true,
            payload: result,
        });
    } catch (error) {
        console.error(error.message);
        res.json({
            status: false,
            payload: "Something  went  wrong  in  Sendmail  Route.",
        });
    }
});
module.exports = router;
