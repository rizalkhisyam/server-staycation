const Category = require('../models/Category');

module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/index', {
            title: "Staycation-admin | Category"
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
            req.flash('alertMessage', `$error.message`);
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
            req.flash('alertMessage', `$error.message`);
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
            req.flash('alertMessage', `$error.message`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
        
    },

    viewBank: (req, res) => {
        res.render('admin/bank/index', {
            title: "Staycation-admin | Bank"
        });
    },

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