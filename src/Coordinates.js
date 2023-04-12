class Coordinates {
    getHangmanCoords() {
        return {
            options: {
                lineWidth: 8,
                lineCap: 'round'
            },
            coords: [
                this.#getCoords(30, 170, 280, 280, 30),
                this.#getCoords(95, 95, 280, 30, 30),
                this.#getCoords(95, 250, 30, 30, 30),
                this.#getCoords(250, 250, 30, 80, 30),
            ]
        };
    }

    getHeadCoords() {
        return {
            x: 244,
            y: 80,
            radius: 3,
            angle: 0,
            step: {
                count: 40
            }
        };
    }

    getBodyCoords() {
        return this.#getCoords(250, 250, 125, 210, 30);
    }

    getLeftHandCoords() {
        return this.#getCoords(245, 210, 140, 175, 30);
    }

    getRightHandCoords() {
        return this.#getCoords(255, 290, 140, 175, 30);
    }

    getLeftLegCoords() {
        return this.#getCoords(250, 218, 210, 265, 30);
    }

    getRightLegCoords() {
        return this.#getCoords(250, 282, 210, 265, 30);
    }

    getWinScreenCoords() {
        return {
            options: {
                font: 'bold 135px mono',
                lineWidth: 6
            },
            coords: {
                start: 630,
                step: {
                    size: 10,
                    count: 58
                },
                circle: this.#getCircle(20, 0, 6)
            }
        };
    }

    #getCoords(xStart, xEnd, yStart, yEnd, stepCount = 60) {
        return {
            x: xStart,
            y: yStart,
            step: {
                x: (xEnd - xStart) / stepCount,
                y: (yEnd - yStart) / stepCount,
                count: stepCount
            }
        };
    }

    #getCircle(count, radius, step) {
        const circles = [];

        for (let i = 1; i <= count; i++) {
            circles.push({
                radius: radius * i,
                step: step * i,
                color: this.#getRandomColor()
            });
        }

        return circles;
    }

    #getRandomColor() {
        const items = '123456789abcdef';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            const index = Math.floor(Math.random() * items.length);
            color += items[index];
        }

        return color;
    }
}
