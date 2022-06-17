const express = require('express')
const cors = require('cors');
const { urlencoded } = require('body-parser');
const data = require('./backend_task1.json')['people'];

const app = express();

app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:true}))


//@DESC To get details of persons with maximum age
//@TYPE GET
app.get('/api/maxAge',(req,res)=>{
    var maxage = 0
    var maxAgePeople = []
    for(const key in data){
        const people = data[key]
        if(people['age']>maxage){
            maxage = people['age']
            maxAgePeople = []
        }
        if(people['age']==maxage){
            maxAgePeople.push(people)
        } 
    }
    res.status(200).send(maxAgePeople)
})

//@DESC To get details of persons with phone no's last and first digit matching
//TYPE GET
//No given data satisfy condition so added own data :/
app.get('/api/phoneMatch',(req,res)=>{
    var peopleRes = []
    for(const key in data){
        const people = data[key]
        const phnNo = people['number']
        console.log(phnNo[phnNo.length-1])
        console.log(phnNo[0]==phnNo[phnNo.length-1])
        if(phnNo[0]==phnNo[phnNo.length-1]) peopleRes.push(people)
    }
    res.send(peopleRes)
})

//@DESC Register User with data from x-www-form-urlencoded data
//TYPE post
//Left incomplete no database added and no time host ;////
app.post('/api/register',(req,res)=>{
    const {name,regno,dept,tag,domain,mobile,email} = req.body
    if(validateRegisteration(req.body)){
        res.send(req.body)
    }
})

const validateRegisteration = (data) =>{
    const {name,regno,dept,tag,domain,mobile,email} = data
    if(!(name&&regno&&dept&&tag&&domain&&mobile&&email)){
        res.status(400).send('Enter all the Field')
    }
    return true
}

const PORT = 8000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})