import { ImageStatus } from '../enums/ImageStatus';
import { ImagePaths, Images } from '../types/Types';

export class ImageLoader {
    private images: Images = {};
    private imageCount: number = 0;
    private imageLoaded: number = 0;
    private status: ImageStatus = ImageStatus.Ready;

    public get Images(): Images {
        return this.images;
    }

    public get Status(): ImageStatus {
        if (this.status === ImageStatus.Loaded) return this.status;

        if (this.status === ImageStatus.InProcess) {
            if (this.imageCount === this.imageLoaded) {
                this.status = ImageStatus.Loaded;
            }
        }

        return this.status;
    }

    public get Persent(): number {
        return this.imageLoaded / this.imageCount;
    }

    public constructor(paths: ImagePaths) {
        this.status = ImageStatus.InProcess;
        this.imageCount = Object.keys(paths).length;

        for (const name in paths) {
            this.loadImage(name, paths[name]);
        }
    }

    public getImage(name: string): HTMLImageElement {
        return this.images[name];
    }

    private loadImage(name: string, src: string): void {
        const image: HTMLImageElement = new Image();
        image.src = src;
        this.images[name] = image;

        image.onload = (): void => {
            this.imageLoaded++;
        };
    }
}
