pc.extend(pc, function () {
    'use strict';

    /**
    * @name pc.Quat
    * @class A quaternion.
    * @constructor Create a new Quat object
    * @param {Number} [x=0] The quaternion's x component
    * @param {Number} [y=0] The quaternion's y component
    * @param {Number} [z=0] The quaternion's z component
    * @param {Number} [w=1] The quaternion's w component
    */
    var Quat = function (x, y, z, w) {
        this.x = (typeof x === 'undefined') ? 0 : x;
        this.y = (typeof y === 'undefined') ? 0 : y;
        this.z = (typeof z === 'undefined') ? 0 : z;
        this.w = (typeof w === 'undefined') ? 1 : w;
    };

    Quat.prototype = {
        /**
         * @function
         * @name pc.Quat#clone
         * @description Returns an identical copy of the specified quaternion.
         * @returns {pc.Quat} A quaternion containing the result of the cloning.
         * @example
         * var q = new pc.Quat(-0.11, -0.15, -0.46, 0.87);
         * var qclone = q.clone();
         *
         * console.log("The result of the cloning is: " + q.toString());
         * @author Will Eastcott
         */
        clone: function () {
            return new pc.Quat(this.x, this.y, this.z, this.w);
        },

        conjugate: function () {
            this.x *= -1;
            this.y *= -1;
            this.z *= -1;

            return this;
        },

        /**
         * @function
         * @name pc.Quat#copy
         * @description Copies the contents of a source quaternion to a destination quaternion.
         * @param {pc.Quat} rhs The quaternion to be copied.
         * @returns {pc.Quat} Self for chaining.
         * var src = new pc.Quat();
         * var dst = new pc.Quat();
         * dst.copy(src, src);
         * console.log("The two quaternions are " + (src.equals(dst) ? "equal" : "different"));
         * @author Will Eastcott
         */
        copy: function (rhs) {
            this.x = rhs.x;
            this.y = rhs.y;
            this.z = rhs.z;
            this.w = rhs.w;

            return this;
        },

        /**
         * @function
         * @name pc.Quat#equals
         * @description Reports whether two quaternions are equal.
         * @returns {Boolean} true if the quaternions are equal and false otherwise.
         * var a = new pc.Quat();
         * var b = new pc.Quat();
         * console.log("The two quaternions are " + (a.equals(b) ? "equal" : "different"));
         * @author Will Eastcott
         */
        equals: function (that) {
            return ((this.x === that.x) && (this.y === that.y) && (this.z === that.z) && (this.w === that.w));
        },

        /**
         * @function
         * @name pc.Quat#invert
         * @description Generates the inverse of the specified quaternion.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * // Create a quaternion rotated 180 degrees around the y-axis
         * var rot = new pc.Quat().setFromEulers(0, 180, 0);
         *
         * // Invert in place
         * rot.invert();
         * @author Will Eastcott
         */
        invert: function () {
            return this.conjugate().normalize();
        },

        /**
         * @function
         * @name pc.Quat#length
         * @description Returns the magnitude of the specified quaternion.
         * @returns {Number} The magnitude of the specified quaternion.
         * @example
         * var q = new pc.Quat(0, 0, 0, 5);
         * var len = q.length();
         * // Should output 5
         * console.log("The length of the quaternion is: " + len);
         * @author Will Eastcott
         */
        length: function () {
            var x = this.x;
            var y = this.y;
            var z = this.z;
            var w = this.w;
            return Math.sqrt(x * x + y * y + z * z + w * w);
        },

        /**
         * @function
         * @name pc.Quat#mul
         * @description Returns the result of multiplying the specified quaternions together.
         * @param {pc.Quat} rhs The quaternion used as the second multiplicand of the operation.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var a = new pc.Quat().setFromEulers(0, 30, 0);
         * var b = new pc.Quat().setFromEulers(0, 60, 0);
         *
         * // a becomes a 90 degree rotation around the Y axis
         * // In other words, a = a * b
         * a.mul(b);
         * 
         * console.log("The result of the multiplication is: " a.toString());
         * @author Will Eastcott
         */
        mul: function (rhs) {
            var q1x = this.x;
            var q1y = this.y;
            var q1z = this.z;
            var q1w = this.w;

            var q2x = rhs.x;
            var q2y = rhs.y;
            var q2z = rhs.z;
            var q2w = rhs.w;

            this.x = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
            this.y = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;
            this.z = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
            this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

            return this;
        },

        /**
         * @function
         * @name pc.Quat#mul2
         * @description Returns the result of multiplying the specified quaternions together.
         * @param {pc.Quat} lhs The quaternion used as the first multiplicand of the operation.
         * @param {pc.Quat} rhs The quaternion used as the second multiplicand of the operation.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var a = new pc.Quat().setFromEulers(0, 30, 0);
         * var b = new pc.Quat().setFromEulers(0, 60, 0);
         * var r = new pc.Quat();
         *
         * // r is set to a 90 degree rotation around the Y axis
         * // In other words, r = a * b
         * r.mul2(a, b);
         * 
         * console.log("The result of the multiplication is: " r.toString());
         * @author Will Eastcott
         */
        mul2: function (lhs, rhs) {
            return this.copy(lhs).mul(rhs);
        },

        /**
         * @function
         * @name pc.Quat#normalize
         * @description Returns the specified quaternion converted in place to a unit quaternion.
         * @returns {pc.Quat} The result of the normalization.
         * @example
         * var v = new pc.Quat(0, 0, 0, 5);
         *
         * v.normalize();
         *
         * // Should output 0, 0, 0, 1
         * console.log("The result of the vector normalization is: " + v.toString());
         * @author Will Eastcott
         */
        normalize: function () {
            var len = this.length();
            if (len === 0) {
                this.x = this.y = this.z = 0;
                this.w = 1;
            } else {
                len = 1 / len;
                this.x *= len;
                this.y *= len;
                this.z *= len;
                this.w *= len;
            }

            return this;
        },

        /**
         * @function
         * @name pc.Quat#set
         * @description Sets the specified quaternion to the supplied numerical values.
         * @param {Number} x The x component of the quaternion.
         * @param {Number} y The y component of the quaternion.
         * @param {Number} z The z component of the quaternion.
         * @param {Number} w The w component of the quaternion.
         * @example
         * var q = new pc.Quat();
         * q.set(1, 0, 0, 0);
         *
         * // Should output 1, 0, 0, 0
         * console.log("The result of the vector set is: " + q.toString());
         * @author Will Eastcott
         */
        set: function (x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;

            return this;
        },

        /**
         * @function
         * @name pc.Quat#setFromAxisAngle
         * @description Sets a quaternion from an angular rotation around an axis.
         * @param {pc.Vec3} axis World space axis around which to rotate.
         * @param {Number} ey Angle to rotate around the given axis in degrees.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var q = new pc.Quat();
         * q.setFromAxisAngle(pc.Vec3.UP, 90);
         * @author Will Eastcott
         */
        setFromAxisAngle: function (axis, angle) {
            angle *= pc.math.DEG_TO_RAD;
            angle *= 0.5;

            var sa = Math.sin(angle);
            var ca = Math.cos(angle);

            this.x = sa * axis.x;
            this.y = sa * axis.y;
            this.z = sa * axis.z;
            this.w = ca;

            return this;
        },

        /**
         * @function
         * @name pc.Quat#setFromEulers
         * @description Sets a quaternion from Euler angles specified in XYZ order.
         * @param {Number} ex Angle to rotate around X axis in degrees.
         * @param {Number} ey Angle to rotate around Y axis in degrees.
         * @param {Number} ez Angle to rotate around Z axis in degrees.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var q = new pc.Quat();
         * q.setFromEulers(45, 90, 180);
         * @author Will Eastcott
         */
        setFromEulers: function (ex, ey, ez) {
            ex *= pc.math.DEG_TO_RAD;
            ey *= pc.math.DEG_TO_RAD;
            ez *= pc.math.DEG_TO_RAD;
            ex *= 0.5;
            ey *= 0.5;
            ez *= 0.5;

            var sx = Math.sin(ex);
            var cx = Math.cos(ex);
            var sy = Math.sin(ey);
            var cy = Math.cos(ey);
            var sz = Math.sin(ez);
            var cz = Math.cos(ez);

            this.x = sx * cy * cz - cx * sy * sz;
            this.y = cx * sy * cz + sx * cy * sz;
            this.z = cx * cy * sz - sx * sy * cz;
            this.w = cx * cy * cz + sx * sy * sz;

            return this;
        },

        /**
         * @function
         * @name pc.Quat#setFromMat4
         * @description Converts the specified 4x4 matrix to a quaternion. Note that since
         * a quaternion is purely a representation for orientation, only the translational part
         * of the matrix is lost.
         * @param {pc.Mat4} m The 4x4 matrix to convert.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * // Create a 4x4 rotation matrix of 180 degrees around the y-axis
         * var rot = new pc.Mat4().rotate(180, pc.Vec3.UP);
         *
         * // Convert to a quaternion
         * var q = new pc.Quat().setFromMat4(rot);
         * @author Will Eastcott
         */
        setFromMat4: function (m) {
            m = m.data;

            var m00 = m[0], m01 = m[1], m02 = m[2];
            var m10 = m[4], m11 = m[5], m12 = m[6];
            var m20 = m[8], m21 = m[9], m22 = m[10];

            var lx = Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
            var ly = Math.sqrt(m10 * m10 + m11 * m11 + m12 * m12);
            var lz = Math.sqrt(m20 * m20 + m21 * m21 + m22 * m22);
            m00 /= lx; m01 /= lx; m02 /= lx;
            m10 /= ly; m11 /= ly; m12 /= ly;
            m20 /= lz; m21 /= lz; m22 /= lz;

            // http://www.cs.ucr.edu/~vbz/resources/quatut.pdf
            var tr, s;

            tr = m00 + m11 + m22;
            if (tr >= 0) {
                s = Math.sqrt(tr + 1);
                this.w = s * 0.5;
                s = 0.5 / s;
                this.x = (m12 - m21) * s;
                this.y = (m20 - m02) * s;
                this.z = (m01 - m10) * s;
            } else {
                var rs;
                if (m00 > m11) {
                    if (m00 > m22) {
                        // XDiagDomMatrix
                        rs = (m00 - (m11 + m22)) + 1;
                        rs = Math.sqrt(rs);

                        this.x = rs * 0.5;
                        rs = 0.5 / rs;
                        this.w = (m12 - m21) * rs;
                        this.y = (m01 + m10) * rs;
                        this.z = (m02 + m20) * rs;
                    } else {
                        // ZDiagDomMatrix
                        rs = (m22 - (m00 + m11)) + 1;
                        rs = Math.sqrt(rs);

                        this.z = rs * 0.5;
                        rs = 0.5 / rs;
                        this.w = (m01 - m10) * rs;
                        this.x = (m20 + m02) * rs;
                        this.y = (m21 + m12) * rs;
                    }
                } else if (m11 > m22) {
                    // YDiagDomMatrix
                    rs = (m11 - (m22 + m00)) + 1.0;
                    rs = Math.sqrt(rs);

                    this.y = rs * 0.5;
                    rs = 0.5 / rs;
                    this.w = (m20 - m02) * rs;
                    this.z = (m12 + m21) * rs;
                    this.x = (m10 + m01) * rs;
                } else {
                    // ZDiagDomMatrix
                    rs = (m22 - (m00 + m11)) + 1.0;
                    rs = Math.sqrt(rs);

                    this.z = rs * 0.5;
                    rs = 0.5 / rs;
                    this.w = (m01 - m10) * rs;
                    this.x = (m20 + m02) * rs;
                    this.y = (m21 + m12) * rs;
                }            
            }

            return this;
        },

        /**
         * @function
         * @name pc.Quat#slerp
         * @description Performs a spherical interpolation between two quaternions. The result of
         * the interpolation is written to the quaternion calling the function.
         * @param {pc.Quat} rhs The quaternion to interpolate to.
         * @param {Number} alpha The value controlling the interpolation in relation to the two input
         * quaternions. The value is in the range 0 to 1, 0 generating q1, 1 generating q2 and anything
         * in between generating a spherical interpolation between the two.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var q1 = new pc.Quat(-0.11,-0.15,-0.46,0.87);
         * var q2 = new pc.Quat(-0.21,-0.21,-0.67,0.68);
         *
         * q1.slerp(q2, 0);   // q1 = q1
         * q1.slerp(q2, 0.5); // q1 = midway between q1 and q2
         * q1.slerp(q2, 1);   // q1 = q2
         * @author Will Eastcott
         */
        slerp: function (rhs, alpha) {
            var q1x = this.x;
            var q1y = this.y;
            var q1z = this.z;
            var q1w = this.w;
            var q2x = rhs.x;
            var q2y = rhs.y;
            var q2z = rhs.z;
            var q2w = rhs.w;

            var cosOmega = q1x * q2x + q1y * q2y + q1z * q2z + q1w * q2w;

            // If B is on opposite hemisphere from A, use -B instead
            var flip = cosOmega < 0;
            if (flip) cosOmega *= -1;

            // Complementary interpolation parameter
            var beta = 1 - alpha;

            if (cosOmega < 1) {
                var omega = Math.acos(cosOmega);
                var invSinOmega = 1 / Math.sin(omega);

                beta = Math.sin(omega * beta) * invSinOmega;
                alpha = Math.sin(omega * alpha) * invSinOmega;

                if (flip) alpha = -alpha;
            }

            this.x = beta * q1x + alpha * q2x;
            this.y = beta * q1y + alpha * q2y;
            this.z = beta * q1z + alpha * q2z;
            this.w = beta * q1w + alpha * q2w;

            return this;
        },

        /**
         * @function
         * @name pc.Quat#slerp2
         * @description Performs a spherical interpolation between two quaternions. The result of
         * the interpolation is written to the quaternion calling the function.
         * @param {pc.Quat} lhs The quaternion to interpolate from.
         * @param {pc.Quat} rhs The quaternion to interpolate to.
         * @param {Number} alpha The value controlling the interpolation in relation to the two input
         * quaternions. The value is in the range 0 to 1, 0 generating q1, 1 generating q2 and anything
         * in between generating a spherical interpolation between the two.
         * @returns {pc.Quat} Self for chaining.
         * @example
         * var q1 = new pc.Quat(-0.11,-0.15,-0.46,0.87);
         * var q2 = new pc.Quat(-0.21,-0.21,-0.67,0.68);
         *
         * var result;
         * result = new pc.Quat().slerp2(q1, q2, 0);   // Return q1
         * result = new pc.Quat().slerp2(q1, q2, 0.5); // Return the midpoint interpolant 
         * result = new pc.Quat().slerp2(q1, q2, 1);   // Return q2
         * @author Will Eastcott
         */
        slerp2: function (lhs, rhs, alpha) {
            return this.copy(lhs).slerp(rhs, alpha);
        },

        /**
         * @function
         * @name pc.Quat#toEulers
         * @description Converts the supplied quaternion to Euler angles.
         * @param {pc.Vec3} [eulers] The 3-dimensional vector to receive the Euler angles.
         * @returns {pc.Vec3} The 3-dimensional vector holding the Euler angles that 
         * correspond to the supplied quaternion.
         * @author Will Eastcott
         */
        toEulers: function (eulers) {
            if (typeof eulers === 'undefined') {
                eulers = new pc.Vec3();
            }

            var qx = this.x, qy = this.y, qz = this.z, qw = this.w;

            var a2 = 2 * (qw * qy - qx * qz);
            var x, y, z;
            if (a2 <= -0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = -Math.PI / 2;
                z = 0;
            } else if (a2 >= 0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = Math.PI / 2;
                z = 0;
            } else {
                x = Math.atan2(2 * (qw * qx + qy * qz), 1 - 2 * (qx * qx + qy * qy));
                y = Math.asin(a2);
                z = Math.atan2(2 * (qw * qz + qx * qy), 1 - 2 * (qy * qy + qz * qz));
            }

            return eulers.set(x, y, z).scale(pc.math.RAD_TO_DEG);
        },

        /**
         * @function
         * @name pc.Quat#toString
         * @description Converts the quaternion to string form.
         * @returns {String} The quaternion in string form.
         * @example
         * var v = new pc.Quat(0, 0, 0, 1);
         * // Should output '[0, 0, 0, 1]'
         * console.log(v.toString());
         * @author Will Eastcott
         */
        toString: function () {
            return "[" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + "]";
        }
    };

    /**
     * @field
     * @static
     * @readonly
     * @type pc.Quat
     * @name pc.Quat.IDENTITY
     * @description A constant quaternion set to [0, 0, 0, 1] (the identity).
     */
    Object.defineProperty(Quat, 'IDENTITY', {
        get: function () {
            var identity = new Quat();
            return function() {
                return identity;
            }
        }()
    });

    /**
     * @field
     * @static
     * @readonly
     * @type pc.Quat
     * @name pc.Quat.ZERO
     * @description A constant quaternion set to [0, 0, 0, 0].
     */
    Object.defineProperty(Quat, 'ZERO', {
        get: function () {
            var zero = new Quat(0, 0, 0, 0);
            return function() {
                return zero;
            }
        }()
    });

    return {
        Quat: Quat
    };
}());