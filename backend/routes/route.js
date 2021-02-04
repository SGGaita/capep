//import modules express and router
var express = require('express');
var router = express.Router();
var moment = require('moment');

var currenttime = new moment().format('YYYY-MM-DD HH:mm:ss');
var mysqlConnection = require('../dbconnect/db');



//Crud operations for group
//Retrieve from group
router.get('/group', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM \
capep_group g LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//retrieve from group by ID
router.get('/groupID/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM \
    capep_group g LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id \
    WHERE group_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});


//retrieve from group by Branch ID
router.get('/group/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM \
    capep_group g LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id \
    WHERE branch_id_fk = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});


//adding Branch
router.post('/group', (req, res, next) => {
    //logic here
    var newGroup = {
        group_name: req.body.group_name,
        group_code: req.body.group_code,
        group_location: req.body.group_location,
        group_town: req.body.group_town,
        branch_id_fk: req.body.branch_id_fk,
        staff_id_fk: req.body.staff_id_fk,
        group_reg_date: req.body.group_reg_date
    }

    mysqlConnection.query('INSERT INTO capep_group SET ? ', newGroup, (err, rows) => {
        if (!err)
            res.json('New Group successfully added');
        else
            res.json(err);
    });

});

// updating group
router.put('/group/:id', (req, res, next) => {
    //logic here
    var updateGroup = {
        group_name: req.body.group_name,
        group_code: req.body.group_code,
        group_location: req.body.group_location,
        group_town: req.body.group_town,
        branch_id_fk: req.body.branch_id_fk,
        staff_id_fk: req.body.staff_id_fk

    }

    mysqlConnection.query('UPDATE capep_group SET ? WHERE group_id =' + req.params.id, updateGroup, (err, rows) => {
        if (!err)
            res.json('Branch information updated successfully');
        else
            res.json(err);
    });
});

// deleting group
router.delete('/group/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('DELETE FROM capep_group WHERE group_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json('Group deleted successfully');
        else
            res.json(err);
    });

});
// End crud for group

//Crud operations for member

//retrieve from members by group no joins
router.get('/memberbyGID/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM\
    capep_members m LEFT JOIN capep_group g\
    ON m.group_id_fk = g.group_id\
    LEFT JOIN capep_branch b ON b.branch_id = g.branch_id_fk\
    WHERE group_id_fk = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});
//Retrieve from member
router.get('/member', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM capep_members m \
    LEFT JOIN capep_group g ON m.group_id_fk = g.group_id \
    LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
    ', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//retrieve from member by ID
router.get('/member/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM\
        capep_members m LEFT JOIN capep_group g\
        ON m.group_id_fk = g.group_id\
        LEFT JOIN capep_branch b ON b.branch_id = g.branch_id_fk\
        WHERE member_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//retrieve from member by group ID
router.get('/member_groupID/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM\
     capep_members m LEFT JOIN capep_group g\
     ON m.group_id_fk = g.group_id\
     LEFT JOIN capep_branch b ON b.branch_id = g.branch_id_fk\
     WHERE group_id_fk = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });
});




//adding member
router.post('/member', (req, res, next) => {
    //logic here
    var newMember = {
        group_id_fk: req.body.group_id_fk,
        member_name: req.body.member_name,
        member_id_no: req.body.member_id_no,
        membership_no: req.body.membership_no,
        occupation: req.body.occupation,
        phone_number: req.body.phone_number,
        postal_address: req.body.postal_address,
        postal_code: req.body.postal_code,
        location: req.body.location,
        town: req.body.town,
        passport_image: req.body.passport_image,
        id_image: req.body.id_image,
        signature_image: req.body.signature_image,
        next_kin_name: req.body.next,
        next_kin_relation: req.body.next_kin_relation,
        next_id_number: req.body.next_id_number,
        next_phone_number: req.body.next_phone_number,
        next_location: req.body.next_location,
        next_town: req.body.next_town,
        dateJoined: currenttime,
        date_created_at: currenttime
    }

    mysqlConnection.query('INSERT INTO capep_members SET ? ', newMember, (err, rows) => {
        if (!err)
            res.json('New member successfully added');
        else
            res.json(err);
    });

});

// updating group
router.put('/member/:id', (req, res, next) => {
    //logic here
    var updateMember = {
        group_id_fk: req.body.group_id_fk,
        member_name: req.body.member_name,
        member_id_no: req.body.member_id_no,
        membership_no: req.body.membership_no,
        occupation: req.body.occupation,
        phone_number: req.body.phone_number,
        postal_address: req.body.postal_address,
        postal_code: req.body.postal_code,
        location: req.body.location,
        town: req.body.town,
        passport_image: req.body.passport_image,
        id_image: req.body.id_image,
        signature_image: req.body.signature_image,
        next_kin_name: req.body.next,
        next_kin_relation: req.body.next_kin_relation,
        next_id_number: req.body.next_id_number,
        next_phone_number: req.body.next_phone_number,
        next_location: req.body.next_location,
        next_town: req.body.next_town

    }

    mysqlConnection.query('UPDATE capep_members SET ? WHERE member_id = ' + req.params.id, updateMember, (err, rows) => {
        if (!err)
            res.json('Branch information updated successfully');
        else
            res.json(err);
    });
});




// deleting member
router.delete('/member/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('DELETE FROM capep_members WHERE member_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json('Group deleted successfully');
        else
            res.json(err);
    });

});
// End crud for member



