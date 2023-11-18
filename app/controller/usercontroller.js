const pool =require("../../database")


module.exports.createUser = async function (req, res) {

    res.send("You reached create route of user")

 }

module.exports.createTable = async function (req, res) {

    const tableName=req.body["tablename"]
    
    const createTableQuery =`create table ${tableName}(SID VARCHAR(20) primary key ,SNAME VARCHAR(23),phono VARCHAR(10) not null )`
    try {
        const resp = await pool.query(createTableQuery)
        console.log(resp)
        res.send(`${tableName} Table created successfully`)
    } catch (error) {
    console.log(error)
    
    }

 }

 module.exports.insertData = async function (req, res) {

    const addValues=req.body["addvalues"]
    
    const {sid, sname, phono} = req.body;
    const createUserQuery =`insert into users values('${sid}','${sname}','${phono}')`

    try {
        const resp = await pool.query(createUserQuery)
        console.log(resp)
        res.send(`${addValues} data inserted successfully`)
    } catch (error) {
    console.log(error)
    
    }

 }  


 module.exports.updateData = async function (req, res)
  {
    const id= req.params.id
    const {sname,phono} = req.body;
    const updateData = `update users set sname ='${sname}', phono ='${phono}' where sid ='${id}'`
    //const updatesuser =`update users set sname='Nandy', phono='657894356' where sid= '${id}'`
try {
    const data = await pool.query(updateData) 
    console.log(data)
    res.json("data updated successfully")
    
 } catch (error) {
  console.log(error)
  res.send("Error fetchig data")   
 }

 }


