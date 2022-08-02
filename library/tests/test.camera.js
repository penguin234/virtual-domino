describe('Camera', function() {
    describe('#Convert Coordination', function() {
        const camera = new PerspectiveCamera(new Vector3D(16, 12, 8), new Vector3D(-4, -3, -2), new Vector3D(-4, -3, 12.5), Math.PI / 4, 100);
        
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

    describe('#Project Point', function() {
        const camera = new PerspectiveCamera(new Vector3D(0, 0, 10), new Vector3D(0, 0, -1), new Vector3D(0, 1, 0), Math.PI / 4, 100);

        it('(0, 0, 0) project to (50, 50)', function() {
            let v1 = new Vector3D(0, 0, 0);
            let expected = new Point2D(50, 50, 1);

            let transform = camera.GetProjectionTransform();
            let projected = Applier.toPoint(v1, transform);
            doesPointOverlap(Point2D.NormalizeProjectedPoint(projected), expected);
        });

        it('(4, -4, -10) project to (60, 60)', function() {
            let v1 = new Vector3D(4, -4, -10);
            let expected = new Point2D(60, 60, 1);

            let transform = camera.GetProjectionTransform();
            let projected = Applier.toPoint(v1, transform);
            doesPointOverlap(Point2D.NormalizeProjectedPoint(projected), expected);
        });

        it('(-5, 0, 5) project to (0, 50)', function() {
            let v1 = new Vector3D(-5, 0, 5);
            let expected = new Point2D(0, 50, 1);

            let transform = camera.GetProjectionTransform();
            let projected = Applier.toPoint(v1, transform);
            doesPointOverlap(Point2D.NormalizeProjectedPoint(projected), expected);
        });
    });
});