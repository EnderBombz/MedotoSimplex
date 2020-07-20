var matrizSimplex = [
    [
        document.querySelector("#e00"), document.querySelector("#e01"), document.querySelector("#e02"), document.querySelector("#e03").value, document.querySelector("#e04").value, document.querySelector("#e05").value, document.querySelector("#e06")
    ],
    [
        document.querySelector("#e10"), document.querySelector("#e11"), document.querySelector("#e12"), document.querySelector("#e13").value, document.querySelector("#e14").value, document.querySelector("#e15").value, document.querySelector("#e16")
    ],
    [
        document.querySelector("#e20"), document.querySelector("#e21"), document.querySelector("#e22"), document.querySelector("#e23").value, document.querySelector("#e24").value, document.querySelector("#e25").value, document.querySelector("#e26")
    ],
    [
        document.querySelector("#e30"), document.querySelector("#e31"), document.querySelector("#e32"), document.querySelector("#e33").value, document.querySelector("#e34").value, document.querySelector("#e35").value, document.querySelector("#e36")
    ],

]
var matrizValores = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
]
var CalcularMax = document.querySelector("#CalcularMax")

//Variáveis da função EncontrarMaiorNegativo()
var maiorNegativo;
var aux;
var ordenado = []
var col = 0;
var rep = 0
    //................................//

//Variáveis da função DividirTIporElementosDaColunaDoMaiorNegativo()
var linhaMaior = 0
var linhaPivot = 0
var cont = 0
var linhaPivot
var pivot
var Elementos = []
var LinhaPivotDiv = [
    []
]
var pivotColuna = []
    //...............................//

//Variaveis da repetição do calculo
var LinhaPivotDiv = [
    []
]
var pivotColuna = []
    //..............................//

var maiorNegativo = 0

var matrizComp = [
    [],
    [],
    [],
    [],
]
var matrizResultado = [
    [],
    [],
    [],
    []
]
var matrizI = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
]

console.table(matrizSimplex)
CalcularMax.addEventListener("click", () => {

    ObterValoresDaMatriz() //1º passo
    EncontrarMaiorNegativo() //2º passo
    DividirTIporElementosDaColunaDoMaiorNegativo() //3º passo
    DividirPivotPelaLinhaPivotEpelasLinhasDiferentesDaLinhaDoPivot() //4º passo
    PrimeiroCalculo() //5º passo

    var neg = 1
    do {

        RepeticaoDoCalculo() //6º passo
        for (j = 0; j < 7; j++) {
            if (matrizResultado[0][j] < 0) {
                neg = 0;
            }
        }
    } while (neg == 0)
    ExibirResultadoMatriz() //7º passo
})

function ObterValoresDaMatriz() {
    //Obtenção dos valores digitados na matriz
    console.table(matrizValores) //apresenta a matriz zerada com apenas uma diagonal com 1

    for (i = 0; i < matrizSimplex.length; i++) {
        for (j = 0; j < matrizSimplex[0].length; j++) {
            matrizValores[i][j] = parseFloat(matrizSimplex[i][j].value)
        }
    }
    console.table(matrizValores) //apresenta a matriz com os valores dos inputs
    for (i = 0; i < matrizSimplex.length; i++) {
        for (j = 0; j < matrizSimplex[0].length; j++) {
            matrizValores[i][j] += 0
        }
    }
    var k = 0;
    var y = 0;

    for (i = 0; i < 4; i++) {
        for (j = 3; j < 6; j++) {
            matrizValores[i][j] = parseFloat(matrizI[k][y])
            y++
        }
        k++
        y = 0
    }
    console.table(matrizValores) //apresenta a matriz pronta para ser calculada :D
    for (i = 0; i < matrizSimplex.length; i++) {
        for (j = 0; j < matrizSimplex[0].length; j++) {
            matrizComp[i][j] = matrizValores[i][j]
        }
    }
    console.log("matriz comp")
    console.table(matrizComp)

}

