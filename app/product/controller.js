const products = require('./model');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');

// control untuk menampilkan data product dalam bentuk json
const index = async (req, res) => {
    try {
        await products.sync();
        const product = await products.findAll();
        return res.send(product);
    } catch (error) {
        res.send(error);
        return cosole.log(error);
    }
}

// control untuk menampilkan data product dalam bentuk tabel html
const showAll = async (req, res) => {
    try {
        await products.sync();
        const product = await products.findAll();
        if (product.length === 0) {
            return res.redirect('/tableproducts/addProduct');
        }
        return res.render('tableproducts', { products: product });
    } catch (error) {
        res.send(error);
        return cosole.log(error);
    }
}

// control untuk menambahkan data product 
const store = async (req, res) => {
    const { user_id, name, price, stock, status } = req.body;
    console.log(req.body);
    try {
        await products.sync();
        if (req.file) {
            const img = `https://expressxmysql.vercel.app/${req.file.originalname}`;
            const target = path.join(__dirname, './../../public', req.file.originalname);
            fs.renameSync(req.file.path, target);
            await products.create({ user_id, name, price, stock, status, image: img });
            return res.redirect("/tableproducts");
        }
        await products.create({ user_id, name, price, stock, status });
        return res.redirect("/tableproducts");
    } catch (error) {
        res.send(error);
        return console.log(error);
    }
}

// control untuk menampilkan data berdasarkan id format json
const productId = async (req, res) => {
    try {
        await products.sync();
        const result = await products.findAll({
            where: {
                id: req.params.id
            }
        });
        if (result.length === 0) {
            return res.send('Data tidak ditemukan');
        }
        return res.send(result);
    } catch (error) {
        res.send(error);
        return console.log(error);
    }
}

// control untuk mengarahkan menuju halaman edit product
const editProduct = async (req, res) => {
    try {
        await products.sync();
        const product = await products.findOne({
            where: {
                id: req.params.id
            }
        });
        if (product.length === 0) {
            return res.send('Data tidak ditemukan');
        }
        return res.render("productEdit", { product });
    } catch (error) {
        res.send(error);
        return console.log(error);
    }
}

// tambah fitur update data
const update = async (req, res) => {
    const { name, price, stock, status } = req.body;
    try {
        await products.sync();
        await products.update({
            name: name,
            price: price,
            stock: stock,
            status: status,
        }, {
            where: {
                id: req.params.id
            }
        });

        return res.redirect("/tableproducts");
    } catch (error) {
        res.send(error);
        return console.log(error);
    }
}

// tambah fitur delete data
const destroy = async (req, res) => {
    try {
        await products.sync();
        await products.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.redirect("/tableproducts");
    } catch (error) {
        res.send(error);
        return console.log(error);
    }
}

// tambah fitur search dan tabel html untuk menampilkan data yg di search
const search = async (req, res) => {
    try {
        await products.sync();
        const result = await products.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.query.search}%`
                }
            }
        });
        if (result.length === 0) {
            return res.render("errorpage");
        }
        return res.render("searchTable", { products: result });
    } catch (error) {
        res.send(error);
        return console.log(error);
    }
}

module.exports = {
    index,
    productId,
    store,
    update,
    destroy,
    search,
    showAll,
    editProduct
}