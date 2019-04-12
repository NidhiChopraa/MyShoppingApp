$(() => {

  refreshList();

//for add button
  $('#add').click(() => {
    console.log('button clicked')
    $.post(
      '/api/products',
      {
        name: $('#name').val(),
        vId:$('#vendorName').val(),
        price:$('#price').val(),
        quantity:$('#quantity').val()
      },
      (data) => {
          console.log(data)
        if ($.isEmptyObject(data)) {
          alert('Some error occurred')
        } else {
          alert('Product added')
          refreshList()
        }
      }
    )
    })


})


function fetchVendors() {
  $.get('/api/vendors', (data) => {
    for (let d of data) {
      console.log(d)
      $('#vendorName').append(
        `<option value='${d.id}'>${d.name}</option>`
      )
    }
  })
}
fetchVendors()

function refreshList(){
  console.log("in refresh")
  let productList=$('#product-list')
  fetchProducts(function(products){
    productList.empty()
    console.log(products)
    for(product of products){
      productList.append(productDisplay(product))
    }
  })

}



function fetchProducts(done){
  console.log("in products")
$.get('/api/products', (data) => {
  done(data)
})
}


function productDisplay(product){
return $(`
        <tr>
            <td>${product.name}</td>
            <td>${product.vendor.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>  
            <td> <button type="button" id="${product.id}" onclick="deleteElement(${product.id})" class="btn btn-primary">Delete</button</td> 


        </tr>`
)
}



function deleteElement(id){
  console.log("In delte")
  $.ajax({
  url: '/api/products',
  type: 'DELETE',
  data: {
  id:id
  },
  success: function(result) {
  refreshList()
  }
  });
  }

