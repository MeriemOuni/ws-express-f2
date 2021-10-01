// require express
const express = require("express");

// instance app
const app = express();

// Middlewar of express
app.use(express.json())


// Simple route 
app.get('/', (req, res) => {
    res.send("Hello world")
})

// CRUD
let contact = [
    {
        name: "Oumayma",
        email: "oumayma@gmail.com",
        id: 1
    },
    {
        name: "Nidhal",
        email: "nidhal@gmail.com",
        id: 2
    },
    {
        name: "Youssef",
        email: "youssef@gmail.com",
        id: 3
    }
]

/**
 * get all contact
 * method : GET
 * path: /contact
 */
app.get('/contact', (req, res) => {
    res.status(200).send({msg:"List of contact", contact})
})

/**
 * get contact
 * method : GET
 * path: /contact/:contactId
 */
app.get('/contact/:contactId', (req, res) => {
    const contactId = Number(req.params.contactId);
    const contactToGet = contact.find(contact => contact.id === contactId)
    if (contactToGet) {
        res.status(200).send({msg: "I find the contact", contactToGet})
    } else {
        res.status(400).send("Can not get the contact")
    }
})

/**
 * post contact
 * method : POST
 * path: /contact/add_contact
 */
app.post('/contact/add_contact', (req, res) => {
    const newContact = req.body;
    contact = [...contact, newContact];
    res.status(200).send({msg: "Contact added", contact})
})

/**
 * delete contact
 * method : DELETE
 * path: /contact/delete_contact/:contactId
 */
app.delete('/contact/delete_contact/:contactId', (req, res) => {
    const contactId = Number(req.params.contactId);
    const contactToDeltete = contact.filter( contact => contact.id === contactId)
    if (contactToDeltete) {
        contact = contact.filter(contact => contact.id !== contactId)
        res.status(200).send({msg: " Contact deleted", contact})
    } else {
        res.status(400).send({msg:"Contact not found !!"})
    }
})

/**
 * edit contact
 * method : PUT
 * path: /contact/edit_contact/:contactId
 */
app.put('/contact/edit_contact/:contactId', (req, res) => {
    const contactId = Number(req.params.contactId);
    const newContact = req.body;
    const contactToEdit = contact.find( contact => contact.id === contactId)
    if (contactToEdit){
        contact = contact.map(contact => contact.id === contactId ? {...contact, ...newContact}: contact)
        res.status(200).send({msg:"Contact edited ", contact})
    } else {
        res.status(400).send("Conrtact not found !!")
    }
})


// create server
const port = 7000
app.listen(port, (error) => {
    error ? console.log(error)
    :
    console.log(`Server is running on port ${port} ...`)
})