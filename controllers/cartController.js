import userModel from "../models/userModel.js"


const addToCart = async (req,res) =>{
    try{

        const{userId,itemId,size} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        if (cartData[itemId]) {
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1
            }
            else{
                cartData[itemId][size] = 1
            }      
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId,{cartData})
        console.log(cartData)

        res.json({success : true , message : 'Added to Cart'})

    }catch(error){
       console.log(error)
       res.json({success : false ,message : error.message})
    }
}
const updateToCart = async (req,res) =>{
    try{

        const{userId,itemId,size,quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][size]=quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success : true , message : 'Cart Updated'})



    }catch(error){
        console.log(error)
        res.json({success : false ,message : error.message})
     }
}
const getToCart = async (req,res) =>{
    try{
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        res.json({success : true , cartData})

    }catch(error){
        console.log(error)
        res.json({success : false ,message : error.message})
     }
}


export {addToCart,updateToCart,getToCart}

