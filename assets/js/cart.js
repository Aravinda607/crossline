// var storedArray = JSON.parse(localStorage.getItem('productArray')) || []

function addToCart(countId, name, price, imgId) {
  var count = parseInt(document.getElementById(countId).value)
  var img = document.getElementById(imgId)
  var srcPath = img.getAttribute('src')
  const product = {
    name: name,
    image: srcPath,
    count: count,
    price: parseFloat(price),
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
