import asyncHandler from 'express-async-handler';
import Library from '../models/library.js';

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

    const libraries = await Library.aggregate([ 
        {
            $match: { ...keyword}
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

        const exists = await Library.find({
            user: req.user._id,
            movie
        })

        if(exists && exists.length > 0){
            const library = new Library({
                movie,
                user: req.user,
                added: true
            });

            const created = await library.save();
            res.status(201).json({ library: created });

        }else{
            res.status(301);
            throw new Error('Connection already exists');    
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
        if(library.user === req.user){
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
        if(library.user === req.user){
            await library.remove();
            res.json({ message: 'Library removed successfully' });
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