//SAVINGS CRUD
//retrieve savings
router.get('/savings', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM \
        capep_savings s LEFT JOIN capep_members m ON s.member_id_fk = m.member_id \
        LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
        LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
        ', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});


//Retrieve savings by member Id
router.get('/savings/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM \
        capep_savings s LEFT JOIN capep_members m ON s.member_id_fk = m.member_id \
        LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
        LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
        WHERE m.member_id = ?\
        ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//Retrieve by savings Id
router.get('/savingsSID/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM \
        capep_savings s LEFT JOIN capep_members m ON s.member_id_fk = m.member_id \
        LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
        LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
        WHERE s.savings_id = ?\
        ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//Retrieve by group Id
router.get('/savingsGID/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM \
        capep_savings s LEFT JOIN capep_members m ON s.member_id_fk = m.member_id \
        LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
        LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
        WHERE g.group_id = ?\
        ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//adding savings
router.post('/savings', (req, res, next) => {
    //logic here
    var newSavings = {
        //savings_id: req.body.savings_id,
        member_id_fk: req.body.member_id_fk,
        savings_amount: req.body.savings_amount,
        total_payments: req.body.total_payments,
        default: req.body.default,
        comments: req.body.comments,
        savings_date: req.body.savings_date
    }
    mysqlConnection.query('INSERT INTO capep_savings SET ? ', newSavings, (err, rows) => {
        if (!err)
            res.json('Savings added successfully');
        else
            res.json(err);
    });

});

//savings brought forward
//adding savings
router.post('/savingsBF', (req, res, next) => {
    //logic here
    var newSavings = {
        savings_id: req.body.savings_id,
        member_id_fk: req.body.member_id_fk,
        savings_amount: req.body.savings_amount,
        total_payments: req.body.total_payments,
        savings_bf: req.body.savings_bf,
        comments: req.body.comments,
        savings_date: req.body.savings_date
    }
    mysqlConnection.query('INSERT INTO capep_savings SET ? ', newSavings, (err, rows) => {
        if (!err)
            res.json('Savings bf added successfully');
        else
            res.json(err);
    });

});

//update savings
router.put('/savings/:id', (req, res, next) => {
    //logic here
    var updateSavings = {
        savings_amount: req.body.savings_amount,
        total_payments: req.body.total_payments,
        savings_bf: req.body.savings_bf,
        comments: req.body.comments,
        updated_at: req.body.update_date


    }

    mysqlConnection.query('UPDATE capep_savings SET ? WHERE savings_id = ' + req.params.id, updateSavings, (err, rows) => {
        if (!err)
            res.json('Savings updated successfully');
        else
            res.json(err);
    });
});


//delete savings

router.delete('/savings/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('DELETE FROM capep_savings WHERE savings_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json('Record deleted successfully');
        else
            res.json(err);
    });

});
//END OF SAVINGS CRUD

//LOAN CRUD
//retrieve loans 
router.get('/loans', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_group g\
          LEFT JOIN capep_members m ON m.group_id_fk = g.group_id\
          LEFT JOIN capep_savings s ON s.member_id_fk = m.member_id\
          INNER JOIN capep_loan l ON l.member_id_fk = m.member_id',
        (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
})


//retrieve loans by member id 
router.get('/loans/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM \
        capep_loan l LEFT JOIN capep_members m ON l.member_id_fk = m.member_id \
        LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
        LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
        WHERE m.member_id = ?',
        [req.params.id], (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
})

//retrieve loans by loan id 
router.get('/loansbyLID/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM \
    capep_loan l LEFT JOIN capep_members m ON l.member_id_fk = m.member_id \
    LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
    LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
    WHERE l.loan_id = ?',
        [req.params.id], (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
})

//retrieve new loan by member
router.get('/loansNewMID/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan l\
          LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
          LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
          LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
          WHERE l.loan_status = 0 AND m.member_id = ?',
        [req.params.id], (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
});

//retrieve New loans 
router.get('/loansNew', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan l\
            LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
            LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
            LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
            LEFT JOIN capep_loan_type t ON t.loan_type_id = l.loan_type_id_fk\
            WHERE l.loan_status = 0',
        (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
});

//retrieve New loans by branch
router.get('/loansNewBID/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan l\
            LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
            LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
            LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
            LEFT JOIN capep_loan_type t ON t.loan_type_id = l.loan_type_id_fk\
            WHERE l.loan_status = 0 AND b.branch_id = ?',
        [req.params.id], (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
});

//retrieve Accepted loans by branch
router.get('/loansAcceptedBID/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan l\
            LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
            LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
            LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
            LEFT JOIN capep_loan_type t ON t.loan_type_id = l.loan_type_id_fk\
            WHERE l.loan_status = 1 AND b.branch_id = ?',
        [req.params.id], (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
});


//retrieve declined loans by branch
router.get('/loansDeclinedBID/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan l\
            LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
            LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
            LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
            LEFT JOIN capep_loan_type t ON t.loan_type_id = l.loan_type_id_fk\
            WHERE l.loan_status = 2 AND b.branch_id =  ?',
        [req.params.id], (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
});

//retrieve New loans by branch
router.get('/loansNewGID/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan l\
            LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
            LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
            LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
            LEFT JOIN capep_loan_type t ON t.loan_type_id = l.loan_type_id_fk\
            WHERE l.loan_status = 0 AND g.group_id = ?',
        [req.params.id], (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
});

//retrieve Accepted loans by branch
router.get('/loansAcceptedGID/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan l\
            LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
            LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
            LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
            LEFT JOIN capep_loan_type t ON t.loan_type_id = l.loan_type_id_fk\
            WHERE l.loan_status = 1 AND g.group_id = ?',
        [req.params.id], (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
});


//retrieve declined loans by group
router.get('/loansDeclinedGID/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan l\
            LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
            LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
            LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
            LEFT JOIN capep_loan_type t ON t.loan_type_id = l.loan_type_id_fk\
            WHERE l.loan_status = 2 AND g.group_id =  ?',
        [req.params.id], (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
});

//retrieve Accepted loans 
router.get('/loansAccepted', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan l\
            LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
            LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
            LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
            LEFT JOIN capep_loan_type t ON t.loan_type_id = l.loan_type_id_fk\
            WHERE l.loan_status = 1',
        (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
})


//retrieve declined loans 
router.get('/loansDeclined', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan l\
            LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
            LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
            LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
            LEFT JOIN capep_loan_type t ON t.loan_type_id = l.loan_type_id_fk\
            WHERE l.loan_status = 2',
        (err, rows, fields) => {
            if (!err)
                res.json(rows);
            else
                res.json(err);
        });
})


