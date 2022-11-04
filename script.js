// PAGE 1

let UserQuizzes = [];
let AllQuizzes = [];

getQuizzes();

function goToCreateQuizz(){
  window.open("/tela3/index.html", "_self");
}

function getQuizzes(){
  const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

  promise.then(sortAndCallRenderQuizzes);
  promise.catch(failedToGetQuizzes);
}

function failedToGetQuizzes(){
  alert('Tivemos um erro inesperado ao carregar os Quizzes. Por favor, recarregue a página que a gente tenta de novo =)');
}

function sortAndCallRenderQuizzes(quizzesResponse){
  //essa função deve separar os quizzes entre quizzes do server e quizzes do usuario, e só então chamar o renderiza

  const ServerQuizzes = quizzesResponse.data;
  //chama a função que separa os quizzes entre gerais e de usuário
  sortUserQuizzes(ServerQuizzes);
  //chama a função para renderizar os quizzes
  RenderQuizzes();
}

function sortUserQuizzes(ServerQuizzesList){
  for(let i = 0; i < ServerQuizzesList.length; i++){
    const singleQuizz = ServerQuizzesList[i];
    //agora devemos verificar se esse quizz pertence ao usuario ou não
    if(quizzFromUser(singleQuizz)){
      //caso true (quizz é do usuário), popula a lista de quizzes de usuário
      UserQuizzes.push(singleQuizz);
    }else{
      //caso false (quizz não é do usuário), popula a lista de quizzes gerais
      AllQuizzes.push(singleQuizz);
    }
  }
}

function quizzFromUser(quizzToBeAnalysed){
  //implementar função que verifica que é do usuário ou não
  return false;
}

function RenderQuizzes(){
  let userQuizzesHTML = '';
  let allQuizzesHTML = '';

  if(UserQuizzes.length === 0){
    //caso não tenha quizzes do usuário, o HTML a ser montado deve ser aquele com botão grande
    userQuizzesHTML = makeEmptyUserQuizzesHTML();
  } else {
    //caso tenha quizzes do usuário, o HTML a ser montado deve ser o que mostra os quizzes do usuario
    userQuizzesHTML = makeUserQuizzesCardsHTML();
  }

  //chamamos a função para montar o HTML da parte que mostra Todos os Quizzes
  allQuizzesHTML = makeAllQuizzesCardsHTML();

  const elementUserQuizzes = document.getElementById("user-quizzes");
  elementUserQuizzes.innerHTML = `${userQuizzesHTML}`;

  const elementAllQuizzes = document.getElementById("all-quizzes");
  elementAllQuizzes.innerHTML = `${allQuizzesHTML}`;
}

//função que monta o HTML da parte de quizzes de usuário, quando não há nenhum quizz do usuário
function makeEmptyUserQuizzesHTML(){
  return `
  <div class="empty-user-quizzes">
    <h1>Você não criou nenhum quizz ainda :(</h1>
    <button onclick="goToCreateQuizz()">Criar Quizz</button>
  </div>
  `;
}

//função que monta o HTML da lista de quizzes de usuário
function makeUserQuizzesCardsHTML(){
  let UserQuizzesCardsHTML = '';
  //para cada quizz de usuário, monta o html correspondente a ele
  for(let i = 0; i < UserQuizzes.length; i++){
    UserQuizzesCardsHTML += makeQuizzCardHTML(UserQuizzes[i]);
  }
  return UserQuizzesCardsHTML;
}

//função que monta o HTML da lista de todos os quizzes
function makeAllQuizzesCardsHTML(){
  let AllQuizzesCardsHTML = '';
  //para cada quizz geral, monta o html correspondente a ele
  for(let i = 0; i < AllQuizzes.length; i++){
    AllQuizzesCardsHTML += makeQuizzCardHTML(AllQuizzes[i]);
  }
  return AllQuizzesCardsHTML;
}

//função que monta um card de um quizz
function makeQuizzCardHTML(quizz){
  return `
  <div class="quizz-card" onclick="showQuizz('${quizz.id}')">
    <img src = "${quizz.image}">
    <div class="overlay"></div>
    <div class="quizz-card-title"> ${quizz.title} </div>
  </div>
  `;
}

function showQuizz(){
  //função que deve redirecionar para o Quizz
}


// PAGE 3

let quizzTitle, quizzURLImage, quizzQuestionCount, quizzLevelCount;

let ErrorMessage = `
Ocorreu um problema na validação do seu quizz. 
Por favor, verifique se: 
Seu título ficou entre 20 caracteres e 65 caracteres; 
Se foi inserida uma URL válida na sua imagem; 
Se selecionou pelo menos 3 perguntas;
Se selecionou no mínimo 2 níveis.
`;

let mainContent = document.getElementById("main-content");

