<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { setContext, Material, Mesh, ctx, clearContext, getCamera } from "./lib/engine/main";
    import TestShader from "./lib/shaders/test.glsl?raw";
    import { mat4 } from "gl-matrix";

    let canvas: HTMLCanvasElement;
    let handle = 0;
    let scrollTime = 0;
    let section2: HTMLDivElement;
    let mousePos: {x: number, y: number} = {x: 0, y: 0};
    let targetCameraRotation = {x: -90, y: 0};

    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

    onMount(async () => {
        setContext(canvas.getContext("webgl2") as WebGL2RenderingContext);

        const DEG_TO_RAD = 0.0174533;
        const material = new Material(TestShader);
        const size = 0.1;

        const instancesPosition = new Array<mat4>();
        
        const resolution = 100;

        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                const px = j - 50;
                const py = 0;
                const pz = i - 50;

                const m = mat4.create();
                mat4.translate(m, m, [px, py, pz]);
                instancesPosition.push(m);
            }                                                                       
        }

        const image = await new Promise<HTMLImageElement>((resolve, _) => {
            const img = new Image();
            img.addEventListener("load", () => resolve(img));
            img.src = "/circle-512.png"
        });

        const sr = 50;
        const s = 360 / sr;
        const vertices = new Array<number>();
        const indices = new Array<number>();

        for (let i = 0; i < sr; i++) {
            const x = Math.sin(s * i * DEG_TO_RAD) * size;
            const y = Math.cos(s * i * DEG_TO_RAD) * size;

            vertices.push(...[x, y, 0.0]);

            if (i > 0) {
                indices.push(...[i - 1, i, sr]);
            }
        }

        indices.push(...[sr - 1, 0, sr]);
        vertices.push(...[0.0, 0.0, 0.0]);

        const mesh = new Mesh(
            new Float32Array(vertices),
            new Uint16Array(indices),
            material,
            instancesPosition,
            image
        );

        let last_time = 0;
        let radius = 10;

        const render = (time: number) => {
            const dt = (time - last_time) / 1000;
            last_time = time;

            clearContext();

            const camera = getCamera();

            camera.rotationX = lerp(camera.rotationX, targetCameraRotation.x, dt);
            camera.rotationY = lerp(camera.rotationY, targetCameraRotation.y, dt);

            mesh.updateInstances(instancesPosition);
            mesh.draw(scrollY / section2.offsetTop, time, mousePos);
            handle = requestAnimationFrame(render);
        }

        // handle = requestAnimationFrame((time) => {
        //     last_time = time;
        //     render(time);
        // });

        
    });

    onDestroy(() => {
        cancelAnimationFrame(handle);
    })

    function onMouseMove(ev: MouseEvent) {
        mousePos.x = ev.clientX / window.innerWidth;
        mousePos.y = ev.clientY / window.innerHeight;

        targetCameraRotation.y = (mousePos.x * 2.0 - 1.0) * -5;
        targetCameraRotation.x = -90 + (mousePos.y * 2.0 - 1.0) * -5;
    }
</script>

<svelte:window on:mousemove={onMouseMove} />
<main>
    <canvas bind:this={canvas}></canvas>
    <div class="scroll-section presentation">
        <div class="title">
            <h1>Rust <span class="rust-icn"></span></h1>
            <h1>Developper</h1>
            <p>2020 ⎯ present</p>
        </div>
        <img src="profil.jpeg" class="profil" alt="" />
    </div>
    <!-- <div class="scroll-section" bind:this={section2}></div> -->
    <div class="scroll-section second-section">
        <div class="info">
            <h1>Hey 👋 my name is <span>Alexis</span>. I'm <span>28 year old</span> developper.</h1>
            <h1>I'm a big fan of <span>creative coding 🧑‍🎨</span> and <span>embedded systems</span>.</h1>
            <h1>I'm also a big lover ❤️ of doing things with <span>graphics engine, SDK</span> and <span>API</span>.</h1>
        </div>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

    main {
        width: 100%;
        height: 100%;

        color: black;

        font-family: "Open Sans", "Rubik", "Roboto Condensed", sans-serif;
        font-optical-sizing: auto;
        font-weight: normal;
        font-style: normal;
    }

    canvas {
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        
        box-sizing: border-box;
        display: block;
        border: 0;
        padding: 0;
        margin: 0;
    }

    .scroll-section {
        width: 100%;
        display: block;
        background-color: white;
        border-bottom: 1px solid white;
        box-sizing: border-box;
        height: 100%;
        max-height: 520px;
    }

    .presentation {
        background-color: #efefef;
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        user-select: none;
        padding-top: 50%;
    }

    .title {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .title p {
        width: 100%;
        text-align: right;
        text-transform: uppercase;
    }

    .presentation h1 {
        font-size: 6em;
        margin: 0;
        padding: 0;
        line-height: 0.9;
        position: relative;
        text-transform: uppercase;
    }

    .profil {
        position: absolute;
        width: 450px;

        background: black;
        border-radius: 40px;
        outline: none;
        /* border: 4px solid white; */
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
    }

    span.rust-icn {
        background-image: url("https://rustacean.net/assets/rustacean-flat-gesture.svg");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        display: block;
        width: 77px;
        height: 77px;
        position: absolute;
        top: -47px;
        right: -7px;
    }

    @media only screen and (max-width : 500px) {
        .presentation h1 {
            font-size: 3.2em;
        }

        span.rust-icn {
            width: 2.82rem;
            height: 2.82rem;
            top: -1.64rem;
            right: -0.3rem;
        }

        img.profil {
            bottom: -210px;
            width: 255px;
            border-radius: 10px;
        }

        .second-section {
            padding: 240px 40px 0 40px;
            line-height: 1;
        }

        .second-section .info {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .second-section h1, h2 {
            margin: 0;
            padding: 0;
        }

        .second-section h1 {
            padding: 0 10px;
            font-size: 1.3rem;
            /* text-transform: uppercase; */
            text-align: left;
            color: #808080;
            /* font-weight: 500; */
            line-height: 1.6rem;
            margin: 14px 0;
        }

        .second-section h1 span {
            color: #272727;
        }

        /* .second-section h2 {
            color: #9a9a9a;
            font-size: 1.3rem;
        } */
    }
</style>