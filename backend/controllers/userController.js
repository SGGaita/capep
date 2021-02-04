const express = require('express');
const {database} = require('../dbconnect/db_mysqli');


//Get all Users
const getAllUsers = (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10; // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit; // 0, 10, 20, 30
        endValue = page * limit; // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }

    database.table('capep_sys_users as u')
        .leftJoin([{
                table: "capep_staff as s",
                on: `u.staff_id_fk = s.staff_id`
            },
            {
                table: "capep_branch as b",
                on: `u.branch_id_fk = b.branch_id`
            }
        ])
        .withFields([
            'u.user_id',
            's.staff_id',
            'b.branch_id',
            'u.userName',
            'u.email',
            'u.roles',
            'u.createdAt as account_date',
            's.staff_name',
            's.staff_image',
            's.staff_id_image',
            'b.branch_name',
            'b.branch_code'
        ])
        .slice(startValue, endValue)
        .sort({
            user_id: .1
        })
        .getAll()
        .then(user => {
            if (user.length > 0) {
                res.status(200).json({
                    count: user.length,
                    users: user
                });
            } else {
                res.json({
                    message: "No users found"
                });
            }
        })
        .catch(err => console.log(err));
}

//get user by ID
const getUserById = (req, res) => {
    let userId = req.params.id;
    database.table('capep_sys_users as u')
        .leftJoin([{
                table: "capep_staff as s",
                on: `u.staff_id_fk = s.staff_id`
            },
            {
                table: "capep_branch as b",
                on: `u.branch_id_fk = b.branch_id`
            }
        ])
        .withFields([
            'u.user_id',
            's.staff_id',
            'b.branch_id',
            'u.userName',
            'u.email',
            'u.roles',
            'u.createdAt as account_date',
            's.staff_name',
            's.staff_image',
            's.staff_id_image',
            'b.branch_name',
            'b.branch_code'
        ])
        .filter({
            'u.user_id': userId
        })
        .get()
        .then(user => {
            console.log(user);
            if (user) {
                res.status(200).json(user);
            } else {
                res.json({
                    message: `No user found with id ${userId}`
                });
            }
        }).catch(err => res.json(err));
}

//update user information
const updateUser = (req, res) => {
    let userId = req.params.id;
    var updateUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        branch_id_fk: req.body.branch_id_fk,
        staff_id_fk: req.body.staff_id_fk,
        roles: req.body.roles
    }
    database.table('capep_sys_user')
        .filter({
            'user_id': userId
        })
        .update(updateUser)
        .then(user => {
            if (user) {
                res.status(200).json({
                    count: user,
                    message: `The user records have a been updated successfully`
                });
                console.log("user resource", user)
            } else {
                res.json({
                    message: `No user found with id ${userId}`
                });
            }
        }).catch(err => res.json(err));
}

//delete user account
const deleteUser = (req, res) => {
    let userId = req.params.id;
    database.table('capep_sys_users')
        .filter({
            'user_id': userId
        })
        .remove()
        .then(user => {
            if (user) {
                res.status(200).json({
                    count: user,
                    message: `The user records have a been deleted successfully`
                });
                console.log("user resource", user)
            } else {
                res.json({
                    message: `No user found with id ${userId}`
                });
            }
        }).catch(err => res.json(err));
}



module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}