  let inputTitle = document.getElementById("inputTitle")
  let inputPrice = document.getElementById("inputPrice")
  let inputTaxes = document.getElementById("inputTaxes")
  let inputAds = document.getElementById("inputAds")
  let inputDescount = document.getElementById("inputDescount")
  let numberTotal = document.getElementById("numberTotal")
  let inputCount = document.getElementById("inputCount")
  let inputCategory = document.getElementById("inputCategory")
  let submitBtn = document.getElementById("createBtn")
  let priceData =document.querySelectorAll("#priceInfo input")
  let titleSearchBtn =  document.getElementById("titleSearchBtn")
  let CategorySearchBtn =  document.getElementById("CategorySearchBtn")
  let searchInput = document.getElementById("searchInput")
  let PriceSearchBtn = document.getElementById("PriceSearchBtn")
    let mood = 'create'
    let tmp;
  //Start Get Total Number
  function getTotal(){
    if(inputPrice.value != 0){
      let numberResult = (+inputPrice.value + +inputTaxes.value +  +inputAds.value) - +inputDescount.value
        numberTotal.innerHTML = numberResult
      numberTotal.classList.replace("bg-danger","bg-success")
    }else{
      numberTotal.innerHTML = ''
      numberTotal.classList.replace("bg-success","bg-danger")
    }
  }
  priceData.forEach((element)=>{
    element.addEventListener("keyup",getTotal)
  })
  //End Get Total Number
  // Start Create Data
  let saveData = [];
  if(localStorage.dataStorage != null){
    // saveData = JSON.parse(localStorage.dataStorage)
      saveData = JSON.parse(localStorage.dataStorage)
  }else{
    saveData = []
  }
  submitBtn.addEventListener("click",()=>{
    let dataInfo = {
      inputTitle:inputTitle.value,
      inputPrice:Number(inputPrice.value),
      inputTaxes:Number(inputTaxes.value),
      inputAds:Number(inputAds.value),
      inputDescount:Number(inputDescount.value),
      numberTotal:Number(numberTotal.innerHTML),
      inputCount:inputCount.value,
      inputCategory:inputCategory.value,
    }
    // Create Count Data
    if(inputTitle.value != '' &&  inputPrice.value != '' && inputCount.value >= 1000 && inputCategory.value != '' ){
      if(mood === 'create'){
        if(dataInfo.inputCount > 1){
          for(let i = 0 ; i < dataInfo.inputCount ; i++){
            saveData.push(dataInfo)
          }
        }else{
          saveData.push(dataInfo)
        }
      }else{
        saveData[tmp] = dataInfo
        submitBtn.innerHTML = 'Create'
        inputCount.classList.remove("d-none")
      }
    }
    
    localStorage.setItem('dataStorage',JSON.stringify(saveData))
    console.log(saveData);
    clearData()
    showData()
  })
  // End Create Data
  // Start Clear Data
  function clearData(){
    inputTitle.value = '';
    inputPrice.value = '';
    inputTaxes.value = '';
    inputAds.value = '';
    inputDescount.value = '';
    numberTotal.innerHTML = '';
    inputCount.value = '';
    inputCategory.value = '';
  }
  // End Clear Data
  // Start Show Data 
  function showData(){
    getTotal()
    let dataTable = ''
    for(let i = 0 ; i < saveData.length;i++){
        dataTable +=`<tr>
            <td>${i}</td>
              <td>${saveData[i].inputTitle}</td>
              <td>${saveData[i].inputPrice}</td>
              <td>${saveData[i].inputTaxes}</td>
              <td>${saveData[i].inputAds}</td>
              <td>${saveData[i].inputDescount}</td>
              <td>${saveData[i].numberTotal}</td>
              <td>${saveData[i].inputCategory}</td>
              <td><button type="button" onclick="updateData(${i})"  class="btn btn-outline-warning penStyle" id="ubdateBtn"><i class="fa-solid fa-pen"></i></button></td>
              <td><button type="button" onclick="deleteData(${i})" class="btn btn-outline-danger deleteBtn"><i class="fa-solid fa-trash"></i></button></td>
          </tr>`  
    }
    document.getElementById("crudsTbody").innerHTML = dataTable
    let deleteAllBtn = document.getElementById("deleteBtn")
    if(saveData.length > 0){
      deleteAllBtn.innerHTML = `<button onclick="deleteAll()" class="btn btn-danger w-100 mt-4 fw-bold btnStyle border-0">Delete All (${saveData.length}) </button>`
    }else{
      deleteAllBtn.innerHTML =''
    }
  }
  showData()
  // End Show Data 
  // Start delete data 
  function deleteData(i){
    saveData.splice(i,1)
    localStorage.dataStorage = saveData
    showData()
  }
  // End delete data 
