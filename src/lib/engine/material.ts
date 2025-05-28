import { ctx } from "./main";

enum ShaderType {
    Vertex = WebGL2RenderingContext.VERTEX_SHADER,
    Fragment = WebGL2RenderingContext.FRAGMENT_SHADER,
}

export class Material {
    _program: WebGLProgram;
    
    /**
     * Create a new `Material`.
     * @param vertexShaderSource The vertex shader source.
     * @param fragmentShaderSource The fragment shader source.
     */
    constructor(shaderSource: string) {

        const vs = this.compileShader(shaderSource, ShaderType.Vertex);
        
        const fragmentShaderSource = shaderSource.replace("#version 300 es", "#version 300 es\n#define FRAG");
        const fs = this.compileShader(fragmentShaderSource, ShaderType.Fragment);

        this._program = ctx().createProgram();
        ctx().attachShader(this._program, vs);
        ctx().attachShader(this._program, fs);
        ctx().linkProgram(this._program);

        if (!ctx().getProgramParameter(this._program, WebGL2RenderingContext.LINK_STATUS)) {
            throw new Error(ctx().getProgramInfoLog(this._program) ?? "Unknow program info log");
        }
    }

    /**
     * Compile a shader.
     * @param source The shader source
     * @param type The shader type
     * @returns The shader compiled
     */
    compileShader(source: string, type: ShaderType) {
        const shader = ctx().createShader(type.valueOf())!;
        ctx().shaderSource(shader, source);
        ctx().compileShader(shader);

        if (!ctx().getShaderParameter(shader, WebGL2RenderingContext.COMPILE_STATUS)) {
            throw new Error(ctx().getShaderInfoLog(shader) ?? "Unknow shader info log");
        }

        return shader;
    }

    /**
     * The shader program.
     */
    public get program() {
        return this._program;
    }
}