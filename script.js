// PAGE 3 GLOBAL VARIABLES
let quizzTitle, quizzURLImage, quizzQuestionCount, quizzLevelCount;
let mainContent = document.getElementById("main-content");
let questionsObjectArray = [];
let answersObjectArray = [];
let levelsObjectArray = [];
let levelInnerObject = {};
let questions = [];
let percentArray = [];
let globalObject = {};


// PAGE 1

let UserQuizzes = [];
let AllQuizzes = [];

getQuizzes();

function getQuizzes(){
  const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

  promise.then(sortAndCallRenderQuizzes);
  promise.catch(failedToGetQuizzes);
}

//função chamada quando houve falha na requisição GET
function failedToGetQuizzes(){
  alert('Tivemos um erro inesperado ao carregar o(s) Quizz(es). Por favor, recarregue a página que a gente tenta de novo =)');
}

function sortAndCallRenderQuizzes(quizzesResponse) {
  //essa função deve separar os quizzes entre quizzes do server e quizzes do usuario, e só então chamar o renderiza

  const ServerQuizzes = quizzesResponse.data;
  //chama a função que separa os quizzes entre gerais e de usuário
  sortUserQuizzes(ServerQuizzes);
  //chama a função para renderizar os quizzes
  RenderQuizzes();
}

function sortUserQuizzes(ServerQuizzesList) {
  for (let i = 0; i < ServerQuizzesList.length; i++) {
    const singleQuizz = ServerQuizzesList[i];
    //agora devemos verificar se esse quizz pertence ao usuario ou não
    if (quizzFromUser(singleQuizz)) {
      //caso true (quizz é do usuário), popula a lista de quizzes de usuário
      UserQuizzes.push(singleQuizz);
    } else {
      //caso false (quizz não é do usuário), popula a lista de quizzes gerais
      AllQuizzes.push(singleQuizz);
    }
  }
}

 //função que verifica que é do usuário ou não
function quizzFromUser(quizzToBeAnalysed){
  if(quizzToBeAnalysed.id % 2 == 0){
    //caso não seja do usuário, retorna false
    return false;
  } else {
    //caso seja do usuário, retorna true
    return true;
  }
  //usar SERIALIZE / DESERIALIZE / PARSE
}

function RenderQuizzes() {
  let userQuizzesHTML = "";
  let allQuizzesHTML = "";

  if (UserQuizzes.length === 0) {
    //caso não tenha quizzes do usuário, o HTML a ser montado deve ser aquele com botão grande
    userQuizzesHTML = makeEmptyUserQuizzesHTML();
  } else {
    //caso tenha quizzes do usuário, o HTML a ser montado deve ser o que mostra os quizzes do usuario
    userQuizzesHTML = makeUserQuizzesCardsHTML();
  }

  //chamamos a função para montar o HTML da parte que mostra Todos os Quizzes
  allQuizzesHTML = makeAllQuizzesCardsHTML();

  //populando o HTML da seção de Quizzes do Usuário
  const elementUserQuizzes = document.getElementById("user-quizzes-html");
  elementUserQuizzes.innerHTML = `
  <div class="have-user-quizzes">
					<div class="user-quizzes-header">
						<h1> Seus Quizzes </h1>
						<button onclick="goToCreateQuizz()">+</button>
					</div>
					<div class="quizzes-list">
            ${userQuizzesHTML}
					</div>
				</div>
  `;
  //populando o HTML da seção de Todos os Quizzes
  const elementAllQuizzes = document.getElementById("all-quizzes-html");
  elementAllQuizzes.innerHTML = `
  <h1> Todos os Quizzes </h1>
  <div class="quizzes-list" id = "all-quizzes-html">
    ${allQuizzesHTML}
  </div>`;
}

//função que monta o HTML da parte de quizzes de usuário, quando não há nenhum quizz do usuário
function makeEmptyUserQuizzesHTML() {
  return `
  <div class="empty-user-quizzes">
    <h1>Você não criou nenhum quizz ainda :(</h1>
    <button onclick="goToCreateQuizz()">Criar Quizz</button>
  </div>
  `;
}

