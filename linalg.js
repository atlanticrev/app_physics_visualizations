class Vector2D {

    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    add (vector) {
        if (!vector instanceof Vector2D) {
            throw new Error('Argument must be Vector2D type');
        }
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    sub (vector) {
        if (!vector instanceof Vector2D) {
            throw new Error('Argument must be Vector2D type');
        }
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    dot (vector) {
        if (!vector instanceof Vector2D) {
            throw new Error('Argument must be Vector2D type');
        }
        this.x * vector.x + this.y * vector.y;
        return this;
    }

    cross (vector) {
        if (!vector instanceof Vector2D) {
            throw new Error('Argument must be Vector2D type');
        }
        return this; // @todo implement it
    }

    applyMatrix (matrix) {
        if (!matrix instanceof Matrix2D) {
            throw new Error('Argument must be Matrix2D type');
        }
        this.x = matrix.elements[0] * this.x + matrix.elements[1] * this.y;
        this.y = matrix.elements[2] * this.x + matrix.elements[3] * this.y;
        return this;
    }

}

class Matrix2D {

    constructor (values) {
        this.elements = values;
    }

    static createRotationMatrix (angle) {
        const alpha = angle / 180 * Math.PI;
        return new Matrix2D([
            Math.cos(alpha), -Math.sin(alpha),
            Math.sin(alpha), Math.cos(alpha)
        ]);
    }

    applyMatrix (matrix) {
        if (!matrix instanceof Matrix2D) {
            throw new Error('Argument must be Matrix2D type');
        }
        this.elements[0] = this.elements[0] * matrix.elements[0] + this.elements[1] * matrix.elements[2];
        this.elements[1] = this.elements[2] * matrix.elements[0] + this.elements[3] * matrix.elements[2];
        this.elements[2] = this.elements[0] * matrix.elements[1] + this.elements[1] * matrix.elements[3];
        this.elements[3] = this.elements[2] * matrix.elements[1] + this.elements[3] * matrix.elements[3];
    }

}