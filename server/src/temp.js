// // // // // // // // // // // // // // payment courseController // // // // // // // // // // // // // // //

// import dotenv from 'dotenv';
// import {Stripe} from 'stripe';

// dotenv.config();
// const {PORT, SECRET_KEY} = process.env;

// const stripe = new Stripe(SECRET_KEY);
// const DOMAIN = `http://localhost:${PORT}`;

// const lineItems = courses.map((course) => {
//   return {
//     price_data: {
//       currency: course.currency,
//       product_data: {
//         name: course.course_name,
//       },
//       unit_amount: course.course_price * 100,
//     },
//     quantity: course.quantity,
//   };
// });

// const session = await stripe.checkout.sessions.create({
//   line_items: lineItems,
//   mode: 'payment',
//   success_url: `${DOMAIN}/success`,
//   cancel_url: `${DOMAIN}/cancel`,
// });

// res.status(303).redirect(session.url);

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // //


[
    {
        "course": "chemistry",
        "expirationDate": "2024-02-03T11:19:23.044Z",
        "_id": "6596943b09ce9e1ba097907a"
    },
    {
        "course": "physics",
        "expirationDate": "2024-02-03T11:22:24.817Z",
        "_id": "659694f009ce9e1ba097909d"
    }
]