// add loan
router.post('/loans', (req, res, next) => {
    var newLoan = {
        member_id_fk: req.body.member_id_fk,
        loan_type_id_fk: req.body.loan_type_id_fk,
        loan_amount: req.body.loan_amount,
        loan_fee: req.body.loan_fee,
        start_date: req.body.start_date,
        guarantorsName: req.body.guarantorsName,
        loan_purpose: req.body.loan_purpose,
        end_date: req.body.end_date,
        loan_status: req.body.loan_status,
        overide_status: req.body.overide_status,
        repayment_status: req.body.repayment_status,
        overide_comments: req.body.overide_comments,
        //default: req.body.default

    }
    mysqlConnection.query('INSERT INTO capep_loan SET ?', newLoan, (err, rows) => {
        if (!err) {
            res.json("Loan submitted successfully")
        } else {
            res.json(err)
        }

    })
})
// updating loans
router.put('/loans/:id', (req, res, next) => {
    //logic here
    var updateLoan = {
        //loan_id: req.body.loan_id,
        loan_type_id_fk: req.body.loan_type_id,
        loan_amount: req.body.loan_amount,
        loan_fee: req.body.loan_fee,
        insurance_amount: req.body.loan_insurance_rate,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        guarantorsName: req.body.guarantorsName,
        loan_purpose: req.body.loan_purpose,
        //comments: req.body.comments,
        // action_date: req.body.action_date

    }

    mysqlConnection.query('UPDATE capep_loan SET ? WHERE loan_id =' + req.params.id, updateLoan, (err, rows) => {
        if (!err)
            res.json('Records updated successfully');
        else
            res.json(err);
    });
});

