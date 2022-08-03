const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn } = require('../middleware');
const { validateCampground } = require('../middleware');
const { isAuthor } = require('../middleware');
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer( {storage}  )


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array('image'),validateCampground, catchAsync(campgrounds.createCampground))
    // .post(upload.array('image'),function (req,res)  {
    //     res.send(req.body,req.files);
    //     console.log("Body ->",req.body)
    //     console.log("File ->",req.files);
    // })


router.get('/new',isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground, catchAsync(campgrounds.updateCampground))
    .delete( isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground))
    
router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router;