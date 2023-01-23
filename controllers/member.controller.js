/* File untuk melakukan function CRUD / 

/* Import Model */
const memberModel = require(`../models/index`).member // melakukan inisialisasi terhadap index supaya terhubung ke db 

/* Import method operation sequelize  */
const Op = require(`sequelize`).Op


/* Function READ */
exports.getAllMember = async (request, response) => {
    /*  */
    /** call findAll() to get all data */
    let members = await memberModel.findAll() // use findAll() : Memangil semua data
    /* Mengembalikan response */
    return response.json({
        success: true,
        data: members,
        message: `All Members have been loaded`
    })
}

/** create function for filter */
exports.findMember = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.body.keyword

    /** call findAll() within where clause and operation 
     * to find data based on keyword  */
    let members = await memberModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { gender: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: members,
        message: `All Members have been loaded`
    })
}

/** create function for add new member */
exports.addMember = (request, response) => {
    /** prepare data from request */
    let newMember = {
        name: request.body.name,
        address: request.body.address,
        gender: request.body.gender,
        contact: request.body.contact
    }

    /** execute inserting data to member's table */
    memberModel.create(newMember) // 
        .then(result => {
            /** if insert's process success */
            return response.json({
                success: true,
                data: result,
                message: `New member has been inserted`
            })
        })
        .catch(error => {
            /** if insert's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}


/** create function for update member */
exports.updateMember = (request, response) => {
    /** prepare data that has been changed */
    let dataMember = {
        name: request.body.name,
        address: request.body.address,
        gender: request.body.gender,
        contact: request.body.contact
    }

    /** define id member that will be update */
    let idMember = request.params.id

    /** execute update data based on defined id member */
    memberModel.update(dataMember, { where: { id: idMember } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data member has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}


/** create function for delete data  */
exports.deleteMember = (request, response) => {
    /** define id member that will be update */
    let idMember = request.params.id

    /** execute delete data based on defined id member */
    memberModel.destroy({ where: { id: idMember } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data member has been deleted`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}



