const isLogin = (req, res, next) => {
    if (req.session.user == null || req.session.user == undefined) {

        req.flash('alertMessage', `Session telah habis, Silahkan login kembali`);
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/login');
    }else {
        next();
    }
}

module.exports = isLogin