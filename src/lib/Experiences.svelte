<main>
    <h1 class="title">Work Experiences</h1>
    <div class="exp">
        <span>July 2024 — May 2025</span>
        <h1>Embedded Rust Engineer</h1>
        <h2>NXP Semiconductors — <i>Full time</i></h2>
        <h3>Colombelles, France</h3>
        <p>
            Proof of concept and Rust re-implementation of the <a
                href="https://www.firaconsortium.org/discover/how-uwb-works"
                >UWB (Ultra Wide Band)</a
            >
            firmware on
            <a
                href="https://www.arm.com/products/silicon-ip-cpu?families=cortex-m&showall=true"
                >ARM processors</a
            >
            <i
                >(<a href="https://developer.arm.com/Processors/Cortex-M0"
                    >Cortex-M0</a
                >
                /
                <a href="https://developer.arm.com/Processors/Cortex-M1">M1</a
                >)</i
            >, initially developed in C. The achieved objective was to
            demonstrate that a Rust “from scratch” development enables a faster
            development cycle, improved maintainability, a reduced learning
            curve for juniors, a binary size equal to or smaller than the C
            equivalent, and execution performance equal to or better than C.
        </p>
    </div>

    <div class="bg">
        <div class="exp">
            <span>April 2024 — July 2024</span>
            <h1>Backend Rust Developer</h1>
            <h2>Seckiot — <i>Full time</i></h2>
            <h3>Paris, Île-de-France, France</h3>
            <p>
                Maintenance, performance optimization, and security hardening of
                a Rust backend (Rocket framework) dedicated to processing
                real-time data streams from interconnected machines.
                Implementation of security best practices (authentication,
                access management, code and dependency hardening) tailored to an
                IoT/industrial context.
            </p>
        </div>
    </div>

    <div class="exp">
        <span>January 2021 — January 2024</span>
        <h1>Embedded Rust Engineer & Fullstack Developer</h1>
        <h2>Jusdeliens — <i>Freelance</i></h2>
        <h3>Fleury-sur-Orne, France</h3>
        <p>
            Design of an embedded operating system for the Ova educational robot
            (ESP32, ATMega, STM32) in Rust and C. Development of a user
            interface in Svelte, TypeScript, JavaScript, and WASM (generated
            from Rust), integrating an embedded IDE to program directly in
            Python, HTML, JavaScript, and CSS. Contribution to educational
            innovation by making programming more accessible and interactive for
            students and instructors.
        </p>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        align-items: center;

        h1.title {
            font-size: 4.5rem;
            margin: 10rem 0;
            position: relative;
        }

        /*h1.title:after {
            bottom: -15px;
            left: 0;
            position: absolute;
            content: "";
            display: block;
            height: 10px;
            width: 100%;
            background: black;
            border-radius: 3px;
        }*/
    }

    .exp {
        position: relative;
        width: 100%;
        max-width: 900px;
        box-sizing: border-box;
        padding: 60px;

        span {
            display: inline-block;
            width: 100%;
            color: rgb(120, 120, 120);
        }

        h1,
        h2,
        h3 {
            margin: 5px 0 5px 0;
        }

        h1 {
            font-size: 2.5rem;
        }

        h2 {
            font-weight: 600;
        }

        h3 {
            font-weight: normal;
        }

        p {
            margin-top: 30px;
            font-size: 1.2rem;
            line-height: 1.63rem;
            font-weight: 500;
            color: rgb(90, 90, 90);
            text-align: justify;
            max-width: 800px;
        }

        a {
            display: inline-block;
            position: relative;
            text-decoration: none;
            font-weight: 600;
            color: black;
        }

        a:before {
            bottom: 1px;
            left: 0;
            position: absolute;
            content: "";
            display: block;
            background: black;
            width: 100%;
            height: 2px;
            border-radius: 3px;
        }
    }

    .bg {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media only screen and (max-width: 600px) {
        main {
            h1.title {
                font-size: 2.5rem;
                padding: 0 40px;
                margin: 5rem 0;
            }

            .exp {
                padding: 30px;
                h1 {
                    font-size: 1.4rem;
                }

                h2 {
                    font-size: 1rem;
                }

                h3 {
                    font-size: 0.8rem;
                }

                p {
                    margin: 30px 0px;
                    font-size: 0.9rem;
                    line-height: 1.3rem;
                    text-align: justify;
                }
            }
        }
    }
</style>
