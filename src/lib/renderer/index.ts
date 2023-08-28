export default class Renderer {
    /** The current WebGL2 context */
    private ctx: WebGL2RenderingContext;
    
    /**
     * Create a new {@link Renderer} instance.
     * @param canvas The canvas to render on.
     */
    constructor(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("webgl2");
        if (ctx == null) throw new Error("Failed to retrieve a webGL2 context !");
        this.ctx = ctx;
    }

    /**
     * Render a single frame. You must call this method each frame to
     * render the scene into the canvas.
     */
    public renderFrame() {
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
        this.ctx.clearColor(0, 0, 0, 1.0);

        // TODO: Draw objects here...
    }
}