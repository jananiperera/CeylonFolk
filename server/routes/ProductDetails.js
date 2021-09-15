const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Designs,sequelize } = require('../models');

router.get("/byId/:id", async (req,res) => {
    const id = req.params.id
    // const query1 = "SELECT designs.designId,designs.color,designs.designName,designs.designImage,inventories.size,inventories.quantity,inventories.inventoryId FROM `designs` INNER JOIN `inventories` ON designs.color=inventories.colour WHERE inventories.colour=(SELECT designs.color FROM `designs` WHERE designs.designId='"+id+"') AND  designs.designId='"+id+"'";
    
    const query1="SELECT sizes.size, inventories.id from `sizes` INNER JOIN `inventories` on inventories.size_id=sizes.id INNER JOIN `designs` on inventories.colour_id=designs.color_id AND inventories.type_id=designs.type_id WHERE designs.id='"+id+"'";
    const sizeList = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});
    res.json(sizeList);
    // const product = await Designs.findByPk(id)
    // if(product){
        // const query1 = "SELECT color FROM `designs` WHERE designId='"+id+"'";
        // const sList = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});
        
        // console.log(res.json(sList));
        // res.json(sList.color);
        // const color = sList.color;
        
        // const query2 = "SELECT designs.designId,designs.color,inventories.size FROM `designs` INNER JOIN `inventories` ON designs.color=inventories.colour WHERE inventories.colour='"+color+"'"; 
        // const sizeList = await sequelize.query(query2, {type: sequelize.QueryTypes.SELECT});
        // res.json(sizeList);
    // }
    // res.json(product);
});

router.get("/byPid/:id", async (req,res) => {
    const id = req.params.id;
    const product = await Designs.findByPk(id)
    console.log(product)
    res.json(product);
});

// router.get("/size/:color", async (req,res) => {
//     const color = req.params.color;
//     const query = "SELECT designs.designId,designs.color,inventories.size FROM `designs` INNER JOIN `inventories` ON designs.color=inventories.colour WHERE inventories.colour='"+color+"'"; 
//     const sizeList = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
//     res.json(sizeList);
// });

// router.get("/byIdImages/:id", async (req,res) => {
//     const id = req.params.id
//     const query2 = "SELECT designs.id AS designId,designs.design_name AS designName,designs.color,designs.coverImage AS designImage FROM `designs`  WHERE designs.design_name=(SELECT designs.design_name FROM `designs` WHERE designs.id='"+id+"')";
//     const imageList = await sequelize.query(query2, {type: sequelize.QueryTypes.SELECT});
//     res.json(imageList);
// });

// router.get("/imagesArray/:id", async (req,res) => {
//     const id = req.params.id
//     const query2 = "SELECT designs.id,designs.coverImage AS designImage FROM `designs`  WHERE designs.coverImage=(SELECT designs.coverImage FROM `designs` WHERE designs.id='"+id+"')";
//     const imageList = await sequelize.query(query2, {type: sequelize.QueryTypes.SELECT});
//     res.json(imageList);
// });

// router.get("/mapSize/:id", async (req,res) => {
//     const id = req.params.id
//     const query1 = "SELECT designs.id AS designId,designs.color_id AS color,designs.design_name AS designName,designs.coverImage AS designImage,inventories.size_id AS size,inventories.quantity,inventories.id AS inventoryId FROM `designs` INNER JOIN `inventories` ON designs.color_id=inventories.colour_id WHERE designs.design_name=(SELECT designs.design_name FROM `designs` WHERE designs.id='"+id+"') ";
//     const designSizeList = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});
//     res.json(designSizeList);
// });

router.get("/quantity/:id", async (req,res) => {
    const id = req.params.id

    // const query1 = "SELECT inventories.quantity FROM `designs` INNER JOIN `inventories` ON designs.color=inventories.colour WHERE inventories.colour=(SELECT designs.color FROM `designs` WHERE designs.designId='"+id+"') AND  designs.designId='"+id+"'";

    const query="SELECT inventories.quantity FROM `inventories` INNER JOIN `sizes` ON inventories.size_id = sizes.id INNER JOIN `designs` ON inventories.colour_id = designs.color_id AND inventories.type_id = designs.type_id WHERE designs.id = '"+id+"'";
    const designSizeList = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    res.json(designSizeList);
});

// router.post("/",async (req, res) => {
//     //     console.log(req.file);
//         const post = req.body;
//         await ProductDetails.create(post);
//         res.json("success");
// });

router.post("/addwishlist",async (req, res) => {
    const itemId = req.body.id;
    const uId = req.body.uid;
    const query1 = "SELECT itemId FROM wishlists WHERE itemId ='"+itemId+"' AND userId='"+uId+"'";
    const wishlistItem = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});
    console.log(wishlistItem)
    if(wishlistItem.length > 0 ){
        const query2 = "DELETE FROM wishlists WHERE userId='"+uId+"' AND itemId='"+itemId+"'";
        const removewishlist = await sequelize.query(query2, { type: sequelize.QueryTypes.DELETE });
        // res.json(removewishlist);
    }else{
        const query = "INSERT INTO wishlists(`itemId`,`userId`) VALUES('"+itemId+"','"+uId+"')";
        const wishlist = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
        // res.json(wishlist);
        
    }
    const query ="SELECT designs.id,designs.collection_id,designs.design_name,designs.color_id,designs.type_id,designs.coverImage,designs.price, CASE WHEN wishlists.itemId IS NULL THEN 0 ELSE 1 END AS isInWishList FROM `designs` LEFT JOIN wishlists ON wishlists.itemId = designs.id AND wishlists.userId = '"+uId+"' GROUP BY design_name"
    const listOfDesignsDB = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(listOfDesignsDB);
})


module.exports = router;