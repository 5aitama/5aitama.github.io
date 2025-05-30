<script lang="ts">
    import { onMount } from "svelte";

    let element: HTMLElement;
    let focused = true;
    export let bias = 100;

    onMount(() => onScroll());

    function onScroll() {
        const bounds = element.getBoundingClientRect();
        const y = innerHeight / 2 - bounds.y - bounds.height / 2;
        focused = y <= bias && y >= -bias;
    }
</script>

<main class:focused bind:this={element}>
    <slot />
</main>

<svelte:window onscroll={onScroll} />

<style>
    main {
        transition:
            transform 600ms,
            color 600ms;
    }

    main:not(.focused) {
        color: #e0e0e0;
        transform: translateY(40px) scale(0.95);
    }

    main.focused {
        transform: translateY(0) scale(1);
    }
</style>
