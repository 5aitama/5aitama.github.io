import {
    easeInOutCirc,
    easeOutCirc,
    easeOutCubic,
    lerp,
    rotate2d,
    type Position,
} from "./math";

interface LeafElementParams {
    /** The position of the root leaf */
    position?: Position;

    /** The rotation angle *(in degrees)* of the leaf. */
    rotation?: number;
}

export class LeafElement {
    private element: SVGPathElement;

    constructor(params: LeafElementParams, parent: SVGSVGElement) {
        const element = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path",
        );

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

            { x: 5, y: h * 0.15 },
        ];

        // Apply rotation and translation on each points.
        for (let i = 0; i < points.length; i++) {
            const p = rotate2d(points[i], params.rotation ?? 0);
            points[i] = {
                x: p.x + pos.x,
                y: p.y + pos.y,
            };
        }

        // element.setAttribute(
        //     "d",
        //     `
        //     M ${points[0].x} ${points[0].y} L ${points[2].x} ${points[2].y}
        //     L ${points[0].x} ${points[0].y} Q ${points[3].x} ${points[3].y} ${points[1].x} ${points[1].y}
        //     L ${points[0].x} ${points[0].y} Q ${points[4].x} ${points[4].y} ${points[1].x} ${points[1].y}
        // `,
        // );

        element.setAttribute(
            "d",
            `
            M ${points[0].x} ${points[0].y} Q ${points[3].x} ${points[3].y} ${points[1].x} ${points[1].y}
            Q ${points[4].x} ${points[4].y} ${points[0].x} ${points[0].y}
            Q ${points[5].x} ${points[5].y} ${points[2].x} ${points[2].y}
        `,
        );

        const length = element.getTotalLength();
        element.setAttribute("stroke-dasharray", length.toString());
        element.setAttribute("stroke-dashoffset", length.toString());

        this.element = element;
        parent.append(this.element);
    }

    public get svg_element() {
        return this.element;
    }

    public draw(speed: number = 1, delay: number = 0): Promise<void> {
        return new Promise((resolve, _) => {
            const length = this.element.getTotalLength();

            let time = 0;
            let handle = 0;
            let offset = length;

            const loop = (prev_time: number = 0, curr_time: number = 0) => {
                if (Math.round(offset * 10) / 10 == 0) {
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
