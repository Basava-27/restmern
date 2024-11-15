import express from 'express';
import {createrestaurant,getAll,getOne,upDate,DeleteRest} from '../controller/restaurantcontroller.js';
const route=express.Router();
route.post('/create',createrestaurant);
route.get('/getall',getAll);
route.get('/getone/:id', getOne);
route.put('/update/:id',upDate);
route.delete('/delete/:id',DeleteRest);
export default route;