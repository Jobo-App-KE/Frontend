<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="hero-section text-center text-md-left">
      <canvas ref="canvasRef" class="boids-canvas"></canvas>
      <v-col cols="12" md="6" class="hero-content d-flex align-center justify-center pa-8 pa-md-16">
        <div>
          <div class="mb-4">
            <span class="text-h2 font-weight-bold text-success" style="font-family: 'Inter', sans-serif;">jobO</span>
            <!-- <div class="text-h6 font-weight-bold text-white" style="font-family: 'Inter', sans-serif;">takes a
              village...</div> -->
          </div>
          <h1 class="text-h4 text-md-h2 font-weight-bold mb-4">
            Connect with verified <br> professionals for essential<br> services in Kenya.
          </h1>
          <p class="text-subtitle-1 mb-6 text-green" style="max-width: 400px;">
            Simple, reliable, and affordable.
          </p>
          <v-btn color="primary" class="rounded-lg px-6 py-2" height="48">WHAT WE OFFER</v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="image-grid pa-4 pa-md-8">
        <div class="image-wrapper d-flex justify-content-center align-items-center h-100 position-relative">
          <div v-for="(img, i) in images" :key="i" :class="`image-container-${i + 1} rounded-lg elevation-4`">
            <v-img :src="img.src" :alt="img.alt" class="rounded-lg" cover height="100%"></v-img>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row no-gutters class="button-section d-flex justify-center pa-8 my-10">
      <v-btn v-for="(button, i) in buttons" :key="i" class="ma-2 button-style" variant="outlined" color="grey-darken-1">
        {{ button }}
      </v-btn>
    </v-row>
  </v-container>
</template>

<style scoped>
.hero-section {
  min-height: 80vh;
  position: relative;
  background: linear-gradient(to bottom,
      hsl(200deg, 80%, 52%),
      hsl(200deg, 80%, 78%),
      hsl(199, 88%, 94%) 100%);
  color: white;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.image-grid {
  min-height: 600px;
  position: relative;
  z-index: 1;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 500px;
}

.boids-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* Aligned image containers in a 3x3 grid */
.image-container-1 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 10%;
  left: 45%;
  z-index: 10;
}

.image-container-2 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 20%;
  left: 10%;
  z-index: 9;
}

.image-container-3 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 20%;
  left: 80%;
  z-index: 8;
}

.image-container-4 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 35%;
  left: 45%;
  z-index: 7;
}

.image-container-5 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 45%;
  left: 10%;
  z-index: 6;
}

.image-container-6 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 45%;
  left: 80%;
  z-index: 5;
}

.image-container-7 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 60%;
  left: 45%;
  z-index: 4;
}

.image-container-8 {
  width: 160px;
  height: 160px;
  position: absolute;
  top: 70%;
  left: 70%;
  z-index: 3;
}

.button-style {
  border-radius: 10px;
  border-color: #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-transform: capitalize;
}
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const canvasRef = ref(null);

