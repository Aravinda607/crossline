function addToCart(countId, name, price, imgId) {
  var count
  if (Number.isInteger(countId)) {
    count = countId
  } else {
    count = parseInt(document.getElementById(countId).value)
  }
  var img = document.getElementById(imgId)
  var srcPath = img.getAttribute('src')
  const product = {
    name: name,
    image: srcPath,
    count: count,
    price: parseFloat(price),
    total: count * parseFloat(price),
  }

  let array = JSON.parse(localStorage.getItem('productArray')) || []
  let duplicateIndex = array.findIndex((item) => item.name === product.name)

  if (duplicateIndex !== -1) {
    array[duplicateIndex].count += parseInt(product.count)
  } else {
    array.push(product)
  }

  localStorage.setItem('productArray', JSON.stringify(array))
}

const data = JSON.parse(localStorage.getItem('productArray')) || []

let total = 0

data.forEach((item) => {
  total += item.total
})

document.getElementById('amount1').innerHTML = '$' + total.toFixed(2)
document.getElementById('amount2').innerHTML = '$' + total.toFixed(2)

const tableBody = document.querySelector('.cart-table tbody')

data.forEach((item) => {
  const row = document.createElement('tr')

  const imageCell = document.createElement('th')
  const imageLink = document.createElement('a')
  const image = document.createElement('img')
  image.src = item.image
  image.alt = item.name
  imageLink.href = './product-details-Beverages-Coffee.html'
  imageLink.appendChild(image)
  imageCell.appendChild(imageLink)
  row.appendChild(imageCell)

  const nameCell = document.createElement('td')
  const nameLink = document.createElement('a')
  nameLink.href = './product-details-Beverages-Coffee.html'
  nameLink.textContent = item.name
  nameCell.appendChild(nameLink)
  row.appendChild(nameCell)

  const priceCell = document.createElement('td')
  priceCell.textContent = '$' + item.price.toFixed(2)
  row.appendChild(priceCell)

  const quantityCell = document.createElement('td')
  const quantityCount = document.createElement('div')
  quantityCount.className = 'product-quantity-count'
  const decButton = document.createElement('button')
  decButton.className = 'dec qty-btn'
  decButton.textContent = '-'
  const quantityBox = document.createElement('input')
  quantityBox.className = 'product-quantity-box'
  quantityBox.type = 'text'
  quantityBox.name = 'quantity'
  quantityBox.value = item.count.toString()
  const incButton = document.createElement('button')
  incButton.className = 'inc qty-btn'
  incButton.textContent = '+'
  quantityCount.appendChild(decButton)
  quantityCount.appendChild(quantityBox)
  quantityCount.appendChild(incButton)
  quantityCell.appendChild(quantityCount)
  row.appendChild(quantityCell)

  const totalCell = document.createElement('td')
  totalCell.className = 'total'
  const total = item.price * item.count
  totalCell.textContent = '$' + total.toFixed(2)
  row.appendChild(totalCell)

  const removeCell = document.createElement('td')
  const removeButton = document.createElement('button')
  removeButton.className = 'remove-btn'
  const removeIcon = document.createElement('i')
  removeIcon.className = 'sli-close'
  removeButton.appendChild(removeIcon)
  removeCell.appendChild(removeButton)
  row.appendChild(removeCell)

  tableBody.appendChild(row)

  decButton.addEventListener('click', () => {
    handleDecrement(row, item)
  })

  incButton.addEventListener('click', () => {
    handleIncrement(row, item)
  })

  removeButton.addEventListener('click', () => {
    handleRemove(row, item)
  })
})

function updateTotal(row, item) {
  const quantityInput = row.querySelector('.product-quantity-box')

  item.count = parseInt(quantityInput.value)
  item.total = item.count * item.price

  const totalCell = row.querySelector('.total')
  totalCell.textContent = '$' + item.total.toFixed(2)

  console.log(item, quantityInput)
  console.log(data)

  let total = 0

  data.forEach((item) => {
    total += item.total
  })

  document.getElementById('amount1').innerHTML = '$' + total.toFixed(2)
  document.getElementById('amount2').innerHTML = '$' + total.toFixed(2)

  localStorage.setItem('productArray', JSON.stringify(data))
}

function handleDecrement(row, item) {
  const quantityInput = row.querySelector('.product-quantity-box')
  let count = parseInt(quantityInput.value)

  if (count > 1) {
    count--
    quantityInput.value = count
    updateTotal(row, item)
  }
}

function handleIncrement(row, item) {
  console.log(row, item)
  const quantityInput = row.querySelector('.product-quantity-box')
  let count = parseInt(quantityInput.value)

  count++
  quantityInput.value = count
  updateTotal(row, item)
}

function handleRemove(row, item) {
  tableBody.removeChild(row)

  const index = data.findIndex((product) => product.name === item.name)
  if (index !== -1) {
    data.splice(index, 1)
  }

  localStorage.setItem('productArray', JSON.stringify(data))
}

console.log(data)
