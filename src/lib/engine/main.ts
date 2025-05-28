import { Camera } from "./camera";

export * from "./material"
export * from "./mesh"

var context: WebGL2RenderingContext;
var camera: Camera | null = null;

/**
 * Retrieves the current WebGL2 context.
 * @returns The current WebGL2 context
 * @throws Error if the context is not initialized
 */
export function ctx() {
  if (!context) {
    throw new Error("WebGL2 context is not initialized");
  }
  return context;
}

/**
 * Sets the WebGL2 context and initializes the viewport and other settings.
 * @param gl The WebGL2 rendering context
 */
export function setContext(gl: WebGL2RenderingContext) {
    context = gl;

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // Enable culling
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.FRONT);

    clearContext();
}

export function clearContext() {
    const canvas = ctx().canvas as HTMLCanvasElement;
    const newWidth = canvas.clientWidth * devicePixelRatio;
    const newHeight = canvas.clientHeight * devicePixelRatio;

    if (newWidth != ctx().canvas.width || newHeight != ctx().canvas.height) {
        ctx().canvas.width = newWidth;
        ctx().canvas.height = newHeight;

        ctx().viewport(0, 0, ctx().canvas.width, ctx().canvas.height);

        camera = new Camera({
            width: ctx().canvas.width,
            height: ctx().canvas.height,
        });
    }

    ctx().clearColor(1.0, 1.0, 1.0, 1.0);
    ctx().clear(ctx().COLOR_BUFFER_BIT | ctx().DEPTH_BUFFER_BIT);
}

export function getCamera() {
    if (camera == null) {
        camera = new Camera({
            width: ctx().canvas.width,
            height: ctx().canvas.height,
        });
    }

    return camera;
}