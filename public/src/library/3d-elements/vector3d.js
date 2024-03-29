function Vector3D(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3D.prototype.copy = function() {
    return new Vector3D(this.x, this.y, this.z);
};

Vector3D.prototype.toString = function() {
    return '(' + String(this.x) + ', ' + String(this.y) + ', ' + String(this.z) + ')';
}

Vector3D.prototype.log = function() {
    console.log(this.toString());
};

Vector3D.prototype.add = function(p) {
    this.x += p.x;
    this.y += p.y;
    this.z += p.z;

    return this;
};

Vector3D.prototype.mult = function(c) {
    this.x *= c;
    this.y *= c;
    this.z *= c;

    return this;
};

Vector3D.prototype.sub = function(p) {
    this.add(p.copy().mult(-1));

    return this;
};

Vector3D.prototype.abs = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

Vector3D.prototype.normalize = function() {
    const size = this.abs();

    this.x /= size;
    this.y /= size;
    this.z /= size;

    return this;
};

Vector3D.prototype.innerProduct = function(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
};

Vector3D.prototype.outerProduct = function(v) {
    return new Vector3D(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
};


export default Vector3D;