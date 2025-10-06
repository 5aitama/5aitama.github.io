<script lang="ts">
    export let position: {
        name: string;
        link: string;
        currently_working: boolean;
    };

    let img: HTMLImageElement;
    let card: HTMLDivElement;
    let glow: HTMLDivElement;

    let opacity = 1.0;
    let scale = 1.0;
    let cardHover = false;

    function onScroll() {
        const m0 = card.getBoundingClientRect().height / 2.0 + 160.0;
        const m1 = card.getBoundingClientRect().height * 2.0 + 160.0;

        const v0 = Math.max(0.0, card.clientTop + m0 - scrollY) / m0;
        const v1 = Math.max(0.0, card.clientTop + m1 - scrollY) / m1;

        opacity = Math.min(1.0, v0);
        scale = Math.min(1.0, v1 + 0.2);
    }

    function onMouseEnterCard() {
        cardHover = true;
    }

    function onMouseLeaveCard() {
        cardHover = false;
        card.style.transform = "rotate3d(0)";
        glow.style.backgroundImage = `
            radial-gradient(
              circle at
              50%
              100%,
              #ffffff55,
              #0000000f
            )
          `;
    }

    function onMouseMove(ev: MouseEvent) {
        if (!cardHover) {
            card.style.transform = "scale3d(1, 1, 1)";

            return;
        }
        const bound = card.getBoundingClientRect();

        const center = {
            x: ev.clientX - bound.x - bound.width / 2,
            y: ev.clientY - bound.y - bound.height / 2,
        };

        const rx =
            Math.min(bound.width, Math.max(0, ev.clientX - bound.x)) /
            bound.width;
        const ry =
            Math.min(bound.height, Math.max(0, ev.clientY - bound.y)) /
            bound.height;

        const nx = rx * 2 - 1;
        const ny = ry * 2 - 1;

        const dist = Math.sqrt(center.x * center.x + center.y * center.y);

        card.style.transform = `
            scale3d(1.07, 1.07, 1.07)
            rotate3d(
              ${ny * 2},
              ${-nx * 2},
              0,
              ${Math.log(dist) * 2.5}deg
            )
          `;

        glow.style.backgroundImage = `
            radial-gradient(
              circle at
              ${rx * 100}%
              ${ry * 100}%,
              #ffffff55,
              #0000000f
            )
          `;
    }
</script>

<main>
    <div class="big-title">
        <div style="--opacity:{opacity}; --scale:{scale}" class="container">
            <h1>Rust<span class="rustacean"></span></h1>
            <h1>Developper</h1>
            <div class="subtitle">
                <p>
                    {position.currently_working ? "Currently" : "Previously"} working
                    for
                    <a target="_blank" href={position.link}>{position.name}</a>
                </p>
                <p>(October 2025 – PRESENT)</p>
            </div>
        </div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="card"
            bind:this={card}
            onmouseleave={onMouseLeaveCard}
            onmouseenter={onMouseEnterCard}
        >
            <div class="glow" bind:this={glow}></div>
        </div>
    </div>
</main>

<svelte:window onscroll={onScroll} onmousemove={onMouseMove} />

<style>
    main {
        width: 100%;
    }
    a {
        position: relative;
        color: inherit;
        text-decoration: none;
    }

    a::before {
        position: absolute;
        bottom: -2px;
        left: 0;
        content: "";
        width: 100%;
        height: 2px;
        background: black;
        border-radius: 4px;

        transition: bottom 0.1s;
    }

    a:hover::before {
        position: absolute;
        bottom: 0px;
        left: 0;
        content: "";
        width: 100%;
        height: 2px;
        background: black;
        border-radius: 4px;
    }

    .big-title {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        .container {
            display: flex;
            position: sticky;
            position: -webkit-sticky;
            top: -5rem;
            flex-direction: column;
            align-items: center;
            padding-top: 180px;
            width: fit-content;
            transition:
                opacity 100ms,
                transform 100ms;
            transform: scale(var(--scale));
            opacity: var(--opacity);

            user-select: none;

            h1 {
                position: relative;
                font-size: 9.4rem;
                margin: 0;
                padding: 0;
                text-transform: uppercase;
                font-weight: 600;
                letter-spacing: -0.04rem;
                line-height: 128px;

                span.rustacean {
                    position: absolute;

                    top: -5.9rem;
                    right: -1.05rem;

                    width: 9rem;
                    height: 9rem;

                    background: url(https://rustacean.net/assets/rustacean-flat-gesture.svg);
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: contain;
                }
            }

            .subtitle {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
                font-weight: 600;
            }
        }

        .card {
            position: relative;
            margin-top: 120px;
            height: 700px;
            width: auto;
            aspect-ratio: 3/4;

            border-radius: 30px;
            background: #e0e0e0;

            background-image: url("/profil.jpg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;

            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
            border: 1px solid white;

            transition-duration: 500ms;
            transition-property: transform, box-shadow;
            transition-timing-function: ease-out;
            transform: scale3d(1, 1, 1);

            overflow: hidden;

            .glow {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;

                background-image: radial-gradient(
                    circle at 50% -20%,
                    #ffffff55,
                    #0000000f
                );
            }
        }
    }

    @media only screen and (max-width: 950px) {
        main {
            .big-title {
                .container {
                    padding-top: 100px;

                    h1 {
                        font-size: 5.5rem;
                        line-height: 75px;

                        span.rustacean {
                            top: -3.4rem;
                            right: -0.63rem;
                            width: 5.3rem;
                            height: 5.3rem;
                        }
                    }
                }
            }
        }
    }

    @media only screen and (max-width: 600px) {
        main {
            .big-title {
                .container {
                    padding-top: 100px;

                    h1 {
                        font-size: 3.5rem;
                        line-height: 50px;

                        span.rustacean {
                            top: -2.1rem;
                            right: -0.42rem;
                            width: 3.39rem;
                            height: 3.35rem;
                        }
                    }

                    .subtitle {
                        font-size: 0.7rem;
                    }
                }
                .card {
                    height: 400px;
                    width: auto;
                    aspect-ratio: 3/4;
                }
            }
        }
    }
</style>