// updating loans
router.put('/loanbyLID/:id', (req, res, next) => {
    //logic here
    var updateLoan = {
        //member_id_fk: req.body.member_id,
        //loan_type_id_fk: req.body.loan_type_id,
        loan_amount: req.body.loan_amount,
        loan_status: req.body.loan_status,
        //loan_fee: req.body.loan_fee,
        //action_date: req.body.action_date,
        //due_date: req.body.end_date,
        //guarantorsName: req.body.guarantorsName,
        //loan_purpose: req.body.loan_purpose,
        comments: req.body.comments,
        action_date: req.body.action_date

    }

    mysqlConnection.query('UPDATE capep_loan SET ? WHERE loan_id =' + req.params.id, updateLoan, (err, rows) => {
        if (!err)
            res.json('Records updated successfully');
        else
            res.json(err);
    });
});

// updating loans
router.put('/loanbyDeclineLID/:id', (req, res, next) => {
    //logic here
    var updateLoan = {
        //member_id_fk: req.body.member_id,
        //loan_type_id_fk: req.body.loan_type_id,
        //loan_amount: req.body.loan_amount,
        loan_status: req.body.loan_status,
        //loan_fee: req.body.loan_fee,
        //action_date: req.body.action_date,
        //due_date: req.body.end_date,
        //guarantorsName: req.body.guarantorsName,
        //loan_purpose: req.body.loan_purpose,
        comments: req.body.comments,
        action_date: req.body.action_date

    }

    mysqlConnection.query('UPDATE capep_loan SET ? WHERE loan_id =' + req.params.id, updateLoan, (err, rows) => {
        if (!err)
            res.json('Records updated successfully');
        else
            res.json(err);
    });
});


router.put('/loansbyId/:id', (req, res, next) => {
    //logic here
    var updateLoan = {
        //member_id_fk: req.body.member_id_fk,
        //loan_type_id_fk: req.body.loan_type_id_fk,
        //loan_amount: req.body.loan_amount,
        //loan_fee: req.body.loan_fee,
        //loan_purpose: req.body.loan_purpose,
        //guarantorsName: req.body.guarantorsName,
        loan_status: req.body.loan_status,
        //overide_status: req.body.overide_status,
        //repayment_status: req.body.repayment_status,
        //overide_comments: req.body.overide_comments,
        //comments: req.body.comments,
        //start_date: req.body.start_date,
        //end_date: req.body.end_date,
        action_date: req.body.action_date
    }

    mysqlConnection.query('UPDATE capep_loan SET ? WHERE loan_id =' + req.params.id, updateLoan, (err, rows) => {
        if (!err)
            res.json('Records updated successfully');
        else
            res.json(err);
    });
});


