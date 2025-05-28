import { easeOutCubic, lerp, rotate2d, type Position } from "./math";

export interface BranchElementParams {
    /**
     * The position of the root branch
     */
    position?: Position;

    /**
     * The rotation angle *(in degrees)* of the branch.
     */
    rotation?: number;

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

export class BranchElement {
    private element: SVGPathElement;

    constructor(params: BranchElementParams, parent: SVGSVGElement) {
        const element = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
        );

        const height = params.height ?? 100;
        const reverse = params.reverse ?? false;
        const pos = params.position ?? { x: 0, y: 0 };
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
            const p = rotate2d(points[i], params.rotation ?? 0);
            points[i] = {
                x: p.x + pos.x,
                y: p.y + pos.y,
            };
        }

        element.setAttribute(
            "d",
            `M ${points[0].x} ${points[0].y} Q ${points[2].x} ${points[2].y} ${points[1].x} ${points[1].y}`,
        );

        const length = element.getTotalLength();
        element.setAttribute("stroke-dasharray", length.toString());
        element.setAttribute("stroke-dashoffset", length.toString());
        element.setAttribute("id", "leaf");
        this.element = element;
        parent.appendChild(this.element);
    }

    public draw(speed: number = 1, delay: number = 0): Promise<void> {
        return new Promise((resolve, _) => {
            const length = this.element.getTotalLength();

            let time = 0;
            let handle = 0;
            let offset = length;

            const loop = (prev_time: number = 0, curr_time: number = 0) => {
                if (Math.floor(offset * 10) / 10 == 0) {
                    cancelAnimationFrame(handle);
                    return resolve();
                }

                const delta_time = (curr_time - prev_time) / 1000;
                time = Math.min(1, time + (delta_time * speed) / length);

                offset = lerp(offset, 0, easeOutCubic(time));

                this.element.setAttribute(
                    "stroke-dashoffset",
                    offset.toString(),
                );

                this.element.style.opacity = easeOutCubic(
                    1 - offset / length,
                ).toString();

                handle = requestAnimationFrame((t) => loop(curr_time, t));
            };

            setTimeout(() => {
                requestAnimationFrame((t) => loop(t, t));
            }, delay);
        });
    }
}
