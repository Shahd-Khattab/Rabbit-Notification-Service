const sgMail = require("@sendgrid/mail");
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = 3000;
app.use(cors());
app.use(express.json());


SENDGRID_API_KEY= "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"
sgMail.setApiKey("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");

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.post('/api/notification', async (req,res) => {
  try{
    const msg= {
      to: req.body.email, // msh mafroud ha3miel res.body? wla ezzai?
    from:{
        name:"Rabbit Market",
        email:"shahdmk_12@hotmail.com"  //dah mn send grid fih elsender address
    },
    subject:"Notification",//, //ahout maslan esm el service el ana basend mnha 
    text: req.body.text // el message nafsaha
    }
      await sgMail.send(msg);
      return res.json({
        msg
      });
  }
  catch(error){
      console.error(error);
      if(error.response){
          console.error(error.response.body);
      }
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

console.log(process.env.SENDGRID_API_KEY);
