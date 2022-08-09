function PerspectiveCamera(position, lookdirection, updirection, horizontalangle, viewboxwidth) {
    this.position = position;
    this.lookdirection = lookdirection;
    this.updirection = updirection;
    this.horizontalangle = horizontalangle;
    this.viewboxwidth = viewboxwidth;
}

PerspectiveCamera.GetPositionAdjustTransform = function(camera) {
    return new Translate(camera.position.x * -1, camera.position.y * -1, camera.position.z * -1);
};

PerspectiveCamera.GetDirectionAdjustTransform = function(camera) {
    const l = camera.lookdirection.copy().normalize();
    const u = camera.updirection.copy().normalize();

    const r = l.outerProduct(u);
    u.mult(-1);

    return new Matrix4By4(
        r.x, u.x, l.x, 0,
        r.y, u.y, l.y, 0,
        r.z, u.z, l.z, 0,
        0, 0, 0, 1
    );
};

PerspectiveCamera.GetProjectionMatrix = function(camera) {
    const f = 1 / Math.tan(camera.horizontalangle);

    return new Matrix4By3(
        f, 0, 0,
        0, f, 0,
        0, 0, 1,
        0 ,0, 0
    );
};

PerspectiveCamera.GetConvertToPixelMatrix = function(camera) {
    const s = camera.viewboxwidth / 2;

    return new Matrix3By3(
        s, 0, 0,
        0, s, 0,
        s, s, 1
    );
};

PerspectiveCamera.prototype.GetConvertCoordTransform = function() {
    const pos = PerspectiveCamera.GetPositionAdjustTransform(this);
    const dir = PerspectiveCamera.GetDirectionAdjustTransform(this);
    const coord = Applier.merge(pos, dir);
    return coord;
};

PerspectiveCamera.prototype.GetProjectionTransform = function() {
    const coord = this.GetConvertCoordTransform();

    const proj = PerspectiveCamera.GetProjectionMatrix(this);

    const pix = PerspectiveCamera.GetConvertToPixelMatrix(this);

    return Applier.merge(Applier.merge(coord, proj), pix);
};

PerspectiveCamera.prototype.GetProperUpdirection = function(seed) {
    const look = this.lookdirection.copy();
    const proj = look.mult(seed.innerProduct(look) / look.innerProduct(look));
    return seed.copy().sub(proj);
};