function verifyValuesQuizzFirstPage() {
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

        <form action="#">
        </form>

        
    </div>
    `;

  mainContent.innerHTML = baseToPrint;

  let mainFormContainer = document.getElementById('second-form');

  let formContainer = document.querySelector("#second-form form");

  for (let i = 1; i <= quizzQuestionCount; i++) {
    if (i === 1) {
      formContainer.innerHTML = `
        <div class="question-container">
			<h1 class="question-title">Pergunta 1</h1>
            <input
              type="text"
              placeholder="Texto da pergunta"
              id="question-text1"
            />
            <input
              type="text"
              placeholder="Cor de fundo da pergunta"
              id="question-color1"
            />
          </div>

		  <div class="question-container">
			<h1 class="question-title">Resposta correta</h1>
            <input
              type="text"
              placeholder="Resposta correta"
              id="answer-text1"
            />
            <input
              type="text"
              placeholder="URL da imagem"
              id="question-image-URL1"
            />
          </div>

          <div class="wrong-answer-container">
			<h1 class="question-title">Respostas incorretas</h1>
			<div class="wrong-answer">
				<input
				type="text"
				placeholder="Resposta incorreta 1"
				id="wrong-answer-text"
			  />
			  <input
				type="text"
				placeholder="URL da imagem 1"
				id="wrong-question-image-URL1.1"
			  />
			</div>

			<div class="wrong-answer">
				<input
				type="text"
				placeholder="Resposta incorreta 2"
				id="answer-text"
			  />
			  <input
				type="text"
				placeholder="URL da imagem 2"
				id="question-image-URL"
			  />
			</div>

			<div class="wrong-answer">
				<input
				type="text"
				placeholder="Resposta incorreta 3"
				id="answer-text"
			  />
			  <input
				type="text"
				placeholder="URL da imagem 3"
				id="question-image-URL"
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
        <form action="#" class="hidden" id="openned-container${i}">
            <div class="question-container">
        <h1 class="question-title">Pergunta ${i}</h1>
              <input
                type="text"
                placeholder="Texto da pergunta"
                id="question-text"
              />
              <input
                type="text"
                placeholder="Cor de fundo da pergunta"
                id="question-color"
              />
            </div>
  
        <div class="question-container">
        <h1 class="question-title">Resposta correta</h1>
              <input
                type="text"
                placeholder="Resposta correta"
                id="answer-text"
              />
              <input
                type="text"
                placeholder="URL da imagem"
                id="question-image-URL"
              />
            </div>
  
            <div class="wrong-answer-container">
        <h1 class="question-title">Respostas incorretas</h1>
        <div class="wrong-answer">
          <input
          type="text"
          placeholder="Resposta incorreta 1"
          id="answer-text"
          />
          <input
          type="text"
          placeholder="URL da imagem 1"
          id="question-image-URL"
          />
        </div>
  
        <div class="wrong-answer">
          <input
          type="text"
          placeholder="Resposta incorreta 2"
          id="answer-text"
          />
          <input
          type="text"
          placeholder="URL da imagem 2"
          id="question-image-URL"
          />
        </div>
  
        <div class="wrong-answer">
          <input
          type="text"
          placeholder="Resposta incorreta 3"
          id="answer-text"
          />
          <input
          type="text"
          placeholder="URL da imagem 3"
          id="question-image-URL"
          />
        </div>
        
            </div>
        
              
          </form>
      </div>
  
      `
    }
  }

  mainFormContainer.innerHTML += `
  <button class="form-button" onclick="handleGoToQuizzPage3()">
	 		Prosseguir pra criar níveis
	 	  </button> 
  `

  
}

function verifyValuesQuizzSecondPage() {}

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

        <form action="#">
        </form>

        
    </div>
    `;

  mainContent.innerHTML = baseToPrint;

  let mainFormContainer = document.getElementById('third-form');

  let formContainer = document.querySelector("#third-form form");

  for (let i = 1; i <= quizzLevelCount; i++) {
    if (i === 1) {
      formContainer.innerHTML = `
      <h1 class="question-title">Nível 1</h1>
      <input
        type="text"
        placeholder="Título do nível"
        id="level-title"
      />
      <input
        type="text"
        placeholder="% de acerto mínima"
        id="correct-percentage"
      />
      <input
        type="text"
        placeholder="URL da imagem do nível"
        id="level-image-URL"
      />
      <textarea
        cols="30"
        rows="5"
        placeholder="Descrição do nível"
        id="level-description"
      ></textarea>
      `
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

    <form action="#" class="hidden" id="openned-container${i}">
			<h1 class="question-title">Nível ${i}</h1>
          <input
            type="text"
            placeholder="Título do nível"
            id="level-title"
          />
          <input
            type="text"
            placeholder="% de acerto mínima"
            id="correct-percentage"
          />
          <input
            type="text"
            placeholder="URL da imagem do nível"
            id="level-image-URL"
          />
          <textarea
            cols="30"
            rows="5"
            placeholder="Descrição do nível"
            id="level-description"
          ></textarea>
        </form>
      </div>      
      `
    }

  }
  mainFormContainer.innerHTML += `
  <button class="form-button" onclick="handleGoToQuizzPage4()">
    Finalizar Quizz
	</button> 
  `
}

function openLevelEdit(value) {
  let actualContainer = document.getElementById(`closed-level-container${value}`);
  console.log(actualContainer)
  actualContainer.classList.add("hidden");
  let expectedContainer = document.getElementById(`openned-level-container${value}`);
  expectedContainer.classList.remove("hidden");
}

function handleGoToQuizzPage4() {
  let toPrint = `
    <div class="form-container" id="first-form">
    <h1 class="form-title">Seu quizz está pronto!</h1>

    <div class="final-quizz-container">
        <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Hogwarts_model_studio_tour.jpg/1200px-Hogwarts_model_studio_tour.jpg" alt="">
        <div class="gradient"></div>
        <p>
            O quão Potterhead é você?
        </p>
    </div>

    <button class="form-button" onclick="handleGoToQuizzes()">
      Acessar Quizz
    </button>

    <button class="home-button">
        Voltar pra home
    </button>
  </div>
    `;

  mainContent.innerHTML = toPrint;
}

// PAGE 3 END
