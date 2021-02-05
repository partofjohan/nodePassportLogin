module.exports = {
    ensureAuthenticated: (request, response, next) => {
        if(request.isAuthenticated()) {
            return next();
        } else {
            request.flash('errorMessage', 'Please log in to view this resource');
            response.redirect('/users/login');
        }
    }
}