//delete loan 
router.delete('/loans/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('DELETE FROM capep_loan WHERE loan_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json('Record deleted successfully');
        else
            res.json(err);
    });

});

//END LOAN TYPE CRUD

//LOAN TYPE CRUD
//get loan types
//retrieve savings
router.get('/loan_type', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM \
        capep_loan_type', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//create loan type
router.post('/loan_type', (req, res, next) => {
    //logic here
    var newLoanType = {
        loan_type_id: req.body.loan_type_id,
        type_name: req.body.type_name,
    }
    mysqlConnection.query('INSERT INTO capep_loan_type SET ? ', newLoanType, (err, rows) => {
        if (!err)
            res.json('New type added successfully');
        else
            res.json(err);
    });

});


// updating loan type
router.put('/loan_type/:id', (req, res, next) => {
    //logic here
    var updateLoanType = {
        type_name: req.body.type_name
    }

    mysqlConnection.query('UPDATE capep_loan_type SET ? WHERE loan_type_id =' + req.params.id, updateLoanType, (err, rows) => {
        if (!err)
            res.json('Type information updated successfully');
        else
            res.json(err);
    });
});


//delete loan type
router.delete('/loan_type/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('DELETE FROM capep_loan_type WHERE loan_type_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json('Type deleted successfully');
        else
            res.json(err);
    });

});
//END LOAN TYPE CRUD

//LOAN TYPE CRUD
//get loan repayments
//retrieve repayments
router.get('/loan_repay', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM \
        capep_loan_repayment r LEFT JOIN capep_loan l ON r.loan_id_fk = l.loan_id \
        LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
        LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
        LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
        ', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//get loan repayments by member id

router.get('/loan_repayMID/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM \
        capep_loan_repayment r LEFT JOIN capep_loan l ON r.loan_id_fk = l.loan_id \
        LEFT JOIN capep_loan_type t ON l.loan_type_id_fk = t.loan_type_id\
        LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
        LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
        LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
        WHERE m.member_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//feetch by savings id
router.get('/loan_repaySID/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM \
        capep_loan_repayment r LEFT JOIN capep_loan l ON r.loan_id_fk = l.loan_id \
        LEFT JOIN capep_loan_type t ON l.loan_type_id_fk = t.loan_type_id\
        LEFT JOIN capep_savings s ON s.savings_id = r.savings_id_fk\
        LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
        LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
        LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
        WHERE s.savings_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//get loan repayments by loan id

router.get('/loan_repay/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM \
        capep_loan_repayment r LEFT JOIN capep_loan l ON r.loan_id_fk = l.loan_id \
        LEFT JOIN capep_loan_type t ON l.loan_type_id_fk = t.loan_type_id\
        LEFT JOIN capep_savings s ON s.savings_id = r.savings_id_fk\
        LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
        LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
        LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
        WHERE loan_id_fk = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//get repay by repay id
router.get('/loan_repayRID/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('SELECT * FROM \
        capep_loan_repayment r LEFT JOIN capep_loan l ON r.loan_id_fk = l.loan_id \
        LEFT JOIN capep_loan_type t ON l.loan_type_id_fk = t.loan_type_id\
        LEFT JOIN capep_members m ON l.member_id_fk = m.member_id\
        LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
        LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
        WHERE r.loan_repayment_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });

});

//create repayment
router.post('/loan_repay', (req, res, next) => {
    //logic here
    var newLoanRepay = {
        loan_id_fk: req.body.loan_id_fk,
        savings_id_fk: req.body.savings_id_fk,
        principal_amount: req.body.principal_amount,
        interest: req.body.interest,
        default_amount: req.body.default_amount,
        //default: req.body.default,
        date_of_payment: req.body.date_of_payment,
        //date_of_payment: 

    }
    mysqlConnection.query('INSERT INTO capep_loan_repayment SET ? ', newLoanRepay, (err, rows) => {
        if (!err)
            res.json('Loan repayment added successfully');
        else
            res.json(err);
    });

});


// updating repayment
router.put('/loan_repay/:id', (req, res, next) => {
    //logic here
    var updateRepayment = {
        //loan_id_fk: req.body.loan_id_fk,
        principal_amount: req.body.principal_amount,
        interest: req.body.interest,
        default_amount: req.body.default_amount,
        updated_at: req.body.update_at
    }
    console.log("test")

    mysqlConnection.query('UPDATE capep_loan_repayment SET ? WHERE savings_id_fk =' + req.params.id, updateRepayment, (err, rows) => {
        if (!err)
            res.json('Information updated successfully');
        else
            res.json(err);
    });
});


//delete repayment
router.delete('/loan_repay/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('DELETE FROM capep_loan_repayment WHERE loan_repayment_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json('repayment deleted deleted successfully');
        else
            res.json(err);
    });
});
//END LOAN TYPE CRUD

