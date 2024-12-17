<template>
  <div class="container">
    <!-- Canvas pour la neige -->
    <canvas ref="canvas" class="canvas"></canvas>

    <!-- Bouton pour lancer les confettis -->
    <div class="content">
      <div class="title">Tu veux découvrir mon secret ?</div>
      <button class="confetti-button" @click="handleClick">
        {{ text }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import confetti from "canvas-confetti";

const canvas = ref(null);

const text = ref("Click ici !");

const handleClick = () => {
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 },
  });
  text.value = "Je t'aime <3";
};

// Configuration des flocons de neige
const snowflakeCount = 100;
let snowflakes = [];

// Fonction pour créer un flocon
const createSnowflake = (width, height) => {
  return {
    x: Math.random() * width,
    y: Math.random() * height - height,
    radius: Math.random() * 4 + 1,
    opacity: Math.random() * 0.5 + 0.3,
    speedY: Math.random() * 1 + 0.5,
    speedX: Math.random() * 0.5 - 0.25,
  };
};

// Fonction pour dessiner les flocons
const drawSnowflakes = (ctx, width, height) => {
  ctx.clearRect(0, 0, width, height);

  snowflakes.forEach((flake) => {
    flake.y += flake.speedY;
    flake.x += flake.speedX;

    if (flake.y > height) flake.y = -flake.radius;
    if (flake.x > width) flake.x = -flake.radius;
    if (flake.x < -flake.radius) flake.x = width;

    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
    ctx.fill();
  });
};

// Initialisation du canvas
onMounted(() => {
  const c = canvas.value;
  const ctx = c.getContext("2d");

  // Adapter la taille du canvas
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  // Initialiser les flocons
  snowflakes = Array.from({ length: snowflakeCount }, () =>
    createSnowflake(c.width, c.height)
  );

  // Animation
  const animate = () => {
    drawSnowflakes(ctx, c.width, c.height);
    requestAnimationFrame(animate);
  };
  animate();

  // Redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    // Réinitialiser les flocons
    snowflakes = Array.from({ length: snowflakeCount }, () =>
      createSnowflake(c.width, c.height)
    );
  });
});
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(255, 0, 0, 0.8),
    rgba(255, 102, 102, 0.5) /* Dégradé rouge */
  );
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
}

.title {
  font-size: 2em;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.confetti-button {
  padding: 15px 30px;
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  background-color: #ff5733;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background-color 0.3s;
}

.confetti-button:hover {
  background-color: #c70039;
  transform: scale(1.05);
}
</style>
