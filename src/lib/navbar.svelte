<script lang="ts">
    /** The full user name. */
    export let name: string;

    /** The user email. */
    export let mail: string;

    let popup_showed = false;

    /**
     * Called when the used click on the email button.
     * It will copy the given {@link mail} to the clipboard.
     */
    function on_mail_click() {
        if (popup_showed) return;
        navigator.clipboard.writeText(mail);
        popup_showed = true;

        setTimeout(() => {
            popup_showed = false;
        }, 2000);
    }
</script>

<main>
    <div>
        <h1>{name}</h1>
    </div>

    <div>
        <h2>Let's connect</h2>
        <button class="mail" onclick={on_mail_click} class:test={popup_showed}>
            <p>{mail}</p>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 5.75C3 3.67893 4.67893 2 6.75 2H12.75C13.1642 2 13.5 2.33579 13.5 2.75C13.5 3.16421 13.1642 3.5 12.75 3.5H6.75C5.50736 3.5 4.5 4.50736 4.5 5.75V11.75C4.5 12.1642 4.16421 12.5 3.75 12.5C3.33579 12.5 3 12.1642 3 11.75V5.75Z"
                    fill="#797979"
                ></path>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.75 6.25H8.75C7.92157 6.25 7.25 6.92157 7.25 7.75V15.75C7.25 16.5784 7.92157 17.25 8.75 17.25H14.75C15.5784 17.25 16.25 16.5784 16.25 15.75V7.75C16.25 6.92157 15.5784 6.25 14.75 6.25ZM8.75 4.75C7.09315 4.75 5.75 6.09315 5.75 7.75V15.75C5.75 17.4069 7.09315 18.75 8.75 18.75H14.75C16.4069 18.75 17.75 17.4069 17.75 15.75V7.75C17.75 6.09315 16.4069 4.75 14.75 4.75H8.75Z"
                    fill="#797979"
                ></path>
            </svg>
            <div class="ntf-copied">
                <p>Email copied!</p>
            </div>
        </button>
    </div>
</main>

<style>
    main {
        width: 100%;
        height: 80px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px 180px;
        box-sizing: border-box;
        text-transform: uppercase;

        div {
            display: flex;
            flex-direction: row;
            align-items: center;

            h1,
            h2 {
                font-weight: 600;
            }

            h1 {
                font-size: 1.25rem;
            }
            h2 {
                font-size: 1rem;
            }

            button.mail {
                border: none;
                outline: none;
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;

                user-select: none;
                color: inherit;
                text-decoration: none;
                padding: 12px 30px;
                margin-left: 20px;
                border-radius: 100px;

                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
                text-transform: none;
                background: white;

                p {
                    font-size: 1rem;
                    margin: 0;
                    padding: 0;
                    font-weight: 600;
                }

                svg {
                    display: inline-block;
                    margin-left: 5px;
                    color: #808080;
                }

                div.ntf-copied {
                    position: absolute;
                    top: 60px;
                    left: 50%;

                    width: 90px;

                    transform: translate(-50%, -50%);

                    padding: 0 15px;

                    display: flex;
                    flex-direction: row;
                    justify-content: center;

                    color: white;
                    background: black;
                    height: 35px;

                    opacity: 0;
                    border-radius: 20px;

                    transition:
                        opacity 0.3s,
                        transform 0.3s;

                    p {
                        font-size: 0.85rem;
                    }
                }
            }

            button.mail:hover {
                cursor: pointer;
            }

            button.mail.test {
                div.ntf-copied {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }
        }
    }
</style>
