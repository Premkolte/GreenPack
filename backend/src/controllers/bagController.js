const Bag = require("../models/bag");

const addBag = async(req,res) => {
    const { qrcode } = req.body;
    
    try{
        const existingBag = await Bag.findOne({ qrcode });
        if(existingBag) { return res.status(400).json({message: "Bag already exists"})};
        
        const newBag = await Bag.create({ qrcode });
        res.status(201).json(newBag);
    }
    catch(error){
        res.status(500).json({message:"Error adding bag",error});
    }
};

const updateBagStatus = async(req,res) => {
    const { qrcode,status,conditionScore } = req.body;

    try{
        const bag = await Bag.findOne({ qrcode });
        if(!bag) { return res.status(404).json({message:"Bag not found"}) };

        bag.status = status || bag.status;
        if(conditionScore) { bag.conditionScore = conditionScore };

        bag.lifecycle.push({ event: `Status updated to ${status}`});
        await bag.save();
        res.status(200).json(bag);
    }
    catch(error){
        res.status(500).json({message:"Error updating bag status",error});
    }
}

const getBagLifecycle = async(req,res) => {
    const { qrcode } = req.params;
    
    try{
        const bag = await Bag.findOne({ qrcode });
        if(!bag) { return res.status(404).json({message:"Bag not found"})};

        res.status(200).json(bag.lifecycle);
    }
    catch(error){
        res.status(500).json({ message:"Error fetching bag lifecyle",error});
    }
}

const addLifecycleEvent = async(req,res) => {
    const { qrcode,event } = req.body;
    
    try{
        const bag = await Bag.findOne({ qrcode });
        if(!bag) { return res.status(404).json({ message: "Bag not found"})};

        const lifecycleEvent = { event, date: new Date() };
        bag.lifecycle.push(lifecycleEvent);
        await Bag.save();

        res.status(200).json({ message: "Event Added to Lifecycle", lifecycle: bag.lifecycle});
    }
    catch(error){
        res.status(500).json({ message: "Error updating lifecyle",error});
    }
}


module.exports = { addBag,updateBagStatus,getBagLifecycle,addLifecycleEvent };