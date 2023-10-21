var countAttachment = 0;
var countProduct = 0;
var productList = [];
var attachmentList = [];

function buscarEnderecoPorCEP(cep) {
  // Formate o CEP para remover caracteres especiais
  cep = cep.replace(/\D/g, "");

  // Verifique se o CEP tem o tamanho correto (8 dígitos)
  if (cep.length !== 8) {
    alert("CEP inválido. Certifique-se de que o CEP contenha 8 dígitos.");
    return;
  }

  // URL da API ViaCEP
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  // Faça a requisição à API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.erro) {
        alert("CEP não encontrado.");
      } else {
        // Preencha os campos de endereço com os dados recebidos
        document.getElementById("address").value = data.logradouro;
        document.getElementById("neighborhood").value = data.bairro;
        document.getElementById("district").value = data.localidade;
        document.getElementById("state").value = data.uf;
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar endereço: " + error);
    });
}

function searchCPF() {
  const cep = document.getElementById("cep").value;
  buscarEnderecoPorCEP(cep);
}

// Função para calcular o valor total e atualizar o campo "totalValue"
function calculateInput() {
  var stockInput = document.getElementById("stock").value;
  var unitValueInput = document.getElementById("unitValue").value;
  var totalValueInput = document.getElementById("totalValue");
  var stock = parseFloat(stockInput);
  var unitValue = parseFloat(unitValueInput);

  // Verificando se os valores são válidos
  if (!isNaN(stock) && !isNaN(unitValue)) {
    var total = stock * unitValue;
    totalValueInput.value = total.toFixed(2); // Define o valor total com 2 casas decimais
  } else {
    totalValueInput.value = ""; // Limpa o campo se os valores não forem válidos
  }
}

function atLeastOne() {}

function clone() {
  var divProduct = document.getElementById("product-block-id");
  var divClone = divProduct.cloneNode(true);
  var container = document.getElementById("product-container-id");
  container.appendChild(divClone);

  countProduct++;
}

function loadJsonData() {
  var businessName = document.getElementById("businessName").value;
  var commercialName = document.getElementById("commercialName").value;
  var cnpj = document.getElementById("cnpj").value;
  var stateRegistration = document.getElementById("stateRegistration").value;
  var districtRegistation = document.getElementById(
    "districtRegistation"
  ).value;
  var usernameContact = document.getElementById("userNameContact").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;

  companyData = {
    razaoSocial: businessName,
    nomeFantasia: commercialName,
    cnpj: cnpj,
    inscricaoEstadual: stateRegistration,
    inscricaoMunicipal: districtRegistation,
    nomeContato: usernameContact,
    telefoneContato: phone,
    emailContato: email,
    produtos: productList,
    anexos: attachmentList,
  };

  console.log(companyData);
}

function mandatoryFieldsVerification() {
  var businessName = document.getElementById("businessName").value;
  var commercialName = document.getElementById("commercialName").value;
  var cnpj = document.getElementById("cnpj").value;
  var stateRegistration = document.getElementById("stateRegistration").value;
  var districtRegistation = document.getElementById(
    "districtRegistation"
  ).value;
  var usernameContact = document.getElementById("userNameContact").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;

  if (
    businessName == "" ||
    commercialName == "" ||
    cnpj == "" ||
    stateRegistration == "" ||
    districtRegistation == "" ||
    (usernameContact == "") | (phone == "") | (email == "")
  ) {
  }
}

function productsList() {
  var elementsWithSameId = document.querySelectorAll("#product");
  elementsWithSameId.forEach(function (element) {
    if (!element.value in productsList) {
      productList.push(element.value);
    }
  });
}

function removeProductContainer(trashButton) {
  if (countProduct > 0) {
    var liProduct = trashButton.parentNode;
    liProduct.remove();
    countProduct--;
  }
}

function removeAttachment(trashButton) {
  if (countAttachment > 0) {
    var liAttachment = trashButton.parentNode;
    liAttachment.remove();
    countAttachment--;
  }
}

function cloneAttachment() {
  var divProduct = document.getElementById("attachment-block");
  var divClone = divProduct.cloneNode(true);
  var container = document.getElementById("attachment-container");
  container.appendChild(divClone);
  countAttachment++;
}

// TODO
// function downloadAttachment() {}

// function saveAttachment() {
//   var name = "attachment" + countAttachment;
//   sessionStorage.setItem(name);
// }
