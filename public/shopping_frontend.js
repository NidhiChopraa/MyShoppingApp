$(() => {
    
    let name = $('#name')
    $('#add').click(() => {
        console.log("button clicked:- " + name.val())

        $.post('/api/users', {
            name: name.val()
        }, (data) => {

            if ($.isEmptyObject(data)) {
                alert('No Data Yet')
            } else {
                console.log("Logged in")
                fetchProducts()
            }

        })
    })

    function fetchProducts() {
        $.get('/api/products', (data) => {
            console.log("In fetch products")
            console.log(data)
            for (let product of data) {
                $("#product-list").append(productDisplay(product))
            }

        })
    }


})
function addToCart(product){
    let user = $("#name").val()
    $.post("/api/cart",
    {
        userId : data.id,
        prod : product
    })
}
function productDisplay(product) {
    return $(`
    <div class="col-4 card mx-2 p-4">
        <h4 class="product-name">${product.name}</h4>
        <div class="row">
        <div class="col m-3 p-3">
            <b>Rs.${product.price}</b>
        </div>
        <button id=${product.id} class="col btn btn-primary m-3" onclick="addCart(${product.id})">Add-to-cart</button>  
     </div>
</div>`
    )
}

function addCart(product){
    console.log("in add cart")
    let user= $("#name").val()
    if(typeof user=="undefined" || user.trim()==""){
       alert("Login first to add a product")
    
    }else{
        console.log("In else part of add item to cart")
        console.log(user +" "+product)
        $.get('/api/users/'+user,
        (user)=>{
            console.log(user)
            $.post('/api/cart',{
                userId:user.id,
                productId:product,
                quantity:1
            },
            (data)=>{
                console.log(data)
                alert("Product"+data.message+"Item added to cart")
            })
        })
    }
}


