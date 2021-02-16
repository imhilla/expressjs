const express = require('express');
const members = require('../../members')
const router = express.Router()
const uuid = require('uuid')
// GET all members

router.get('/', (req, res) => {
  res.json(members);
})

// Get single member

router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: 'No member with that id found' })
  }
})

//create member
router.post('/', (req, res) => {
  // res.send(req.body)
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  }

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include name and email' })
  }

  members.push(newMember)
  res.json(members)
})

// update member 
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))
  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: 'Member was saved' })
      }
    });
  } else {
    res.status(400).json({ msg: 'No member with that id found' })
  }
})

// delete member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))
  if (found) {
    res.json({ msg: 'member deleted' , members: members.filter(member => member.id !== parseInt(req.params.id))})
  } else {
    res.status(400).json({ msg: 'No member with that id found' })
  }
})


module.exports = router;