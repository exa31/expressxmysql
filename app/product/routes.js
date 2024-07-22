const router = require('express').Router();
const productsController = require('./controller');
const multer = require('multer');
const path = require('path');


const upload = multer({ dest: path.join(__dirname + './../../public') });



router.get('/products', productsController.index);

router.get('/product/:id', productsController.productId);

router.get('/product', productsController.search);

router.post('/products', upload.single('image'), productsController.store);

router.patch('/product/:id', upload.single('image'), productsController.update);

router.delete('/product/:id', productsController.destroy);



module.exports = router;