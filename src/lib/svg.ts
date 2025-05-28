const DEG_TO_RAD = 0.0174533;

export interface Position {
    x: number;
    y: number;
}

export interface BranchParams {
    /**
     * The position of the root branch
     */
    position?: Position;

    /**
     * The rotation angle *(in degrees)* of the branch.
     */
    angle?: number;

    /**
     * The bend value of the branch.
     */
    bend?: number;

    /**
     * The height of the branch.
     */
    height?: number;

    /**
     * `true` to reverse bending.
     */
    reverse?: boolean;
}

/**
 * Rotate a 2D point around zero origin.
 * @param pos The position of the point to rotate
 * @param angle The angle of rotation *(in degrees)
 * @returns The position of the rotated point.
 */
function rotate2d(pos: Position, angle: number): Position {
    const c = Math.cos(angle * DEG_TO_RAD);
    const s = Math.sin(angle * DEG_TO_RAD);

    return {
        x: pos.x * c - pos.y * s,
        y: pos.x * s + pos.y * c,
    };
}

/**
 * Create a {@link SVGPathElement} that represent a tree branch.
 * @param params The branch parameters.
 */
export function createBranchSvgPath(params: BranchParams): SVGPathElement {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    const angle = params.angle ?? 0;
    const height = params.height ?? 100;
    const reverse = params.reverse ?? false;
    const position = params.position ?? { x: 0, y: 0 };

    const c = Math.cos(angle * DEG_TO_RAD);
    const s = Math.sin(angle * DEG_TO_RAD);
    const bend = params.bend ?? 20;

    const points = [
        // The begin of the branch
        { x: 0, y: 0 },
        // The end of the branch
        { x: 0, y: height },
        // The control point
        { x: bend * (reverse ? -1 : 1), y: height * 0.5 },
    ];

    // Apply rotation and translation on each points.
    for (let i = 0; i < points.length; i++) {
        points[i] = {
            x: points[i].x * c - points[i].y * s + position.x,
            y: points[i].x * s + points[i].y * c + position.y,
        };
    }

    path.setAttribute(
        "d",
        `M ${points[0].x} ${points[0].y} Q ${points[2].x} ${points[2].y} ${points[1].x} ${points[1].y}`,
    );
    return path;
}

export interface LeafParams {
    /** The position of the root leaf */
    position?: Position;

    /** The rotation angle *(in degrees)* of the leaf. */
    rotation?: number;
}

export function createLeafSVGPath(params: LeafParams): SVGPathElement {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    /** The height of the leaf */
    const h = 35;
    /** The bend of the leaf */
    const b = 15;
    const pos = params.position ?? { x: 0, y: 0 };

    const points = [
        // The begin point of the leaf
        { x: 0, y: 0 },
        // The end point of the leaf
        { x: 0, y: h },
        // The end point of the leaf middle line
        { x: 0, y: h * 0.5 },
        // The right side control point of the leaf
        { x: b, y: h * 0.5 },
        // The left side control point of the leaf
        { x: -b, y: h * 0.5 },
    ];

    // Apply rotation and translation on each points.
    for (let i = 0; i < points.length; i++) {
        const p = rotate2d(points[i], params.rotation ?? 0);
        points[i] = {
            x: p.x + pos.x,
            y: p.y + pos.y,
        };
    }

    path.setAttribute(
        "d",
        `
        M ${points[0].x} ${points[0].y} Q ${points[3].x} ${points[3].y} ${points[1].x} ${points[1].y}
        M ${points[0].x} ${points[0].y} Q ${points[4].x} ${points[4].y} ${points[1].x} ${points[1].y}
        M ${points[0].x} ${points[0].y} L ${points[2].x} ${points[2].y}
    `,
    );

    return path;
}

export class Branch {
    private root_branch: SVGPathElement;
    private child_branch: SVGPathElement;
    private leaves: Array<SVGPathElement>;
    private animation_value_target = 0;
    private element: SVGPathElement;

    /**
     * Create a new {@link Branch}.
     * @param x The position of the branch in the x axis.
     * @param y The position of the branch in the y axis.
     */
    constructor(x: number, y: number, parent_element: SVGSVGElement) {
        const bend = 20;
        const height = 100;
        const leaves_base_rotation = -90;
        const leaves_offset_rotation = 70;

        this.root_branch = createBranchSvgPath({
            position: { x, y },
            bend,
            height,
        });

        this.child_branch = createBranchSvgPath({
            position: { x: x + bend * 0.5, y: y + height * 0.5 },
            bend,
            height: height * 0.5,
            reverse: true,
            angle: -45,
        });

        this.leaves = [
            createLeafSVGPath({
                position: { x: x + 45, y: y + 85 },
                rotation: leaves_base_rotation,
            }),
            createLeafSVGPath({
                position: { x: x + 45, y: y + 85 },
                rotation: leaves_base_rotation + leaves_offset_rotation,
            }),
            createLeafSVGPath({
                position: { x: x + 45, y: y + 85 },
                rotation: leaves_base_rotation - leaves_offset_rotation,
            }),
        ];

        const attr =
            (this.root_branch.getAttribute("d") ?? "") +
            " " +
            (this.child_branch.getAttribute("d") ?? "");

        const element = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
        );
        element.setAttribute("d", attr);
        parent_element.append(element);

        this.element = element;
    }

    public tick(delta_time: number) {
        this.animation_value_target += delta_time * 25.0;
        const element_length = this.element.getTotalLength();

        this.element.setAttribute(
            "stroke-dasharray",
            element_length.toString(),
        );

        const element_value = Math.max(
            element_length - this.animation_value_target,
            0,
        );

        this.element.setAttribute(
            "stroke-dashoffset",
            element_value.toString(),
        );
    }
}
