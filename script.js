// PAGE 1

function goToCreateQuizz(){
  window.open("/tela3/index.html", "_self");
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

        <form action="#" class="identifyQuestionForm1">
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
              id="quizz-question-text"
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
              id="quizz-correct-answer-text"
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
				id="quizz-wrong-answer-text1"
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
				id="quizz-wrong-answer-text1"
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
				id="quizz-wrong-answer-text3"
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
        <form action="#" class="hidden identifyQuestionForm${i}" id="openned-container${i}">
            <div class="question-container">
        <h1 class="question-title">Pergunta ${i}</h1>
              <input
                type="text"
                placeholder="Texto da pergunta"
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
                id="quizz-correct-answer-text"
              />
              <input
                type="text"
                placeholder="URL da imagem"
                id="quizz-correct-answer-image-URL"
              />
            </div>
  
            <div class="wrong-answer-container">
        <h1 class="question-title">Respostas incorretas</h1>
        <div class="wrong-answer">
          <input
          type="text"
          placeholder="Resposta incorreta 1"
          id="quizz-wrong-answer-text1"
          />
          <input
          type="text"
          placeholder="URL da imagem 1"
          id="quizz-wrong-answer-image-URL"
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
          id="question-image-URL"
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
  <button class="form-button" onclick="verifyValuesQuizzSecondPage()">
	 		Prosseguir pra criar níveis
	 	  </button> 
  `

  
}



let questionsObjectArray = [];
let answersObjectArray = [];


function verifyValuesQuizzSecondPage() {

  for (let i = 1 ; i <= quizzQuestionCount; i++) {
    console.log('entrou for')
    document.querySelectorAll(`.identifyQuestionForm${i} #quizz-question-text`)
    .forEach((e) => {
      if (e.value !== '') {
        questionsObjectArray.push({text: e.value, color: e.nextElementSibling.value});
      } 
    })

    
    document.querySelectorAll(`.identifyQuestionForm${i} #quizz-correct-answer-text`)
    .forEach((e) => {
      if (e.value !== '' ) {
        qtdRespostasAdd++
        answersObjectArray.push({text: e.value, image: e.nextElementSibling.value, isCorrectAnswer: true});
      }
    })

      document.querySelectorAll(`.identifyQuestionForm${i} #quizz-wrong-answer-text1`)
      .forEach((e) => {
        if (e.value !== '') {
          qtdRespostasAdd++
          answersObjectArray.push({text: e.value, image: e.nextElementSibling.value, isCorrectAnswer: false});
        } 
      })

      document.querySelectorAll(`.identifyQuestionForm${i} #quizz-wrong-answer-text2`)
      .forEach((e) => {
        if (e.value !== '') {
          qtdRespostasAdd++
          answersObjectArray.push({text: e.value, image: e.nextElementSibling.value, isCorrectAnswer: false});
        }
      })

      document.querySelectorAll(`.identifyQuestionForm${i} #quizz-wrong-answer-text3`)
      .forEach((e) => {
        if (e.value !== '') {
          qtdRespostasAdd++
          answersObjectArray.push({text: e.value, image: e.nextElementSibling.value, isCorrectAnswer: false});
        }
      })

    }  
    console.log(answersObjectArray)
    console.log(questionsObjectArray); 
    
    handleGoToQuizzPage3()
  
}

let questionErrorMessage = `
Ocorreu um problema na validação das suas perguntas. 
Por favor, verifique se: 
Sua pergunta tem, no mínimo, 20 caracteres; 
Sua cor de fundo está no formato hexadecimal;
Se o texto das respostas não está vazio;
Se foi inserida uma URL válida na sua imagem; 
Se inseriu pelo menos 1 resposta correta e 1 resposta errada em cada pergunta.
`;

function handleInvalidQuizzValues () {
  alert(questionErrorMessage)
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

  let mainFormContainer = document.getElementById('third-form');

  let formContainer = document.querySelector("#third-form form");

  for (let i = 1; i <= quizzLevelCount; i++) {
    if (i === 1) {
      formContainer.innerHTML = `
      <h1 class="question-title">Nível 1</h1>
      <input
        type="text"
        placeholder="Título do nível"
        id="quizz-level-title"
      />
      <input
        type="text"
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
        placeholder="Descrição do nível"
        id="quizz-level-description"
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

    <form action="#" class="hidden identifyLevelForm${i}" id="openned-container${i}">
			<h1 class="question-title">Nível ${i}</h1>
          <input
            type="text"
            placeholder="Título do nível"
            id="quizz-level-title"
          />
          <input
            type="text"
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
            placeholder="Descrição do nível"
            id="quizz-level-description"
          ></textarea>
        </form>
      </div>      
      `
    }

  }
  mainFormContainer.innerHTML += `
  <button class="form-button" onclick="verifyValuesQuizzThirdPage()">
    Finalizar Quizz
	</button> 
  `
}

let levelsObjectArray = [];
let levelInnerObject = {};

function verifyValuesQuizzThirdPage () {
  for (let i = 1; i <= quizzLevelCount; i++) {
   
    let levelTitle = document.querySelectorAll(`.identifyLevelForm${i} #quizz-level-title`);
    console.log(levelTitle)
    let levelPercentage = document.querySelectorAll(`.identifyLevelForm${i} #quizz-level-percentage`).value;
    console.log(levelPercentage)
    let levelImageURL = document.querySelectorAll(`.identifyLevelForm${i} #quizz-level-image`).value;
    console.log(levelImageURL)
    let levelDescription = document.querySelectorAll(`.identifyLevelForm${i} #quizz-level-description`).value;
    console.log(levelDescription)


    
  }


  console.log(levelsObjectArray)

  handleGoToQuizzPage4(levelsObjectArray.image)
}

function openLevelEdit(value) {
  let actualContainer = document.getElementById(`closed-level-container${value}`);
  console.log(actualContainer)
  actualContainer.classList.add("hidden");
  let expectedContainer = document.getElementById(`openned-level-container${value}`);
  expectedContainer.classList.remove("hidden");
}

function handleGoToQuizzPage4(image) {
  let toPrint = `
    <div class="form-container" id="first-form">
    <h1 class="form-title">Seu quizz está pronto!</h1>

    <div class="final-quizz-container">
        <img  src="${image}" alt="">
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
