
export class Mat4 {
    raw: Array<number>;

    constructor(c0: Array<number>, c1: Array<number>, c2: Array<number>, c3: Array<number>) {
        if (c0.length !== 4 || c1.length !== 4 || c2.length !== 4 || c3.length !== 4) {
            throw new Error("Invalid matrix column length");
        }

        this.raw = new Array(
            ...c0,
            ...c1,
            ...c2,
            ...c3,
        );
    }

    /**
     * Create a 4x4 identity matrix.
     */
    static identity() {
        return new Mat4(
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        )
    }

    static translation(x: number, y: number, z: number) {
        return new Mat4(
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [x, y, z, 1]
        )
    }

    /**
     * Create a projection matrix.
     * @param fovY The fov (in radian)
     * @param aspect The aspect ratio
     * @param near The near field
     * @param far The far field
     * @returns 
     */
    static projection(fovY: number, aspect: number, near: number, far: number) {
        const f = 1.0 / Math.tan(fovY / 2.0);
        const nf = 1.0 / (near - far);

        return new Mat4(
            new Array(f / aspect, 0.0, 0.0, 0.0),
            new Array(0.0, f, 0.0, 0.0),
            new Array(0.0, 0.0, (far + near) * nf, -1.0),
            new Array(0.0, 0.0, (2.0 * far * near) * nf, 0.0)
        );
    }

    /**
     * Translate a 4x4 matrix relative to the world space.
     * @param m The matrix to translate
     * @param x The amount of translation in x-axis
     * @param y The amount of translation in y-axis
     * @param z The amount of translation in z-axis
     */
    static translate(m: Mat4, x: number, y: number, z: number) {
        m.raw[12] += x;
        m.raw[13] += y;
        m.raw[14] += z;
    }

    /**
     * Translate a 4x4 matrix relative to the local space.
     * @param m The matrix to translate
     * @param x The amount of translation in x-axis
     * @param y The amount of translation in y-axis
     * @param z The amount of translation in z-axis
     */
    static translate_local(m: Mat4, x: number, y: number, z: number) {
        m.raw[12] += x * m.raw[0] + y * m.raw[4] + z * m.raw[8];
        m.raw[13] += x * m.raw[1] + y * m.raw[5] + z * m.raw[9];
        m.raw[14] += x * m.raw[2] + y * m.raw[6] + z * m.raw[10];
    }

    mul(b: Mat4) {
        const out = new Array<number>(16);

        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
                out[col * 4 + row] = 
                    this.raw[row     ] * b.raw[col * 4    ] +
                    this.raw[4  + row] * b.raw[col * 4 + 1] +
                    this.raw[8  + row] * b.raw[col * 4 + 2] +
                    this.raw[12 + row] * b.raw[col * 4 + 3];
            }
        }

        return new Mat4(
            out.slice(0, 4),
            out.slice(4, 8),
            out.slice(8, 12),
            out.slice(12, 16)
        );
    }

    /**
     * Multuply the current matrix by a given 3D vector.
     * @param x The vector x component
     * @param y The vector y component
     * @param z The vector z component
     */
    mulvec(x: number, y: number, z: number) {
        const res = new Float32Array(3);
        for (let i = 0; i < 3; i++) {
            res[i] = this.raw[i] * x + this.raw[i + 4] * y + this.raw[i + 8] * z + this.raw[i + 12];
        }

        return res;
    }
}