//  Start  Delete All
  function deleteAll(){
    localStorage.clear()
    saveData.splice(0)
    showData()
  }   
//  End  Delete All
// Start Update 
function updateData(i){
  inputTitle.value = saveData[i].inputTitle;
  inputPrice.value = saveData[i].inputPrice;
  inputTaxes.value = saveData[i].inputTaxes;
  inputAds.value = saveData[i].inputAds;
  inputDescount.value = saveData[i].inputDescount;
  inputCategory.value = saveData[i].inputCategory;
  getTotal()
  inputCount.classList.add("d-none")
  submitBtn.innerHTML = 'Update'
  mood = 'Update'
  tmp = i
  scroll({
    top:0,
    behavior:"smooth"
  })
}
// End Update 

// Start Search
  let searchMood = 'title'
  function getSearchMood(id){
    if(id == 'titleSearchBtn'){
      searchMood = 'title'
    }else if(id == "CategorySearchBtn"){
      searchMood = 'category'
    }else{
      searchMood = 'Price'
    }
    searchInput.placeholder = 'Search By ' + searchMood
    searchInput.value = ''
    showData()
    searchInput.focus()
  }
  function searchData(value){
    let dataTable = ''
    for(i = 0 ; i < saveData.length ; i++){
      if(saveData[i].inputTitle.includes(value.toLowerCase())){
        dataTable +=`<tr>
            <td>${i}</td>
              <td>${saveData[i].inputTitle}</td>
              <td>${saveData[i].inputPrice}</td>
              <td>${saveData[i].inputTaxes}</td>
              <td>${saveData[i].inputAds}</td>
              <td>${saveData[i].inputDescount}</td>
              <td>${saveData[i].numberTotal}</td>
              <td>${saveData[i].inputCategory}</td>
              <td><button type="button" onclick="updateData(${i})"  class="btn btn-outline-warning penStyle" id="ubdateBtn"><i class="fa-solid fa-pen"></i></button></td>
              <td><button type="button" onclick="deleteData(${i})" class="btn btn-outline-danger deleteBtn"><i class="fa-solid fa-trash"></i></button></td>
          </tr>`  
        }else if(saveData[i].inputCategory.includes(value.toLowerCase())){
          dataTable +=`<tr>
            <td>${i}</td>
              <td>${saveData[i].inputTitle}</td>
              <td>${saveData[i].inputPrice}</td>
              <td>${saveData[i].inputTaxes}</td>
              <td>${saveData[i].inputAds}</td>
              <td>${saveData[i].inputDescount}</td>
              <td>${saveData[i].numberTotal}</td>
              <td>${saveData[i].inputCategory}</td>
              <td><button type="button" onclick="updateData(${i})"  class="btn btn-outline-warning penStyle" id="ubdateBtn"><i class="fa-solid fa-pen"></i></button></td>
              <td><button type="button" onclick="deleteData(${i})" class="btn btn-outline-danger deleteBtn"><i class="fa-solid fa-trash"></i></button></td>
          </tr>`
        }else if(saveData[i].inputPrice === Number(value)){
          dataTable +=`<tr>
          <td>${i}</td>
            <td>${saveData[i].inputTitle}</td>
            <td>${saveData[i].inputPrice}</td>
            <td>${saveData[i].inputTaxes}</td>
            <td>${saveData[i].inputAds}</td>
            <td>${saveData[i].inputDescount}</td>
            <td>${saveData[i].numberTotal}</td>
            <td>${saveData[i].inputCategory}</td>
            <td><button type="button" onclick="updateData(${i})"  class="btn btn-outline-warning penStyle" id="ubdateBtn"><i class="fa-solid fa-pen"></i></button></td>
            <td><button type="button" onclick="deleteData(${i})" class="btn btn-outline-danger deleteBtn"><i class="fa-solid fa-trash"></i></button></td>
        </tr>`
        }
      }
      document.getElementById("crudsTbody").innerHTML = dataTable
  }
// End Search