const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    
    opts.secretOrKey = config.secret;
    
    passport.use(new JwtStrategy(opts,function(jwt_payload,done) {
        var id = jwt_payload._id;
        console.log("check");
        User.getUserById(id,(err,user)=> {
            if(err) {
                return done(err,false);
            }
            if(user) {
                return done(null,user);
            }
            if(err) {
                return done(null,false);
            }    
        });
    }));
}