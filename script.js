//opcao de clicar e remover as cores selecionas
function selectColor() {
  const selectedColors = document.getElementsByClassName('color selected');
  const colors = document.getElementsByClassName('color');

  for (let index = 0; index < colors.length; index += 1) {
    colors[index].addEventListener('click', function (event) {
      for (let index2 = 0; index2 < selectedColors.length; index2 += 1) {
        selectedColors[index2].classList.remove('selected');
      }
      event.target.classList.add('selected');
    });
  }
}

//muda a background de cada pixel selecionado
function colorPixel() {
  const pixels = document.getElementsByClassName('pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', function (event) {
      const selectedColor = window.getComputedStyle(
        document.querySelector('.color.selected'),
      );
      const bgColor = selectedColor.backgroundColor;
      event.target.style.backgroundColor = bgColor;
    });
  }
}
//funcao que criar o botao clear
//tambem foi inserido o estilo css
function createBtn() {
  const btnSection = document.querySelector('#button-section');
  const clearBtn = document.createElement('button');
  clearBtn.id = 'clear-board';
  clearBtn.innerText = 'Limpar';
  clearBtn.style.background = 'black';
  clearBtn.style.color = 'white';
  clearBtn.style.padding = '7px';
  clearBtn.style.borderRadius = '10px';
  btnSection.appendChild(clearBtn);
}

//funcao que deixa os pixels brancos novamente
//ao ser clicado
function clearBoard() {
  const clearBtn = document.querySelector('#clear-board');
  clearBtn.addEventListener('click', function () {
    const pixels = document.getElementsByClassName('pixel');
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = 'white';
    }
  });
}

//criado um input
//para aumentar o tamanho dos pixels
//que inicia com 1 e maximo 50
//foi adicionado como filho da section button-section
function createInput() {
  const btnSection = document.querySelector('#button-section');
  const input = document.createElement('input');
  input.min = '1';
  input.max = '50';
  input.id = 'board-size';
  input.type = 'number';
  btnSection.appendChild(input);
}

//funcao que criar um button que vai inserir o valor
//que foi colocado no input
//selecionado o id da section button-section
//adicionado como filho section-button
function createGenBoardBtn() {
  const btnSection = document.querySelector('#button-section');
  const genBoardBtn = document.createElement('button');
  genBoardBtn.id = 'generate-board';
  genBoardBtn.innerText = 'VQV';
  genBoardBtn.style.backgroundColor = 'black';
  genBoardBtn.style.color = 'white';
  genBoardBtn.style.borderRadius = '10px';
  btnSection.appendChild(genBoardBtn);
}

//funcao criada da delimitar o tamanho do pixel
//que inicia com o valor minimo de 5
//valor maximo de 50
function checkInput(value) {
  if (value < 5) {
    value = 5;
  }
  if (value > 50) {
    value = 50;
  }
  return value;
}

function generateBoard() {
  //variavel que acessa a tag input com id board-size
  let inputValue = document.querySelector('#board-size').value;

  //variavel que acessa a tag section pixel-board
  const pixelBoardDiv = document.querySelector('#pixel-board');

  //checar o valor do input
  inputValue = checkInput(inputValue);

  //criado uma tag div com a class pixel-line
  //essa div é uma row da table
  for (let index = 0; index < inputValue; index += 1) {
    const boardLine = document.createElement('div');
    boardLine.className = 'pixel-line';
    boardLine.style.display = 'table-row';

    //adicionado como filho da tag section pixel-board
    pixelBoardDiv.appendChild(boardLine);

    //criado uma tag div com a class pixel
    //essa div é uma cell da table
    for (let index2 = 0; index2 < inputValue; index2 += 1) {
      const boardColumn = document.createElement('div');
      boardColumn.className = 'pixel';
      boardColumn.style.display = 'table-cell';

      //adicionado como filho da tag section pixel-board
      boardLine.appendChild(boardColumn);
    }
  }
}

//funcao que cria um alerta se nao for inserido nada ao clicar no button
function generateBoardBtn() {
  //variavel que acessa a tag button com o id generate-button
  //que esta dentro da section com id button-section
  const button = document.getElementById('generate-board');
  button.addEventListener('click', function () {
    const inputValue = document.querySelector('#board-size').value;
    if (!inputValue) {
      alert('Board inválido!');
    } else {
      const pixelBoardDiv = document.querySelector('#pixel-board');
      pixelBoardDiv.querySelectorAll('*').forEach((n) => n.remove());
      generateBoard();
      colorPixel();
    }
  });
}

function generateColor() {
  //variavel que seleciona id .black
  const blackSquare = document.querySelector('.black');

  //adiciona a cor black como backgroundColor
  blackSquare.style.backgroundColor = 'black';

  //variavel que seleciona id .white
  const whiteSquare = document.querySelector('.white');

  //adiciona a cor white como backgroundColor
  whiteSquare.style.backgroundColor = 'white';

  //variavel que acessa todos ids .color
  const colorSquares = document.querySelectorAll('.color');

  //percorre todo colorSquares
  for (let index = 1; index < colorSquares.length - 1; index += 1) {
    //pelo indice de cada pixel é adicionado o metodo
    //random para adiciona cores aleatoriamente quando carregado a pagina
    colorSquares[index].style.backgroundColor = `rgb(${Math.random() * 255}, ${
      Math.random() * 255
    }, ${Math.random() * 255})`;
  }
}

window.onload = function () {
  createBtn();
  createInput();
  createGenBoardBtn();
  generateColor();
  generateBoard();
  generateBoardBtn();
  selectColor();
  colorPixel();
  clearBoard();
};