function EncontrarMaiorNegativo() {

    //mudar o sinal da Função objetivo
    console.table(matrizValores)
    for (i = 0; i < 7; i++) {
        matrizValores[0][i] *= (-1)
    }
    console.table(matrizValores)

    //declarar
    for (i = 0; i < 7; i++) {
        ordenado[i] = parseFloat(matrizValores[0][i])
    }

    //
    console.table(ordenado);
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {

            if (ordenado[j] > ordenado[j + 1]) {
                aux = ordenado[j];
                ordenado[j] = ordenado[j + 1];
                ordenado[j + 1] = aux;
            }
        }
    }
    console.table(ordenado);
    maiorNegativo = ordenado[0]
    console.log("matriz valores")
    console.log(maiorNegativo)
    console.table(matrizValores)

    for (j = 0; j < 7; j++) {
        if (maiorNegativo == matrizValores[0][j]) {
            col = j;
        }
    }

    for (j = 0; j < 7; j++) {
        if (matrizValores[0][j] == matrizValores[0][j + 1] && matrizValores[0][j] != 0) {
            rep++
        }
    }
    console.log(rep)
    col -= rep;
    console.log(col)
}

function DividirTIporElementosDaColunaDoMaiorNegativo() {

    //dividir T.I por Elementos da coluna do menor negativo
    for (i = 1; i < 4; i++) {
        Elementos[i] = (matrizValores[i][6] / matrizValores[i][col])

        if (cont == 0) {

            var maior = Elementos[i]
            var menor = Elementos[i]
            cont++
        }
        if (Elementos[i] > maior) {
            maior = Elementos[i]
            linhaMaior = i
        }
        if (Elementos[i] < menor && Elementos[i] > 0) {
            menor = Elementos[i]
            linhaPivot = i
            pivot = matrizValores[linhaPivot][col]
        }
    }

    console.log("Elementos")
    console.table(Elementos)

    console.log("menor")
    console.log(menor)

    console.log("Pivot")
    console.log(matrizValores[linhaPivot][col])

    console.log("Coluna")
    console.log(col)

    console.log("linha pivot")
    console.log(linhaPivot)

}

function DividirPivotPelaLinhaPivotEpelasLinhasDiferentesDaLinhaDoPivot() {
    for (i = 0; i < 7; i++) {
        LinhaPivotDiv[i] = matrizValores[linhaPivot][i] / pivot;
    }
    console.table(LinhaPivotDiv)
    for (i = 0; i < 4; i++) {
        if (i != linhaPivot) {
            pivotColuna[i] = matrizValores[i][col]
        }
    }
    console.log("elementos na coluna diferentes do pivot")
    console.table(pivotColuna)

    console.log("calculo da coluna")
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 7; j++) {

            if (i != linhaPivot) //linha do pivot
            {
                matrizResultado[i][j] = (LinhaPivotDiv[j] * (pivotColuna[i] * (-1)) + matrizValores[i][j])
            } else if (i == linhaPivot) {
                matrizResultado[i][j] = LinhaPivotDiv[j]
            }
        }
    }
    console.table(matrizResultado)
}

function EncontrarMaiorNegativoRepeticao() {
    for (i = 0; i < 4; i++) {
        ordenado[i] = parseFloat(matrizResultado[0][i])
    }

    //
    console.table(ordenado);
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {

            if (ordenado[j] > ordenado[j + 1]) {

                aux = ordenado[j];
                ordenado[j] = ordenado[j + 1];
                ordenado[j + 1] = aux;

            }

        }
    }
    console.table(ordenado);
    maiorNegativo = ordenado[0]
    col = 0;
    rep = 0
    console.log("menor negativo da Função objetivo")
    console.log(maiorNegativo)
    console.table(matrizResultado)

    for (j = 0; j < 4; j++) {
        if (maiorNegativo == matrizResultado[0][j]) {
            col = j;
        }
    }

    for (j = 0; j < 4; j++) {
        if (matrizResultado[0][j] == matrizResultado[0][j + 1] && matrizResultado[0][j] != 0) {
            rep++
        }
    }
    console.log("Quantos numeros se repetiram")
    console.log(rep)

    col -= rep;

    console.log("coluna")
    console.log(col)
}

function EncontrarPivotRepeticao() {
    //dividir T.I por Elementos da coluna do menor negativo
    linhaMaior = 0
    linhaPivot = 0
    pivot = 0
    for (i = 1; i < 4; i++) {
        Elementos[i] = (matrizResultado[i][6] / matrizResultado[i][col])

        if (Elementos[i] > maior) {
            console.log("ele entrou no 'elemento[i] é maior que maior?' ")
            maior = Elementos[i]
            linhaMaior = i
        } else if (Elementos[i] < menor) {
            console.log("ele entrou em 'Elementos[i] é menor do que menor?'")
            menor = Elementos[i]
            pivot = matrizResultado[i][col]
            console.log(matrizResultado[i][col])

            console.log("linha do Pivot")
            linhaPivot = i
        }
    }

    console.log("Elementos")
    console.table(Elementos)

    console.log("menor")
    console.log(menor)

    console.log("Pivot")
    console.log(pivot)

    console.log("Coluna")
    console.log(col)

    console.log("linha pivot")
    console.log(linhaPivot) //linha do pivot

}

