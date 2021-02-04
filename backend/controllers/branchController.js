const express = require('express');
const {database} = require('../dbconnect/db_mysqli');


const getAllBranches = (req,res)=>
    { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products?page=1
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
    
        database.table('capep_branch')
            .slice(startValue, endValue)
            .sort({
                branch_id: .1
            })
            .getAll()
            .then(branch => {
                if (branch.length > 0) {
                    res.status(200).json({
                        count: branch.length,
                        branches: branch
                    });
                } else {
                    res.json({
                        message: "No branches were found"
                    });
                }
            })
            .catch(err => {
                console.log("This error",err)});
}

//fetch branch by ID
const getBranchById = (req,res)=>{
        let branchId = req.params.id;
        database.table('capep_branch')
            .withFields([
                'branch_id',
                'branch_name',
                'branch_code',
                'branch_description',
                'branch_createdat',
                'updated_at'
                
            ])
            .filter({
                'branch_id': branchId
            })
            .get()
            .then(branch => {
                console.log(branch);
                if (branch) {
                    res.status(200).json(branch);
                } else {
                    res.json({
                        message: `No branch found with id ${branchId}`
                    });
                }
            }).catch(err => res.json(err));
}

//create new branch
const addNewBranch = (req,res)=>{}

//update branch information
const updatePartialBranch = (req,res)=>{}

//patch branch information
const updateBranch = (req, res)=>{}

//Delete branch information
const deleteBranch = (req,res) => {

}

module.exports = {getAllBranches, getBranchById, addNewBranch, updatePartialBranch , updateBranch, deleteBranch}