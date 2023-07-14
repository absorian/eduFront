export type ImageBoxOpts = {
    id: string;
	src: string;
	alt: string;
	title?: string;

	shadow?: boolean;
	selectable?: boolean;
	sharp_edges?: boolean;
};

export type ImageData = {
    src: string;
    alt: string;
    title?: string;
}