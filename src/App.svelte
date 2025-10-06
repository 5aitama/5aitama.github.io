<script lang="ts">
    import About from "./lib/About.svelte";
    import Experiences from "./lib/Experiences.svelte";
    import Hero from "./lib/Hero.svelte";
    import Navbar from "./lib/Navbar.svelte";
    import SoftSkills from "./lib/SoftSkills.svelte";

    let position = {
        name: "Aroma-zone",
        link: "https://www.aroma-zone.com",
        currently_working: true,
    };
</script>

<main>
    <Navbar name="Alexis Gougaut" mail="alx.sb@icloud.com" />
    <Hero {position} />
    <About />
    <SoftSkills />
    <Experiences />
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
