<script lang="ts">
    import { onMount } from "svelte";
</script>

<main>
    <slot />
</main>

<style>
    main {
        view-timeline-name: --self;
        view-timeline-axis: block;
        animation-timeline: --self;
        animation-name: fadeCenter;
        animation-duration: 2s;
        animation-fill-mode: both;
    }

    @keyframes fadeCenter {
        0%,
        30% {
            color: #e0e0e0;
            transform: translateY(40px) scale(0.95);
        }
        40%,
        60% {
            color: black;
            transform: translateY(0) scale(1);
        }
        70%,
        100% {
            color: #e0e0e0;
            transform: translateY(40px) scale(0.95);
        }
    }

    @media only screen and (max-width: 600px) {
        @keyframes fadeCenter {
            0%,
            20% {
                color: #e0e0e0;
                transform: translateY(40px) scale(0.95);
            }
            40%,
            60% {
                color: black;
                transform: translateY(0) scale(1);
            }
            80%,
            100% {
                color: #e0e0e0;
                transform: translateY(40px) scale(0.95);
            }
        }
    }
</style>
