function deleteProduct(productId){
  const choice = confirm("Do You Really Want to delete it?")
  if(choice == true){
    $.ajax({
      url:'/api/cart',
      type: 'DELETE',
      data :{
        id : productId
      },
      success : function(){
        refreshProductList()
      }
    })
  }
}

function refreshProductList(){
  
  $.get('/api/users/'+$("#name").val(),(user)=>{
    $.post("/api/cart/getItems",
    {id : user.id},
    (data)=>{
        $('#productList').empty()
        let i = 1
        console.log(data)
        for (let product of data) {
          $('#productList').append(
            `
            <tr >
              <td>${i++}</td>
              <td > ${product.product.name}</td>
              <td > ${product.quantity}</td>
              <td > ${product.product.price}</td>
              <td > 
                <button id="${product.id}" onclick="deleteProduct(${product.id})" type="button" class="btn btn-primary">Delete</button>
              </td>
            </tr>`
          )
        }
    })
}
)
}
$(()=>{
    $("#add").click(()=>{
      refreshProductList()
    })
})