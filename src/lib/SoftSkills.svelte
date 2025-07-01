<main>
    <div class="soft-skills">
        <h1>Soft skills</h1>
        <div class="grid">
            <div class="container">
                <h2>Driven by Exploration</h2>
                <p>
                    I thrive on exploring new systems, diving into unfamiliar
                    code, and expanding my understanding — whether close to the
                    hardware or in high-level Rust architecture.
                </p>
            </div>

            <div class="container">
                <h2>Lifelong Curiosity</h2>
                <p>
                    Driven by an endless thirst to understand, I dive deep into
                    unfamiliar systems, languages, and patterns — not just to
                    know more, but to build better.
                </p>
            </div>

            <div class="container">
                <h2>Blues in Mind</h2>
                <p>
                    Like a Hendrix solo, I let intuition lead — coding in Rust
                    becomes a way to feel, explore, and express, where each line
                    hums with intention and soul.
                </p>
            </div>

            <div class="container">
                <h2>Lorem ipsum</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                    fugiat fuga, error enim maxime similique magni praesentium
                    dignissimos natus inventore ipsam perferendis.
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
</style>
