const {db, Table} = require('./db.config.js')
// Create or Update users
const createOrUpdate = async (data = {}) =>{
    const params = {
        TableName: Table,
        Item: data
    }

    try{
        await db.put(params).promise()
        return { success: true }
    } catch(error){
        return { success: false}
    }
}

// Read all users
const getAllUsers = async()=>{
    const params = {
        TableName: Table
    }
    try{
        const { Items = [] } = await db.scan(params).promise()
        return { success: true, data: Items }

    } catch(error){
        return { success: false, data: null }
    }

}

// Read Users by ID
const getUserById = async (value, key = 'id') => {
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value)
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}        
    }
}

// Get Users by Name
const getUserByName = async (value, key = 'name') => {
    const params = {
        TableName: Table,
        Key: {
            [key]: value
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}
    }   
}

// Post User 
const postUser = async (data = {}) => {
    const params = {
        TableName: Table,
        Item: data
    } 
    try {
        await db.put(params).promise()
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

// Put User by ID
const putUserById = async (value, data = {}, key = 'id') => {
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value)
        },
        UpdateExpression: 'set #name = :name, #surname = :surname',
        ExpressionAttributeNames: {
            '#name': 'name',
            '#surname': 'surname'
        },
        ExpressionAttributeValues: {
            ':name': data.name,
            ':surname': data.surname
        }
    }
    try {
        await db.update(params).promise()
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

// Delete User by ID
const deleteUserById = async(value, key = 'id' ) => { 
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value)
        }
    }
        
    try {
        await db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        return{ success: false }
    }
}

module.exports = {
    createOrUpdate,
    getAllUsers,
    getUserById,
    deleteUserById,
    getUserByName,
    postUser,
    putUserById
}