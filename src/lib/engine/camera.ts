import {glMatrix, mat4, quat, vec3} from "gl-matrix"
const DEG_TO_RAD = 0.0174533;

export class Camera {
    private view: mat4;
    private proj: mat4;
    private rotation: vec3;
    private translation: vec3;

    constructor(viewport: {width: number, height: number}) {

        this.translation = [0, 30, 0];
        this.rotation = [-90, 0, 0];
        this.view = mat4.create();
        mat4.lookAt(this.view, [0, 0, 1], [0, 0, 0], [0, 1, 0]);

        this.proj = mat4.create();
        this.proj = mat4.perspective(this.proj, 80, viewport.width / viewport.height, 0.1, 1000);
    }

    public get matrixView() {
        const view = mat4.clone(this.view);
        mat4.translate(view, view, this.translation);
        const q = quat.create();
        quat.fromEuler(q, this.rotation[0], this.rotation[1], this.rotation[2]);

        const mq = mat4.create();
        mat4.fromQuat(mq, q);
        mat4.mul(view, mq, view);

        return view;
    }

    public get matrixProjection() {
        return this.proj;
    }

    public get matrixViewProjection() {
        const mvp = mat4.create();
        mat4.multiply(mvp, this.proj, this.view);

        return mvp;
    }

    public setPosition(p: vec3) {
        this.translation = p;
    }

    public setPositionX(value: number) {
        this.translation[0] = value;
    }

    public setPositionZ(value: number) {
        this.translation[2] = value;
    }

    public setRotation(r: vec3) {
        this.rotation = r;
    }

    public set rotationY(value: number) {
        this.rotation[1] = value;
    }

    public get rotationY() {
        return this.rotation[1];
    }

    public set rotationX(value: number) {
        this.rotation[0] = value;
    }

    public get rotationX() {
        return this.rotation[0];
    }
}