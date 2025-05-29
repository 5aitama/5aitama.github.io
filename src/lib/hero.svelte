<script lang="ts">
    /** The profile picture url. */
    export let profile: string;

    export let position: {
        name: string;
        link: string;
        currently_working: boolean;
    };

    let img: HTMLImageElement;
    let opacity = 1.0;
    let scale = 1.0;

    function onScroll() {
        const m0 = img.height / 2.0 + 160.0;
        const m1 = img.height * 2.0 + 160.0;

        const v0 = Math.max(0.0, img.clientTop + m0 - scrollY) / m0;
        const v1 = Math.max(0.0, img.clientTop + m1 - scrollY) / m1;

        opacity = Math.min(1.0, v0);
        scale = Math.min(1.0, v1 + 0.2);
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
                    at <a href={position.link}>{position.name}</a>
                </p>
                <p>(2021 – PRESENT)</p>
            </div>
        </div>
        <img bind:this={img} src={profile} alt="" />
    </div>
</main>

<svelte:window onscroll={onScroll} />

<style>
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

        img {
            height: 700px;
            border-radius: 48px;
            z-index: 1;
            background: #e0e0e0;
            margin-top: 80px;

            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }
    }
</style>
