<script lang="ts">
    import FocusedContainer from "./FocusedContainer.svelte";
</script>

<main>
    <FocusedContainer>
        <h1>
            I love making cool things and solving complex problems for people —
            like you.
        </h1>
    </FocusedContainer>
    <FocusedContainer>
        <h1>
            I deliver impactful results through strategic thinking and
            data-driven insights.
        </h1>
    </FocusedContainer>
    <img src="IMG_4593.jpeg" alt="" />
    <div class="img-container"></div>
</main>

<style>
    main {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        padding-top: 160px;

        h1 {
            font-size: 4rem;
            max-width: 950px;
            text-align: center;
            margin: 100px 0;
        }

        .img-container {
            position: absolute;
            bottom: 0;
            background: rgb(250, 250, 250);
            height: 390px;
            width: 100%;
        }

        img {
            height: 700px;
            border-radius: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.09);
            border: 1px solid white;
            margin-top: 80px;
            box-sizing: border-box;
            z-index: 1;
        }
    }

    @media only screen and (max-width: 600px) {
        main {
            padding-top: 80px;

            h1 {
                font-size: 2rem;
                margin: 50px 25px;
                text-align: left;
                max-width: 400px;
            }

            img {
                height: 400px;
            }

            .img-container {
                height: 240px;
            }
        }
    }
</style>
