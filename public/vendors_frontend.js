$(() => {

    
  
    refreshList()
  
    $('#add').click(() => {
      $.post(
        '/api/vendors',
        {
          name: $('#name').val()
        },
        (data) => {
            console.log(data)
          if (data.success) {
            refreshList()
          } else {
            alert('Some error occurred')
          }
        }
      )
    })

   
      
  
  })

  function refreshList() {
    $.get('/api/vendors', (data) => {
      $('#vendorlist').empty()
      console.log(data)
      for (let d of data) {
        $('#vendorlist').append(vendorDisplay(d))
          /`<li> ${d.name}</li>`
        
      }
    })
  }

  function vendorDisplay(vendor){
    return $(`
            <tr>
                <td>${vendor.name}</td>
                <td>${vendor.id}</td>
                <td> <button type="button" id="${vendor.id}" onclick="deleteElement(${vendor.id})" class="btn btn-primary">Delete</button</td> 
            </tr>`
    )
    }


  function deleteElement(id){
    console.log("In delete")
    $.ajax({
    url: '/api/vendors',
    type: 'DELETE',
    data: {
    id:id
    },
    success: function(result) {
    refreshList()
    }
    });
    }