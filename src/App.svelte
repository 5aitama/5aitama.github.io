<script lang="ts">
    import About from "./lib/about.svelte";
    import Hero from "./lib/hero.svelte";
    import Navbar from "./lib/navbar.svelte";
</script>

<main>
    <Navbar name="Alexis Gougaut" mail="alx.sb@icloud.com" />
    <Hero profile="profil.jpeg" />
    <About />
</main>

<style>
    main {
        width: 100%;
        height: 100%;
    }
</style>
