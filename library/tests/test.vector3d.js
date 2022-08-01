describe('Vector3D', function() {

    describe('#add()', function() {
        it('add (2, 2, 2) to (1, 2, 3) is (3, 4, 5)', function() {
            let v1 = new Vector3D(1, 2, 3);
            let v2 = new Vector3D(2, 2, 2);
            let expected = new Vector3D(3, 4, 5);

            isVectorEqual(v1.add(v2), expected);
        });

        it('add (-1, -4, 5) to (4.5, 3.2, 2.3) is (3.5, -0.8, 7.3)', function() {
            let v1 = new Vector3D(4.5, 3.2, 2.3);
            let v2 = new Vector3D(-1, -4, 5);
            let expected = new Vector3D(3.5, -0.8, 7.3);

            isVectorEqual(v1.add(v2), expected);
        });
    });

    describe('#mult()', function() {
        it('multiply 3 to (1, 2, 3) is (3, 6, 9)', function() {
            let v1 = new Vector3D(1, 2, 3);
            let c = 3;
            let expected = new Vector3D(3, 6, 9);

            isVectorEqual(v1.mult(c), expected);
        });

        it('multiply 0.7 to (2, 2, -2) is (1.4, 1.4, -1.4)', function() {
            let v1 = new Vector3D(2, 2, -2);
            let c = 0.7;
            let expected = new Vector3D(1.4, 1.4, -1.4);

            isVectorEqual(v1.mult(c), expected);
        });
    });

    describe('#abs()', function() {
        it('absolute of (2, 0, 0) is 2', function() {
            let v1 = new Vector3D(2, 0, 0);
            let expected = 2;

            v1.abs().should.equal(expected);
        });

        it('absolute of (0, -1.5, 0) is 1.5', function() {
            let v1 = new Vector3D(0, -1.5, 0);
            let expected = 1.5;
            
            v1.abs().should.equal(expected);
        });

        it('absolute of (0, 0, -4) is 4', function() {
            let v1 = new Vector3D(0, 0, -4);
            let expected = 4;
            
            v1.abs().should.equal(expected);
        });

        it('absolute of (1, 1, 1) is sqrt(3)', function() {
            let v1 = new Vector3D(1, 1, 1);
            let expected = Math.sqrt(3);
            
            v1.abs().should.equal(expected);
        });
    });

    describe('#normalize()', function() {
        it('normalize (2, 0, 0) is (1, 0, 0)', function() {
            let v1 = new Vector3D(2, 0, 0);
            let expected = new Vector3D(1, 0, 0);

            isVectorEqual(v1.normalize(), expected);
        });

        it('normalize (0, -4, 0) is (0, -1, 0)', function() {
            let v1 = new Vector3D(0, -4, 0);
            let expected = new Vector3D(0, -1, 0);

            isVectorEqual(v1.normalize(), expected);
        });

        it('normalize (0, 0, -0.3) is (0, 0, -1)', function() {
            let v1 = new Vector3D(0, 0, -0.3);
            let expected = new Vector3D(0, 0, -1);

            isVectorEqual(v1.normalize(), expected);
        });

        it('normalize (1, -1, 1) is (sqrt(1/3), -sqrt(1/3), sqrt(1/3))', function() {
            let v1 = new Vector3D(1, -1, 1);
            let expected = new Vector3D(Math.sqrt(1 / 3), -Math.sqrt(1 / 3), Math.sqrt(1 / 3));

            isVectorEqual(v1.normalize(), expected);
        });
    });

    describe('#innerProduct()', function() {
        it('(1, 0, 0) inner product (2, 4, 6) is 2', function() {
            let v1 = new Vector3D(1, 0, 0);
            let v2 = new Vector3D(2, 4, 6);
            let expected = 2;

            v1.innerProduct(v2).should.equal(expected);
        });

        it('(0, 1, 0) inner product (2, 4, 6) is 4', function() {
            let v1 = new Vector3D(0, 1, 0);
            let v2 = new Vector3D(2, 4, 6);
            let expected = 4;

            v1.innerProduct(v2).should.equal(expected);
        });

        it('(0, 0, 1) inner product (2, 4, 6) is 6', function() {
            let v1 = new Vector3D(0, 0, 1);
            let v2 = new Vector3D(2, 4, 6);
            let expected = 6;

            v1.innerProduct(v2).should.equal(expected);
        });

        it('(1, 2, 3) inner product (4, 5, 6) is 32', function() {
            let v1 = new Vector3D(1, 2, 3);
            let v2 = new Vector3D(4, 5, 6);
            let expected = 32;

            v1.innerProduct(v2).should.equal(expected);
        });
    });

    describe('#outerProduct()', function() {
        it('(1, 0, 0) cross (0, 1, 0) is (0, 0, 1)', function() {
            let v1 = new Vector3D(1, 0 ,0);
            let v2 = new Vector3D(0, 1, 0);
            let expected = new Vector3D(0, 0, 1);

            isVectorEqual(v1.outerProduct(v2), expected);
        });

        it('(1, 0, 0) cross (0, 0, 1) is (0, -1, 0)', function() {
            let v1 = new Vector3D(1, 0 ,0);
            let v2 = new Vector3D(0, 0, 1);
            let expected = new Vector3D(0, -1, 0);

            isVectorEqual(v1.outerProduct(v2), expected);
        });

        it('(0, 1, 0) cross (0, 0, 1) is (1, 0, 0)', function() {
            let v1 = new Vector3D(0, 1 ,0);
            let v2 = new Vector3D(0, 0, 1);
            let expected = new Vector3D(1, 0, 0);

            isVectorEqual(v1.outerProduct(v2), expected);
        });

        it('(2, 2, 2) cross (2, -2, 2) is (8, 0, -8)', function() {
            let v1 = new Vector3D(2, 2 ,2);
            let v2 = new Vector3D(2, -2, 2);
            let expected = new Vector3D(8, 0, -8);

            isVectorEqual(v1.outerProduct(v2), expected);
        });
    });
});