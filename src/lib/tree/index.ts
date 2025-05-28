import { BranchElement } from "./branch";
import { LeafElement } from "./leaf";

export * from "./branch";
export * from "./leaf";

export interface Leaf {
    title: string,
    subtitle: string,
}

export class Tree {
    private parent_element: SVGSVGElement;
    private tree_element: HTMLDivElement;

    /**
     * Create a tree.
     * @param leaves The tree leaves.
     */
    constructor(leaves: Array<Leaf>, parent_element: SVGSVGElement, tree_element: HTMLDivElement) {
        this.parent_element = parent_element;
        this.tree_element = tree_element;

        (async () => {
            for (let i = 0; i < 10; i++) {
                await this.draw_leaf(100, 10 + i * 100, i % 2 != 0, 0, leaves[0]);
            }
        })();
    }

    /**
     * Draw a leaf.
     * @param leaf The leaf information
     */
    private draw_leaf(x: number, y: number, inverse: boolean, delay: number, leaf: Leaf) {
        const bend = 25;
        const height = 100;
        const leaves_base_rotation = -90;
        const leaves_offset_rotation = 70;
        const inv = inverse ? -1 : 1;

        const branch_0 = new BranchElement(
            {
                position: { x, y },
                bend,
                height,
                reverse: inverse
            },
            this.parent_element,
        );

        const branch_1 = new BranchElement(
            {
                position: { x: x + bend * 0.5 * inv, y: y + height * 0.5 },
                bend,
                height: height * 0.5,
                reverse: !inverse,
                rotation: -45 * inv,
            },
            this.parent_element,
        );

        const leaf_0 = new LeafElement(
            {
                position: { x: x + 45 * inv, y: y + 85 },
                rotation: leaves_base_rotation * inv,
            },
            this.parent_element,
        );

        const leaf_1 = new LeafElement(
            {
                position: { x: x + 45 * inv, y: y + 85 },
                rotation: (leaves_base_rotation + leaves_offset_rotation) * inv,
            },
            this.parent_element,
        );

        const leaf_2 = new LeafElement(
            {
                position: { x: x + 45 * inv, y: y + 85 },
                rotation: (leaves_base_rotation - leaves_offset_rotation) * inv,
            },
            this.parent_element,
        );

        const bounding_client = leaf_0.svg_element.getBoundingClientRect();
        
        const container = document.createElement("div");
        container.setAttribute("id", "leaf-container");

        if (inverse) {
            container.setAttribute("class", "inverse");
        }

        const offset = inverse ? -380 : 0;

        container.setAttribute("style", `
            left: ${897 + inv * 150 + offset}px;
            top: ${y + 65}px;
        `);

        const title = document.createElement("h1");
        title.innerText = "Jusdeliens";

        const description = document.createElement("p");
        description.innerHTML = `Make operating system for an educational robot named <a href="#">Ova</a> with integrated backend and frontend.`;

        container.appendChild(title);
        container.appendChild(description);

        this.tree_element.appendChild(container);

        setTimeout(() => {
            container.setAttribute("class", container.getAttribute("class") + " show");
        }, delay + 300);

        return Promise.all([
            branch_0.draw(10, delay),
            branch_1.draw(8, delay + 150),
            leaf_0.draw(8, delay + 100),
            leaf_1.draw(10, delay + 200),
            leaf_2.draw(9, delay + 300),
        ]); 
        
    }
}