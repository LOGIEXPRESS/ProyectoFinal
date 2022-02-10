import { Response, Request, Router, NextFunction } from 'express';
import { Signup } from '../models/Signup';
import { Carrier }  from '../models/Carrier';
import axios from 'axios';
const mercadopago = require('mercadopago');

const router=Router()

router.get('/payment', async (req: Request, res: Response) => {
    res.send('Allan Torres line 15');
  });

router.post("/mercadopago", async (req, res) => {
  const { title, unit_price } = req.body;
  console.log(req.body);
  try {
    mercadopago.configure({
      access_token:
        "TEST-4261065072334441-020320-579a9756136c4e30a0ce0b4f11322878-177928098",
    });

    let preference = {
      "items": [
          {
             "title": "Dummy Item Title",
                  "description": "Dummy Item Description",
                  "quantity": 1,
                  "currency_id": "ARS",
                  "unit_price": 10.0
          }
      ],
      "payer": {
          "email": "payer@email.com"
      },
      "auto_return": "all",
      "back_urls" : {
          "failure": "https://www.youtube.com/",
          "pending": "https://www.google.com/",
          "success": "https://www.facebook.com/"
      }
  }

    let answer = await mercadopago.preferences.create(preference);

    const response = answer.body.id;
    const init_points = answer.body.init_point;

    res.json({ response, init_points });
  } catch (err) {
    console.error(err);
  }
});

  
router.get('/checkout', async (req: Request, res: Response) => {
  let {id}=req.query;
  console.log("#####line 46#####");
  console.log(id);
  let status:any;
  try{


  const resp= await   axios
        .get('https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js?data-preference-id='+id, {

    })
    .then((res) => {
      console.log(res.statusText)
        status=res.statusText;
    });
    res.send(status);
  }
catch(err){
  console.error(err)
}
});

// router.get('totalprice',(req: Request, res: Response, next: NextFunction) => {
//   let {id} = req.query
//   try {


    
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/render', (req: Request , res: Response, ) => {

  // const {id} = req.params
  res.send(`
    <h1>Bienvenidos a Henry!</h1>
  `);

})


export default router