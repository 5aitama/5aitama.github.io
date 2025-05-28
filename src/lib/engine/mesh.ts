import { mat4 } from "gl-matrix";
import { ctx, getCamera } from "./main";
import type { Material } from "./material";

export class Mesh {
    vertices: Float32Array;
    indices: Uint16Array;
    vbuf: WebGLBuffer;
    ibuf: WebGLBuffer;
    obuf: WebGLBuffer;
    vao: WebGLVertexArrayObject;
    instance_count: number;
    material: Material;

    /**
     * Create a new `Mesh`.
     * @param vertices The mesh vertices
     * @param indices The mesh indices.
     */
    constructor(vertices: Float32Array, indices: Uint16Array, material: Material, instances: Array<mat4>, pixels: HTMLImageElement) {
        this.vertices = vertices;
        this.indices = indices;
        this.material = material;
        this.instance_count = instances.length;

        // const texture = ctx().createTexture();
        // ctx().bindTexture(WebGL2RenderingContext.TEXTURE_2D, texture);
        // ctx().texImage2D(WebGL2RenderingContext.TEXTURE_2D, 0, ctx().RGBA, 512, 512, 0, ctx().RGBA, ctx().UNSIGNED_BYTE, pixels);
        // ctx().texParameteri(ctx().TEXTURE_2D, ctx().TEXTURE_MIN_FILTER, ctx().NEAREST);
        // ctx().texParameteri(ctx().TEXTURE_2D, ctx().TEXTURE_MAG_FILTER, ctx().NEAREST);

        // ctx().pixelStorei(ctx().UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

        this.vao = ctx().createVertexArray();
        ctx().bindVertexArray(this.vao);

        // Create and fill the vertex buffer.
        this.vbuf = ctx().createBuffer();
        ctx().bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, this.vbuf);
        ctx().bufferData(WebGL2RenderingContext.ARRAY_BUFFER, this.vertices, WebGL2RenderingContext.STATIC_DRAW);

        // Enable and assign attribute(s).
        const positionAttribute = ctx().getAttribLocation(this.material.program, "a_pos");
        ctx().enableVertexAttribArray(positionAttribute);
        ctx().vertexAttribPointer(positionAttribute, 3, WebGL2RenderingContext.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 3, 0);

        // const uvAttribute = ctx().getAttribLocation(this.material.program, "a_uv");
        // ctx().enableVertexAttribArray(uvAttribute);
        // ctx().vertexAttribPointer(uvAttribute, 2, WebGL2RenderingContext.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 5, Float32Array.BYTES_PER_ELEMENT * 3);

        // Create and fill the index buffer.
        this.ibuf = ctx().createBuffer();
        ctx().bindBuffer(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, this.ibuf);
        ctx().bufferData(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, this.indices, WebGL2RenderingContext.STATIC_DRAW);

        const obufData = new Array<number>();
        for (let i = 0; i < instances.length; i++) {
            obufData.push(...instances[i]);
        }

        this.obuf = ctx().createBuffer();
        ctx().bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, this.obuf);
        ctx().bufferData(WebGL2RenderingContext.ARRAY_BUFFER, new Float32Array(obufData), WebGL2RenderingContext.DYNAMIC_DRAW);

        const positionOffsetAttribute = 0;

        for (let j = 0; j < 4; j++) {
            ctx().enableVertexAttribArray(positionOffsetAttribute + j);
            ctx().vertexAttribPointer(positionOffsetAttribute + j, 4, WebGL2RenderingContext.FLOAT, false, 64, j * 16);
            ctx().vertexAttribDivisor(positionOffsetAttribute + j, 1);
        }

        ctx().bindVertexArray(null);
        ctx().bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, null);
        ctx().bindBuffer(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, null);

    }

    /**
     * Render the mesh to the canvas.
     */
    draw(scrollTime: number, time: number, mousePos: {x: number, y: number}) {
        ctx().useProgram(this.material.program);

        const uniformCameraView = ctx().getUniformLocation(this.material.program, "view");
        const uniformCameraProj = ctx().getUniformLocation(this.material.program, "proj");
        const uniformTime = ctx().getUniformLocation(this.material.program, "time");
        const uniformScrollTime = ctx().getUniformLocation(this.material.program, "scroll_time");

        ctx().uniformMatrix4fv(uniformCameraView, false, getCamera().matrixView);
        ctx().uniformMatrix4fv(uniformCameraProj, false, getCamera().matrixProjection);

        ctx().uniform1f(uniformTime, time);
        ctx().uniform1f(uniformScrollTime, scrollTime);
        
        ctx().bindVertexArray(this.vao);
        ctx().drawElementsInstanced(WebGL2RenderingContext.TRIANGLES, this.indices.length, WebGL2RenderingContext.UNSIGNED_SHORT, 0, this.instance_count);
    }

    updateInstances(instances: Array<mat4>) {
        const obufData = new Array<number>();
        for (let i = 0; i < instances.length; i++) {
            obufData.push(...instances[i]);
        }

        ctx().bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, this.obuf);
        ctx().bufferSubData(WebGL2RenderingContext.ARRAY_BUFFER, 0, new Float32Array(obufData));
        ctx().bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, null);
    }

}