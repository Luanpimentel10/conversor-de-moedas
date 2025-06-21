let valorUsuario = document.querySelector("#valor");
let moedasUsuario = document.querySelector("#moedas");
let btn = document.querySelector("#btn");

btn.addEventListener("click", pegarMoeda); // Aciona ao clicar no botão

function pegarMoeda() {
    const moeda = moedasUsuario.value;

    fetch(`https://economia.awesomeapi.com.br/json/last/${moeda}`)
        .then((res) => res.json())
        .then((data) => {
            displayResultado(data, moeda);
        })
        .catch((error) => {
            console.error("Erro ao buscar dados:", error);
        });
}

function displayResultado(data, moeda) {
    const chave = moeda.replace("-", ""); // Ex: USD-BRL -> USDBRL
    const valorAtual = parseFloat(data[chave].bid); // Pega o valor da cotação

    const cotacao = (valorAtual * parseFloat(valorUsuario.value)).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    const divRes = document.querySelector(".display-res");
    const divContainer = document.querySelector(".container");

    divContainer.classList.add("style-container");

    divRes.innerHTML = `
        <div class="resultado">
            <p>${chave.replace("BRL", "")}$ ${valorUsuario.value} = ${cotacao}</p>
            <p>${cotacao}</p>
        </div>`;
}