//função que monta o HTML da lista de quizzes de usuário
function makeUserQuizzesCardsHTML() {
  let UserQuizzesCardsHTML = "";
  //para cada quizz de usuário, monta o html correspondente a ele
  for (let i = 0; i < UserQuizzes.length; i++) {
    UserQuizzesCardsHTML += makeQuizzCardHTML(UserQuizzes[i]);
  }
  return UserQuizzesCardsHTML;
}

//função que monta o HTML da lista de todos os quizzes
function makeAllQuizzesCardsHTML() {
  let AllQuizzesCardsHTML = "";
  //para cada quizz geral, monta o html correspondente a ele
  for (let i = 0; i < AllQuizzes.length; i++) {
    AllQuizzesCardsHTML += makeQuizzCardHTML(AllQuizzes[i]);
  }
  return AllQuizzesCardsHTML;
}

//função que monta um card de um quizz
function makeQuizzCardHTML(quizz) {
  return `
  <div class="quizz-card" onclick="showQuizz('${quizz.id}')">
    <img src = "${quizz.image}">
    <div class="overlay"></div>
    <div class="quizz-card-title"> ${quizz.title} </div>
  </div>
  `;
}

//função que redireciona para a página 2 (jogar quizz)
function showQuizz(id){
  const promise = axios.get(`'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
  promise.then(FuncaoDaVictoria);
  promise.catch(failedToGetQuizzes);
}

//função que redireciona para a página 3 (criar quizz)
function goToCreateQuizz(){
  window.open("/projeto6-buzzquizz/tela3/index.html", "_self");
}

// PAGE 1 END

// PAGE 2

let qtdPerguntas;
let QuestoesRespondidas = 0;
let resultado = 0;
let resultadoFinal = 0;
let levelsArray;

function responder() {
  const quizz = document.querySelector("main");
  // ALTERAR ID BASEADO NA TELA 1 !
  axios
    .get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/16233")
    .then((response) => {
      let item = response.data;

      levelsArray = item.levels;

      let add = `<div class="titulo">
              <div class="black"><img src="${item.image}" alt="Titulo"></div>
              <h1>${item.title}</h1>
          </div>`;

      qtdPerguntas = item.questions.length;
      console.log(qtdPerguntas);

      for (var i = 0; i < item.questions.length; i++) {
        const quantidadeDeRespostas = item.questions[i].answers;
        const sortido = quantidadeDeRespostas.sort(baguncar);

        function baguncar() {
          return 0.5 - Math.random();
        }
        add += `<div class="quizz">
                  <div class="pergunta">
                    <div class="cabecalho" style="background-color:${item.questions[i].color}">
                      <p class="ctitulo">${item.questions[i].title}</p>
                    </div>`;

        let contador = 0;
        let quantidadeDePerguntas = sortido.length;
        for (var j = 0; j < quantidadeDePerguntas; j++) {
          contador++;
          if (contador == 1) {
            add += `<div class="quadro">
                        <div class="resposta ${sortido[j].isCorrectAnswer} quiz${i}${j}">
                          <img src="${sortido[j].image}" alt="quiz${i}${j}">
                          <p class="paragrafo">${sortido[j].text}</p>
                        </div>`;
            if (quantidadeDePerguntas == 3) {
              add += `</div>
                      </div>`;
            }
          }
          if (contador == 2) {
            add += `<div class="resposta ${sortido[j].isCorrectAnswer} quiz${i}${j}">
                          <img src="${sortido[j].image}" alt="quiz${i}${j}">
                          <p class="paragrafo">${sortido[j].text}</p>
                        </div>
                    </div>`;

            if (quantidadeDePerguntas == 2 || j == 3) {
              add += `</div>
                      </div>`;
            }

            contador = 0;
          }
        }
      }

      quizz.innerHTML = add;
    })

    .catch((error) => {});
}

const main = document.querySelector("main");
let contador = 0;
let contador2 = 1;

main.addEventListener("click", function (e) {
  let alt = e.srcElement.alt;

  if (!alt.includes("quiz") || alt.length == 0) {
    return;
  }

  let resposta_click = document.querySelector(`.${alt}`);
  resposta_click.classList.add("escolhido");

  let resposta = document.querySelectorAll(".resposta");

  for (let i = 0; i < resposta.length; i++) {
    if (!resposta[i].className.includes("escolhido")) {
      if (alt[4] == resposta[i].className.split("quiz")[1][0]) {
        resposta[i].classList.add("desabilitado");
      }
    }

    if (resposta[i].className.includes("false")) {
      if (alt[4] == resposta[i].className.split("quiz")[1][0]) {
        resposta[i].classList.add("errado");
      }
    } else if (resposta[i].className.includes("true")) {
      if (alt[4] == resposta[i].className.split("quiz")[1][0]) {
        resposta[i].classList.add("certo");
      }
    }
  }

  for (let i = 0; i < resposta.length; i++) {
    if (
      resposta[i].className.includes("escolhido") &&
      resposta[i].className.includes("certo")
    ) {
      if (alt[4] == resposta[i].className.split("quiz")[1][0]) {
        resultado++;
      }
    }
  }

  resultadoFinal = Math.round((resultado / qtdPerguntas) * 100);

  QuestoesRespondidas++;

  if (QuestoesRespondidas == qtdPerguntas) {
    let array = [];
    for (let i = 0; i < levelsArray.length; i++) {
      array.push(Number(levelsArray[i].minValue));
    }

    let final = document.querySelector("main");
    let add2 = `<div class="final">`;

    let posicao;

    for (let i = 0; i < array.length; i++) {
      if (resultadoFinal >= array[i]) {
        posicao = i;
      }
    }
    add2 += `<div class="topo">
                <p>${resultadoFinal}% de acerto: ${levelsArray[posicao].title}</p>
                </div>
                <div class="menu">
                <div class="imagem">
                <img src="${levelsArray[posicao].image}" alt="Final">
                </div>
                <div class="texto">
                <p>${levelsArray[posicao].text}</p>
                </div>
                </div>
                </div>`;

    final.innerHTML += add2;
  }

  function scrollar() {
    let proximaResposta = document.querySelector(
      `.quadro div:nth-child(${contador2})`
    );
    console.log(proximaResposta);
    contador2++;
    proximaResposta.scrollIntoView(true, { block: "end", behavior: "smooth" });
    console.log(contador2 + " contagens");
  }

  setTimeout(scrollar(), 2000);
});

responder();

const botaoReiniciar = document.querySelector(".reiniciar");

botaoReiniciar.addEventListener("click", function (e) {
  const reiniciar = document.querySelector("div:last-child");

  reiniciar.scrollIntoView({ block: "end", behavior: "smooth" });

  let resposta = document.querySelectorAll(".resposta");

  for (i = 0; i < resposta.length; i++) {
    if (resposta[i].className.includes("certo")) {
      resposta[i].classList.remove("certo");
    } else if (resposta[i].className.includes("errado")) {
      resposta[i].classList.remove("errado");
    }

    if (resposta[i].className.includes("desabilitado")) {
      resposta[i].classList.remove("desabilitado");
    } else if (resposta[i].className.includes("escolhido")) {
      resposta[i].classList.remove("escolhido");
    }
  }
  contador2 = 1;
  resultado = 0;
  resultadoFinal = 0;
  QuestoesRespondidas = 0;
  responder();
});

const botaoHome = document.querySelector(".home");

botaoHome.addEventListener("click", function (e) {
  window.location = "../tela1/index.html";
});

// PAGE 2 END

// PAGE 3

function verifyValuesQuizzFirstPage() {
  let ErrorMessage = `
Ocorreu um problema na validação do seu quizz. 
Por favor, verifique se: 
Seu título ficou entre 20 caracteres e 65 caracteres; 
Se foi inserida uma URL válida na sua imagem; 
Se selecionou pelo menos 3 perguntas;
Se selecionou no mínimo 2 níveis.
`;

  quizzTitle = document.getElementById("quizz-title").value;
  quizzURLImage = document.getElementById("quizz-URL-Image").value;
  quizzQuestionCount = document.getElementById("quizz-question-count").value;
  quizzLevelCount = document.getElementById("quizz-level-count").value;

  if (
    quizzTitle.length < 20 ||
    quizzTitle.length > 65 ||
    !quizzURLImage.startsWith("https://") ||
    quizzQuestionCount < 3 ||
    quizzLevelCount < 2
  ) {
    alert(ErrorMessage);
  } else {
    handleGoToQuizzPage2();
  }
}

function handleGoToQuizzPage2() {
  let baseToPrint = `
    <div class="form-container" id="second-form">
        <h1 class="form-title">Crie suas perguntas</h1>

        <form action="#" class="identifyQuestionForm1">
        </form>
        
    </div>
    `;

  mainContent.innerHTML = baseToPrint;

  let mainFormContainer = document.getElementById("second-form");

  let formContainer = document.querySelector("#second-form form");

  for (let i = 1; i <= quizzQuestionCount; i++) {
    if (i === 1) {
      formContainer.innerHTML = `
        <div class="question-container">
			<h1 class="question-title">Pergunta 1</h1>
            <input
              type="text"
              placeholder="Texto da pergunta"
              minlength="20"
              id="quizz-question-text"
            />
            <input
              type="text"
              placeholder="Cor de fundo da pergunta"
              id="quizz-question-color"
            />
          </div>
		  <div class="question-container">
			<h1 class="question-title">Resposta correta</h1>
            <input
              type="text"
              placeholder="Resposta correta"
              minlength="1"
              id="quizz-correct-answer-text"
            />
            <input
              type="text"
              placeholder="URL da imagem"
              id="quizz-correct-answer-image"
            />
          </div>
          <div class="wrong-answer-container">
			<h1 class="question-title">Respostas incorretas</h1>
			<div class="wrong-answer">
				<input
				type="text"
				placeholder="Resposta incorreta 1"
        minlength="1"
				id="quizz-wrong-answer-text1"
			  />
			  <input
				type="text"
				placeholder="URL da imagem 1"
				id="quizz-wrong-answer-image1"
			  />
			</div>
			<div class="wrong-answer">
				<input
				type="text"
				placeholder="Resposta incorreta 2"
				id="quizz-wrong-answer-text2"
			  />
			  <input
				type="text"
				placeholder="URL da imagem 2"
				id="quizz-wrong-answer-image2"
			  />
			</div>
			<div class="wrong-answer">
				<input
				type="text"
				placeholder="Resposta incorreta 3"
				id="quizz-wrong-answer-text3"
			  />
			  <input
				type="text"
				placeholder="URL da imagem 3"
				id="quizz-wrong-answer-image3"
			  />
			</div>
			
          </div>
		  
        `;
    } else {
      mainFormContainer.innerHTML += `
      <div class="toOpen" >
      <div class="closed-form-container" id="closed-container${i}">
        <h1 class="question-title">
          Pergunta ${i}
        </h1>
  
        <button onclick="openCloseContainer(${i})">
          <img src="../assets/edit-icon.svg" alt="">
        </button>	
        </div>
        <form action="#" class="hidden identifyQuestionForm${i}" id="openned-container${i}">
            <div class="question-container">
        <h1 class="question-title">Pergunta ${i}</h1>
              <input
                type="text"
                placeholder="Texto da pergunta"
                minlength="20"
                id="quizz-question-text"
              />
              <input
                type="text"
                placeholder="Cor de fundo da pergunta"
                id="quizz-question-color"
              />
            </div>
  
        <div class="question-container">
        <h1 class="question-title">Resposta correta</h1>
              <input
                type="text"
                placeholder="Resposta correta"
                minlength="1"
                id="quizz-correct-answer-text"
              />
              <input
                type="text"
                placeholder="URL da imagem"
                id="quizz-correct-answer-image"
              />
            </div>
  
            <div class="wrong-answer-container">
        <h1 class="question-title">Respostas incorretas</h1>
        <div class="wrong-answer">
          <input
          type="text"
          placeholder="Resposta incorreta 1"
          minlength="1"
          id="quizz-wrong-answer-text1"
          />
          <input
          type="text"
          placeholder="URL da imagem 1"
          id="quizz-wrong-answer-image1"
          />
        </div>
  
        <div class="wrong-answer">
          <input
          type="text"
          placeholder="Resposta incorreta 2"
          id="quizz-wrong-answer-text2"
          />
          <input
          type="text"
          placeholder="URL da imagem 2"
          id="quizz-wrong-answer-image2"
          />
        </div>
  
        <div class="wrong-answer">
          <input
          type="text"
          placeholder="Resposta incorreta 3"
          id="quizz-wrong-answer-text3"
          />
          <input
          type="text"
          placeholder="URL da imagem 3"
          id="quizz-wrong-answer-image3"
          />
        </div>
        
            </div>
        
              
          </form>
      </div>
  
      `;
    }
  }

  mainFormContainer.innerHTML += `
  <button class="form-button" onclick="verifyValuesQuizzSecondPage()">
	 		Prosseguir pra criar níveis
	 	  </button> 
  `;
}

function verifyValuesQuizzSecondPage() {
  let quizzQuestionsCount = 0;
  let quizzAnswerCount = 0;
  let moreWrong = []

  for (let i = 1; i <= quizzQuestionCount; i++) {
    console.log("entrou for");
    
    let questionText = document.querySelector(
      `.identifyQuestionForm${i} #quizz-question-text`
    ).value;

    let questionColor = document.querySelector(
      `.identifyQuestionForm${i} #quizz-question-color`
    ).value;

      if (questionText.length > 20 && questionColor.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/i))
      questionsObjectArray.push({ title: questionText, color: questionColor })
    else {
      console.log('erro titulo ou cor titulo')
      return handleInvalidQuizzValues();
    }
     
    quizzQuestionsCount++;

    let questionCorrectAnswer = document.querySelector(
      `.identifyQuestionForm${i} #quizz-correct-answer-text`
    ).value;

    let questionCorrectAnswerImage = document.querySelector(
      `.identifyQuestionForm${i} #quizz-correct-answer-image`
    ).value;

    if (questionCorrectAnswer !== '' && questionCorrectAnswerImage.startsWith('https://'))
    answersObjectArray.push({
      text: questionCorrectAnswer,
      image: questionCorrectAnswerImage,
      isCorrectAnswer: true,
    })
    else {
      console.log('erro resposta correta ou imagem resposta correta')
      return handleInvalidQuizzValues();
    }

    let questionWrongAnswer1 = document.querySelector(
      `.identifyQuestionForm${i} #quizz-wrong-answer-text1`
    ).value;

    let questionWrongAnswerImage1 = document.querySelector(
      `.identifyQuestionForm${i} #quizz-wrong-answer-image1`
    ).value;

    if (questionWrongAnswer1 !== "" && questionWrongAnswerImage1 !== "") {
      answersObjectArray.push({
        text: questionWrongAnswer1,
        image: questionWrongAnswerImage1,
        isCorrectAnswer: false,
      }) 
      //quizzAnswerCount++;
    } 
    else {
      console.log('erro resposta errada1 ou imagem')
      return handleInvalidQuizzValues();
    }

    let questionWrongAnswer2 = document.querySelector(
      `.identifyQuestionForm${i} #quizz-wrong-answer-text2`
    ).value;

    let questionWrongAnswerImage2 = document.querySelector(
      `.identifyQuestionForm${i} #quizz-wrong-answer-image2`
    ).value;

    if (questionWrongAnswer2 !== "" && questionWrongAnswerImage2 !== "") {
      moreWrong.push({
        text: questionWrongAnswer2,
        image: questionWrongAnswerImage2,
        isCorrectAnswer: false,
      });
      quizzAnswerCount++;
    }

    let questionWrongAnswer3 = document.querySelector(
      `.identifyQuestionForm${i} #quizz-wrong-answer-text3`
    ).value;

    let questionWrongAnswerImage3 = document.querySelector(
      `.identifyQuestionForm${i} #quizz-wrong-answer-image3`
    ).value;

    if (questionWrongAnswer3 !== "" && questionWrongAnswerImage3 !== "") {
      moreWrong.push({
        text: questionWrongAnswer3,
        image: questionWrongAnswerImage3,
        isCorrectAnswer: false,
      });
      quizzAnswerCount++;
    }


    if (quizzAnswerCount === 0) {
    
    questions.push({
      title: questionText,
      color: questionColor,
      answers: [
        {
          text: questionCorrectAnswer,
          image: questionCorrectAnswerImage,
          isCorrectAnswer: true,
        },
        {
          text: questionWrongAnswer1,
          image: questionWrongAnswerImage1,
          isCorrectAnswer: false,
        }
      ]
    })
  }

  if (quizzAnswerCount === 1) {
    
    questions.push({
      title: questionText,
      color: questionColor,
      answers: [
        {
          text: questionCorrectAnswer,
          image: questionCorrectAnswerImage,
          isCorrectAnswer: true,
        },
        {
          text: questionWrongAnswer1,
          image: questionWrongAnswerImage1,
          isCorrectAnswer: false,
        },
        {
          text: questionWrongAnswer2,
          image: questionWrongAnswerImage2,
          isCorrectAnswer: false,
        },
      ]
    })

    quizzAnswerCount = 0;
  }

  if (quizzAnswerCount === 2) {
    
    questions.push({
      title: questionText,
      color: questionColor,
      answers: [
        {
          text: questionCorrectAnswer,
          image: questionCorrectAnswerImage,
          isCorrectAnswer: true,
        },
        {
          text: questionWrongAnswer1,
          image: questionWrongAnswerImage1,
          isCorrectAnswer: false,
        },
        {
          text: questionWrongAnswer2,
          image: questionWrongAnswerImage2,
          isCorrectAnswer: false,
        },
        {
          text: questionWrongAnswer3,
          image: questionWrongAnswerImage3,
          isCorrectAnswer: false,
        },
      ]
    })
    quizzAnswerCount = 0;
  }    
}
  console.log(questions);

  handleGoToQuizzPage3()

}

