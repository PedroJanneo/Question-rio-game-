var answers = {};

var question_one = document.getElementById('question-1');
var question_two = document.getElementById('question-2');
var question_three = document.getElementById('question-3');
var question_four = document.getElementById('question-4');
var question_five = document.getElementById('question-5');
var question_six = document.getElementById('resultado-6'); //acessar o score
var btGerar = document.querySelector("#gerarPDF");

btGerar.addEventListener('click', () => {
    // conteudo pdf
    const resultado = document.querySelector("#resultado-6");
    // config arq final pdf
    const options = {
        margin: [10, 10, 10.5, 10],
        filename: "resultado.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    // gerar pdf
    html2pdf().set(options).from(resultado).save()
    });

function storeAnswer(question_number, event){
    if(event.target.type === 'radio'){
        console.log(event.target.value);
        answers['question'+question_number] = parseInt(event.target.value);
        console.log(answers);
    }
}
            



question_one.addEventListener('click', function(event){
    storeAnswer(1, event)
})
question_two.addEventListener('click', function(event){
    storeAnswer(2, event)
})
question_three.addEventListener('click', function(event){
    storeAnswer(3, event)
})
question_four.addEventListener('click', function(event){
    storeAnswer(4, event)
})
question_five.addEventListener('click', function(event){
    storeAnswer(5, event)
})


function totalScore(){
    var total_score = 
    answers.question1+
    answers.question2+
    answers.question3+
    answers.question4+ 
    answers.question5;
    
    return total_score;
}

function getInfoBasedOnScore(){
    if(totalScore() < 7){
        var score_info = "Você precisa tomar mais cuidado com a segurança!";
    } else if(totalScore() > 7){
        var score_info = "Parabéns! Você está bem de segurança!"
    }

    return score_info;
}

var submit1 = document.getElementById('submit1');
var submit2 = document.getElementById('submit2');
var submit3 = document.getElementById('submit3');
var submit4 = document.getElementById('submit4');
var submit5 = document.getElementById('submit5');

var currentQuestion = 1;

function nextQuestion() {
    var currentQuestionElement = document.getElementById('question-' + currentQuestion);
    var nextQuestionElement = document.getElementById('question-' + (currentQuestion + 1));
    
    if (currentQuestionElement) {
        currentQuestionElement.style.display = "none";
    }

    if (nextQuestionElement) {
        nextQuestionElement.style.display = "block";
        currentQuestion++;
    } else {
        // Se não houver uma próxima pergunta, vá para a questão 6 (resultado)
        var resultadoElement = document.getElementById('resultado-6');
        
        if (resultadoElement) {
            resultadoElement.style.display = "block";
        }
    }
}




submit1.addEventListener('click', function(){
    nextQuestion(2);
    growProgressBar('40%');
})
submit2.addEventListener('click', function(){
    nextQuestion(3);
    growProgressBar('60%');
})
submit3.addEventListener('click', function(){
    nextQuestion(4);
    growProgressBar('80%');
})
submit4.addEventListener('click', function(){
    nextQuestion(5);
    growProgressBar('100%');
})
submit5.addEventListener('click', function(){
    nextQuestion(); // Não inclua um argumento aqui
    document.getElementById("printtotalscore").innerHTML = totalScore() + '/15';
    document.getElementById("printscoreinfo").innerHTML = getInfoBasedOnScore();
});

function growProgressBar(percentage_width){
    var bar = document.getElementById("progress_bar");
    bar.style.width = percentage_width;
}