function DividirPivotPelaLinhaPivotEpelasLinhasDiferentesDaLinhaDoPivotRepeticao() {
    for (i = 0; i < 7; i++) {
        LinhaPivotDiv[i] = matrizResultado[linhaPivot][i] / pivot;
    }
    console.table(LinhaPivotDiv)
    for (i = 0; i < 4; i++) {
        if (i != linhaPivot) {
            pivotColuna[i] = matrizResultado[i][col]
        }
    }
    console.log("elementos na coluna diferentes do pivot")
    console.table(pivotColuna)
    console.log("calculo da coluna")
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 7; j++) {

            if (i != linhaPivot) //linha do pivot
            {
                matrizResultado[i][j] = (LinhaPivotDiv[j] * (pivotColuna[i] * (-1)) + matrizResultado[i][j])
            } else if (i == linhaPivot) {
                matrizResultado[i][j] = LinhaPivotDiv[j]
            }
        }
    }
}

function RepeticaoDoCalculo() {

    EncontrarMaiorNegativoDaRepeticao()
    EncontrarPivotRepeticao()
    DividirPivotPelaLinhaPivotEpelasLinhasDiferentesDaLinhaDoPivotRepeticao()
}

function ExibirResultadoMatriz() {

    console.table(matrizResultado)

    var tabelaSimplex = document.querySelector("#simplexResp")
    var relatorio = document.querySelector("#simplexRela")
    var relat = `<div class="relat">`
    var conteudo

    var contnan = 0

    for (i = 0; i < 7; i++) {
        if (isNaN(matrizResultado[3][i]) == true) {
            contnan++;
        }
    }

    var TH = ["Z", "A", "B", "C"]
    var THX1 = ["X1", "X2", "X3", "X4", "X5", "X6", "T.I", ]
    var THX2 = ["X1", "X2", "X3", "X4", "X5", "T.I", ]
    var indiceTH = 0

    console.log("contnan")
    console.log(contnan)

    if (contnan > 0) {

        conteudo = `<table class="tabelamatriz"><tr> <th class="cabeca"><h5></h5></th>`
        for (i = 0; i < 6; i++) {
            conteudo += `<th class="cabeca">${THX2[i]}</th>`
        }
        conteudo += `</tr><tr>`

        for (i = 0; i < 3; i++) {
            conteudo += `<th class="cabeca"><h5>${TH[indiceTH]}</h5></th>`
            for (j = 0; j < 7; j++) {
                if (j != 5) {
                    conteudo += `<td class="result">${matrizResultado[i][j]}${" "}`
                }
            }
            indiceTH++
            conteudo += `</td></tr>`
        }
        tabelaSimplex.innerHTML = conteudo + "</table>"
        relatorio.innerHTML = relat + `MAX = ${matrizResultado[0][6]}<br>MIN X1 = ${matrizResultado[0][3]}<br>MIN X2 = ${matrizResultado[0][4]}` + "</div>"
        contnan = 0
    } else if (contnan == 0) {

        conteudo = `<table class="tabelamatriz"><tr> <th class="cabeca"><h5></h5></th>`
        for (i = 0; i < 7; i++) {
            conteudo += `<th class="cabeca">${THX1[i]}</th>`
        }
        conteudo += `</tr><tr>`

        for (i = 0; i < 4; i++) {
            conteudo += `<th class="cabeca"><h5>${TH[indiceTH]}</h5></th>`
            for (j = 0; j < 7; j++) {

                conteudo += `<td class="result">${matrizResultado[i][j]}${" "}`

            }
            indiceTH++
            conteudo += `</td></tr>`
        }
        tabelaSimplex.innerHTML = conteudo + "</table>"
        relatorio.innerHTML = relat + `MAX = ${matrizResultado[0][6]}<br>MIN X1 = ${matrizResultado[0][3]}<br>MIN X2 = ${matrizResultado[0][4]}` + "</div>"

    }






}