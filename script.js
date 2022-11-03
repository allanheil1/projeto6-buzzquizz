
// PAGE 3

let quizzTitle, quizzURLImage, quizzQuestionCount, quizzLevelCount;

let ErrorMessage = `
Ocorreu um problema na validação do seu quizz. 
Por favor, verifique se: 
Seu título ficou entre 20 caracteres e 65 caracteres; 
Se foi inserida uma URL válida na sua imagem; 
Se selecionou pelo menos 3 perguntas;
Se selecionou no mínimo 2 níveis.
`

let mainContent = document.getElementById('main-content');

function verifyValuesQuizzFirstPage () {
    quizzTitle = document.getElementById('quizz-title').value;
    quizzURLImage = document.getElementById('quizz-URL-Image').value;
    quizzQuestionCount = document.getElementById('quizz-question-count').value;
    quizzLevelCount = document.getElementById('quizz-level-count').value;

    if (
        quizzTitle.length < 20 ||
        quizzTitle.length > 65 || 
        !quizzURLImage.startsWith('https://') || 
        quizzQuestionCount < 3 ||
        quizzLevelCount < 2
        ) {
            alert(ErrorMessage)
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
    `

    mainContent.innerHTML = baseToPrint;
    let toPrint = `
    <div class="form-container" id="second-form">
        <h1 class="form-title">Crie suas perguntas</h1>

        <form action="#">
          <div class="question-container">
			<h1 class="question-title">Pergunta 1</h1>
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
		
		<div class="closed-form-container">
			<h1 class="question-title">
				Pergunta 2
			</h1>

			<button onclick="openQuestionEdit()">
				<img src="../assets/edit-icon.svg" alt="">
			</button>			
		</div>

		<div class="closed-form-container">
			<h1 class="question-title">
				Pergunta 3
			</h1>

			<button onclick="openQuestionEdit()">
				<img src="../assets/edit-icon.svg" alt="">
			</button>			
		</div>
		<button class="form-button" onclick="handleGoToQuizzPage3()">
			Prosseguir pra criar níveis
		  </button>     
      </div>
    `
    mainContent.innerHTML = toPrint;
}

function verifyValuesQuizzSecondPage () {

}

function handleGoToQuizzPage3 () {
    let toPrint = `
    <div class="form-container" id="third-form">
        <h1 class="form-title">Agora, decida os níveis</h1>

        <form action="#">
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
        </form>

		<div class="closed-form-container">
			<h1 class="question-title">
				Nível 2
			</h1>

			<button onclick="openLevelEdit()">
				<img src="../assets/edit-icon.svg" alt="">
			</button>			
		</div>

		<div class="closed-form-container">
			<h1 class="question-title">
				Nível 3
			</h1>

			<button onclick="">
				<img src="../assets/edit-icon.svg" alt="">
			</button>			
		</div>

        <button class="form-button" onclick="handleGoToQuizzPage4()">
          Finalizar Quizz
        </button>
      </div>
    `

    mainContent.innerHTML = toPrint;
}

function handleGoToQuizzPage4 () {
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
    `

    mainContent.innerHTML = toPrint;
}

// PAGE 3 END