//on completion of loan


//BEGIN LOAN REPAY TERMS
//retrieve
router.get('/loan_repay_terms', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_repay_period', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });
});

//retrieve by id
router.get('/loan_repay_terms/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_repay_period WHERE staff_id = ?', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });
});

//create
router.post('/loan_repay_terms/', (req, res, next) => {
    //logic here
    var newRepayPeriod = {
        min_range: req.body.min_range,
        max_range: req.body.max_range,
        repay_period: req.body.repay_period,
        //date_of_payment: 
    }

    mysqlConnection.query('INSERT INTO capep_repay_period SET ? ', newRepayPeriod, (err, rows) => {
        if (!err)
            res.json('Repay period information created successfully');
        else
            res.json(err);
    });
});

//update
router.put('/loan_repay_terms/:id', (req, res, next) => {
    //logic here
    var updateRepayPeriod = {
        min_range: req.body.min_range,
        max_range: req.body.max_range,
        repay_period: req.body.repay_period,

        //date_of_payment: 
    }

    mysqlConnection.query('UPDATE capep_repay_period SET ? WHERE period_id =' + req.params.id, updateRepayPeriod, (err, rows) => {
        if (!err)
            res.json('Repay period information updated successfully');
        else
            res.json(err);
    });
});

//delete
router.delete('/loan_repay_terms/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('DELETE FROM capep_repay_period WHERE period_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json('Repay period deleted successfully');
        else
            res.json(err);
    });

});

//END LOAN REPAY TERMS

//Begin Loan conditions

router.get('/loan_conditions', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan_conditions', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });
})

router.put('/loan_conditions', (req, res, next) => {

    var updateCondition = {
        group_months: req.body.group_months,
        group_membership: req.body.group_membership,
        minimum_savings: req.body.minimum_savings,
        loan_penalization_state: req.body.loan_penalization_state,
        loan_issuance_state: req.body.loan_issuance_state
    }

    mysqlConnection.query('UPDATE capep_loan_conditions SET ?', updateCondition, (err, rows) => {
        if (!err)
            res.json('Conditions information updated successfully');
        else
            res.json(err);
    });

})

//BEGIN LOAN RATES
//retrieve
router.get('/loan_rates', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan_rates', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });
});
//select by id
router.get('/loan_rates/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_loan_rates WHERE rate_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });
});

//create
router.post('/loan_rates', (req, res, next) => {
    //logic here
    var newRate = {
        normal_rate: req.body.normal_rate,
        advance_rate: req.body.advance_rate,
        default_rate: req.body.default_rate,
        long_term: req.body.long_term,
        adv_term: req.body.adv_term
        //date_of_payment: 
    }

    mysqlConnection.query('INSERT INTO capep_loan_rates SET ? ', newRate, (err, rows) => {
        if (!err)
            res.json('Rate information created successfully');
        else
            res.json(err);
    });
});

