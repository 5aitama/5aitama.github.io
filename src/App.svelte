<script lang="ts">
    import About from "./lib/About.svelte";
    import Hero from "./lib/Hero.svelte";
    import Navbar from "./lib/Navbar.svelte";

    let position = {
        name: "NXP Semiconductors",
        link: "https://www.nxp.com",
        currently_working: true,
    };
</script>

<main>
    <Navbar name="Alexis Gougaut" mail="alx.sb@icloud.com" />
    <Hero profile="profil.jpeg" {position} />
    <About />
</main>

<style>
    main {
        width: 100%;
        height: 100%;
    }
</style>
