import express from 'express'
import cors from 'cors'
import { faker } from '@faker-js/faker'

const app = express()

app.use(cors())
app.use(express.json())

export function createRandomUser() {
  let users = []
  for (let i = 0; i < 10; i++) {
    users.push({
      id: faker.string.uuid(),
      img: faker.image.url(),
      lastname: faker.person.lastName(),
      firstName: faker.person.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      createdAt: faker.date.past(),
      verified: Math.random() > 0.5 ? true : false,
    })
  }

  return users
}

export function createRandomProduct() {
  let products = []
  for (let i = 0; i < 10; i++) {
    products.push({
      id: faker.string.uuid(),
      img: faker.image.url(),
      title: faker.commerce.productName(),
      color: faker.color.human(),
      producer: faker.company.name(),
    })
  }

  return products
}

let users = createRandomUser()
let products = createRandomProduct()

console.log(products)

// GET USERS
app.get('/api/users', (req, res) => {
  res.json(users)
})

// GET USER
app.get('/api/users/:id', (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id))
  res.json(user)
})

// ADD USER
app.post('/api/users', (req, res) => {
  users.unshift(req.body)
  res.json(users)
})

// DELETE USER
app.delete('/api/users/:id', (req, res) => {
  users = users.filter((user) => user.id !== parseInt(req.params.id))
  res.json('User deleted!')
})

// GET PRODUCTS
app.get('/api/products', (req, res) => {
  res.json(products)
})

// GET PRODUCT
app.get('/api/products/:id', (req, res) => {
  const product = products.find(
    (product) => product.id === parseInt(req.params.id)
  )
  res.json(product)
})

// ADD PRODUCT
app.post('/api/products', (req, res) => {
  products.unshift(req.body)
  res.json(products)
})

// DELETE PRODUCT
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(
    (product) => product.id !== parseInt(req.params.id)
  )
  res.json('Product deleted!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}...`)
})