//update
router.put('/loan_rates', (req, res, next) => {
    //logic here
    var updateRate = {
        normal_rate: req.body.normal_rate,
        advance_rate: req.body.advance_rate,
        default_rate: req.body.default_rate,
        long_term: req.body.long_term,
        adv_term: req.body.adv_term,
        insurance_rate: req.body.insurance_rate,
        updatedAt: currenttime,
        //date_of_payment: 
    }

    mysqlConnection.query('UPDATE capep_loan_rates SET ? ', updateRate, (err, rows) => {
        if (!err)
            res.json('Rate information updated successfully');
        else
            res.json(err);
    });
});

//delete
router.delete('/loan_rates/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('DELETE FROM capep_loan_rates WHERE rate_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json('Rate deleted successfully');
        else
            res.json(err);
    });

});

//END LOAN RATES

//BEGIN DIVIDEND
//retrieve dividends
router.get('/dividend', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_dividend', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    })
});

//retrieve dividend by member id
router.get('/dividend/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_dividend d\
    LEFT JOIN capep_members m ON d.member_id_fk = m.member_id \
    LEFT JOIN capep_group g ON m.group_id_fk = g.group_id\
    LEFT JOIN capep_branch b ON g.branch_id_fk = b.branch_id\
    WHERE m.member_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err)
    })
})


//retrieve dividend by id
router.get('/dividend/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_dividend WHERE dividend_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err)
    })
})


//retrieve dividend by group id

//post dividend
router.post('/dividend', (req, res, next) => {
    //logic here
    var newDividend = {
        member_id_fk: req.body.member_id_fk,
        dividend_amount: req.body.dividend_amount,
        dividend_rate: req.body.dividend_rate,
        purpose_1: req.body.purpose_1,
        purpose_2: req.body.purpose_2,
        purpose_3: req.body.purpose_3,
        createdAt: req.body.createdAt
        //date_of_payment: 
    }

    mysqlConnection.query('INSERT INTO capep_dividend SET ? ', newDividend, (err, rows) => {
        if (!err)
            res.json({
                message: 'Dividend submitted successfully'
            });
        else
            res.json(err);
    });
});

//update dividend

//delete dividend

//DIVIDEND PURPOSE
//retrieve dividend purpose 
router.get('/dividend_purpose', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_div_purpose', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err)
    })
})
//end dividend purpose

//re

//END DIVIDEND

//BEGIN STAFF CRUD
//retrieve
router.get('/staff', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_staff', (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });
});

//retrieve by id
router.get('/staff/:id', (req, res, next) => {
    mysqlConnection.query('SELECT * FROM capep_staff WHERE staff_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json(rows);
        else
            res.json(err);
    });
});
//END STAFF CRUD


//Post staff

router.post('/staff', (req, res, next) => {
    //logic here
    var newStaff = {
        staff_name: req.body.staff_name,
        staff_id_number: req.body.staff_id_number,
        staff_email: req.body.staff_email,
        staff_phone_number: req.body.staff_phone_number,
        staff_gender: req.body.staff_gender,
        staff_image: req.body.staff_image,
        staff_id_image: req.body.staff_id_image

        //date_of_payment: 
    }

    mysqlConnection.query('INSERT INTO capep_staff SET ? ', newStaff, (err, rows) => {
        if (!err)
            res.json('Staff information created successfully');
        else
            res.json(err);
    });
});

//Update staff
router.put('/staff/:id', (req, res, next) => {
    //logic here
    var updateStaff = {
        staff_name: req.body.staff_name,
        staff_id_number: req.body.staff_id_number,
        staff_email: req.body.staff_email,
        staff_phone_number: req.body.staff_phone_number,
        staff_gender: req.body.staff_gender,
        staff_image: req.body.staff_image,
        staff_id_image: req.body.staff_id_image,
        updatedAt: currenttime,
        //date_of_payment: 
    }

    mysqlConnection.query('UPDATE capep_staff SET ? WHERE staff_id =' + req.params.id, updateStaff, (err, rows) => {
        if (!err)
            res.json('Staff information updated successfully');
        else
            res.json(err);
    });
});

//Delete

router.delete('/staff/:id', (req, res, next) => {
    //logic here
    mysqlConnection.query('DELETE FROM capep_staff WHERE staff_id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.json('Staff deleted successfully');
        else
            res.json(err);
    });

});


module.exports = router;