function handleInvalidQuizzValues() {
  let questionErrorMessage = `
Ocorreu um problema na validação das suas perguntas. 
Por favor, verifique se: 
Sua pergunta tem, no mínimo, 20 caracteres; 
Sua cor de fundo está no formato hexadecimal;
Se o texto das respostas não está vazio;
Se foi inserida uma URL válida na sua imagem; 
Se inseriu pelo menos 1 resposta correta e 1 resposta errada em cada pergunta.
`;

questions = []

  alert(questionErrorMessage);
}

function openCloseContainer(value) {
  let actualContainer = document.getElementById(`closed-container${value}`);
  actualContainer.classList.add("hidden");
  let expectedContainer = document.getElementById(`openned-container${value}`);
  expectedContainer.classList.remove("hidden");
}

function handleGoToQuizzPage3() {
  let baseToPrint = `
    <div class="form-container" id="third-form">
        <h1 class="form-title">Agora, decida os níveis</h1>

        <form action="#" class="identifyLevelForm1">
        </form>
        
    </div>
    `;

  mainContent.innerHTML = baseToPrint;

  let mainFormContainer = document.getElementById("third-form");

  let formContainer = document.querySelector("#third-form form");

  for (let i = 1; i <= quizzLevelCount; i++) {
    if (i === 1) {
      formContainer.innerHTML = `
      <h1 class="question-title">Nível 1</h1>
      <input
        type="text"
        placeholder="Título do nível"
        minlength="10"
        id="quizz-level-title"
      />
      <input
        type="number"
        placeholder="% de acerto mínima"
        id="quizz-level-percentage"
      />
      <input
        type="text"
        placeholder="URL da imagem do nível"
        id="quizz-level-image"
      />
      <textarea
        cols="30"
        rows="5"
        minlength="30"
        placeholder="Descrição do nível"
        id="quizz-level-description"
      ></textarea>
      `;
    } else {
      mainFormContainer.innerHTML += `
      <div class="toOpen" >
      <div class="closed-form-container" id="closed-container${i}">
			<h1 class="question-title">
				Nível ${i}
			</h1>
			<button onclick="openCloseContainer(${i})">
				<img src="../assets/edit-icon.svg" alt="">
			</button>			
		</div>

    <form action="#" class="hidden identifyLevelForm${i}" id="openned-container${i}">
			<h1 class="question-title">Nível ${i}</h1>
          <input
            type="text"
            placeholder="Título do nível"
            minlength="10"
            id="quizz-level-title"
          />
          <input
            type="number"
            placeholder="% de acerto mínima"
            id="quizz-level-percentage"
          />
          <input
            type="text"
            placeholder="URL da imagem do nível"
            id="quizz-level-image"
          />
          <textarea
            cols="30"
            rows="5"
            minlength="30"
            placeholder="Descrição do nível"
            id="quizz-level-description"
          ></textarea>
        </form>
      </div>      
      `;
    }
  }
  mainFormContainer.innerHTML += `
  <button class="form-button" onclick="verifyValuesQuizzThirdPage()">
    Finalizar Quizz
	</button> 
  `;
}

