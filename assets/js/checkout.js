var data1 = JSON.parse(localStorage.getItem('productArray'))

const tableBody = document.querySelector('.checkout-summary-table tbody')

let total = 0

data1.forEach((item) => {
  total += item.total
})

document.getElementById('grand-total').innerHTML = '$' + total.toFixed(2)


data1.forEach((item) => {
  const row = document.createElement('tr')
  const productCell = document.createElement('td')
  const totalCell = document.createElement('td')

  productCell.textContent = item.name
  totalCell.textContent = '$' + item.total.toFixed(2)

  row.appendChild(productCell)
  row.appendChild(totalCell)
  tableBody.appendChild(row)

 
})


