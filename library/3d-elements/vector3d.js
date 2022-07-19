function Vector3D(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3D.prototype.copy = function() {
    return new Vector3D(this.x, this.y, this.z);
};

Vector3D.prototype.log = function() {
    console.log('(' + String(this.x) + ', ' + String(this.y) + ', ' + String(this.z) + ')');
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