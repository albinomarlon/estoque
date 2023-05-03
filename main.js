const listInventory = []

function addCurrentInventory(){
    const item = createItem()
    const row = getTable().insertRow()
    row.id = item.id
    addCheck(row)
    addRow(item.nome, row)
    addRow(item.marca, row)
    addRow(item.quantidade, row)
    addRow(item.preco, row)
    addDeleteButton(row)
    resumeOfList()
}

function deleteItem(id){
    const relativeIndex = 
        document.getElementById(id).rowIndex - 1
    getTable().deleteRow(relativeIndex)
    const indexOfList = listInventory.findIndex(i => i.id == id)
    listInventory.splice(indexOfList, 1)
    resumeOfList()
}

function addDeleteButton(row){
    const cell = row.insertCell()
    const input = document.createElement('button')
    input.setAttribute('class', 'btn btn-danger')
    input.setAttribute('onClick', `deleteItem(${row.id})`)
    input.innerText = 'Deletar'
    cell.appendChild(input)
}

function addCheck(row){
    const cell = row.insertCell()
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    cell.appendChild(input)
}

function addRow(texto, row){
    const cell = row.insertCell()
    const text = document.createTextNode(texto)
    cell.appendChild(text)
}

function getTable(){
    return document.querySelector('#current_inventory_list')
}

function createItem(){
    const form = document.forms.inventoryForm
    const uniqueId = Date.now()
    const item =  {
        id: uniqueId,
        nome: form.name.value,
        marca: form.brand.value,
        quantidade: parseInt(form.quantity.value),
        preco: parseFloat(form.price.value)
    }
    listInventory.push(item)
    return item
}

function clearCurrentInventory(){
    getTable().innerHTML = ''
}

function resumeOfList(){
    sum('preco')
    sum('quantidade')
}

function sum(property){
    let sum = 0
    listInventory
        .forEach(i => {
            sum += i[property]
        })
    const htmlElement = document.getElementById(property)
    htmlElement.innerHTML = sum
}