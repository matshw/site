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
// aula 05
// criar a variável modalKey sera global
let modalKey = 0

// variavel para controlar a quantidade inicial de camisas na modal
let quantidadeCamisas = 1

let menu = [] // carrinho
// /aula 05

// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.janelaCamisas').style.opacity = 0 // transparente
    seleciona('.janelaCamisas').style.display = 'flex'
    setTimeout(() => seleciona('.janelaCamisas').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.janelaCamisas').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.janelaCamisas').style.display = 'none', 500)
}

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.camisaInfo-botaoCancelar, .camisaInfo-cancelarmobile').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosCamisas = (camisasItem, item, index) => {
    // aula 05
    // setar um atributo para identificar qual elemento foi clicado
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

// aula 05
const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .camisa-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.camisas-item').getAttribute('data-key')
    console.log('Camisa clicada ' + key)
    console.log(camisasJson[key])

    // garantir que a quantidade inicial de camisas é 1
    quantidadeCamisas = 1

    // Para manter a informação de qual camisa foi clicada
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    // tirar a selecao de tamanho atual e selecionar o tamanho grande
    seleciona('.camisaInfo-tamanho.selected').classList.remove('selected')

    // selecionar todos os tamanhos
    selecionaTodos('.camisaInfo-tamanho').forEach((size, sizeIndex) => {
        // selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = camisasJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    selecionaTodos('.camisaInfo-tamanho').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
            // tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona('.camisaInfo-tamanho.selected').classList.remove('selected')
            // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            // mudar o preço de acordo com o tamanho
            seleciona('.camisaInfo-precoAtual').innerHTML = formatoReal(camisasJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.camisaInfo-aumentar').addEventListener('click', () => {
        quantidadeCamisas++
        seleciona('.camisaInfo-quantidade').innerHTML = quantidadeCamisas
    })

    seleciona('.camisaInfo-diminuir').addEventListener('click', () => {
        if(quantidadeCamisas > 1) {
            quantidadeCamisas--
            seleciona('.camisaInfo-quantidade').innerHTML = quantidadeCamisas	
        }
    })
}
// /aula 05

// aula 06
const adicionarNoCarrinho = () => {
    seleciona('.camisaInfo-botaoAdicionar').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

        // pegar dados da janela modal atual
    	// qual camisa? pegue o modalKey para usar camisasJson[modalKey]
    	console.log("Camisa " + modalKey)
    	// tamanho
	    let size = seleciona('.camisaInfo-tamanho.selected').getAttribute('data-key')
        if(size==0) {
            size = "P"
        } else if(size==1) {
            size = "M"
        } else if(size==2) {
            size = "G"
        } else if(size==3) {
            size = "GG"
        }

	    console.log("Tamanho " + size)
	    // quantidade
    	console.log("Quant. " + quantidadeCamisas)
        // preco
        let price = seleciona('.camisaInfo-precoAtual').innerHTML.replace('R$&nbsp;', '')
    
        // crie um identificador que junte id e tamanho
	    // concatene as duas informacoes separadas por um símbolo, vc escolhe
	    let identificador = camisasJson[modalKey].id+'t'+size

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = menu.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {
            // se encontrar aumente a quantidade
            menu[key].qt += quantidadeCamisas
        } else {
            // adicionar objeto camisa no carrinho
            let camisa = {
                identificador,
                id: camisasJson[modalKey].id,
                size, // size: size
                qt: quantidadeCamisas,
                price: parseFloat(price) // price: price
            }
            menu.push(camisa)
            console.log(camisa)
            console.log('Sub total R$ ' + (camisa.qt * camisa.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + menu.length)
    if(menu.length > 0) {
        // mostrar o carrinho
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.abrir-menu').addEventListener('click', () => {
        if(menu.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.fechar-menu').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	seleciona('.abrir-menu span').innerHTML = menu.length
	
	// mostrar ou nao o carrinho
	if(menu.length > 0) {

		// mostrar o carrinho
		seleciona('aside').classList.add('show')

		// zerar meu .menu para nao fazer insercoes duplicadas
		seleciona('.menu').innerHTML = ''

        // crie as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
		for(let i in menu) {
			// use o find para pegar o item por id
			let camisasItem = camisasJson.find( (item) => item.id == menu[i].id )
			console.log(camisasItem)

            // em cada item pegar o subtotal
        	subtotal += menu[i].price * menu[i].qt
            //console.log(menu[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let menuItem = seleciona('.camisas .tela-compra').cloneNode(true)
			seleciona('.menu').append(menuItem)

			let camisaTamanhoNome = menu[i].size

			let camisaNome = `${camisasItem.name} (${camisaTamanhoNome})`

			// preencher as informacoes
			menuItem.querySelector('img').src = camisasItem.img
			menuItem.querySelector('.tela-compra-nome').innerHTML = camisaNome
			menuItem.querySelector('.tela-compra-quantidade').innerHTML = menu[i].qt

			// selecionar botoes + e -
			menuItem.querySelector('.tela-compra-aumentar').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				menu[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			menuItem.querySelector('.tela-compra-diminuir').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(menu[i].qt > 1) {
					// subtrair apenas a quantidade que esta neste contexto
					menu[i].qt--
				} else {
					// remover se for zero
					menu.splice(i, 1)
				}

                (menu.length < 1) ? seleciona('header').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			seleciona('.menu').append(menuItem)

		} // fim do for

		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		desconto = subtotal * 0
		total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		// ocultar o carrinho
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.menu-finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

// /aula 06

// MAPEAR camisasJson para gerar lista de camisas
camisasJson.map((item, index ) => {
    //console.log(item)
    let camisasItem = document.querySelector('.camisas .camisas-item').cloneNode(true)
    //console.log(camisasItem)
    //document.querySelector('.camisas-area').append(camisasItem)
    seleciona('.camisas-area').append(camisasItem)

    // preencher os dados de cada camisa
    preencheDadosCamisas(camisasItem, item, index)
    
    // camisa clicada
    camisasItem.querySelector('.camisas-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na camisa')

        // aula 05
        let chave = pegarKey(e)
        // /aula 05

        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

        // aula 05
        // pegar tamanho selecionado
        preencherTamanhos(chave)

		// definir quantidade inicial como 1
		seleciona('.camisaInfo-quantidade').innerHTML = quantidadeCamisas

        // selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave)
        // /aula 05

    })

    botoesFechar()

}) // fim do MAPEAR camisasJson para gerar lista de camisas

// aula 05
// mudar quantidade com os botoes + e -
mudarQuantidade()
// /aula 05

// aula 06
adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
// /aula 06
