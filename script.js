$(document).ready(function() {
    // Adiciona máscara ao campo de entrada de hora
    $('#customTimer').mask('00:00');
    $('#modify1, modify2').mask('0##', '000');
  
  });
  
  // Selecionando os elementos do HTML
  const counterDisplay1 = document.getElementById('counter1'); // Realizados
  const counterDisplay2 = document.getElementById('counter2'); // Restantes
  const incrementBtn1 = document.getElementById('incrementBtn1'); // Botão + Realizadas
  const decrementBtn1 = document.getElementById('decrementBtn1'); // Botão - Realizadas
  const bmodifyCounterBtn1 = document.getElementById('bmodifyCounterBtn1'); // Botão de modificar Realizadas
  const incrementBtn2 = document.getElementById('incrementBtn2'); // Botão + Restantes
  const decrementBtn2 = document.getElementById('decrementBtn2'); // Botão - Restantes
  const bmodifyCounterBtn2 = document.getElementById('bmodifyCounterBtn2'); // Botão de modificar Restantes
  const startBtn = document.getElementById('startBtn');
  const editTimerBtn = document.getElementById('editTimerBtn');
  const customTimerBtn = document.getElementById('customTimerBtn')
  const stopBtn = document.getElementById('stopBtn');
  const resetBtn = document.getElementById('resetBtn');
  const timerDisplay = document.getElementById('timerDisplay');
  const resetCounterBtn1 = document.getElementById('resetCounterBtn1');
  const resetCounterBtn2 = document.getElementById('resetCounterBtn2');
  
  const notyf = new Notyf({
      duration: 3000,
      position: {
        x: 'left',
        y: 'top'
      },
      types: [
        {
          type: 'info',
          background: 'green',
          icon: {
            className: 'fas fa-check-circle',
            tagName: 'i',
            color: 'white'
          }
        },
        {
          type: 'warning',
          background: 'red',
          icon: {
            className: 'fas fa-exclamation-triangle',
            tagName: 'i',
            color: 'white'
          }
        }
      ]
    });
  
  // Variáveis do cronômetro
  let timerHours = 0,
  timerMinutes = 0,
  timerSeconds = 0,
  timerInterval;
  
  // Variável para contar os cliques de incremento
  let incrementClickCount = 0;
  
  // Função para incrementar o contador de realizadas
  function incrementCounter1() {
    let count1 = parseInt(counterDisplay1.textContent);
    let count2 = parseInt(counterDisplay2.textContent);
    
    // Verifica se count2 é maior que 0 antes de decrementar
    if (count2 > 0) {
      count1++;
      count2--; // Decrementa o contador de restantes
    } else {
      notyf.open({
        type : 'warning',
        message : "O contador de Restantes está zerado. Por favor, insira um núméro válido"});
      // Se count2 for 0, não faz mais nada
      return;
    }
  
    if (count2 === 0) {
      notyf.open({
        type : 'info',
        message : "Parabéns, Meta Alcançada!"
      });
    }
    
    updateCounters(count1, count2);
  
    // Incrementa o contador de cliques de incremento
    incrementClickCount++;
  
    // Verifica se atingiu 10 cliques
    if (incrementClickCount === 10) {
      notyf.open({
        type : 'info',
        message : "Você realizou 10. Continue assim!"});
        incrementClickCount = 0;
    }
  }
  
  // Função para decrementar o contador de realizadas
  function decrementCounter1() {
    let count1 = parseInt(counterDisplay1.textContent);
    let count2 = parseInt(counterDisplay2.textContent);
    if (count1 > 0) {
      count1--;
      count2++; // Incrementa o contador de restantes
      updateCounters(count1, count2);
    }  else {
      notyf.open({
        type : 'warning',
        message : "O contador de Realizadas já está em zero."});
      incrementClickCount = 0; // Reinicia o contador de cliques
    }
  }
  
  // Função para incrementar o contador de restantes
  function incrementCounter2() {
    let count2 = parseInt(counterDisplay2.textContent);
    count2++;
    counterDisplay2.textContent = count2;
  }
  
  // Função para decrementar o contador de restantes
  function decrementCounter2() {
    let count2 = parseInt(counterDisplay2.textContent);
    if (count2 > 0) {
      count2--;
      counterDisplay2.textContent = count2;
    }  else {
      notyf.open({
        type : 'warning',
        message : "O contador de Restantes já está em zero."});  }
  }
  
  // Adiciona um ouvinte de evento para a tecla "Enter" no campo modify1
  document.getElementById('modify1').addEventListener('keyup', function(event) {
    // Verifica se a tecla pressionada é "Enter" (código 13)
    if (event.keyCode === 13) {
      // Dispara o evento de clique no botão bmodifyCounterBtn1
      bmodifyCounterBtn1.click();
    }
  });
  // Ouvinte de evento para o botão modifyCounterBtn1
  bmodifyCounterBtn1.addEventListener('click', () => {
    // Obter o valor inserido no campo modify1
    const newCount = parseInt(document.getElementById('modify1').value);
    const currentCount1 = parseInt(counterDisplay1.textContent);
    const currentCount2 = parseInt(counterDisplay2.textContent);
  
    if (!isNaN(newCount) && newCount !== "") {
    } else {
      // Exibir mensagem de erro se a entrada não for válida
      notyf.open({
        type : 'warning',
        message : "Por favor, insira um número válido."});  
        return;
      }
  
    // Verificar se newCount é maior ou igual a counterDisplay2
    if (newCount <= currentCount2 && newCount >= currentCount1) {
      // Subtrair o valor de counterDisplay2 de newCount
      const updatedCount = Math.abs(newCount - currentCount2);
      // Atualizar o contador de realizadas com o novo valor
      counterDisplay2.textContent = updatedCount;
      counterDisplay1.textContent = newCount;
    } else if (newCount <= currentCount1 && newCount > currentCount2) {
      // Atualizar o contador de realizadas com o valor inserido
      counterDisplay1.textContent = newCount;
    } else if (currentCount2 === 0) {
      counterDisplay1.textContent = newCount;
    }
    else {
      // Exibir mensagem de erro se o valor for inválido
      notyf.open({
        type : 'warning',
        message : "O valor inserido é maior que o contador de Restantes."});  
      return; // Encerrar a função se o valor for inválido
    }
  });
  
  // Ouvinte de evento para o botão modifyCounterBtn2
  // Adiciona um ouvinte de evento para a tecla "Enter" no campo modify2
  document.getElementById('modify2').addEventListener('keyup', function(event) {
    // Verifica se a tecla pressionada é "Enter" (código 13)
    if (event.keyCode === 13) {
      // Dispara o evento de clique no botão bmodifyCounterBtn2
      bmodifyCounterBtn2.click();
    }
  });
  bmodifyCounterBtn2.addEventListener('click', () => {
    // Obter o valor inserido no campo modify2
    const newCount = document.getElementById('modify2').value;
    
    // Validar se a entrada do usuário é um número válido
    if (!isNaN(newCount) && newCount !== "") {
      // Atualizar o contador de restantes com o novo valor
      counterDisplay2.textContent = parseInt(newCount);
    } else {
      // Exibir mensagem de erro se a entrada não for válida
      notyf.open({
        type : 'warning',
        message : "Por favor, insira um número válido."});  }
  });
  
  // Função para atualizar os contadores de realizadas e restantes
  function updateCounters(value1, value2) {
    counterDisplay1.textContent = value1;
    counterDisplay2.textContent = value2;
  }
  
  // Função para atualizar o cronômetro na página
  function updateTimer() {
    timerDisplay.textContent = `${formatTimer(timerHours)}:${formatTimer(timerMinutes)}:${formatTimer(timerSeconds)}`;
  }
  
  function formatTimer(value) {
    // Se o valor for undefined, retorna "00"
    if (value === undefined) {
      return "00";
    }
    // Se o valor for menor que 10, adiciona um zero à esquerda
    return value < 10 ? `0${value}` : value;
  }
  // Variável de estado para verificar se o cronômetro está em execução
  let timerRunning = false;
  
  // Função para iniciar o cronômetro
  function startTimer() {
      const clearList = document.getElementById('hoursList')
      const clearCustom = document.getElementById('customTimer')
    // Verificar se o cronômetro já está em execução
    if (!timerRunning) {
      timerInterval = setInterval(() => {
        if (timerSeconds > 0 || timerMinutes > 0 || timerHours > 0) {
          timerSeconds--;
          if (timerSeconds < 0) {
            timerSeconds = 59;
            timerMinutes--;
            if (timerMinutes < 0) {
              timerMinutes = 59;
              timerHours--;
            }
          }
          updateTimer();
          clearList.value = "";
          clearCustom.value = "";
  
        } else {
          clearInterval(timerInterval);
          notyf.open({
            type: 'warning',
            message: "A Contagem Regressiva está zerada."
          });
        }
      }, 1000);
  
      // Atualiza a variável de estado para indicar que o cronômetro está em execução
      timerRunning = true;
    }
  }
  
  // Adiciona um ouvinte de evento para a tecla "Enter" no campo customTimer
  document.getElementById('customTimer').addEventListener('keyup', function(event) {
    // Verifica se a tecla pressionada é "Enter" (código 13)
    if (event.keyCode === 13) {
      // Dispara o evento de clique no botão editTimerBtn
      editTimerBtn.click();
    }
  });
  // Ouvinte de evento para o botão de horário personalizado
  editTimerBtn.addEventListener('click', () => {
    const selectedOption = document.getElementById('hoursList').value;
    const newTime = document.getElementById('customTimer').value.trim();
  
    if (selectedOption) {
      // Atualize o contador de horas e minutos com base na opção selecionada
      const [hours, minutes] = selectedOption.split(':').map(Number);
      timerHours = hours;
      timerMinutes = minutes;
      timerSeconds = 0;
      updateTimer(); // Atualize o display do cronômetro
    } else if (newTime) {
      const timePattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/; // HH:MM
      if (timePattern.test(newTime)) {
        // Verifique se o novo horário já existe na lista
        const hoursList = document.getElementById('hoursList');
        const options = hoursList.getElementsByTagName('option');
        let exists = false;
        for (let i = 0; i < options.length; i++) {
          if (options[i].value === newTime) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          const [hours, minutes] = newTime.split(':').map(Number);
          timerHours = hours;
          timerMinutes = minutes;
          timerSeconds = 0;
          updateTimer(); // Atualize o display do cronômetro
  
          // Adicione o novo horário à lista
          const option = document.createElement('option');
          option.text = newTime;
          option.value = newTime;
          hoursList.add(option);
        } else {
          notyf.open({
            type: 'warning',
            message: "Este horário já existe na lista de Horários personalizados."
          });
        }
      } else {
        notyf.open({
          type: 'warning',
          message: "Por favor, insira um horário válido no formato HH:MM."
        });
      }
    } else {
      notyf.open({
        type: 'warning',
        message: "Selecione um horário ou insira um horário personalizado."
      });
    }
  });
  
  
  
  
  // Função para parar o cronômetro
  function stopTimer() {
    if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
      notyf.open({
        type: 'warning',
        message: "A Contagem Regressiva está zerada!"
      });
    } else {
      clearInterval(timerInterval);
      notyf.open({
        type: 'warning',
        message: "A Contagem Regressiva foi pausada."
      });
      
      // Define timerRunning como false quando o cronômetro é parado
      timerRunning = false;
    }
  }
  
  
  // Função para zerar o cronômetro
  function resetTimer() {
    if (timerHours === 0, timerMinutes === 0, timerSeconds === 0) {
      notyf.open({
        type : 'warning',
        message : "A Contagem Regressiva já está zerada!"});
    } else {
      // Defina aqui os valores iniciais para a contagem regressiva
    timerHours = 0;
    timerMinutes = 0;
    timerSeconds = 0;
    notyf.open({
        type : 'warning',
        message : "A Contagem Regressiva foi zerada!"});
    };
    timerRunning = false;
  
    updateTimer();
  }
  
  incrementBtn1.addEventListener('click', incrementCounter1);
  decrementBtn1.addEventListener('click', decrementCounter1);
  incrementBtn2.addEventListener('click', incrementCounter2);
  decrementBtn2.addEventListener('click', decrementCounter2);
  startBtn.addEventListener('click', startTimer)
  stopBtn.addEventListener('click', stopTimer);
  resetBtn.addEventListener('click', resetTimer);
  resetCounterBtn1.addEventListener('click', () => {
    // Obtém o valor atual do contador
    let currentValue = parseInt(counterDisplay1.textContent);
    
    // Verifica se o valor atual é zero
    if (currentValue === 0) {
      // Mostra um alerta
      notyf.open({
        type : 'warning',
        message : "O Contador já está zerado!"});
    } else {
      // Se não estiver em zero, zera o contador
      counterDisplay1.textContent = "0";
    }
  
  });
  
  resetCounterBtn2.addEventListener('click', () => {
    // Obtém o valor atual do contador
    let currentValue = parseInt(counterDisplay2.textContent);
    
    // Verifica se o valor atual é zero
    if (currentValue === 0) {
      // Mostra um alerta
      notyf.open({
        type : 'warning',
        message : "O Contador já está zerado!"});
    } else {
      // Se não estiver em zero, zera o contador
      counterDisplay2.textContent = "0";
    }
  });