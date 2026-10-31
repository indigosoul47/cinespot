import asyncHandler from 'express-async-handler';
import Library from '../models/library.js';
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

// TODO: Retrive for user
const getLibraries = asyncHandler(async (req, res) => {
    const pageSize = req.query.pSize && req.query.pSize > 0 ? req.query.pSize : 6;
    const page = Number(req.query.page) || 1;

    const  keyword  = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }: {};


    if(req.query.tags){
        keyword.tags = {
            $all: req.query.tags.split(',').map(tag => {
                return tag[0] === '#' ? tag.slice(1) : tag;
            })
        }
    }

    if(req.user){
        keyword.user = ObjectId(req.user._id);
    }

    const libraries = await Library.aggregate([ 
        {
            $match: { ...keyword, added: true },
        },
        {
            $lookup: {
                from: 'movies',
                localField: 'movie',
                foreignField: '_id',
                as: 'movie'
            }
        },{
            $unwind: '$movie'
        },  
        {
            $limit: parseInt(pageSize)
        },
        {
            $skip: +pageSize * (page - 1)
        }
    ])
    
    res.json({
        page,
        total: libraries.length,
        pages: Math.ceil(libraries.length/ pageSize),
        libraries: libraries.map(movie => ({ ...movie }))
    });
});

const getLibraryById = asyncHandler(async (req, res) => {
    const library = await Library.findById(req.params.id).populate('review');

    if(library){
        res.json(library);
    }else{
        res.status(404);
        throw new Error('Library not found');
    }
});

// TODO: verify created
const createLibrary = asyncHandler(async (req, res) => {
    if(req.user){

        const {
            movie,
        } = req.body;

        console.log('Create', movie)

        const exist = await Library.find({
            user: req.user._id,
            movie: ObjectId(movie)
        })

        console.log('Exi', exist)

        if(exist && exist.length > 0){
            res.status(301);
            throw new Error('Connection already exists');
        }else{
            const library = new Library({
                movie,
                user: req.user._id,
                added: true
            });

            const created = await library.save();
            res.status(201).json({ library: created });    
        }

    }else{
        res.status(401);
        throw new Error('User not found.');
    }
});

const updateLibrary = asyncHandler(async (req, res) => {
    const {
        rating,
        comment
    } = req.body;

    const library = await Library.findById(req.params.id);

    if(library){
        if(library.user.equals(req.user._id)){
            if(rating){
                library.rating = rating;
            }

            if(comment){
                library.comment = comment;
            }
            
            res.json(await library.save());
        }else{
            res.status(401);
            throw new Error('Invalid Permission: User');
        }
    }else{
        res.status(404);
        throw new Error('Library not found');
    }
});

const deleteLibrary = asyncHandler(async (req, res) => {
    const library = await Library.findById(req.params.id);

    if(library){
        if(library.user.equals(req.user._id)){
            library.added = false;
            res.json(await library.save());
        }else{
            res.status(401);
            throw new Error('Invalid Permission: User');
        }
    }else{
        res.status(404);
        throw new Error('Library not found');
    }
});

export {
    getLibraries,
    getLibraryById,
    deleteLibrary,
    updateLibrary,
    createLibrary
}