// Seleciona o canvas e ajusta sua largura e altura
const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Seleciona o contexto 2D do canvas
const ctx = canvas.getContext("2d");

// Define as cores disponíveis e o número de cores
const cores_disponiveis = [
  "#ff0000",
  "#00ff00",
  "#ffff66",
  "#ff9933",
  "#660099",
  "#ff99ff",
  "#ff9999",
  "#0000ff",
];
const num_cores = cores_disponiveis.length;

// Define as bolinhas grandes iniciais e suas cores
const posicao_bolinhas_grandes = [
  { x: 66, y: 729, radius: 15, color: cores_disponiveis[0], colorIndex: 0 },
  { x: 160, y: 729, radius: 15, color: cores_disponiveis[1], colorIndex: 0 },
  { x: 255, y: 729, radius: 15, color: cores_disponiveis[2], colorIndex: 0 },
  { x: 350, y: 729, radius: 15, color: cores_disponiveis[3], colorIndex: 0 },
];

// Cria uma imagem e define sua fonte
const image = new Image();
image.src = "../jogo da senha/image/design.png";

// Cria um array para guardar a senha aleatória gerada
const senha = [];
for (let i = 0; i < 4; i++) {
  const indice = Math.floor(Math.random() * cores_disponiveis.length);
  senha.push(cores_disponiveis[indice]);
}

// Função que retorna o índice da bolinha no vetor
function circleIndex(circle) {
  for (let i = 0; i < posicao_bolinhas_grandes.length; i++) {
    if (
      circle.x === posicao_bolinhas_grandes[i].x &&
      circle.y === posicao_bolinhas_grandes[i].y
    ) {
      return i;
    }
  }
}

// Função que desenha as bolinhas grandes
function desenharBolinhasGrandes() {
  posicao_bolinhas_grandes.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
  });
}

