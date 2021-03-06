require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  select "name",
        "price",
        "image",
        "productId",
        "shortDescription"
  from "products"
  `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);

  const sql = `
  select *
  from "products"
  where "productId" = $1
  `;
  const value = [productId];

  db.query(sql, value)
    .then(result => {
      if (!result.rows[0]) {
        next(new ClientError(`productId ${productId} does not exist`, 404));
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.status(200).json([]);
  } else {
    const sql = `
   select "c"."cartItemId",
       "c"."price",
       "p"."productId",
       "p"."image",
       "p"."name",
       "p"."shortDescription"
  from "cartItems" as "c"
  join "products" as "p" using ("productId")
 where "c"."cartId" = $1
  `;

    const values = [req.session.cartId];

    db.query(sql, values)
      .then(result => {
        res.status(200).json(result.rows);
      });
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);
  if (typeof productId === 'undefined' || productId <= 0) {
    throw (new ClientError('productId is invalid', 400));
  }

  const sql = `
  select "price"
  from "products"
  where "productId" = $1;
  `;
  const value = [productId];

  db.query(sql, value)
    .then(result => {
      if (!result.rows[0]) {
        throw (new ClientError(`productId ${productId} does not exist`, 400));
      }

      const sql2 = `
    insert into "carts" ("cartId", "createdAt")
     values (default, default)
     returning "cartId"
    `;
      const price = result.rows[0].price;

      if (req.session.cartId) {
        return ({
          cartId: req.session.cartId,
          price: price
        });
      } else {
        return (
          db.query(sql2)
            .then(result => {
              const cartId = result.rows[0].cartId;
              return ({
                cartId: cartId,
                price: price
              });
            })
        );
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sql = `
   insert into "cartItems" ("cartId", "productId", "price")
   values ($1, $2, $3)
   returning "cartItemId"
 `;

      const values = [result.cartId, productId, result.price];

      return db.query(sql, values)

        .then(result => {
          const cartItemId = result.rows[0];
          return cartItemId;
        });
    })

    .then(result => {

      const sql = `
    select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
      from "cartItems" as "c"
       join "products" as "p" using ("productId")
      where "c"."cartItemId" = $1
`;
      const values = [result.cartItemId];

      return db.query(sql, values)
        .then(result => {
          res.status(201).json(result.rows[0]);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) throw new ClientError('CartId does not exist', 400);
  if (!req.body.name || !req.body.creditCard || !req.body.shippingAddress) {
    throw new ClientError('Missing required information', 400);
  }
  const sql = `
insert into "orders"("cartId", "name", "creditCard", "shippingAddress")
values ($1, $2, $3, $4)
returning "orderId","name","createdAt","creditCard","shippingAddress";
`;
  const values = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];

  db.query(sql, values)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const cartItemId = parseInt(req.params.cartItemId, 10);
  if (!req.session.cartId) {
    return next(new ClientError('cartId does not exist in current session', 400));
  } else if (!Number.isInteger(cartItemId) || cartItemId <= 0) {
    return next(new ClientError('cartItemId must be a positive integer', 400));
  }

  const sql = `
  delete from "cartItems"
  where "cartItemId" = $1
  and "cartId" = $2
  returning *
  `;

  db.query(sql, [cartItemId, req.session.cartId])
    .then(result => {
      if (!result.rows[0]) {
        return next(new ClientError(`cartItemId of ${cartItemId} can't be found`, 400));
      }
      res.status(204).json(result.rows[0]);
    })
    .catch(err => console.error(err));

});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
