class errorController {
    getError({query}, res) {
        res.render('error', ({error:query.error}));
    }
}

module.exports = new errorController();