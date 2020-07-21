// consumir api do IBGE para mostrar os estados e as cidades 
function Fillstates(){
    const selectStates = document.querySelector("select[name=state]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( resp => resp.json())
    .then(statesList => {
        
        for (state of statesList) {
            selectStates.innerHTML+=`<option value="${state.id}">${state.nome}</option>`
        }
    })
    
}


Fillstates()


function getCities(event) {
    const selectCity = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state2]")
    
    const stateValue = event.target.value


    const indexState = event.target.selectedIndex
    
    stateInput.value = event.target.options[indexState].text
    
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateValue}/municipios`
    
    selectCity.innerHTML = "<option value>Selecione a cidade</option>"
    selectCity.disabled = true    
    fetch(url)
    .then( resp => resp.json())
    .then(cities => {
        
        for (city of cities) {
            selectCity.innerHTML+=`<option value="${city.nome}">${city.nome}</option>`
        }
         selectCity.disabled = false
    
        })

}


    document
        .querySelector("select[name=state]")
        .addEventListener("change", getCities)




// itens de coleta
const listedItems = document.querySelectorAll(".items-grid li")

for(items of listedItems) {
    items.addEventListener("click", handleSelectedItem)
}

let selectedItems = []

const collectionItems = document.querySelector("input[name=items]")



function handleSelectedItem(event){
    // adicionar ou remover item selecionado
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    //exibir o id do item selecionado     
    const itemID = event.target.dataset.id 


    // verificação se há itens selecionado, caso positivo gravar o item selecionado;
    const itemAlreadySelected = selectedItems.findIndex(function(item) {
        const itemFound = item == itemID
        return itemFound 
    }) 
    // se já estiver selecionado, retirar da seleção
    if(itemAlreadySelected >=0)  {
        //remove da posiçao
        const FilterItems = selectedItems.filter(function (item) {
            const itemDiffer = item != itemID
            return itemDiffer
        })

        selectedItems = FilterItems

    } else { // adicionar a seleção
        selectedItems.push(itemID)
    }
    // atualizar o campo escondido com os itens selecionados 
    // console.log(selectedItems)
    collectionItems.value = selectedItems
    
}   