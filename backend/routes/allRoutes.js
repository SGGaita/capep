const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController')
const userController = require('../controllers/userController')
const branchController = require('../controllers/branchController')

/************************************************/
/*                  Table of Contents           */
/************************************************/
/* 
1. Authentication Endpoints
    a. Register new system User
    b. Login User
    c. User profile
2. User Endpoints

3. Staff Endpoints

4. Branch Endpoints

5. Group Endpoints

6. Member Endpoints

7. Savings Endpoints

8. Loan Endpoints

9. Dividend Endpints

*/

//1. Authentication Endpoints
// Register new Customer account
router.post('/register', authenticationController.addNewUser);
// Login Customer
router.post('/login', authenticationController.loginUser );
//  User Profile
router.get('/profile', authenticationController.userProfile )

//2. User Endpoints
// Get all users
router.get('/user', userController.getAllUsers);
//get user by Id
router.get('/user/:id', userController.getUserById);
//update user account
router.put('/user/:id', userController.updateUser)
//delete user account
router.delete('/user/:id', userController.deleteUser)

//3. Staff Endpoints

//4. Branch Endpoints
//get all branches
router.get('/branch', branchController.getAllBranches)
//get branch by ID
router.get('/branch/:id', branchController.getBranchById)
//add new branch
router.post('/branch', branchController.addNewBranch)
//update branch information
router.put('/branch/:id', branchController.updatePartialBranch)
//patch branch information
router.patch('/branch/:id', branchController.updateBranch)
//delete branch information
router.delete('/branch/:id', branchController.deleteBranch)

//5. Group Endpoints

//6. Member Endpoints

//7. Savings Endpoints

//8. Loan Endpoints

//9. Dividend Endpoints

//10. 





module.exports = router;