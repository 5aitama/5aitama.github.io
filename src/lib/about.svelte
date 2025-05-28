<script lang="ts">
    import FocusedContainer from "./focusedContainer.svelte";
    let bias = 190;
</script>

<main>
    <FocusedContainer {bias}>
        <h1>
            I love making cool things and solving complex problems for people —
            like you.
        </h1>
    </FocusedContainer>
    <FocusedContainer {bias}>
        <h1>
            I deliver impactful results through strategic thinking and
            data-driven insights.
        </h1>
    </FocusedContainer>

    <img src="IMG_4593.jpeg" alt="" />
    <div></div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        padding-top: 160px;

        h1 {
            font-size: 4rem;
            max-width: 950px;
            text-align: center;
            margin: 80px 0;
        }

        img {
            height: 700px;
            border-radius: 48px;
            /* box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); */
            border: 1px solid white;
            margin-top: 80px;
        }
    }

    div {
        height: 800px;
    }
</style>
