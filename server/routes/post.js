const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Post = require('../model/Post')

//@route GET api/posts
//@desc Crete post
//@access Private
router.get('/',verifyToken, async(req,res)=>{
    try{
        const posts = await Post.find({user: req.userId}).populate('user',['username'])
        res.json({success:true, posts})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})


//@route POST api/posts
//@desc Crete post
//@access Private
router.post('/', verifyToken,async(req,res)=>{
    const{title,description,url,status} = req.body
    if(!title){
        return res.status(400).json({success:false,message:'Title is requred'})
    }
    try{
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO WATCH',
            user:req.userId
        })

        await newPost.save()

        res.json({success:true, message:'Happy watching', post:newPost})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})

//@route PUT api/posts
//@desc Crete post
//@access Private
router.put('/:id',verifyToken, async(req,res)=>{
    const {title,description,url,status} = req.body
    if(!title){
        return res.status(400).json({success:false,message:'Title is requred'})
    }
    try{
        let updatedPost = {
            title,
            description: description || '',
            url:(url.startsWith('https://')) ? url:`https://${url}` || '',
            status: status || 'TO WATCH'
            
        }

        const postUpdateCondition ={ _id: req.params.id, user:req.userId }
        updatedPost = await Post.findOneAndUpdate(postUpdateCondition,updatedPost,{new:true})

        //User not authorised to update post
        if(!updatedPost){
            return res.status(401).json({success:false,message:'Post not found or user not authorised'})
        }

        res.json({success:true,message:'Success!',post:updatedPost})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})

//@route DELETE api/posts
//@desc Crete post
//@access Private
router.delete('/:id',verifyToken,async(req,res)=>{
    try{
        const postDeteleCondition = {_id: req.params.id,user:req.userId}
        const deletePost = await Post.findOneAndDelete(postDeteleCondition)
        if(!deletePost){
            return res.status(401).json({success:false,message:'Post not found or user not authorised'})
        }
        res.json({success:true,post:deletePost})
    } catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})

module.exports = router