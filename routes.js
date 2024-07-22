const router = require('express').Router();
const productsController = require('./app/product/controller');

router.get('/', (req, res) => {
    console.log(req)
    res.send('Hello World!, untuk mengakses API gunakan /api/v1/products <a href="/tableproducts">Lihat tabel</a>');
});

// tambah fitur search dan tabel html untuk menampilkan data yg di search

router.get('/tableproducts/addProduct', (req, res) => {
    res.render('addProduct');
});

router.get('/tableproducts', productsController.showAll);

router.get('/tableproducts/editproduct/:id', productsController.editProduct);



module.exports = router;