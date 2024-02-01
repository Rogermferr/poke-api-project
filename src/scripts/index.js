async function getPokeAPI() {
  const pokemonsAPI = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then((response) => response.json())
    .catch((error) => console.log(error))

  return pokemonsAPI
}

function capitalizeString(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

async function renderPokemons() {
  const listContainer = document.querySelector('.list__container')

  const listPokemons = await getPokeAPI()

  listContainer.insertAdjacentHTML(
    'beforeend',
    `<p id="loading">Carregando...</p>`
  )

  setTimeout(() => {
    listContainer.innerHTML = ''

    listPokemons.results.forEach((pokemon) => {
      const numberPokedex = pokemon.url.slice(34, -1)

      listContainer.insertAdjacentHTML(
        'beforeend',
        `
                <li id=${numberPokedex} class="list__item">
                    <img data-id=${numberPokedex} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numberPokedex}.png" alt=${
          pokemon.name
        }>
                    <h3>${capitalizeString(pokemon.name)}</h3>
                    <span>Nº: ${numberPokedex}</span>
                </li>
            `
      )
    })

    replacePokeImage()
  }, 1000)
}

async function renderSearchPokemon() {
  const listContainer = document.querySelector('.list__container')

  const searchBtn = document.querySelector('.search__container > button')

  const searchValue = document.querySelector('.search__container > input')

  searchBtn.addEventListener('click', async () => {
    if (searchValue.value === '' || searchValue.value === ' ') {
      listContainer.innerHTML = ''
      renderPokemons()
    } else {
      listContainer.innerHTML = ''

      listContainer.insertAdjacentHTML(
        'beforeend',
        `<p id="loading">Carregando...</p>`
      )

      const pokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchValue.value
          .trim()
          .toLowerCase()}`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error))

      if (pokemon === undefined) {
        setTimeout(() => {
          listContainer.innerHTML = ''

          listContainer.insertAdjacentHTML(
            'beforeend',
            `<p id="error">Desculpe, Pokémon não encontrado :-/</p>`
          )
        }, 1000)
      } else {
        setTimeout(() => {
          console.clear()

          listContainer.innerHTML = ''

          const numberPokedex = pokemon.id

          listContainer.insertAdjacentHTML(
            'beforeend',
            `
                        <li id=${numberPokedex} class="list__item">
                            <img data-id=${numberPokedex} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numberPokedex}.png" alt=${
              pokemon.name
            }>
                            <h3>${capitalizeString(pokemon.name)}</h3>
                            <span>Nº: ${numberPokedex}</span>
                        </li>
                    `
          )

          replacePokeImage()
        }, 1000)
      }
    }
  })
}

function searchWithEnter() {
  const listContainer = document.querySelector('.list__container')

  const searchValue = document.querySelector('.search__container > input')

  searchValue.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
      if (searchValue.value === '' || searchValue.value === ' ') {
        listContainer.innerHTML = ''
        renderPokemons()
      } else {
        listContainer.innerHTML = ''

        listContainer.insertAdjacentHTML(
          'beforeend',
          `<p id="loading">Carregando...</p>`
        )

        const pokemon = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchValue.value
            .trim()
            .toLowerCase()}`
        )
          .then((response) => response.json())
          .catch((error) => console.log(error))

        if (pokemon === undefined) {
          setTimeout(() => {
            listContainer.innerHTML = ''

            listContainer.insertAdjacentHTML(
              'beforeend',
              `<p id="error">Desculpe, Pokémon não encontrado :-/</p>`
            )
          }, 1000)
        } else {
          setTimeout(() => {
            console.clear()

            listContainer.innerHTML = ''

            const numberPokedex = pokemon.id

            listContainer.insertAdjacentHTML(
              'beforeend',
              `
                            <li id=${numberPokedex} class="list__item">
                                <img data-id=${numberPokedex} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numberPokedex}.png" alt=${
                pokemon.name
              }>
                                <h3>${capitalizeString(pokemon.name)}</h3>
                                <span>Nº: ${numberPokedex}</span>
                            </li>
                        `
            )

            replacePokeImage()
          }, 1000)
        }
      }
    }
  })
}

function clickLogoHome() {
  const listContainer = document.querySelector('.list__container')
  const searchValue = document.querySelector('.search__container > input')
  const logo = document.querySelector('.header__container > img')

  logo.addEventListener('click', () => {
    listContainer.innerHTML = ''
    searchValue.value = ''

    renderPokemons()
  })
}

function replacePokeImage() {
  const listItem = document.querySelectorAll('.list__item')
  const listItemImage = document.querySelectorAll('.list__item > img')

  listItem.forEach((item) => {
    item.addEventListener('mouseenter', (event) => {
      listItemImage.forEach((image) => {
        if (image.dataset.id === event.target.id) {
          image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${image.dataset.id}.gif`
        }
      })
    })

    item.addEventListener('mouseleave', (event) => {
      listItemImage.forEach((image) => {
        if (image.dataset.id === event.target.id) {
          image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${image.dataset.id}.png`
        }
      })
    })
  })
}

renderPokemons()

renderSearchPokemon()

searchWithEnter()

clickLogoHome()
