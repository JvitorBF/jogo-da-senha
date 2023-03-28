// Seleciona o canvas e ajusta sua largura e altura
const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Seleciona o contexto 2D do canvas
const ctx = canvas.getContext("2d");

// Cria uma imagem e define sua fonte
const image = new Image();
image.src = "../jogoDaSenha/image/design.png";

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

// Espera a imagem carregar antes de desenhá-la no canvas
image.onload = function () {
  ctx.drawImage(image, 12, 20);

  // Desenha as bolinhas grandes iniciais
  posicao_bolinhas_grandes.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
  });

  // Adiciona um evento de clique para cada bolinha grande
  canvas.addEventListener("click", function (event) {
    // Encontra a bolinha clicada
    const clickedCircle = posicao_bolinhas_grandes.find((circle) => {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;
      const distX = mouseX - circle.x;
      const distY = mouseY - circle.y;
      const distance = Math.sqrt(distX * distX + distY * distY);
      return distance <= circle.radius;
    });

    if (clickedCircle) {
      // Atualiza a cor da bolinha grande clicada com a nova cor selecionada pelo usuário
      clickedCircle.colorIndex = (clickedCircle.colorIndex + 1) % num_cores;
      clickedCircle.color = cores_disponiveis[clickedCircle.colorIndex];

      // Redesenha todas as bolinhas grandes
      posicao_bolinhas_grandes.forEach((circle) => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();
      });
    }
  });
};

var posicao_bolinhas_medias = [
  /* linha 1 */
  { x: 158, y: 646, radius: 9 },
  { x: 212, y: 646, radius: 9 },
  { x: 266, y: 646, radius: 9 },
  { x: 320, y: 646, radius: 9 },
  /* Linha 2 */
  { x: 158, y: 586, radius: 9 },
  { x: 212, y: 586, radius: 9 },
  { x: 266, y: 586, radius: 9 },
  { x: 320, y: 586, radius: 9 },
  /* Linha 3 */
  { x: 158, y: 526, radius: 9 },
  { x: 212, y: 526, radius: 9 },
  { x: 266, y: 526, radius: 9 },
  { x: 320, y: 526, radius: 9 },
  /* Linha 4 */
  { x: 158, y: 466, radius: 9 },
  { x: 212, y: 466, radius: 9 },
  { x: 266, y: 466, radius: 9 },
  { x: 320, y: 466, radius: 9 },
  /* Linha 5 */
  { x: 158, y: 466, radius: 9 },
  { x: 212, y: 466, radius: 9 },
  { x: 266, y: 466, radius: 9 },
  { x: 320, y: 466, radius: 9 },
  /* Linha 5 */
  { x: 158, y: 406, radius: 9 },
  { x: 212, y: 406, radius: 9 },
  { x: 266, y: 406, radius: 9 },
  { x: 320, y: 406 },
  /* Linha 6 */
  { x: 158, y: 346, radius: 9 },
  { x: 212, y: 346, radius: 9 },
  { x: 266, y: 346, radius: 9 },
  { x: 320, y: 346, radius: 9 },
  /* Linha 7 */
  { x: 158, y: 286, radius: 9 },
  { x: 212, y: 286, radius: 9 },
  { x: 266, y: 286, radius: 9 },
  { x: 320, y: 286, radius: 9 },
  /* Linha 8 */
  { x: 158, y: 226, radius: 9 },
  { x: 212, y: 226, radius: 9 },
  { x: 266, y: 226, radius: 9 },
  { x: 320, y: 226, radius: 9 },
];

var posicao_bolinhas_pequenas = [
  /* Linha 1 */
  { x: 79, y: 638, radius: 4 },
  { x: 94, y: 638, radius: 4 },
  { x: 79, y: 652, radius: 4 },
  { x: 94, y: 652, radius: 4 },
  /* Linha 2 */
  { x: 79, y: 579, radius: 4 },
  { x: 94, y: 579, radius: 4 },
  { x: 79, y: 593, radius: 4 },
  { x: 94, y: 593, radius: 4 },
  /* Linha 3 */
  { x: 79, y: 519, radius: 4 },
  { x: 94, y: 519, radius: 4 },
  { x: 79, y: 534, radius: 4 },
  { x: 94, y: 534, radius: 4 },
  /* Linha 4 */
  { x: 79, y: 459, radius: 4 },
  { x: 94, y: 459, radius: 4 },
  { x: 79, y: 474, radius: 4 },
  { x: 94, y: 474, radius: 4 },
  /* Linha 5 */
  { x: 79, y: 399, radius: 4 },
  { x: 94, y: 399, radius: 4 },
  { x: 79, y: 414, radius: 4 },
  { x: 94, y: 414, radius: 4 },
  /* Linha 6 */
  { x: 79, y: 339, radius: 4 },
  { x: 94, y: 339, radius: 4 },
  { x: 79, y: 354, radius: 4 },
  { x: 94, y: 354, radius: 4 },
  /* Linha 7 */
  { x: 79, y: 279, radius: 4 },
  { x: 94, y: 279, radius: 4 },
  { x: 79, y: 294, radius: 4 },
  { x: 94, y: 294, radius: 4 },
  /* linha 8 */
  { x: 79, y: 219, radius: 4 },
  { x: 94, y: 219, radius: 4 },
  { x: 79, y: 234, radius: 4 },
  { x: 94, y: 234, radius: 4 },
];
