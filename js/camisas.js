let camisasJson = [
    {
        id: 1,
        name: 'Camisa de Jogo Temporada 92/94',
        img: 'images/camisa1 92-94.jpg',
        price: [249.99, 279.00, 299.00, 319.00],
        sizes: [
            'Infantil',
            'Adulto',
            'Adulto',
            'Adulto'
        ],
        description: 'Camisa de jogo oficial do vasco da temporada 92/94, com patrocínio da Coca Cola feita pela Finta.'
    },
    {
        id: 2,
        name: 'Camisa de Jogo Oficial Expresso da Vitória',
        img: 'images/camisa2 expresso.jpg',
        price: [99.00, 139.00, 189.00, 219.00],
        sizes: [
            'Infantil',
            'Adulto',
            'Adulto',
            'Adulto'
        ],
        description: 'Camisa de jogo oficial do modelo usado pelo Expresso da Vitória, sem marca e patrocínio.'
    },
    {
        id: 3,
        name: 'Camisa Comemorativa Temporada 88',
        img: 'images/camisa3 comemorativa 88.jpg',
        price: [89.00, 89.00, 139.00, 159.00],
        sizes: [
            'Infantil',
            'Adulto',
            'Adulto',
            'Adulto'
        ],
        description: 'Camisa comemorativa feita em homenagem ao time de 88, com patrocínio da Coca Cola e feita pela Adidas.'
    },
    {
        id: 4,
        name: 'Camisa Comemorativa Carlos Germano',
        img: 'images/camisa4 carlos germano.jpg',
        price: [49.00, 59.00, 79.00, 99.00],
        sizes: [
            'Infantil',
            'Adulto',
            'Adulto',
            'Adulto'
        ],
        description: 'Camisa comemorativa feita em homenagem ao goleiro Carlos Germano, ídolo do Vasco.'
    },
    {
        id: 5,
        name: 'Camisa de Jogo Temporada 88',
        img: 'images/camisa5 1988.jpg',
        price: [119.00, 149.00, 189.00, 219.00],
        sizes: [
            'Infantil',
            'Adulto',
            'Adulto',
            'Adulto'
        ],
        description: 'Camisa não-oficial de jogo da temporada 88, sem patrocínio.'
    },
    {
        id: 6,
        name: 'Camisa de Jogo Temporada 88 com Patrocínios',
        img: 'images/camisa6 1988.jpg',
        price: [259.00, 279.00, 319.00, 349.00],
        sizes: [
            'Infantil',
            'Adulto',
            'Adulto',
            'Adulto'
        ],
        description: 'Camisa oficial de jogo da temporada 88, com patrocínio da Coca Cola e feita pela Adidas.'
    }
];

let modalKey = 0
let quantidadeCamisas = 1

