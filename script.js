let currentPageUrl = 'https://rickandmortyapi.com/api/character'

window.onload = async () => {
    try {
        await getCharacters(currentPageUrl)
    }   catch (error) {
        console.log(error);
        alert('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next_button');
    nextButton.addEventListener('click', loadNextPage);

    const backButton = document.getElementById('back_button');
    backButton.addEventListener('click', loadPrevPage);
};

async function getCharacters(url){
    const mainContent = document.getElementById('main_content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((characters) => {
            const card = document.createElement("div")
            card.style.backgroundImage = `url('https://rickandmortyapi.com/api/character/avatar/${characters.url.replace(/\D/g, "")}.jpeg')`
            card.className = "cards"

            const characterNameBg = document.createElement("div")
            characterNameBg.className = "character_name_bg"

            const characterName = document.createElement("span")
            characterName.className = "character_name"
            characterName.innerText = `${characters.name}`

            characterNameBg.appendChild(characterName)
            card.appendChild(characterNameBg)

            card.onclick = ()=>{ 
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal_content")
                modalContent.innerHTML = ""

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('https://rickandmortyapi.com/api/character/avatar/${characters.url.replace(/\D/g, "")}.jpeg')`
                characterImage.className = "character_image"

                const name = document.createElement("span")
                name.className = "character_details"
                name.innerText = `Name: ${characters.name}`

                const status = document.createElement("span")
                status.className = "character_details"
                status.innerText = `Status: ${characters.status}`

                const species = document.createElement("span")
                species.className = "character_details"
                species.innerText = `Species: ${characters.species}`

                const gender = document.createElement("span")
                gender.className = "character_details"
                gender.innerText = `Gender: ${characters.gender}`

                const origin = document.createElement("span")
                origin.className = "character_details"
                origin.innerText = `Origin: ${characters.origin.name}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(status)
                modalContent.appendChild(species)
                modalContent.appendChild(gender)
                modalContent.appendChild(origin)
            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next_button');
        const backButton = document.getElementById('back_button');

        nextButton.disabled = !responseJson.info.next;
        backButton.disabled = !responseJson.info.prev;

        backButton.style.visibility = responseJson.info.prev? 'visible' : 'hidden';

        currentPageUrl = url

    } catch (error) {
        alert('Erro ao carregar os times')
        console.log(error)
    }
}

async function loadNextPage(){
    if (!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await getCharacters(responseJson.info.next);

    } catch (error){
        console.log (error);
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPrevPage(){
    if (!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await getCharacters(responseJson.info.prev)

    } catch (error){
        console.log (error);
        alert('Erro ao carregar a página anterior')
    }
}

// MODAL DE INFORMAÇÕES DOS PERSONAGENS //

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

// scroll //

document.getElementById("to_top").addEventListener("click", function() { 
    window.scrollTo(0, 0);
  }); 

document.getElementById("to_bottom").addEventListener("click", function() { 
   window.scrollTo(0, 10030); 
}); 