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
