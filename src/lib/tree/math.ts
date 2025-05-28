const DEG_TO_RAD = 0.0174533;

export interface Position {
    x: number;
    y: number;
}

/**
 * Rotate a 2D point around zero origin.
 * @param pos The position of the point to rotate
 * @param angle The angle of rotation *(in degrees)
 * @returns The position of the rotated point.
 */
export function rotate2d(pos: Position, angle: number): Position {
    const c = Math.cos(angle * DEG_TO_RAD);
    const s = Math.sin(angle * DEG_TO_RAD);

    return {
        x: pos.x * c - pos.y * s,
        y: pos.x * s + pos.y * c,
    };
}

export function lerp(a: number, b: number, t: number) {
    return a * (1 - t) + b * t;
}

export function easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
}

export function easeInOutCirc(x: number): number {
    return x < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

export function easeOutCirc(x: number): number {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}
