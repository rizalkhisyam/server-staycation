const Category = require('../models/Category');
const Bank = require('../models/Bank');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/index', {
            title: "Staycation-admin | Dashboard"
        });
    },

    viewCategory: async (req, res) => {
        try {
            const category = await Category.find();
        // console.log(category);
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/category/index', {
                category,
                alert,
                title: "Staycation-admin | Category"
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
        
    },
    addCategory: async (req, res) => {
        try {
            const { name } = req.body;
            // console.log(name);
            await Category.create({name});
            req.flash('alertMessage', 'Success add category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }

    },
    updateCategory: async (req, res) => {
        try {
            const { id, name } = req.body;
            const category = await Category.findOne({_id: id});
            // console.log(category);
            category.name = name;
            await category.save();
            req.flash('alertMessage', 'Success add category');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }

    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findOne({_id: id});
            await category.remove();
            req.flash('alertMessage', 'Success Delete category');
            req.flash('alertStatus', 'secondary');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
        
    },

    viewBank: async (req, res) => {

        try {
            const bank = await Bank.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/bank/index', {
                title: "Staycation-admin | Bank",
                alert,
                bank
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    },
    addBank: async (req, res) => {
        try {
            const { 
                nameBank, 
                accountNumber,
                name
            } = req.body;
            // console.log('type file is', req.file);
            await Bank.create({
                nameBank,
                accountNumber,
                name,
                imageUrl: `images/${req.file.filename}`
            });
            req.flash('alertMessage', 'Success Add Bank');
            req.flash('alertStatus', 'primary');
            res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    },
    editBank: async (req, res) => {
        try {
            const { id, nameBank, accountNumber, name } = req.body;
        const bank = await Bank.findOne({_id: id});
        if(req.file == undefined){
            bank.name = name;
            bank.nameBank = nameBank;
            bank.accountNumber = accountNumber;
            await bank.save();
            req.flash('alertMessage', 'Success Edit Bank');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/bank');
        }else{
            await fs.unlink(path.join(`public/${bank.imageUrl}`));
            bank.name = name;
            bank.nameBank = nameBank;
            bank.accountNumber = accountNumber;
            bank.imageUrl = `images/${req.file.filename}`;
            await bank.save();
            req.flash('alertMessage', 'Success Edit Bank');
            req.flash('alertStatus', 'warning');
            res.redirect('/admin/bank');
        }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
        
    },
    deleteBank: async (req, res) => {
        try {
            const { id } = req.params;
            const bank = await Bank.findOne({_id: id});
            await fs.unlink(path.join(`public/${bank.imageUrl}`));
            await bank.remove();
            req.flash('alertMessage', 'Success Delete Bank');
            req.flash('alertStatus', 'primary');
            res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    }
    ,

    viewItem: (req, res) => {
        res.render('admin/item/index', {
            title: "Staycation-admin | Item"
        });
    },

    viewBooking: (req, res) => {
        res.render('admin/booking/index', {
            title: "Staycation-admin | Booking"
        });
    }
}