function verifyValuesQuizzThirdPage() {
  

  for (let i = 1; i <= quizzLevelCount; i++) {
    let levelTitle = document.querySelector(
      `.identifyLevelForm${i} #quizz-level-title`
    ).value;
    console.log(levelTitle)
    if (levelTitle.length < 10) {
      handleInvalidLevelValues();
    }

    let levelPercentage = document.querySelector(
      `.identifyLevelForm${i} #quizz-level-percentage`
    ).value;
    console.log(levelPercentage);
    if (levelPercentage < 0 || levelPercentage > 100 || levelPercentage === '') {
      handleInvalidLevelValues();
    } else {
      percentArray.push(levelPercentage)
    }

    let levelImageURL = document.querySelector(
      `.identifyLevelForm${i} #quizz-level-image`
    ).value;
    console.log(levelImageURL);
    if (!levelImageURL.startsWith('https://')) {
      handleInvalidLevelValues();
    }


    let levelDescription = document.querySelector(
      `.identifyLevelForm${i} #quizz-level-description`
    ).value;
    console.log(levelDescription);
    if (levelDescription.length < 30) {
      handleInvalidLevelValues();
    }

    
      levelInnerObject = {
        title: levelTitle,
        image: levelImageURL,
        text: levelDescription,
        minValue: +levelPercentage,
      }
      levelsObjectArray.push(levelInnerObject)

      levelInnerObject = {};
      
    
  }

  console.log(percentArray)

  if (percentArray.indexOf('0') === -1) {
    handleInvalidLevelValues();
    levelsObjectArray = []
  } else {
    console.log(levelsObjectArray);
    console.log('finalizou')
    makeFinalObject()
  }
}