const images = ref([
  { src: 'https://images.unsplash.com/photo-1655720357761-f18ea9e5e7e6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 1' },
  { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 2' },
  { src: 'https://plus.unsplash.com/premium_photo-1726826430992-f153d9b5ffd6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 3' },
  { src: 'https://plus.unsplash.com/premium_photo-1661871030291-6bc07f86e073?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 4' },
  { src: 'https://images.unsplash.com/photo-1742483359033-13315b247c74?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 5' },
  { src: 'https://plus.unsplash.com/premium_photo-1664304045336-a2c5bcbd67ed?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 6' },
  { src: 'https://images.unsplash.com/photo-1613405790252-9dda0cbd58f3?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Placeholder Image 7' },
]);

const buttons = ref(['Checklist', 'Insurance', 'Movers', 'Internet/TV', 'Security', 'Handyman']);

onMounted(() => {
  if (!canvasRef.value) {
    return;
  }

  // Load THREE.js first
  const threeScript = document.createElement('script');
  threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  document.body.appendChild(threeScript);

  threeScript.onload = () => {
    // Load GPUComputationRenderer after THREE.js is available
    const gpuComputeScript = document.createElement('script');
    gpuComputeScript.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/misc/GPUComputationRenderer.js';
    document.body.appendChild(gpuComputeScript);

    gpuComputeScript.onload = () => {
      // The old version of the script automatically attaches to the THREE global object.
      // So no need to destructure.
      const GPUComputationRenderer = THREE.GPUComputationRenderer;

      const o = {
        color1: "paleturquoise",
        color2: "royalblue",
        colorMode: "lerpGradient",
        alphaBackground: true,
        separation: 21,
        alignment: 20,
        cohesion: 20,
        freedom: 0.75,
        speedLimit: 10,
        birdSize: 1,
        wingSpan: 20,
        numRatio: 0.1
      };
      o.color1 = o.color1 || "red";
      o.color2 = o.color2 || "#aaaaaa";
      o.colorMode = o.colorMode || "varianceGradient";
      o.alphaBackground = o.alphaBackground || false;
      o.bgColor = o.bgColor || "white";
      o.separation = o.separation || 20;
      o.alignment = o.alignment || 20;
      o.cohesion = o.cohesion || 20;
      o.freedom = o.freedom || 0.75;
      o.speedLimit = o.speedLimit || 10;
      o.birdSize = o.birdSize || 1;
      o.wingSpan = o.wingSpan || 20;
      o.numRatio = o.numRatio || 1;
      const textureSize = 32,
        numBirds = Math.round(textureSize * textureSize * o.numRatio),
        fragmentShaderPosition =
          "uniform float time;\nuniform float delta;\n\nvoid main() {\n\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  vec4 tmpPos = texture2D( texturePosition, uv );\n  vec3 position = tmpPos.xyz;\n  vec3 velocity = texture2D( textureVelocity, uv ).xyz;\n\n  float phase = tmpPos.w;\n\n  phase = mod( ( phase + delta +\n  length( velocity.xz ) * delta * 3. +\n  max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );\n\n  gl_FragColor = vec4( position + velocity * delta * 15. , phase );\n\n}",
        fragmentShaderVelocity =
          "uniform float time;\nuniform float testing;\nuniform float delta; // about 0.016\nuniform float separationDistance; // 20\nuniform float alignmentDistance; // 40\nuniform float cohesionDistance;\nuniform float speedLimit;\nuniform float freedomFactor;\nuniform vec3 predator;\n\nconst float width = resolution.x;\nconst float height = resolution.y;\n\nconst float PI = 3.141592653589793;\nconst float PI_2 = PI * 2.0;\n// const float VISION = PI * 0.55;\n\nfloat zoneRadius = 40.0;\nfloat zoneRadiusSquared = 1600.0;\n\nfloat separationThresh = 0.45;\nfloat alignmentThresh = 0.65;\n\nconst float UPPER_BOUNDS = BOUNDS;\nconst float LOWER_BOUNDS = -UPPER_BOUNDS;\n\nfloat rand(vec2 co){\n  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n\n  zoneRadius = separationDistance + alignmentDistance + cohesionDistance;\n  separationThresh = separationDistance / zoneRadius;\n  alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;\n  zoneRadiusSquared = zoneRadius * zoneRadius;\n\n\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  vec3 birdPosition, birdVelocity;\n\n  vec3 selfPosition = texture2D( texturePosition, uv ).xyz;\n  vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;\n\n  float dist;\n  vec3 dir; // direction\n  float distSquared;\n\n  float separationSquared = separationDistance * separationDistance;\n  float cohesionSquared = cohesionDistance * cohesionDistance;\n\n  float f;\n  float percent;\n\n  vec3 velocity = selfVelocity;\n\n  float limit = speedLimit;\n  \n  dir = predator * UPPER_BOUNDS - selfPosition;\n  dir.z = 0.;\n  // dir.z *= 0.6;\n  dist = length( dir );\n  distSquared = dist * dist;\n\n  float preyRadius = 150.0;\n  float preyRadiusSq = preyRadius * preyRadius;\n\n  // move birds away from predator\n  if (dist < preyRadius) {\n\n    f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;\n    velocity += normalize( dir ) * f;\n    limit += 5.0;\n  }\n\n  // if (testing == 0.0) {}\n  // if ( rand( uv + time ) < freedomFactor ) {}\n\n  // Attract flocks to the center\n  vec3 central = vec3( 0., 0., 0. );\n  dir = selfPosition - central;\n  dist = length( dir );\n\n  dir.y *= 2.5;\n  velocity -= normalize( dir ) * delta * 5.;\n\n  for (float y=0.0;y<height;y++) {\n  for (float x=0.0;x<width;x++) {\n\n    vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;\n    birdPosition = texture2D( texturePosition, ref ).xyz;\n\n    dir = birdPosition - selfPosition;\n    dist = length(dir);\n\n    if (dist < 0.0001) continue;\n\n    distSquared = dist * dist;\n\n    if (distSquared > zoneRadiusSquared ) continue;\n\n    percent = distSquared / zoneRadiusSquared;\n\n    if ( percent < separationThresh ) { // low\n\n      // Separation - Move apart for comfort\n      f = (separationThresh / percent - 1.0) * delta;\n      velocity -= normalize(dir) * f;\n\n    } else if ( percent < alignmentThresh ) { // high\n\n      // Alignment - fly the same direction\n      float threshDelta = alignmentThresh - separationThresh;\n      float adjustedPercent = ( percent - separationThresh ) / threshDelta;\n\n      birdVelocity = texture2D( textureVelocity, ref ).xyz;\n\n      f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;\n      velocity += normalize(birdVelocity) * f;\n\n    } else {\n\n      // Attraction / Cohesion - move closer\n      float threshDelta = 1.0 - alignmentThresh;\n      float adjustedPercent = ( percent - alignmentThresh ) / threshDelta;\n\n      f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;\n\n      velocity += normalize(dir) * f;\n\n    }\n  }\n  }\n\n  // this make tends to fly around than down or up\n  // if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);\n\n  // Speed Limits\n  if ( length( velocity ) > limit ) {\n    velocity = normalize( velocity ) * limit;\n  }\n\n  gl_FragColor = vec4( velocity, 1.0 );\n\n}",
        vertexShader =
          "attribute vec2 reference;\nattribute float birdVertex;\n\nattribute vec3 birdColor;\n\nuniform sampler2D texturePosition;\nuniform sampler2D textureVelocity;\n\nvarying vec4 vColor;\nvarying float z;\n\nuniform float time;\nuniform float birdSize;\n\nvoid main() {\n\n  vec4 tmpPos = texture2D( texturePosition, reference );\n  vec3 pos = tmpPos.xyz;\n  vec3 velocity = normalize(texture2D( textureVelocity, reference ).xyz);\n\n  vec3 newPosition = position;\n\n  if ( birdVertex == 4.0 || birdVertex == 7.0 ) {\n    // flap wings\n    newPosition.y = sin( tmpPos.w ) * 5. * birdSize;\n  }\n\n  newPosition = mat3( modelMatrix ) * newPosition;\n\n  velocity.z *= -1.;\n  float xz = length( velocity.xz );\n  float xyz = 1.;\n  float x = sqrt( 1. - velocity.y * velocity.y );\n\n  float cosry = velocity.x / xz;\n  float sinry = velocity.z / xz;\n\n  float cosrz = x / xyz;\n  float sinrz = velocity.y / xyz;\n\n  mat3 maty =  mat3(\n    cosry, 0, -sinry,\n    0   , 1, 0     ,\n    sinry, 0, cosry\n  );\n\n  mat3 matz =  mat3(\n    cosrz , sinrz, 0,\n    -sinrz, cosrz, 0,\n    0     , 0    , 1\n  );\n  newPosition =  maty * matz * newPosition;\n  newPosition += pos;\n  z = newPosition.z;\n\n  vColor = vec4( birdColor, 1.0 );\n  gl_Position = projectionMatrix * viewMatrix  * vec4( newPosition, 1.0 );\n}",
        fragmentShader =
          "varying vec4 vColor;\nvarying float z;\nuniform vec3 color;\nvoid main() {\n/* // 距離に応じて色変更\n  // Fake colors for now\n  float rr = 0.2 + ( 1000. - z ) / 1000. * vColor.x;\n  float gg = 0.2 + ( 1000. - z ) / 1000. * vColor.y;\n  float bb = 0.2 + ( 1000. - z ) / 1000. * vColor.z;\n  gl_FragColor = vec4( rr, gg, bb, 1. );\n  */\n  \n  gl_FragColor = vec4( vColor.rgb, 1. );\n}";

      class BirdGeometry extends THREE.BufferGeometry {
        constructor() {
          function addVertex() {
            for (let e = 0; e < arguments.length; e++) l.array[u++] = arguments[e];
          }
          function getRandomColor(e) {
            const n = o;
            n.colorMode = n.colorMode || "variance";
            const t = new THREE.Color(n.color1),
              i = new THREE.Color(n.color2);
            let r;
            const a = -1 != n.colorMode.indexOf("Gradient") ? Math.random() : e;
            return (r = 0 == n.colorMode.indexOf("variance") ? new THREE.Color(THREE.MathUtils.clamp(0, t.r + Math.random() * i.r, 1), THREE.MathUtils.clamp(0, t.g + Math.random() * i.g, 1), THREE.MathUtils.clamp(0, t.b + Math.random() * i.b, 1)) : 0 == n.colorMode.indexOf("mix") ? new THREE.Color(t + a * i) : t.lerp(i, a)),
              r;
          }
          super();
          const t = 3 * numBirds,
            a = 3 * t,
            l = new THREE.BufferAttribute(new Float32Array(3 * a), 3),
            s = new THREE.BufferAttribute(new Float32Array(3 * a), 3),
            d = new THREE.BufferAttribute(new Float32Array(2 * a), 2),
            c = new THREE.BufferAttribute(new Float32Array(a), 1);
          this.setAttribute("position", l),
            this.setAttribute("birdColor", s),
            this.setAttribute("reference", d),
            this.setAttribute("birdVertex", c);
          let u = 0;
          const f = o.wingSpan,
            m = o.birdSize;
          for (let n = 0; n < numBirds; n++)
            addVertex(0, -0, -20 * m, 0, 4 * m, -20 * m, 0, 0, 30 * m),
              addVertex(0, 0, -15 * m, -f * m, 0, 0, 0, 0, 15 * m),
              addVertex(0, 0, 15 * m, f * m, 0, 0, 0, 0, -15 * m);
          const v = {};
          for (let e = 0; e < 3 * t; e++) {
            const t = ~~(~~(e / 3) / 3),
              a = (t % textureSize) / textureSize,
              l = ~~(t / textureSize) / textureSize,
              u = ~~(e / 9) / numBirds,
              f = u.toString(),
              m = -1 != o.colorMode.indexOf("Gradient");
            let p;
            (p = !m && v[f] ? v[f] : getRandomColor(u)),
              m || v[f] || (v[f] = p),
              (s.array[3 * e + 0] = p.r),
              (s.array[3 * e + 1] = p.g),
              (s.array[3 * e + 2] = p.b),
              (d.array[2 * e] = a),
              (d.array[2 * e + 1] = l),
              (c.array[e] = e % 9);
          }
          this.scale(0.2, 0.2, 0.2);
        }
      }

      let u, f, m, v = 0, p = 0;
      let h, y;
      const g = 800,
        w = g / 2;
      let x, z, R, E, b, P, T = performance.now();

      function init() {
        h = window.innerWidth / 2;
        y = window.innerHeight / 2;

        u = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1e3);
        u.position.z = 350;

        f = new THREE.Scene();
        o.alphaBackground || (f.background = new THREE.Color(o.bgColor));

        m = new THREE.WebGLRenderer({
          canvas: canvasRef.value,
          alpha: o.alphaBackground
        });
        m.setPixelRatio(window.devicePixelRatio);
        m.setSize(window.innerWidth, window.innerHeight);

        x = new GPUComputationRenderer(textureSize, textureSize, m);
        !1 === m.capabilities.isWebGL2 && x.setDataType(THREE.HalfFloatType);

        const positionsTexture = x.createTexture(),
          velocitiesTexture = x.createTexture();
        (function (e) {
          const n = e.image.data;
          for (let e = 0, t = n.length; e < t; e += 4) {
            const t = Math.random() * g - w,
              o = Math.random() * g - w,
              i = Math.random() * g - w;
            (n[e + 0] = t), (n[e + 1] = o), (n[e + 2] = i), (n[e + 3] = 1);
          }
        })(positionsTexture),
          (function (e) {
            const n = e.image.data;
            for (let e = 0, t = n.length; e < t; e += 4) {
              const t = Math.random() - 0.5,
                o = Math.random() - 0.5,
                i = Math.random() - 0.5;
              (n[e + 0] = 10 * t),
                (n[e + 1] = 10 * o),
                (n[e + 2] = 10 * i),
                (n[e + 3] = 1);
            }
          })(velocitiesTexture),
          (z = x.addVariable("textureVelocity", fragmentShaderVelocity, velocitiesTexture)),
          (R = x.addVariable("texturePosition", fragmentShaderPosition, positionsTexture)),
          x.setVariableDependencies(z, [R, z]),
          x.setVariableDependencies(R, [R, z]),
          (E = R.material.uniforms),
          (b = z.material.uniforms),
          (E.time = {
            value: 0
          }),
          (E.delta = {
            value: 0
          }),
          (b.time = {
            value: 1
          }),
          (b.delta = {
            value: 0
          }),
          (b.testing = {
            value: 1
          }),
          (b.separationDistance = {
            value: 1
          }),
          (b.alignmentDistance = {
            value: 1
          }),
          (b.cohesionDistance = {
            value: 1
          }),
          (b.freedomFactor = {
            value: 1
          }),
          (b.speedLimit = {
            value: o.speedLimit
          }),
          (b.predator = {
            value: new THREE.Vector3()
          }),
          (z.material.defines.BOUNDS = g.toFixed(2)),
          (z.wrapS = THREE.RepeatWrapping),
          (z.wrapT = THREE.RepeatWrapping),
          (R.wrapS = THREE.RepeatWrapping),
          (R.wrapT = THREE.RepeatWrapping),
          x.init();

        b.separationDistance.value = o.separation;
        b.alignmentDistance.value = o.alignment;
        b.cohesionDistance.value = o.cohesion;

        const birdGeometry = new BirdGeometry();
        P = {
          birdSize: {
            value: o.birdSize
          },
          texturePosition: {
            value: null
          },
          textureVelocity: {
            value: null
          },
          time: {
            value: 1
          },
          delta: {
            value: 0
          }
        };
        const shaderMaterial = new THREE.ShaderMaterial({
          uniforms: P,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          side: THREE.DoubleSide
        });
        const birdMesh = new THREE.Mesh(birdGeometry, shaderMaterial);
        (birdMesh.rotation.y = Math.PI / 2),
          (birdMesh.matrixAutoUpdate = !1),
          birdMesh.updateMatrix(),
          f.add(birdMesh);
      }

      function animate() {
        requestAnimationFrame(animate);
        const e = performance.now();
        let n = (e - T) / 1e3;
        n > 1 && (n = 1),
          (T = e),
          (E.time.value = e),
          (E.delta.value = n),
          (b.time.value = e),
          (b.delta.value = n),
          (P.time.value = e),
          (P.delta.value = n),
          b.predator.value.set((0.5 * v) / h, (-0.5 * p) / y, 0),
          (v = 1e4),
          (p = 1e4),
          x.compute(),
          (P.texturePosition.value = x.getCurrentRenderTarget(R).texture),
          (P.textureVelocity.value = x.getCurrentRenderTarget(z).texture),
          m.render(f, u);
      }

      const handlePointerMove = (e) => {
        if (e.isPrimary !== false) {
          v = e.clientX - h;
          p = e.clientY - y;
        }
      };

      const handleResize = () => {
        h = window.innerWidth / 2;
        y = window.innerHeight / 2;
        u.aspect = window.innerWidth / window.innerHeight;
        u.updateProjectionMatrix();
        m.setSize(window.innerWidth, window.innerHeight);
      };

      init();
      animate();

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerdown", handlePointerMove);
      window.addEventListener("resize", handleResize);

      onBeforeUnmount(() => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerdown", handlePointerMove);
        window.removeEventListener("resize", handleResize);
      });
    };
  };
});
</script>
