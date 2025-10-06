<main>
    <div class="soft-skills">
        <h1>Soft skills</h1>
        <div class="grid">
            <div class="container">
                <h2>Driven by Exploration</h2>
                <p>
                    Curious and passionate, I’ve always developed my skills
                    through exploration — whether in code or through
                    collaboration with my team.
                </p>
            </div>

            <div class="container">
                <h2>Apes Together Strong</h2>
                <p>
                    I believe great projects are built together — I thrive in
                    collaborative environments where ideas are shared,
                    challenged, and refined as a team.
                </p>
            </div>

            <div class="container">
                <h2>Continuous Learner</h2>
                <p>
                    Technology evolves fast, and I thrive by staying curious,
                    experimenting, and continuously refining my knowledge.
                </p>
            </div>

            <div class="container">
                <h2>Integrity in Craft</h2>
                <p>
                    Every line of code I write has meaning — no "vibe coding."
                    Clean, purposeful, and maintainable solutions matter most.
                </p>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 80px;

        background: rgb(250, 250, 250);

        .soft-skills {
            max-width: 900px;

            h1 {
                font-size: 3rem;
            }

            .grid {
                display: grid;
                flex: none;
                grid-gap: 64px;
                grid-template-columns: repeat(2, minmax(200px, 1fr));
                grid-template-rows: repeat(2, min-content);

                .container {
                    h2 {
                        font-size: 2rem;
                    }

                    p {
                        font-weight: 500;
                        font-size: 1.25rem;
                        color: #6d6d6d;
                        line-height: 1.63rem;
                    }
                }
            }
        }
    }

    @media only screen and (max-width: 600px) {
        main {
            padding: 30px;
            .soft-skills {
                h1 {
                    font-size: 1.5rem;
                }

                .grid {
                    grid-gap: 32px;
                    grid-template-columns: repeat(2, minmax(100px, 1fr));
                    grid-template-rows: repeat(2, min-content);

                    .container {
                        h2 {
                            font-size: 1rem;
                        }

                        p {
                            font-size: 0.75rem;
                            line-height: 1rem;
                            text-align: left;
                        }
                    }
                }
            }
        }
    }
</style>