let menu = []

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if (valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.janelaCamisas').style.opacity = 0
    seleciona('.janelaCamisas').style.display = 'flex'
    setTimeout(() => seleciona('.janelaCamisas').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.janelaCamisas').style.opacity = 0
    setTimeout(() => seleciona('.janelaCamisas').style.display = 'none', 500)
}

const botoesFechar = () => {
    selecionaTodos('.camisaInfo-botaoCancelar, .camisaInfo-cancelarmobile').forEach((item) => item.addEventListener('click', fecharModal))
}

const preencheDadosCamisas = (camisasItem, item, index) => {
    camisasItem.setAttribute('data-key', index)
    camisasItem.querySelector('.camisas-item-img img').src = item.img
    camisasItem.querySelector('.camisas-item-preco').innerHTML = formatoReal(item.price[2])
    camisasItem.querySelector('.camisas-item-nome').innerHTML = item.name
    camisasItem.querySelector('.camisas-item-descricao').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.camisaBig img').src = item.img
    seleciona('.camisaInfo h1').innerHTML = item.name
    seleciona('.camisaInfo-descricao').innerHTML = item.description
    seleciona('.camisaInfo-precoAtual').innerHTML = formatoReal(item.price[2])
}

const pegarKey = (e) => {
    let key = e.target.closest('.camisas-item').getAttribute('data-key')
    quantidadeCamisas = 1
    modalKey = key
    return key
}

const preencherTamanhos = (key) => {
    seleciona('.camisaInfo-tamanho.selected').classList.remove('selected')
    selecionaTodos('.camisaInfo-tamanho').forEach((size, sizeIndex) => {
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = camisasJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    selecionaTodos('.camisaInfo-tamanho').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            seleciona('.camisaInfo-tamanho.selected').classList.remove('selected')
            size.classList.add('selected')
            seleciona('.camisaInfo-precoAtual').innerHTML = formatoReal(camisasJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    seleciona('.camisaInfo-aumentar').addEventListener('click', () => {
        quantidadeCamisas++
        seleciona('.camisaInfo-quantidade').innerHTML = quantidadeCamisas
    })

    seleciona('.camisaInfo-diminuir').addEventListener('click', () => {
        if (quantidadeCamisas > 1) {
            quantidadeCamisas--
            seleciona('.camisaInfo-quantidade').innerHTML = quantidadeCamisas
        }
    })
}

const adicionarNoCarrinho = () => {
    seleciona('.camisaInfo-botaoAdicionar').addEventListener('click', () => {

        let size = seleciona('.camisaInfo-tamanho.selected').getAttribute('data-key')
        if (size == 0) {
            size = "P"
        } else if (size == 1) {
            size = "M"
        } else if (size == 2) {
            size = "G"
        } else if (size == 3) {
            size = "GG"
        }

        let price = seleciona('.camisaInfo-precoAtual').innerHTML.replace('R$&nbsp;', '')

        let identificador = camisasJson[modalKey].id + 't' + size

        let key = menu.findIndex((item) => item.identificador == identificador)

        if (key > -1) {
            menu[key].qt += quantidadeCamisas
        } else {
            let camisa = {
                identificador,
                id: camisasJson[modalKey].id,
                size,
                qt: quantidadeCamisas,
                price: parseFloat(price)
            }
            menu.push(camisa)
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    if (menu.length > 0) {
        seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' 
    }

    seleciona('.abrir-menu').addEventListener('click', () => {
        if (menu.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    seleciona('.fechar-menu').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    seleciona('.abrir-menu span').innerHTML = menu.length
 
    if (menu.length > 0) {

        seleciona('aside').classList.add('show')

        seleciona('.menu').innerHTML = ''

        let subtotal = 0
        let desconto = 0
        let total = 0

        for (let i in menu) {

            let camisasItem = camisasJson.find((item) => item.id == menu[i].id)

            subtotal += menu[i].price * menu[i].qt

            let menuItem = seleciona('.camisas .tela-compra').cloneNode(true)
            seleciona('.menu').append(menuItem)

            let camisaTamanhoNome = menu[i].size

            let camisaNome = `${camisasItem.name} (${camisaTamanhoNome})`

            menuItem.querySelector('img').src = camisasItem.img
            menuItem.querySelector('.tela-compra-nome').innerHTML = camisaNome
            menuItem.querySelector('.tela-compra-quantidade').innerHTML = menu[i].qt

            menuItem.querySelector('.tela-compra-aumentar').addEventListener('click', () => {
                menu[i].qt++
                atualizarCarrinho()
            })

            menuItem.querySelector('.tela-compra-diminuir').addEventListener('click', () => {
                if (menu[i].qt > 1) {
                    menu[i].qt--
                } else {
                    menu.splice(i, 1)
                }

                (menu.length < 1) ? seleciona('header').style.display = 'flex' : ''

                atualizarCarrinho()
            })

            seleciona('.menu').append(menuItem)

        } 

        desconto = subtotal * 0
        total = subtotal - desconto

        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
        seleciona('.total span:last-child').innerHTML = formatoReal(total)

    } else {
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
    }
}

const finalizarCompra = () => {
    seleciona('.menu-finalizar').addEventListener('click', () => {
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

camisasJson.map((item, index) => {
    let camisasItem = document.querySelector('.camisas .camisas-item').cloneNode(true)
    seleciona('.camisas-area').append(camisasItem)

    preencheDadosCamisas(camisasItem, item, index)

    camisasItem.querySelector('.camisas-item a').addEventListener('click', (e) => {
        e.preventDefault()

        let chave = pegarKey(e)

        abrirModal()
        preencheDadosModal(item)
        preencherTamanhos(chave)

        seleciona('.camisaInfo-quantidade').innerHTML = quantidadeCamisas

        escolherTamanhoPreco(chave)
    })

    botoesFechar()

}) 
mudarQuantidade()
adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
