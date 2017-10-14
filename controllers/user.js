const bcrypt = require('bcryptjs');
const db = require('../model/db');
const pool = db.pool;

module.exports.addNormUser = function(user, callback){
    var sql = 'SELECT * FROM account WHERE email = ?';
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query(sql, [user.email],function (error, results, fields) {
            if (error) throw error;
            if (results.length!=0){
				connection.release();
				callback(null,true);
			}
			else{
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(user.pass, salt, (err, hash) => {
						if (err) throw err;
						sql = "INSERT INTO account (email,pass,arrayobject,time) VALUES (?,?,'";
						for(var i in user.arrayOb)//add array to sql
							sql += user.arrayOb[i] + ",";  
						sql += "',CURRENT_TIME())";
						connection.query(sql, [user.email, hash],function (error, results, fields) {
								connection.release();
								if (error) throw error;
								callback(null,false);
							});
						});
					});
				});
			}
        });
    });
}
