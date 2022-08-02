describe('Camera', function() {
    const camera = new PerspectiveCamera(new Vector3D(16, 12, 8), new Vector3D(-4, -3, -2), new Vector3D(-4, -3, 12.5), Math.PI / 4);

    describe('#Convert Coordination', function() {
        it('(0, 0, 0) transform', function() {
            let v1 = new Vector3D(0, 0, 0);
            let expected = new Vector3D(0, 0, camera.position.abs());

            let transform = camera.GetConvertCoordTransform();
            isVectorEqual(Applier.toPoint(v1, transform), expected);
        });

        it('(12, 9, 20.5) transform', function() {
            let v1 = new Vector3D(12, 9, 20.5);
            let expected = new Vector3D(0, camera.updirection.abs() * -1, 0);

            let transform = camera.GetConvertCoordTransform();
            isVectorEqual(Applier.toPoint(v1, transform), expected);
        });

        it('(16, 12, 8) transform', function() {
            let v1 = new Vector3D(16, 12, 8);
            let expected = new Vector3D(0, 0, 0);

            let transform = camera.GetConvertCoordTransform();
            isVectorEqual(Applier.toPoint(v1, transform), expected);
        });
    });
});