function makeFinalObject() {
  globalObject = {
    title: quizzTitle,
    image: quizzURLImage,
    questions: questions,
    levels: levelsObjectArray
  }

  console.log(globalObject)
  sendQuizz()

}

function sendQuizz() {
  let promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", globalObject)
  promise.then(getCreatedQuizzId)
  promise.catch((err) => {
    alert('Erro ao enviar quizz')
  })
  
}

function getCreatedQuizzId (response) {
  let quizzId = response.data.id;
  console.log(quizzId)
  handleGoToQuizzPage4(quizzId);
}



function handleInvalidLevelValues() {
  let questionErrorMessage = `
Ocorreu um problema na validação das suas perguntas. 
Por favor, verifique se: 
Seu título tem, no mínimo, 10 caracteres; 
A porcentagem de acerto deve ficar entre 0 e 100;
Se foi inserida uma URL válida na sua imagem; 
A descrição do nível deve ter, no mínimo, 30 caracteres;
É necessário que exista pelo menos um nível cuja porcentagem de acerto mínima seja 0%.
`;
  percentArray = [];
  levelsObjectArray = []
  levelInnerObject = {}
  alert(questionErrorMessage);
}

function openLevelEdit(value) {
  let actualContainer = document.getElementById(
    `closed-level-container${value}`
  );
  console.log(actualContainer);
  actualContainer.classList.add("hidden");
  let expectedContainer = document.getElementById(
    `openned-level-container${value}`
  );
  expectedContainer.classList.remove("hidden");
}

function handleGoToQuizzPage4(id) {
 
  let toPrint = `
    <div class="form-container" id="first-form" onclick="handleGoToCreatedQuizz(${id})">
    <h1 class="form-title">Seu quizz está pronto!</h1>
    <div class="final-quizz-container">
        <img  src="${quizzURLImage}" alt="">
        <div class="gradient"></div>
        <p>
            ${quizzTitle}
        </p>
    </div>
    <button class="form-button" onclick="handleGoToCreatedQuizz(${id})">
      Acessar Quizz
    </button>
    <button class="home-button" onclick="goHome()">
        Voltar pra home
    </button>
  </div>
    `;

  mainContent.innerHTML = toPrint;
}

function handleGoToCreatedQuizz() {

}

function goHome () {
  window.open("/projeto6-buzzquizz/index.html", "_self");
}

// PAGE 3 END