function desenharBolinhasPequenas(
  primeira_linha,
  cores_escolhidas_usuario,
  senha
) {
  for (let i = 0; i < 4; i++) {
    const circle = primeira_linha[i];
    ctx.beginPath();

    // Verifica se a cor e a posição estão corretas
    if (senha[i] === cores_escolhidas_usuario[i]) {
      ctx.fillStyle = "black";
    }
    // Verifica se apenas a cor está correta
    else if (senha.includes(cores_escolhidas_usuario[i])) {
      ctx.fillStyle = "green";
    }
    // Caso contrário, pinte a bolinha de cinza (ou qualquer outra cor que você desejar)
    else {
      ctx.fillStyle = "gray";
    }

    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

function encontrarBolinhaClicada(event) {
  return posicao_bolinhas_grandes.find((circle) => {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;
    const distX = mouseX - circle.x;
    const distY = mouseY - circle.y;
    const distance = Math.sqrt(distX * distX + distY * distY);
    return distance <= circle.radius;
  });
}

function atualizarBolinhaGrande(clickedCircle) {
  clickedCircle.colorIndex = (clickedCircle.colorIndex + 1) % num_cores;
  clickedCircle.color = cores_disponiveis[clickedCircle.colorIndex];
}

function atualizarCoresEscolhidas(cores_escolhidas_usuario, clickedCircle) {
  cores_escolhidas_usuario[circleIndex(clickedCircle)] = clickedCircle.color;
}

// Espera a imagem carregar antes de desenhá-la no canvas
image.onload = function () {
  ctx.drawImage(image, 12, 20);

  // Desenha as bolinhas grandes iniciais
  desenharBolinhasGrandes();

  // Inicio o vetor com as cores padrões
  const cores_escolhidas_usuario = [
    posicao_bolinhas_grandes[0].color,
    posicao_bolinhas_grandes[1].color,
    posicao_bolinhas_grandes[2].color,
    posicao_bolinhas_grandes[3].color,
  ];

  // Adiciona um evento de clique para cada bolinha grande
  canvas.addEventListener("click", function (event) {
    // Encontra a bolinha clicada
    const clickedCircle = encontrarBolinhaClicada(event);

    if (clickedCircle) {
      // Atualiza a cor da bolinha grande clicada com a nova cor selecionada pelo usuário
      atualizarBolinhaGrande(clickedCircle);
      // Esta função é responsável por atualizar as cores escolhidas pelo usuário.
      atualizarCoresEscolhidas(cores_escolhidas_usuario, clickedCircle);
      // Redesenha todas as bolinhas grandes
      desenharBolinhasGrandes();
    }
  });

  // button para verificar
  const btn = document.getElementById("btnConferir");

  btn.addEventListener("click", () => {
    const primeira_linha = posicao_bolinhas_medias[0];

    for (let i = 0; i < 4; i++) {
      primeira_linha.forEach((circle, index) => {
        if (index === i) {
          ctx.beginPath();
          if (circle.y > 645) {
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fillStyle = cores_escolhidas_usuario[i];
            ctx.fill();
            ctx.closePath();
          }
        }
      });
    }
  });

  btn.addEventListener("click", () => {
    const primeira_linha = posicao_bolinhas_pequenas[0];
    console.log(senha);
    console.log(cores_escolhidas_usuario);
    desenharBolinhasPequenas(primeira_linha, cores_escolhidas_usuario, senha);
  });
};

const posicao_bolinhas_medias = [
  /* linha 1 */
  [
    { x: 158, y: 646, radius: 9 },
    { x: 212, y: 646, radius: 9 },
    { x: 266, y: 646, radius: 9 },
    { x: 320, y: 646, radius: 9 },
  ],
  /* Linha 2 */
  [
    { x: 158, y: 586, radius: 9 },
    { x: 212, y: 586, radius: 9 },
    { x: 266, y: 586, radius: 9 },
    { x: 320, y: 586, radius: 9 },
  ],
  /* Linha 3 */
  [
    { x: 158, y: 526, radius: 9 },
    { x: 212, y: 526, radius: 9 },
    { x: 266, y: 526, radius: 9 },
    { x: 320, y: 526, radius: 9 },
  ],
  /* Linha 4 */
  [
    { x: 158, y: 466, radius: 9 },
    { x: 212, y: 466, radius: 9 },
    { x: 266, y: 466, radius: 9 },
    { x: 320, y: 466, radius: 9 },
  ],
  /* Linha 5 */
  [
    { x: 158, y: 466, radius: 9 },
    { x: 212, y: 466, radius: 9 },
    { x: 266, y: 466, radius: 9 },
    { x: 320, y: 466, radius: 9 },
  ],
  /* Linha 5 */
  [
    { x: 158, y: 406, radius: 9 },
    { x: 212, y: 406, radius: 9 },
    { x: 266, y: 406, radius: 9 },
    { x: 320, y: 406, radius: 9 },
  ],
  /* Linha 6 */
  [
    { x: 158, y: 346, radius: 9 },
    { x: 212, y: 346, radius: 9 },
    { x: 266, y: 346, radius: 9 },
    { x: 320, y: 346, radius: 9 },
  ],
  /* Linha 7 */
  [
    { x: 158, y: 286, radius: 9 },
    { x: 212, y: 286, radius: 9 },
    { x: 266, y: 286, radius: 9 },
    { x: 320, y: 286, radius: 9 },
  ],
  /* Linha 8 */
  [
    { x: 158, y: 226, radius: 9 },
    { x: 212, y: 226, radius: 9 },
    { x: 266, y: 226, radius: 9 },
    { x: 320, y: 226, radius: 9 },
  ],
];

var posicao_bolinhas_pequenas = [
  /* Linha 1 */
  [
    { x: 79, y: 638, radius: 4 },
    { x: 94, y: 638, radius: 4 },
    { x: 79, y: 652, radius: 4 },
    { x: 94, y: 652, radius: 4 },
  ],
  /* Linha 2 */
  [
    { x: 79, y: 579, radius: 4 },
    { x: 94, y: 579, radius: 4 },
    { x: 79, y: 593, radius: 4 },
    { x: 94, y: 593, radius: 4 },
  ],
  /* Linha 3 */
  [
    { x: 79, y: 519, radius: 4 },
    { x: 94, y: 519, radius: 4 },
    { x: 79, y: 534, radius: 4 },
    { x: 94, y: 534, radius: 4 },
  ],
  /* Linha 4 */
  [
    { x: 79, y: 459, radius: 4 },
    { x: 94, y: 459, radius: 4 },
    { x: 79, y: 474, radius: 4 },
    { x: 94, y: 474, radius: 4 },
  ],
  /* Linha 5 */
  [
    { x: 79, y: 399, radius: 4 },
    { x: 94, y: 399, radius: 4 },
    { x: 79, y: 414, radius: 4 },
    { x: 94, y: 414, radius: 4 },
  ],
  /* Linha 6 */
  [
    { x: 79, y: 339, radius: 4 },
    { x: 94, y: 339, radius: 4 },
    { x: 79, y: 354, radius: 4 },
    { x: 94, y: 354, radius: 4 },
  ],
  /* Linha 7 */
  [
    { x: 79, y: 279, radius: 4 },
    { x: 94, y: 279, radius: 4 },
    { x: 79, y: 294, radius: 4 },
    { x: 94, y: 294, radius: 4 },
  ],
  /* linha 8 */
  [
    { x: 79, y: 219, radius: 4 },
    { x: 94, y: 219, radius: 4 },
    { x: 79, y: 234, radius: 4 },
    { x: 94, y: 234, radius: 4 },
  ],
];
