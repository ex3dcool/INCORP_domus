/*
 Highcharts JS v8.2.0 (2020-08-20)

 3D features for Highcharts JS

 License: www.highcharts.com/license
*/
(function (a) {
    "object" === typeof module && module.exports
        ? ((a["default"] = a), (module.exports = a))
        : "function" === typeof define && define.amd
            ? define("highcharts/highcharts-3d", ["highcharts"], function (B) {
                a(B);
                a.Highcharts = B;
                return a;
            })
            : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
    function B(a, l, u, d) {
        a.hasOwnProperty(l) || (a[l] = d.apply(null, u));
    }
    a = a ? a._modules : {};
    B(
        a,
        "Extensions/Math3D.js",
        [a["Core/Globals.js"], a["Core/Utilities.js"]],
        function (a, l) {
            var u = l.pick,
                d = a.deg2rad,
                m = (a.perspective3D = function (d, k, h) {
                    k = 0 < h && h < Number.POSITIVE_INFINITY ? h / (d.z + k.z + h) : 1;
                    return { x: d.x * k, y: d.y * k };
                }),
                w = (a.perspective = function (k, a, h, r) {
                    var b = a.options.chart.options3d,
                        p = u(r, h ? a.inverted : !1),
                        n = {
                            x: a.plotWidth / 2,
                            y: a.plotHeight / 2,
                            z: b.depth / 2,
                            vd: u(b.depth, 1) * u(b.viewDistance, 0),
                        },
                        q = a.scale3d || 1;
                    r = d * b.beta * (p ? -1 : 1);
                    b = d * b.alpha * (p ? -1 : 1);
                    var c = Math.cos(b),
                        A = Math.cos(-r),
                        v = Math.sin(b),
                        e = Math.sin(-r);
                    h || ((n.x += a.plotLeft), (n.y += a.plotTop));
                    return k.map(function (b) {
                        var d = (p ? b.y : b.x) - n.x;
                        var h = (p ? b.x : b.y) - n.y;
                        b = (b.z || 0) - n.z;
                        d = {
                            x: A * d - e * b,
                            y: -v * e * d + c * h - A * v * b,
                            z: c * e * d + v * h + c * A * b,
                        };
                        h = m(d, n, n.vd);
                        h.x = h.x * q + n.x;
                        h.y = h.y * q + n.y;
                        h.z = d.z * q + n.z;
                        return { x: p ? h.y : h.x, y: p ? h.x : h.y, z: h.z };
                    });
                });
            l = a.pointCameraDistance = function (d, k) {
                var h = k.options.chart.options3d,
                    a = k.plotWidth / 2;
                k = k.plotHeight / 2;
                h = u(h.depth, 1) * u(h.viewDistance, 0) + h.depth;
                return Math.sqrt(
                    Math.pow(a - u(d.plotX, d.x), 2) +
                    Math.pow(k - u(d.plotY, d.y), 2) +
                    Math.pow(h - u(d.plotZ, d.z), 2)
                );
            };
            var k = (a.shapeArea = function (d) {
                var k = 0,
                    h;
                for (h = 0; h < d.length; h++) {
                    var a = (h + 1) % d.length;
                    k += d[h].x * d[a].y - d[a].x * d[h].y;
                }
                return k / 2;
            });
            a = a.shapeArea3d = function (d, a, h) {
                return k(w(d, a, h));
            };
            return {
                perspective: w,
                perspective3D: m,
                pointCameraDistance: l,
                shapeArea: k,
                shapeArea3D: a,
            };
        }
    );
    B(
        a,
        "Core/Renderer/SVG/SVGRenderer3D.js",
        [
            a["Core/Color.js"],
            a["Core/Globals.js"],
            a["Extensions/Math3D.js"],
            a["Core/Renderer/SVG/SVGElement.js"],
            a["Core/Renderer/SVG/SVGRenderer.js"],
            a["Core/Utilities.js"],
        ],
        function (a, l, u, d, m, w) {
            function k(c, e, f, d, b, x, D, E) {
                var g = [],
                    t = x - b;
                return x > b && x - b > Math.PI / 2 + 0.0001
                    ? ((g = g.concat(k(c, e, f, d, b, b + Math.PI / 2, D, E))),
                        (g = g.concat(k(c, e, f, d, b + Math.PI / 2, x, D, E))))
                    : x < b && b - x > Math.PI / 2 + 0.0001
                        ? ((g = g.concat(k(c, e, f, d, b, b - Math.PI / 2, D, E))),
                            (g = g.concat(k(c, e, f, d, b - Math.PI / 2, x, D, E))))
                        : [
                            [
                                "C",
                                c + f * Math.cos(b) - f * F * t * Math.sin(b) + D,
                                e + d * Math.sin(b) + d * F * t * Math.cos(b) + E,
                                c + f * Math.cos(x) + f * F * t * Math.sin(x) + D,
                                e + d * Math.sin(x) - d * F * t * Math.cos(x) + E,
                                c + f * Math.cos(x) + D,
                                e + d * Math.sin(x) + E,
                            ],
                        ];
            }
            var G = a.parse,
                p = u.perspective,
                h = u.shapeArea,
                r = w.animObject,
                b = w.defined,
                L = w.extend,
                n = w.merge,
                q = w.objectEach,
                c = w.pick,
                A = Math.cos,
                v = Math.PI,
                e = Math.sin,
                C = l.charts,
                M = l.deg2rad;
            var F = (4 * (Math.sqrt(2) - 1)) / 3 / (v / 2);
            m.prototype.toLinePath = function (c, d) {
                var f = [];
                c.forEach(function (c) {
                    f.push(["L", c.x, c.y]);
                });
                c.length && ((f[0][0] = "M"), d && f.push(["Z"]));
                return f;
            };
            m.prototype.toLineSegments = function (c) {
                var g = [],
                    f = !0;
                c.forEach(function (c) {
                    g.push(f ? ["M", c.x, c.y] : ["L", c.x, c.y]);
                    f = !f;
                });
                return g;
            };
            m.prototype.face3d = function (g) {
                var e = this,
                    f = this.createElement("path");
                f.vertexes = [];
                f.insidePlotArea = !1;
                f.enabled = !0;
                f.attr = function (f) {
                    if (
                        "object" === typeof f &&
                        (b(f.enabled) || b(f.vertexes) || b(f.insidePlotArea))
                    ) {
                        this.enabled = c(f.enabled, this.enabled);
                        this.vertexes = c(f.vertexes, this.vertexes);
                        this.insidePlotArea = c(f.insidePlotArea, this.insidePlotArea);
                        delete f.enabled;
                        delete f.vertexes;
                        delete f.insidePlotArea;
                        var g = p(this.vertexes, C[e.chartIndex], this.insidePlotArea),
                            x = e.toLinePath(g, !0);
                        g = h(g);
                        g = this.enabled && 0 < g ? "visible" : "hidden";
                        f.d = x;
                        f.visibility = g;
                    }
                    return d.prototype.attr.apply(this, arguments);
                };
                f.animate = function (f) {
                    if (
                        "object" === typeof f &&
                        (b(f.enabled) || b(f.vertexes) || b(f.insidePlotArea))
                    ) {
                        this.enabled = c(f.enabled, this.enabled);
                        this.vertexes = c(f.vertexes, this.vertexes);
                        this.insidePlotArea = c(f.insidePlotArea, this.insidePlotArea);
                        delete f.enabled;
                        delete f.vertexes;
                        delete f.insidePlotArea;
                        var g = p(this.vertexes, C[e.chartIndex], this.insidePlotArea),
                            x = e.toLinePath(g, !0);
                        g = h(g);
                        g = this.enabled && 0 < g ? "visible" : "hidden";
                        f.d = x;
                        this.attr("visibility", g);
                    }
                    return d.prototype.animate.apply(this, arguments);
                };
                return f.attr(g);
            };
            m.prototype.polyhedron = function (c) {
                var g = this,
                    f = this.g(),
                    e = f.destroy;
                this.styledMode || f.attr({ "stroke-linejoin": "round" });
                f.faces = [];
                f.destroy = function () {
                    for (var c = 0; c < f.faces.length; c++) f.faces[c].destroy();
                    return e.call(this);
                };
                f.attr = function (c, e, D, E) {
                    if ("object" === typeof c && b(c.faces)) {
                        for (; f.faces.length > c.faces.length;) f.faces.pop().destroy();
                        for (; f.faces.length < c.faces.length;)
                            f.faces.push(g.face3d().add(f));
                        for (var x = 0; x < c.faces.length; x++)
                            g.styledMode && delete c.faces[x].fill,
                                f.faces[x].attr(c.faces[x], null, D, E);
                        delete c.faces;
                    }
                    return d.prototype.attr.apply(this, arguments);
                };
                f.animate = function (c, e, b) {
                    if (c && c.faces) {
                        for (; f.faces.length > c.faces.length;) f.faces.pop().destroy();
                        for (; f.faces.length < c.faces.length;)
                            f.faces.push(g.face3d().add(f));
                        for (var x = 0; x < c.faces.length; x++)
                            f.faces[x].animate(c.faces[x], e, b);
                        delete c.faces;
                    }
                    return d.prototype.animate.apply(this, arguments);
                };
                return f.attr(c);
            };
            a = {
                initArgs: function (c) {
                    var g = this,
                        f = g.renderer,
                        e = f[g.pathType + "Path"](c),
                        d = e.zIndexes;
                    g.parts.forEach(function (c) {
                        g[c] = f
                            .path(e[c])
                            .attr({ class: "highcharts-3d-" + c, zIndex: d[c] || 0 })
                            .add(g);
                    });
                    g.attr({ "stroke-linejoin": "round", zIndex: d.group });
                    g.originalDestroy = g.destroy;
                    g.destroy = g.destroyParts;
                    g.forcedSides = e.forcedSides;
                },
                singleSetterForParts: function (c, e, f, d, b, x) {
                    var g = {};
                    d = [null, null, d || "attr", b, x];
                    var E = f && f.zIndexes;
                    f
                        ? (E && E.group && this.attr({ zIndex: E.group }),
                            q(f, function (e, t) {
                                g[t] = {};
                                g[t][c] = e;
                                E && (g[t].zIndex = f.zIndexes[t] || 0);
                            }),
                            (d[1] = g))
                        : ((g[c] = e), (d[0] = g));
                    return this.processParts.apply(this, d);
                },
                processParts: function (g, e, f, d, b) {
                    var x = this;
                    x.parts.forEach(function (D) {
                        e && (g = c(e[D], !1));
                        if (!1 !== g) x[D][f](g, d, b);
                    });
                    return x;
                },
                destroyParts: function () {
                    this.processParts(null, null, "destroy");
                    return this.originalDestroy();
                },
            };
            var N = n(a, {
                parts: ["front", "top", "side"],
                pathType: "cuboid",
                attr: function (c, e, f, h) {
                    if ("string" === typeof c && "undefined" !== typeof e) {
                        var g = c;
                        c = {};
                        c[g] = e;
                    }
                    return c.shapeArgs || b(c.x)
                        ? this.singleSetterForParts(
                            "d",
                            null,
                            this.renderer[this.pathType + "Path"](c.shapeArgs || c)
                        )
                        : d.prototype.attr.call(this, c, void 0, f, h);
                },
                animate: function (c, e, f) {
                    if (b(c.x) && b(c.y)) {
                        c = this.renderer[this.pathType + "Path"](c);
                        var g = c.forcedSides;
                        this.singleSetterForParts("d", null, c, "animate", e, f);
                        this.attr({ zIndex: c.zIndexes.group });
                        g !== this.forcedSides &&
                            ((this.forcedSides = g), N.fillSetter.call(this, this.fill));
                    } else d.prototype.animate.call(this, c, e, f);
                    return this;
                },
                fillSetter: function (c) {
                    this.forcedSides = this.forcedSides || [];
                    this.singleSetterForParts("fill", null, {
                        front: c,
                        top: G(c)
                            .brighten(0 <= this.forcedSides.indexOf("top") ? 0 : 0.1)
                            .get(),
                        side: G(c)
                            .brighten(0 <= this.forcedSides.indexOf("side") ? 0 : -0.1)
                            .get(),
                    });
                    this.color = this.fill = c;
                    return this;
                },
            });
            m.prototype.elements3d = { base: a, cuboid: N };
            m.prototype.element3d = function (c, e) {
                var f = this.g();
                L(f, this.elements3d[c]);
                f.initArgs(e);
                return f;
            };
            m.prototype.cuboid = function (c) {
                return this.element3d("cuboid", c);
            };
            m.prototype.cuboidPath = function (c) {
                function e(c) {
                    return 0 === D && 1 < c && 6 > c
                        ? { x: a[c].x, y: a[c].y + 10, z: a[c].z }
                        : a[0].x === a[7].x && 4 <= c
                            ? { x: a[c].x + 10, y: a[c].y, z: a[c].z }
                            : (0 === v && 2 > c) || 5 < c
                                ? { x: a[c].x, y: a[c].y, z: a[c].z + 10 }
                                : a[c];
                }
                function f(c) {
                    return a[c];
                }
                var g = c.x,
                    d = c.y,
                    b = c.z || 0,
                    D = c.height,
                    E = c.width,
                    v = c.depth,
                    t = C[this.chartIndex],
                    y = t.options.chart.options3d.alpha,
                    A = 0,
                    a = [
                        { x: g, y: d, z: b },
                        { x: g + E, y: d, z: b },
                        { x: g + E, y: d + D, z: b },
                        { x: g, y: d + D, z: b },
                        { x: g, y: d + D, z: b + v },
                        { x: g + E, y: d + D, z: b + v },
                        { x: g + E, y: d, z: b + v },
                        { x: g, y: d, z: b + v },
                    ],
                    q = [];
                a = p(a, t, c.insidePlotArea);
                var z = function (c, t, g) {
                    var d = [[], -1],
                        b = c.map(f),
                        y = t.map(f);
                    c = c.map(e);
                    t = t.map(e);
                    0 > h(b)
                        ? (d = [b, 0])
                        : 0 > h(y)
                            ? (d = [y, 1])
                            : g &&
                            (q.push(g), (d = 0 > h(c) ? [b, 0] : 0 > h(t) ? [y, 1] : [b, 0]));
                    return d;
                };
                var k = z([3, 2, 1, 0], [7, 6, 5, 4], "front");
                c = k[0];
                var n = k[1];
                k = z([1, 6, 7, 0], [4, 5, 2, 3], "top");
                E = k[0];
                var r = k[1];
                k = z([1, 2, 5, 6], [0, 7, 4, 3], "side");
                z = k[0];
                k = k[1];
                1 === k ? (A += 1e6 * (t.plotWidth - g)) : k || (A += 1e6 * g);
                A +=
                    10 *
                    (!r || (0 <= y && 180 >= y) || (360 > y && 357.5 < y)
                        ? t.plotHeight - d
                        : 10 + d);
                1 === n ? (A += 100 * b) : n || (A += 100 * (1e3 - b));
                return {
                    front: this.toLinePath(c, !0),
                    top: this.toLinePath(E, !0),
                    side: this.toLinePath(z, !0),
                    zIndexes: { group: Math.round(A) },
                    forcedSides: q,
                    isFront: n,
                    isTop: r,
                };
            };
            m.prototype.arc3d = function (e) {
                function b(c) {
                    var f = !1,
                        e = {},
                        d;
                    c = n(c);
                    for (d in c)
                        -1 !== a.indexOf(d) && ((e[d] = c[d]), delete c[d], (f = !0));
                    return f ? [e, c] : !1;
                }
                var f = this.g(),
                    g = f.renderer,
                    a = "x y r innerR start end depth".split(" ");
                e = n(e);
                e.alpha = (e.alpha || 0) * M;
                e.beta = (e.beta || 0) * M;
                f.top = g.path();
                f.side1 = g.path();
                f.side2 = g.path();
                f.inn = g.path();
                f.out = g.path();
                f.onAdd = function () {
                    var c = f.parentGroup,
                        e = f.attr("class");
                    f.top.add(f);
                    ["out", "inn", "side1", "side2"].forEach(function (d) {
                        f[d].attr({ class: e + " highcharts-3d-side" }).add(c);
                    });
                };
                ["addClass", "removeClass"].forEach(function (c) {
                    f[c] = function () {
                        var e = arguments;
                        ["top", "out", "inn", "side1", "side2"].forEach(function (d) {
                            f[d][c].apply(f[d], e);
                        });
                    };
                });
                f.setPaths = function (c) {
                    var e = f.renderer.arc3dPath(c),
                        d = 100 * e.zTop;
                    f.attribs = c;
                    f.top.attr({ d: e.top, zIndex: e.zTop });
                    f.inn.attr({ d: e.inn, zIndex: e.zInn });
                    f.out.attr({ d: e.out, zIndex: e.zOut });
                    f.side1.attr({ d: e.side1, zIndex: e.zSide1 });
                    f.side2.attr({ d: e.side2, zIndex: e.zSide2 });
                    f.zIndex = d;
                    f.attr({ zIndex: d });
                    c.center && (f.top.setRadialReference(c.center), delete c.center);
                };
                f.setPaths(e);
                f.fillSetter = function (c) {
                    var e = G(c).brighten(-0.1).get();
                    this.fill = c;
                    this.side1.attr({ fill: e });
                    this.side2.attr({ fill: e });
                    this.inn.attr({ fill: e });
                    this.out.attr({ fill: e });
                    this.top.attr({ fill: c });
                    return this;
                };
                ["opacity", "translateX", "translateY", "visibility"].forEach(function (
                    c
                ) {
                    f[c + "Setter"] = function (c, e) {
                        f[e] = c;
                        ["out", "inn", "side1", "side2", "top"].forEach(function (d) {
                            f[d].attr(e, c);
                        });
                    };
                });
                f.attr = function (c) {
                    var e;
                    if ("object" === typeof c && (e = b(c))) {
                        var g = e[0];
                        arguments[0] = e[1];
                        L(f.attribs, g);
                        f.setPaths(f.attribs);
                    }
                    return d.prototype.attr.apply(f, arguments);
                };
                f.animate = function (e, g, a) {
                    var v = this.attribs,
                        t = "data-" + Math.random().toString(26).substring(2, 9);
                    delete e.center;
                    delete e.z;
                    delete e.alpha;
                    delete e.beta;
                    var y = r(c(g, this.renderer.globalAnimation));
                    if (y.duration) {
                        g = b(e);
                        f[t] = 0;
                        e[t] = 1;
                        f[t + "Setter"] = l.noop;
                        if (g) {
                            var k = g[0];
                            y.step = function (e, f) {
                                function d(e) {
                                    return v[e] + (c(k[e], v[e]) - v[e]) * f.pos;
                                }
                                f.prop === t &&
                                    f.elem.setPaths(
                                        n(v, {
                                            x: d("x"),
                                            y: d("y"),
                                            r: d("r"),
                                            innerR: d("innerR"),
                                            start: d("start"),
                                            end: d("end"),
                                            depth: d("depth"),
                                        })
                                    );
                            };
                        }
                        g = y;
                    }
                    return d.prototype.animate.call(this, e, g, a);
                };
                f.destroy = function () {
                    this.top.destroy();
                    this.out.destroy();
                    this.inn.destroy();
                    this.side1.destroy();
                    this.side2.destroy();
                    return d.prototype.destroy.call(this);
                };
                f.hide = function () {
                    this.top.hide();
                    this.out.hide();
                    this.inn.hide();
                    this.side1.hide();
                    this.side2.hide();
                };
                f.show = function (c) {
                    this.top.show(c);
                    this.out.show(c);
                    this.inn.show(c);
                    this.side1.show(c);
                    this.side2.show(c);
                };
                return f;
            };
            m.prototype.arc3dPath = function (c) {
                function d(c) {
                    c %= 2 * Math.PI;
                    c > Math.PI && (c = 2 * Math.PI - c);
                    return c;
                }
                var f = c.x,
                    b = c.y,
                    g = c.start,
                    a = c.end - 0.00001,
                    h = c.r,
                    q = c.innerR || 0,
                    n = c.depth || 0,
                    t = c.alpha,
                    y = c.beta,
                    J = Math.cos(g),
                    K = Math.sin(g);
                c = Math.cos(a);
                var I = Math.sin(a),
                    z = h * Math.cos(y);
                h *= Math.cos(t);
                var H = q * Math.cos(y),
                    C = q * Math.cos(t);
                q = n * Math.sin(y);
                var r = n * Math.sin(t);
                n = [["M", f + z * J, b + h * K]];
                n = n.concat(k(f, b, z, h, g, a, 0, 0));
                n.push(["L", f + H * c, b + C * I]);
                n = n.concat(k(f, b, H, C, a, g, 0, 0));
                n.push(["Z"]);
                var m = 0 < y ? Math.PI / 2 : 0;
                y = 0 < t ? 0 : Math.PI / 2;
                m = g > -m ? g : a > -m ? -m : g;
                var p = a < v - y ? a : g < v - y ? v - y : a,
                    F = 2 * v - y;
                t = [["M", f + z * A(m), b + h * e(m)]];
                t = t.concat(k(f, b, z, h, m, p, 0, 0));
                a > F && g < F
                    ? (t.push(["L", f + z * A(p) + q, b + h * e(p) + r]),
                        (t = t.concat(k(f, b, z, h, p, F, q, r))),
                        t.push(["L", f + z * A(F), b + h * e(F)]),
                        (t = t.concat(k(f, b, z, h, F, a, 0, 0))),
                        t.push(["L", f + z * A(a) + q, b + h * e(a) + r]),
                        (t = t.concat(k(f, b, z, h, a, F, q, r))),
                        t.push(["L", f + z * A(F), b + h * e(F)]),
                        (t = t.concat(k(f, b, z, h, F, p, 0, 0))))
                    : a > v - y &&
                    g < v - y &&
                    (t.push(["L", f + z * Math.cos(p) + q, b + h * Math.sin(p) + r]),
                        (t = t.concat(k(f, b, z, h, p, a, q, r))),
                        t.push(["L", f + z * Math.cos(a), b + h * Math.sin(a)]),
                        (t = t.concat(k(f, b, z, h, a, p, 0, 0))));
                t.push(["L", f + z * Math.cos(p) + q, b + h * Math.sin(p) + r]);
                t = t.concat(k(f, b, z, h, p, m, q, r));
                t.push(["Z"]);
                y = [["M", f + H * J, b + C * K]];
                y = y.concat(k(f, b, H, C, g, a, 0, 0));
                y.push(["L", f + H * Math.cos(a) + q, b + C * Math.sin(a) + r]);
                y = y.concat(k(f, b, H, C, a, g, q, r));
                y.push(["Z"]);
                J = [
                    ["M", f + z * J, b + h * K],
                    ["L", f + z * J + q, b + h * K + r],
                    ["L", f + H * J + q, b + C * K + r],
                    ["L", f + H * J, b + C * K],
                    ["Z"],
                ];
                f = [
                    ["M", f + z * c, b + h * I],
                    ["L", f + z * c + q, b + h * I + r],
                    ["L", f + H * c + q, b + C * I + r],
                    ["L", f + H * c, b + C * I],
                    ["Z"],
                ];
                I = Math.atan2(r, -q);
                b = Math.abs(a + I);
                c = Math.abs(g + I);
                g = Math.abs((g + a) / 2 + I);
                b = d(b);
                c = d(c);
                g = d(g);
                g *= 1e5;
                a = 1e5 * c;
                b *= 1e5;
                return {
                    top: n,
                    zTop: 1e5 * Math.PI + 1,
                    out: t,
                    zOut: Math.max(g, a, b),
                    inn: y,
                    zInn: Math.max(g, a, b),
                    side1: J,
                    zSide1: 0.99 * b,
                    side2: f,
                    zSide2: 0.99 * a,
                };
            };
        }
    );
    B(a, "Core/Axis/Tick3D.js", [a["Core/Utilities.js"]], function (a) {
        var l = a.addEvent,
            u = a.extend,
            d = a.wrap;
        return (function () {
            function a() { }
            a.compose = function (m) {
                l(m, "afterGetLabelPosition", a.onAfterGetLabelPosition);
                d(m.prototype, "getMarkPath", a.wrapGetMarkPath);
            };
            a.onAfterGetLabelPosition = function (d) {
                var a = this.axis.axis3D;
                a && u(d.pos, a.fix3dPosition(d.pos));
            };
            a.wrapGetMarkPath = function (d) {
                var a = this.axis.axis3D,
                    m = d.apply(this, [].slice.call(arguments, 1));
                if (a) {
                    var p = m[0],
                        h = m[1];
                    if ("M" === p[0] && "L" === h[0])
                        return (
                            (a = [
                                a.fix3dPosition({ x: p[1], y: p[2], z: 0 }),
                                a.fix3dPosition({ x: h[1], y: h[2], z: 0 }),
                            ]),
                            this.axis.chart.renderer.toLineSegments(a)
                        );
                }
                return m;
            };
            return a;
        })();
    });
    B(
        a,
        "Core/Axis/Axis3D.js",
        [
            a["Core/Globals.js"],
            a["Extensions/Math3D.js"],
            a["Core/Axis/Tick.js"],
            a["Core/Axis/Tick3D.js"],
            a["Core/Utilities.js"],
        ],
        function (a, l, u, d, m) {
            var w = l.perspective,
                k = l.perspective3D,
                G = l.shapeArea,
                p = m.addEvent,
                h = m.merge,
                r = m.pick,
                b = m.wrap,
                L = a.deg2rad,
                n = (function () {
                    function b(c) {
                        this.axis = c;
                    }
                    b.prototype.fix3dPosition = function (c, b) {
                        var d = this.axis,
                            e = d.chart;
                        if ("colorAxis" === d.coll || !e.chart3d || !e.is3d()) return c;
                        var a = L * e.options.chart.options3d.alpha,
                            h = L * e.options.chart.options3d.beta,
                            q = r(
                                b && d.options.title.position3d,
                                d.options.labels.position3d
                            );
                        b = r(b && d.options.title.skew3d, d.options.labels.skew3d);
                        var k = e.chart3d.frame3d,
                            g = e.plotLeft,
                            A = e.plotWidth + g,
                            f = e.plotTop,
                            n = e.plotHeight + f;
                        e = !1;
                        var p = 0,
                            m = 0,
                            l = { x: 0, y: 1, z: 0 };
                        c = d.axis3D.swapZ({ x: c.x, y: c.y, z: 0 });
                        if (d.isZAxis)
                            if (d.opposite) {
                                if (null === k.axes.z.top) return {};
                                m = c.y - f;
                                c.x = k.axes.z.top.x;
                                c.y = k.axes.z.top.y;
                                g = k.axes.z.top.xDir;
                                e = !k.top.frontFacing;
                            } else {
                                if (null === k.axes.z.bottom) return {};
                                m = c.y - n;
                                c.x = k.axes.z.bottom.x;
                                c.y = k.axes.z.bottom.y;
                                g = k.axes.z.bottom.xDir;
                                e = !k.bottom.frontFacing;
                            }
                        else if (d.horiz)
                            if (d.opposite) {
                                if (null === k.axes.x.top) return {};
                                m = c.y - f;
                                c.y = k.axes.x.top.y;
                                c.z = k.axes.x.top.z;
                                g = k.axes.x.top.xDir;
                                e = !k.top.frontFacing;
                            } else {
                                if (null === k.axes.x.bottom) return {};
                                m = c.y - n;
                                c.y = k.axes.x.bottom.y;
                                c.z = k.axes.x.bottom.z;
                                g = k.axes.x.bottom.xDir;
                                e = !k.bottom.frontFacing;
                            }
                        else if (d.opposite) {
                            if (null === k.axes.y.right) return {};
                            p = c.x - A;
                            c.x = k.axes.y.right.x;
                            c.z = k.axes.y.right.z;
                            g = k.axes.y.right.xDir;
                            g = { x: g.z, y: g.y, z: -g.x };
                        } else {
                            if (null === k.axes.y.left) return {};
                            p = c.x - g;
                            c.x = k.axes.y.left.x;
                            c.z = k.axes.y.left.z;
                            g = k.axes.y.left.xDir;
                        }
                        "chart" !== q &&
                            ("flap" === q
                                ? d.horiz
                                    ? ((h = Math.sin(a)),
                                        (a = Math.cos(a)),
                                        d.opposite && (h = -h),
                                        e && (h = -h),
                                        (l = { x: g.z * h, y: a, z: -g.x * h }))
                                    : (g = { x: Math.cos(h), y: 0, z: Math.sin(h) })
                                : "ortho" === q
                                    ? d.horiz
                                        ? ((l = Math.cos(a)),
                                            (q = Math.sin(h) * l),
                                            (a = -Math.sin(a)),
                                            (h = -l * Math.cos(h)),
                                            (l = {
                                                x: g.y * h - g.z * a,
                                                y: g.z * q - g.x * h,
                                                z: g.x * a - g.y * q,
                                            }),
                                            (a = 1 / Math.sqrt(l.x * l.x + l.y * l.y + l.z * l.z)),
                                            e && (a = -a),
                                            (l = { x: a * l.x, y: a * l.y, z: a * l.z }))
                                        : (g = { x: Math.cos(h), y: 0, z: Math.sin(h) })
                                    : d.horiz
                                        ? (l = {
                                            x: Math.sin(h) * Math.sin(a),
                                            y: Math.cos(a),
                                            z: -Math.cos(h) * Math.sin(a),
                                        })
                                        : (g = { x: Math.cos(h), y: 0, z: Math.sin(h) }));
                        c.x += p * g.x + m * l.x;
                        c.y += p * g.y + m * l.y;
                        c.z += p * g.z + m * l.z;
                        e = w([c], d.chart)[0];
                        b &&
                            (0 >
                                G(
                                    w(
                                        [
                                            c,
                                            { x: c.x + g.x, y: c.y + g.y, z: c.z + g.z },
                                            { x: c.x + l.x, y: c.y + l.y, z: c.z + l.z },
                                        ],
                                        d.chart
                                    )
                                ) && (g = { x: -g.x, y: -g.y, z: -g.z }),
                                (c = w(
                                    [
                                        { x: c.x, y: c.y, z: c.z },
                                        { x: c.x + g.x, y: c.y + g.y, z: c.z + g.z },
                                        { x: c.x + l.x, y: c.y + l.y, z: c.z + l.z },
                                    ],
                                    d.chart
                                )),
                                (e.matrix = [
                                    c[1].x - c[0].x,
                                    c[1].y - c[0].y,
                                    c[2].x - c[0].x,
                                    c[2].y - c[0].y,
                                    e.x,
                                    e.y,
                                ]),
                                (e.matrix[4] -= e.x * e.matrix[0] + e.y * e.matrix[2]),
                                (e.matrix[5] -= e.x * e.matrix[1] + e.y * e.matrix[3]));
                        return e;
                    };
                    b.prototype.swapZ = function (c, d) {
                        var b = this.axis;
                        return b.isZAxis
                            ? ((d = d ? 0 : b.chart.plotLeft),
                                { x: d + c.z, y: c.y, z: c.x - d })
                            : c;
                    };
                    return b;
                })();
            return (function () {
                function a() { }
                a.compose = function (c) {
                    h(!0, c.defaultOptions, a.defaultOptions);
                    c.keepProps.push("axis3D");
                    p(c, "init", a.onInit);
                    p(c, "afterSetOptions", a.onAfterSetOptions);
                    p(c, "drawCrosshair", a.onDrawCrosshair);
                    p(c, "destroy", a.onDestroy);
                    c = c.prototype;
                    b(c, "getLinePath", a.wrapGetLinePath);
                    b(c, "getPlotBandPath", a.wrapGetPlotBandPath);
                    b(c, "getPlotLinePath", a.wrapGetPlotLinePath);
                    b(c, "getSlotWidth", a.wrapGetSlotWidth);
                    b(c, "getTitlePosition", a.wrapGetTitlePosition);
                    d.compose(u);
                };
                a.onAfterSetOptions = function () {
                    var c = this.chart,
                        d = this.options;
                    c.is3d &&
                        c.is3d() &&
                        "colorAxis" !== this.coll &&
                        ((d.tickWidth = r(d.tickWidth, 0)),
                            (d.gridLineWidth = r(d.gridLineWidth, 1)));
                };
                a.onDestroy = function () {
                    ["backFrame", "bottomFrame", "sideFrame"].forEach(function (c) {
                        this[c] && (this[c] = this[c].destroy());
                    }, this);
                };
                a.onDrawCrosshair = function (c) {
                    this.chart.is3d() &&
                        "colorAxis" !== this.coll &&
                        c.point &&
                        (c.point.crosshairPos = this.isXAxis
                            ? c.point.axisXpos
                            : this.len - c.point.axisYpos);
                };
                a.onInit = function () {
                    this.axis3D || (this.axis3D = new n(this));
                };
                a.wrapGetLinePath = function (c) {
                    return this.chart.is3d() && "colorAxis" !== this.coll
                        ? []
                        : c.apply(this, [].slice.call(arguments, 1));
                };
                a.wrapGetPlotBandPath = function (c) {
                    if (!this.chart.is3d() || "colorAxis" === this.coll)
                        return c.apply(this, [].slice.call(arguments, 1));
                    var d = arguments,
                        a = d[2],
                        e = [];
                    d = this.getPlotLinePath({ value: d[1] });
                    a = this.getPlotLinePath({ value: a });
                    if (d && a)
                        for (var b = 0; b < d.length; b += 2) {
                            var h = d[b],
                                k = d[b + 1],
                                n = a[b],
                                g = a[b + 1];
                            "M" === h[0] &&
                                "L" === k[0] &&
                                "M" === n[0] &&
                                "L" === g[0] &&
                                e.push(h, k, g, ["L", n[1], n[2]], ["Z"]);
                        }
                    return e;
                };
                a.wrapGetPlotLinePath = function (c) {
                    var d = this.axis3D,
                        a = this.chart,
                        e = c.apply(this, [].slice.call(arguments, 1));
                    if (
                        "colorAxis" === this.coll ||
                        !a.chart3d ||
                        !a.is3d() ||
                        null === e
                    )
                        return e;
                    var b = a.options.chart.options3d,
                        h = this.isZAxis ? a.plotWidth : b.depth;
                    b = a.chart3d.frame3d;
                    var k = e[0],
                        n = e[1];
                    e = [];
                    "M" === k[0] &&
                        "L" === n[0] &&
                        ((d = [
                            d.swapZ({ x: k[1], y: k[2], z: 0 }),
                            d.swapZ({ x: k[1], y: k[2], z: h }),
                            d.swapZ({ x: n[1], y: n[2], z: 0 }),
                            d.swapZ({ x: n[1], y: n[2], z: h }),
                        ]),
                            this.horiz
                                ? (this.isZAxis
                                    ? (b.left.visible && e.push(d[0], d[2]),
                                        b.right.visible && e.push(d[1], d[3]))
                                    : (b.front.visible && e.push(d[0], d[2]),
                                        b.back.visible && e.push(d[1], d[3])),
                                    b.top.visible && e.push(d[0], d[1]),
                                    b.bottom.visible && e.push(d[2], d[3]))
                                : (b.front.visible && e.push(d[0], d[2]),
                                    b.back.visible && e.push(d[1], d[3]),
                                    b.left.visible && e.push(d[0], d[1]),
                                    b.right.visible && e.push(d[2], d[3])),
                            (e = w(e, this.chart, !1)));
                    return a.renderer.toLineSegments(e);
                };
                a.wrapGetSlotWidth = function (c, d) {
                    var b = this.chart,
                        a = this.ticks,
                        h = this.gridGroup;
                    if (
                        this.categories &&
                        b.frameShapes &&
                        b.is3d() &&
                        h &&
                        d &&
                        d.label
                    ) {
                        h = h.element.childNodes[0].getBBox();
                        var n = b.frameShapes.left.getBBox(),
                            q = b.options.chart.options3d;
                        b = {
                            x: b.plotWidth / 2,
                            y: b.plotHeight / 2,
                            z: q.depth / 2,
                            vd: r(q.depth, 1) * r(q.viewDistance, 0),
                        };
                        var p, g;
                        q = d.pos;
                        var m = a[q - 1];
                        a = a[q + 1];
                        0 !== q &&
                            m &&
                            m.label.xy &&
                            (p = k({ x: m.label.xy.x, y: m.label.xy.y, z: null }, b, b.vd));
                        a &&
                            a.label.xy &&
                            (g = k({ x: a.label.xy.x, y: a.label.xy.y, z: null }, b, b.vd));
                        a = { x: d.label.xy.x, y: d.label.xy.y, z: null };
                        a = k(a, b, b.vd);
                        return Math.abs(p ? a.x - p.x : g ? g.x - a.x : h.x - n.x);
                    }
                    return c.apply(this, [].slice.call(arguments, 1));
                };
                a.wrapGetTitlePosition = function (c) {
                    var d = c.apply(this, [].slice.call(arguments, 1));
                    return this.axis3D ? this.axis3D.fix3dPosition(d, !0) : d;
                };
                a.defaultOptions = {
                    labels: { position3d: "offset", skew3d: !1 },
                    title: { position3d: null, skew3d: null },
                };
                return a;
            })();
        }
    );
    B(
        a,
        "Core/Axis/ZAxis.js",
        [a["Core/Axis/Axis.js"], a["Core/Utilities.js"]],
        function (a, l) {
            var u =
                (this && this.__extends) ||
                (function () {
                    var d = function (a, b) {
                        d =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (d, b) {
                                    d.__proto__ = b;
                                }) ||
                            function (d, b) {
                                for (var a in b) b.hasOwnProperty(a) && (d[a] = b[a]);
                            };
                        return d(a, b);
                    };
                    return function (a, b) {
                        function h() {
                            this.constructor = a;
                        }
                        d(a, b);
                        a.prototype =
                            null === b
                                ? Object.create(b)
                                : ((h.prototype = b.prototype), new h());
                    };
                })(),
                d = l.addEvent,
                m = l.merge,
                w = l.pick,
                k = l.splat,
                G = (function () {
                    function a() { }
                    a.compose = function (h) {
                        d(h, "afterGetAxes", a.onAfterGetAxes);
                        h = h.prototype;
                        h.addZAxis = a.wrapAddZAxis;
                        h.collectionsWithInit.zAxis = [h.addZAxis];
                        h.collectionsWithUpdate.push("zAxis");
                    };
                    a.onAfterGetAxes = function () {
                        var d = this,
                            a = this.options;
                        a = a.zAxis = k(a.zAxis || {});
                        d.is3d() &&
                            ((d.zAxis = []),
                                a.forEach(function (a, b) {
                                    a.index = b;
                                    a.isX = !0;
                                    d.addZAxis(a).setScale();
                                }));
                    };
                    a.wrapAddZAxis = function (d) {
                        return new p(this, d);
                    };
                    return a;
                })(),
                p = (function (d) {
                    function a(a, h) {
                        a = d.call(this, a, h) || this;
                        a.isZAxis = !0;
                        return a;
                    }
                    u(a, d);
                    a.prototype.getSeriesExtremes = function () {
                        var d = this,
                            a = d.chart;
                        d.hasVisibleSeries = !1;
                        d.dataMin =
                            d.dataMax =
                            d.ignoreMinPadding =
                            d.ignoreMaxPadding =
                            void 0;
                        d.stacking && d.stacking.buildStacks();
                        d.series.forEach(function (b) {
                            (!b.visible &&
                                a.options.chart &&
                                a.options.chart.ignoreHiddenSeries) ||
                                ((d.hasVisibleSeries = !0),
                                    (b = b.zData),
                                    b.length &&
                                    ((d.dataMin = Math.min(
                                        w(d.dataMin, b[0]),
                                        Math.min.apply(null, b)
                                    )),
                                        (d.dataMax = Math.max(
                                            w(d.dataMax, b[0]),
                                            Math.max.apply(null, b)
                                        ))));
                        });
                    };
                    a.prototype.setAxisSize = function () {
                        var a = this.chart;
                        d.prototype.setAxisSize.call(this);
                        this.width = this.len =
                            (a.options.chart &&
                                a.options.chart.options3d &&
                                a.options.chart.options3d.depth) ||
                            0;
                        this.right = a.chartWidth - this.width - this.left;
                    };
                    a.prototype.setOptions = function (a) {
                        a = m({ offset: 0, lineWidth: 0 }, a);
                        d.prototype.setOptions.call(this, a);
                        this.coll = "zAxis";
                    };
                    a.ZChartComposition = G;
                    return a;
                })(a);
            return p;
        }
    );
    B(
        a,
        "Core/Chart/Chart3D.js",
        [
            a["Core/Axis/Axis.js"],
            a["Core/Axis/Axis3D.js"],
            a["Core/Chart/Chart.js"],
            a["Core/Globals.js"],
            a["Extensions/Math3D.js"],
            a["Core/Options.js"],
            a["Core/Utilities.js"],
            a["Core/Axis/ZAxis.js"],
        ],
        function (a, l, u, d, m, w, k, G) {
            var p = m.perspective,
                h = m.shapeArea3D,
                r = w.defaultOptions,
                b = k.addEvent;
            m = k.Fx;
            var B = k.isArray,
                n = k.merge,
                q = k.pick,
                c = k.wrap,
                A;
            (function (a) {
                function e(c) {
                    this.is3d() &&
                        "scatter" === c.options.type &&
                        (c.options.type = "scatter3d");
                }
                function k() {
                    if (this.chart3d && this.is3d()) {
                        var c = this.renderer,
                            a = this.options.chart.options3d,
                            b = this.chart3d.get3dFrame(),
                            e = this.plotLeft,
                            f = this.plotLeft + this.plotWidth,
                            g = this.plotTop,
                            h = this.plotTop + this.plotHeight;
                        a = a.depth;
                        var k = e - (b.left.visible ? b.left.size : 0),
                            q = f + (b.right.visible ? b.right.size : 0),
                            n = g - (b.top.visible ? b.top.size : 0),
                            m = h + (b.bottom.visible ? b.bottom.size : 0),
                            p = 0 - (b.front.visible ? b.front.size : 0),
                            l = a + (b.back.visible ? b.back.size : 0),
                            v = this.hasRendered ? "animate" : "attr";
                        this.chart3d.frame3d = b;
                        this.frameShapes ||
                            (this.frameShapes = {
                                bottom: c.polyhedron().add(),
                                top: c.polyhedron().add(),
                                left: c.polyhedron().add(),
                                right: c.polyhedron().add(),
                                back: c.polyhedron().add(),
                                front: c.polyhedron().add(),
                            });
                        this.frameShapes.bottom[v]({
                            class: "highcharts-3d-frame highcharts-3d-frame-bottom",
                            zIndex: b.bottom.frontFacing ? -1e3 : 1e3,
                            faces: [
                                {
                                    fill: d.color(b.bottom.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: k, y: m, z: p },
                                        { x: q, y: m, z: p },
                                        { x: q, y: m, z: l },
                                        { x: k, y: m, z: l },
                                    ],
                                    enabled: b.bottom.visible,
                                },
                                {
                                    fill: d.color(b.bottom.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: e, y: h, z: a },
                                        { x: f, y: h, z: a },
                                        { x: f, y: h, z: 0 },
                                        { x: e, y: h, z: 0 },
                                    ],
                                    enabled: b.bottom.visible,
                                },
                                {
                                    fill: d.color(b.bottom.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: k, y: m, z: p },
                                        { x: k, y: m, z: l },
                                        { x: e, y: h, z: a },
                                        { x: e, y: h, z: 0 },
                                    ],
                                    enabled: b.bottom.visible && !b.left.visible,
                                },
                                {
                                    fill: d.color(b.bottom.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: q, y: m, z: l },
                                        { x: q, y: m, z: p },
                                        { x: f, y: h, z: 0 },
                                        { x: f, y: h, z: a },
                                    ],
                                    enabled: b.bottom.visible && !b.right.visible,
                                },
                                {
                                    fill: d.color(b.bottom.color).get(),
                                    vertexes: [
                                        { x: q, y: m, z: p },
                                        { x: k, y: m, z: p },
                                        { x: e, y: h, z: 0 },
                                        { x: f, y: h, z: 0 },
                                    ],
                                    enabled: b.bottom.visible && !b.front.visible,
                                },
                                {
                                    fill: d.color(b.bottom.color).get(),
                                    vertexes: [
                                        { x: k, y: m, z: l },
                                        { x: q, y: m, z: l },
                                        { x: f, y: h, z: a },
                                        { x: e, y: h, z: a },
                                    ],
                                    enabled: b.bottom.visible && !b.back.visible,
                                },
                            ],
                        });
                        this.frameShapes.top[v]({
                            class: "highcharts-3d-frame highcharts-3d-frame-top",
                            zIndex: b.top.frontFacing ? -1e3 : 1e3,
                            faces: [
                                {
                                    fill: d.color(b.top.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: k, y: n, z: l },
                                        { x: q, y: n, z: l },
                                        { x: q, y: n, z: p },
                                        { x: k, y: n, z: p },
                                    ],
                                    enabled: b.top.visible,
                                },
                                {
                                    fill: d.color(b.top.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: e, y: g, z: 0 },
                                        { x: f, y: g, z: 0 },
                                        { x: f, y: g, z: a },
                                        { x: e, y: g, z: a },
                                    ],
                                    enabled: b.top.visible,
                                },
                                {
                                    fill: d.color(b.top.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: k, y: n, z: l },
                                        { x: k, y: n, z: p },
                                        { x: e, y: g, z: 0 },
                                        { x: e, y: g, z: a },
                                    ],
                                    enabled: b.top.visible && !b.left.visible,
                                },
                                {
                                    fill: d.color(b.top.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: q, y: n, z: p },
                                        { x: q, y: n, z: l },
                                        { x: f, y: g, z: a },
                                        { x: f, y: g, z: 0 },
                                    ],
                                    enabled: b.top.visible && !b.right.visible,
                                },
                                {
                                    fill: d.color(b.top.color).get(),
                                    vertexes: [
                                        { x: k, y: n, z: p },
                                        { x: q, y: n, z: p },
                                        { x: f, y: g, z: 0 },
                                        { x: e, y: g, z: 0 },
                                    ],
                                    enabled: b.top.visible && !b.front.visible,
                                },
                                {
                                    fill: d.color(b.top.color).get(),
                                    vertexes: [
                                        { x: q, y: n, z: l },
                                        { x: k, y: n, z: l },
                                        { x: e, y: g, z: a },
                                        { x: f, y: g, z: a },
                                    ],
                                    enabled: b.top.visible && !b.back.visible,
                                },
                            ],
                        });
                        this.frameShapes.left[v]({
                            class: "highcharts-3d-frame highcharts-3d-frame-left",
                            zIndex: b.left.frontFacing ? -1e3 : 1e3,
                            faces: [
                                {
                                    fill: d.color(b.left.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: k, y: m, z: p },
                                        { x: e, y: h, z: 0 },
                                        { x: e, y: h, z: a },
                                        { x: k, y: m, z: l },
                                    ],
                                    enabled: b.left.visible && !b.bottom.visible,
                                },
                                {
                                    fill: d.color(b.left.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: k, y: n, z: l },
                                        { x: e, y: g, z: a },
                                        { x: e, y: g, z: 0 },
                                        { x: k, y: n, z: p },
                                    ],
                                    enabled: b.left.visible && !b.top.visible,
                                },
                                {
                                    fill: d.color(b.left.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: k, y: m, z: l },
                                        { x: k, y: n, z: l },
                                        { x: k, y: n, z: p },
                                        { x: k, y: m, z: p },
                                    ],
                                    enabled: b.left.visible,
                                },
                                {
                                    fill: d.color(b.left.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: e, y: g, z: a },
                                        { x: e, y: h, z: a },
                                        { x: e, y: h, z: 0 },
                                        { x: e, y: g, z: 0 },
                                    ],
                                    enabled: b.left.visible,
                                },
                                {
                                    fill: d.color(b.left.color).get(),
                                    vertexes: [
                                        { x: k, y: m, z: p },
                                        { x: k, y: n, z: p },
                                        { x: e, y: g, z: 0 },
                                        { x: e, y: h, z: 0 },
                                    ],
                                    enabled: b.left.visible && !b.front.visible,
                                },
                                {
                                    fill: d.color(b.left.color).get(),
                                    vertexes: [
                                        { x: k, y: n, z: l },
                                        { x: k, y: m, z: l },
                                        { x: e, y: h, z: a },
                                        { x: e, y: g, z: a },
                                    ],
                                    enabled: b.left.visible && !b.back.visible,
                                },
                            ],
                        });
                        this.frameShapes.right[v]({
                            class: "highcharts-3d-frame highcharts-3d-frame-right",
                            zIndex: b.right.frontFacing ? -1e3 : 1e3,
                            faces: [
                                {
                                    fill: d.color(b.right.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: q, y: m, z: l },
                                        { x: f, y: h, z: a },
                                        { x: f, y: h, z: 0 },
                                        { x: q, y: m, z: p },
                                    ],
                                    enabled: b.right.visible && !b.bottom.visible,
                                },
                                {
                                    fill: d.color(b.right.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: q, y: n, z: p },
                                        { x: f, y: g, z: 0 },
                                        { x: f, y: g, z: a },
                                        { x: q, y: n, z: l },
                                    ],
                                    enabled: b.right.visible && !b.top.visible,
                                },
                                {
                                    fill: d.color(b.right.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: f, y: g, z: 0 },
                                        { x: f, y: h, z: 0 },
                                        { x: f, y: h, z: a },
                                        { x: f, y: g, z: a },
                                    ],
                                    enabled: b.right.visible,
                                },
                                {
                                    fill: d.color(b.right.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: q, y: m, z: p },
                                        { x: q, y: n, z: p },
                                        { x: q, y: n, z: l },
                                        { x: q, y: m, z: l },
                                    ],
                                    enabled: b.right.visible,
                                },
                                {
                                    fill: d.color(b.right.color).get(),
                                    vertexes: [
                                        { x: q, y: n, z: p },
                                        { x: q, y: m, z: p },
                                        { x: f, y: h, z: 0 },
                                        { x: f, y: g, z: 0 },
                                    ],
                                    enabled: b.right.visible && !b.front.visible,
                                },
                                {
                                    fill: d.color(b.right.color).get(),
                                    vertexes: [
                                        { x: q, y: m, z: l },
                                        { x: q, y: n, z: l },
                                        { x: f, y: g, z: a },
                                        { x: f, y: h, z: a },
                                    ],
                                    enabled: b.right.visible && !b.back.visible,
                                },
                            ],
                        });
                        this.frameShapes.back[v]({
                            class: "highcharts-3d-frame highcharts-3d-frame-back",
                            zIndex: b.back.frontFacing ? -1e3 : 1e3,
                            faces: [
                                {
                                    fill: d.color(b.back.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: q, y: m, z: l },
                                        { x: k, y: m, z: l },
                                        { x: e, y: h, z: a },
                                        { x: f, y: h, z: a },
                                    ],
                                    enabled: b.back.visible && !b.bottom.visible,
                                },
                                {
                                    fill: d.color(b.back.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: k, y: n, z: l },
                                        { x: q, y: n, z: l },
                                        { x: f, y: g, z: a },
                                        { x: e, y: g, z: a },
                                    ],
                                    enabled: b.back.visible && !b.top.visible,
                                },
                                {
                                    fill: d.color(b.back.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: k, y: m, z: l },
                                        { x: k, y: n, z: l },
                                        { x: e, y: g, z: a },
                                        { x: e, y: h, z: a },
                                    ],
                                    enabled: b.back.visible && !b.left.visible,
                                },
                                {
                                    fill: d.color(b.back.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: q, y: n, z: l },
                                        { x: q, y: m, z: l },
                                        { x: f, y: h, z: a },
                                        { x: f, y: g, z: a },
                                    ],
                                    enabled: b.back.visible && !b.right.visible,
                                },
                                {
                                    fill: d.color(b.back.color).get(),
                                    vertexes: [
                                        { x: e, y: g, z: a },
                                        { x: f, y: g, z: a },
                                        { x: f, y: h, z: a },
                                        { x: e, y: h, z: a },
                                    ],
                                    enabled: b.back.visible,
                                },
                                {
                                    fill: d.color(b.back.color).get(),
                                    vertexes: [
                                        { x: k, y: m, z: l },
                                        { x: q, y: m, z: l },
                                        { x: q, y: n, z: l },
                                        { x: k, y: n, z: l },
                                    ],
                                    enabled: b.back.visible,
                                },
                            ],
                        });
                        this.frameShapes.front[v]({
                            class: "highcharts-3d-frame highcharts-3d-frame-front",
                            zIndex: b.front.frontFacing ? -1e3 : 1e3,
                            faces: [
                                {
                                    fill: d.color(b.front.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: k, y: m, z: p },
                                        { x: q, y: m, z: p },
                                        { x: f, y: h, z: 0 },
                                        { x: e, y: h, z: 0 },
                                    ],
                                    enabled: b.front.visible && !b.bottom.visible,
                                },
                                {
                                    fill: d.color(b.front.color).brighten(0.1).get(),
                                    vertexes: [
                                        { x: q, y: n, z: p },
                                        { x: k, y: n, z: p },
                                        { x: e, y: g, z: 0 },
                                        { x: f, y: g, z: 0 },
                                    ],
                                    enabled: b.front.visible && !b.top.visible,
                                },
                                {
                                    fill: d.color(b.front.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: k, y: n, z: p },
                                        { x: k, y: m, z: p },
                                        { x: e, y: h, z: 0 },
                                        { x: e, y: g, z: 0 },
                                    ],
                                    enabled: b.front.visible && !b.left.visible,
                                },
                                {
                                    fill: d.color(b.front.color).brighten(-0.1).get(),
                                    vertexes: [
                                        { x: q, y: m, z: p },
                                        { x: q, y: n, z: p },
                                        { x: f, y: g, z: 0 },
                                        { x: f, y: h, z: 0 },
                                    ],
                                    enabled: b.front.visible && !b.right.visible,
                                },
                                {
                                    fill: d.color(b.front.color).get(),
                                    vertexes: [
                                        { x: f, y: g, z: 0 },
                                        { x: e, y: g, z: 0 },
                                        { x: e, y: h, z: 0 },
                                        { x: f, y: h, z: 0 },
                                    ],
                                    enabled: b.front.visible,
                                },
                                {
                                    fill: d.color(b.front.color).get(),
                                    vertexes: [
                                        { x: q, y: m, z: p },
                                        { x: k, y: m, z: p },
                                        { x: k, y: n, z: p },
                                        { x: q, y: n, z: p },
                                    ],
                                    enabled: b.front.visible,
                                },
                            ],
                        });
                    }
                }
                function m() {
                    this.styledMode &&
                        (this.renderer.definition({
                            tagName: "style",
                            textContent:
                                ".highcharts-3d-top{filter: url(#highcharts-brighter)}\n.highcharts-3d-side{filter: url(#highcharts-darker)}\n",
                        }),
                            [
                                { name: "darker", slope: 0.6 },
                                { name: "brighter", slope: 1.4 },
                            ].forEach(function (c) {
                                this.renderer.definition({
                                    tagName: "filter",
                                    id: "highcharts-" + c.name,
                                    children: [
                                        {
                                            tagName: "feComponentTransfer",
                                            children: [
                                                { tagName: "feFuncR", type: "linear", slope: c.slope },
                                                { tagName: "feFuncG", type: "linear", slope: c.slope },
                                                { tagName: "feFuncB", type: "linear", slope: c.slope },
                                            ],
                                        },
                                    ],
                                });
                            }, this));
                }
                function l() {
                    var c = this.options;
                    this.is3d() &&
                        (c.series || []).forEach(function (b) {
                            "scatter" ===
                                (b.type || c.chart.type || c.chart.defaultSeriesType) &&
                                (b.type = "scatter3d");
                        });
                }
                function v() {
                    var c = this.options.chart.options3d;
                    if (this.chart3d && this.is3d()) {
                        c &&
                            ((c.alpha = (c.alpha % 360) + (0 <= c.alpha ? 0 : 360)),
                                (c.beta = (c.beta % 360) + (0 <= c.beta ? 0 : 360)));
                        var b = this.inverted,
                            a = this.clipBox,
                            d = this.margin;
                        a[b ? "y" : "x"] = -(d[3] || 0);
                        a[b ? "x" : "y"] = -(d[0] || 0);
                        a[b ? "height" : "width"] =
                            this.chartWidth + (d[3] || 0) + (d[1] || 0);
                        a[b ? "width" : "height"] =
                            this.chartHeight + (d[0] || 0) + (d[2] || 0);
                        this.scale3d = 1;
                        !0 === c.fitToPlot &&
                            (this.scale3d = this.chart3d.getScale(c.depth));
                        this.chart3d.frame3d = this.chart3d.get3dFrame();
                    }
                }
                function g() {
                    this.is3d() && (this.isDirtyBox = !0);
                }
                function A() {
                    this.chart3d &&
                        this.is3d() &&
                        (this.chart3d.frame3d = this.chart3d.get3dFrame());
                }
                function f() {
                    this.chart3d || (this.chart3d = new D(this));
                }
                function u(c) {
                    return this.is3d() || c.apply(this, [].slice.call(arguments, 1));
                }
                function w(c) {
                    var b = this.series.length;
                    if (this.is3d())
                        for (; b--;) (c = this.series[b]), c.translate(), c.render();
                    else c.call(this);
                }
                function G(c) {
                    c.apply(this, [].slice.call(arguments, 1));
                    this.is3d() && (this.container.className += " highcharts-3d-chart");
                }
                var D = (function () {
                    function c(c) {
                        this.frame3d = void 0;
                        this.chart = c;
                    }
                    c.prototype.get3dFrame = function () {
                        var c = this.chart,
                            b = c.options.chart.options3d,
                            a = b.frame,
                            d = c.plotLeft,
                            e = c.plotLeft + c.plotWidth,
                            f = c.plotTop,
                            g = c.plotTop + c.plotHeight,
                            k = b.depth,
                            n = function (a) {
                                a = h(a, c);
                                return 0.5 < a ? 1 : -0.5 > a ? -1 : 0;
                            },
                            m = n([
                                { x: d, y: g, z: k },
                                { x: e, y: g, z: k },
                                { x: e, y: g, z: 0 },
                                { x: d, y: g, z: 0 },
                            ]),
                            l = n([
                                { x: d, y: f, z: 0 },
                                { x: e, y: f, z: 0 },
                                { x: e, y: f, z: k },
                                { x: d, y: f, z: k },
                            ]),
                            v = n([
                                { x: d, y: f, z: 0 },
                                { x: d, y: f, z: k },
                                { x: d, y: g, z: k },
                                { x: d, y: g, z: 0 },
                            ]),
                            r = n([
                                { x: e, y: f, z: k },
                                { x: e, y: f, z: 0 },
                                { x: e, y: g, z: 0 },
                                { x: e, y: g, z: k },
                            ]),
                            A = n([
                                { x: d, y: g, z: 0 },
                                { x: e, y: g, z: 0 },
                                { x: e, y: f, z: 0 },
                                { x: d, y: f, z: 0 },
                            ]);
                        n = n([
                            { x: d, y: f, z: k },
                            { x: e, y: f, z: k },
                            { x: e, y: g, z: k },
                            { x: d, y: g, z: k },
                        ]);
                        var u = !1,
                            F = !1,
                            w = !1,
                            G = !1;
                        [].concat(c.xAxis, c.yAxis, c.zAxis).forEach(function (c) {
                            c &&
                                (c.horiz
                                    ? c.opposite
                                        ? (F = !0)
                                        : (u = !0)
                                    : c.opposite
                                        ? (G = !0)
                                        : (w = !0));
                        });
                        var C = function (c, a, b) {
                            for (
                                var d = ["size", "color", "visible"], e = {}, f = 0;
                                f < d.length;
                                f++
                            )
                                for (var g = d[f], h = 0; h < c.length; h++)
                                    if ("object" === typeof c[h]) {
                                        var k = c[h][g];
                                        if ("undefined" !== typeof k && null !== k) {
                                            e[g] = k;
                                            break;
                                        }
                                    }
                            c = b;
                            !0 === e.visible || !1 === e.visible
                                ? (c = e.visible)
                                : "auto" === e.visible && (c = 0 < a);
                            return {
                                size: q(e.size, 1),
                                color: q(e.color, "none"),
                                frontFacing: 0 < a,
                                visible: c,
                            };
                        };
                        a = {
                            axes: {},
                            bottom: C([a.bottom, a.top, a], m, u),
                            top: C([a.top, a.bottom, a], l, F),
                            left: C([a.left, a.right, a.side, a], v, w),
                            right: C([a.right, a.left, a.side, a], r, G),
                            back: C([a.back, a.front, a], n, !0),
                            front: C([a.front, a.back, a], A, !1),
                        };
                        "auto" === b.axisLabelPosition
                            ? ((r = function (c, a) {
                                return (
                                    c.visible !== a.visible ||
                                    (c.visible && a.visible && c.frontFacing !== a.frontFacing)
                                );
                            }),
                                (b = []),
                                r(a.left, a.front) &&
                                b.push({
                                    y: (f + g) / 2,
                                    x: d,
                                    z: 0,
                                    xDir: { x: 1, y: 0, z: 0 },
                                }),
                                r(a.left, a.back) &&
                                b.push({
                                    y: (f + g) / 2,
                                    x: d,
                                    z: k,
                                    xDir: { x: 0, y: 0, z: -1 },
                                }),
                                r(a.right, a.front) &&
                                b.push({
                                    y: (f + g) / 2,
                                    x: e,
                                    z: 0,
                                    xDir: { x: 0, y: 0, z: 1 },
                                }),
                                r(a.right, a.back) &&
                                b.push({
                                    y: (f + g) / 2,
                                    x: e,
                                    z: k,
                                    xDir: { x: -1, y: 0, z: 0 },
                                }),
                                (m = []),
                                r(a.bottom, a.front) &&
                                m.push({
                                    x: (d + e) / 2,
                                    y: g,
                                    z: 0,
                                    xDir: { x: 1, y: 0, z: 0 },
                                }),
                                r(a.bottom, a.back) &&
                                m.push({
                                    x: (d + e) / 2,
                                    y: g,
                                    z: k,
                                    xDir: { x: -1, y: 0, z: 0 },
                                }),
                                (l = []),
                                r(a.top, a.front) &&
                                l.push({
                                    x: (d + e) / 2,
                                    y: f,
                                    z: 0,
                                    xDir: { x: 1, y: 0, z: 0 },
                                }),
                                r(a.top, a.back) &&
                                l.push({
                                    x: (d + e) / 2,
                                    y: f,
                                    z: k,
                                    xDir: { x: -1, y: 0, z: 0 },
                                }),
                                (v = []),
                                r(a.bottom, a.left) &&
                                v.push({
                                    z: (0 + k) / 2,
                                    y: g,
                                    x: d,
                                    xDir: { x: 0, y: 0, z: -1 },
                                }),
                                r(a.bottom, a.right) &&
                                v.push({
                                    z: (0 + k) / 2,
                                    y: g,
                                    x: e,
                                    xDir: { x: 0, y: 0, z: 1 },
                                }),
                                (g = []),
                                r(a.top, a.left) &&
                                g.push({
                                    z: (0 + k) / 2,
                                    y: f,
                                    x: d,
                                    xDir: { x: 0, y: 0, z: -1 },
                                }),
                                r(a.top, a.right) &&
                                g.push({
                                    z: (0 + k) / 2,
                                    y: f,
                                    x: e,
                                    xDir: { x: 0, y: 0, z: 1 },
                                }),
                                (d = function (a, b, d) {
                                    if (0 === a.length) return null;
                                    if (1 === a.length) return a[0];
                                    for (var e = 0, f = p(a, c, !1), g = 1; g < f.length; g++)
                                        d * f[g][b] > d * f[e][b]
                                            ? (e = g)
                                            : d * f[g][b] === d * f[e][b] &&
                                            f[g].z < f[e].z &&
                                            (e = g);
                                    return a[e];
                                }),
                                (a.axes = {
                                    y: { left: d(b, "x", -1), right: d(b, "x", 1) },
                                    x: { top: d(l, "y", -1), bottom: d(m, "y", 1) },
                                    z: { top: d(g, "y", -1), bottom: d(v, "y", 1) },
                                }))
                            : (a.axes = {
                                y: {
                                    left: { x: d, z: 0, xDir: { x: 1, y: 0, z: 0 } },
                                    right: { x: e, z: 0, xDir: { x: 0, y: 0, z: 1 } },
                                },
                                x: {
                                    top: { y: f, z: 0, xDir: { x: 1, y: 0, z: 0 } },
                                    bottom: { y: g, z: 0, xDir: { x: 1, y: 0, z: 0 } },
                                },
                                z: {
                                    top: {
                                        x: w ? e : d,
                                        y: f,
                                        xDir: w ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 },
                                    },
                                    bottom: {
                                        x: w ? e : d,
                                        y: g,
                                        xDir: w ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 },
                                    },
                                },
                            });
                        return a;
                    };
                    c.prototype.getScale = function (c) {
                        var a = this.chart,
                            b = a.plotLeft,
                            d = a.plotWidth + b,
                            e = a.plotTop,
                            f = a.plotHeight + e,
                            g = b + a.plotWidth / 2,
                            h = e + a.plotHeight / 2,
                            k = Number.MAX_VALUE,
                            n = -Number.MAX_VALUE,
                            q = Number.MAX_VALUE,
                            m = -Number.MAX_VALUE,
                            l = 1;
                        var v = [
                            { x: b, y: e, z: 0 },
                            { x: b, y: e, z: c },
                        ];
                        [0, 1].forEach(function (c) {
                            v.push({ x: d, y: v[c].y, z: v[c].z });
                        });
                        [0, 1, 2, 3].forEach(function (c) {
                            v.push({ x: v[c].x, y: f, z: v[c].z });
                        });
                        v = p(v, a, !1);
                        v.forEach(function (c) {
                            k = Math.min(k, c.x);
                            n = Math.max(n, c.x);
                            q = Math.min(q, c.y);
                            m = Math.max(m, c.y);
                        });
                        b > k && (l = Math.min(l, 1 - (Math.abs((b + g) / (k + g)) % 1)));
                        d < n && (l = Math.min(l, (d - g) / (n - g)));
                        e > q &&
                            (l =
                                0 > q
                                    ? Math.min(l, (e + h) / (-q + e + h))
                                    : Math.min(l, 1 - (((e + h) / (q + h)) % 1)));
                        f < m && (l = Math.min(l, Math.abs((f - h) / (m - h))));
                        return l;
                    };
                    return c;
                })();
                a.Composition = D;
                a.defaultOptions = {
                    chart: {
                        options3d: {
                            enabled: !1,
                            alpha: 0,
                            beta: 0,
                            depth: 100,
                            fitToPlot: !0,
                            viewDistance: 25,
                            axisLabelPosition: null,
                            frame: {
                                visible: "default",
                                size: 1,
                                bottom: {},
                                top: {},
                                left: {},
                                right: {},
                                back: {},
                                front: {},
                            },
                        },
                    },
                };
                a.compose = function (h, q) {
                    var p = h.prototype;
                    q = q.prototype;
                    p.is3d = function () {
                        return (
                            this.options.chart.options3d &&
                            this.options.chart.options3d.enabled
                        );
                    };
                    p.propsRequireDirtyBox.push("chart.options3d");
                    p.propsRequireUpdateSeries.push("chart.options3d");
                    q.matrixSetter = function () {
                        if (1 > this.pos && (B(this.start) || B(this.end))) {
                            var c = this.start || [1, 0, 0, 1, 0, 0],
                                a = this.end || [1, 0, 0, 1, 0, 0];
                            var b = [];
                            for (var d = 0; 6 > d; d++)
                                b.push(this.pos * a[d] + (1 - this.pos) * c[d]);
                        } else b = this.end;
                        this.elem.attr(this.prop, b, null, !0);
                    };
                    n(!0, r, a.defaultOptions);
                    b(h, "init", f);
                    b(h, "addSeries", e);
                    b(h, "afterDrawChartBox", k);
                    b(h, "afterGetContainer", m);
                    b(h, "afterInit", l);
                    b(h, "afterSetChartSize", v);
                    b(h, "beforeRedraw", g);
                    b(h, "beforeRender", A);
                    c(d.Chart.prototype, "isInsidePlot", u);
                    c(h, "renderSeries", w);
                    c(h, "setClassName", G);
                };
            })(A || (A = {}));
            A.compose(u, m);
            G.ZChartComposition.compose(u);
            l.compose(a);
            ("");
            return A;
        }
    );
    B(
        a,
        "Core/Series/Series3D.js",
        [a["Core/Globals.js"], a["Extensions/Math3D.js"], a["Core/Utilities.js"]],
        function (a, l, u) {
            var d = l.perspective;
            l = u.addEvent;
            var m = u.pick;
            l(a.Series, "afterTranslate", function () {
                this.chart.is3d() && this.translate3dPoints();
            });
            a.Series.prototype.translate3dPoints = function () {
                var a = this.chart,
                    k = m(this.zAxis, a.options.zAxis[0]),
                    l = [],
                    p;
                for (p = 0; p < this.data.length; p++) {
                    var h = this.data[p];
                    if (k && k.translate) {
                        var r = k.logarithmic && k.val2lin ? k.val2lin(h.z) : h.z;
                        h.plotZ = k.translate(r);
                        h.isInside = h.isInside ? r >= k.min && r <= k.max : !1;
                    } else h.plotZ = 0;
                    h.axisXpos = h.plotX;
                    h.axisYpos = h.plotY;
                    h.axisZpos = h.plotZ;
                    l.push({ x: h.plotX, y: h.plotY, z: h.plotZ });
                }
                a = d(l, a, !0);
                for (p = 0; p < this.data.length; p++)
                    (h = this.data[p]),
                        (k = a[p]),
                        (h.plotX = k.x),
                        (h.plotY = k.y),
                        (h.plotZ = k.z);
            };
        }
    );
    B(
        a,
        "Series/Column3DSeries.js",
        [
            a["Core/Globals.js"],
            a["Extensions/Math3D.js"],
            a["Extensions/Stacking.js"],
            a["Core/Utilities.js"],
        ],
        function (a, l, u, d) {
            function m(a, b) {
                var c = a.series,
                    d = {},
                    k,
                    e = 1;
                c.forEach(function (a) {
                    k = h(a.options.stack, b ? 0 : c.length - 1 - a.index);
                    d[k]
                        ? d[k].series.push(a)
                        : ((d[k] = { series: [a], position: e }), e++);
                });
                d.totalStacks = e + 1;
                return d;
            }
            function w(a) {
                var b = a.apply(this, [].slice.call(arguments, 1));
                this.chart.is3d &&
                    this.chart.is3d() &&
                    ((b.stroke = this.options.edgeColor || b.fill),
                        (b["stroke-width"] = h(this.options.edgeWidth, 1)));
                return b;
            }
            function k(a, b, c) {
                var d = this.chart.is3d && this.chart.is3d();
                d && (this.options.inactiveOtherPoints = !0);
                a.call(this, b, c);
                d && (this.options.inactiveOtherPoints = !1);
            }
            function G(a) {
                for (var b = [], c = 1; c < arguments.length; c++)
                    b[c - 1] = arguments[c];
                return this.series.chart.is3d()
                    ? this.graphic && "g" !== this.graphic.element.nodeName
                    : a.apply(this, b);
            }
            var p = l.perspective;
            l = d.addEvent;
            var h = d.pick;
            d = d.wrap;
            var r = a.Series,
                b = a.seriesTypes,
                B = a.svg;
            d(b.column.prototype, "translate", function (a) {
                a.apply(this, [].slice.call(arguments, 1));
                this.chart.is3d() && this.translate3dShapes();
            });
            d(r.prototype, "justifyDataLabel", function (a) {
                return arguments[2].outside3dPlot
                    ? !1
                    : a.apply(this, [].slice.call(arguments, 1));
            });
            b.column.prototype.translate3dPoints = function () { };
            b.column.prototype.translate3dShapes = function () {
                var a = this,
                    b = a.chart,
                    c = a.options,
                    d = c.depth,
                    h =
                        (c.stacking ? c.stack || 0 : a.index) *
                        (d + (c.groupZPadding || 1)),
                    e = a.borderWidth % 2 ? 0.5 : 0,
                    k;
                b.inverted && !a.yAxis.reversed && (e *= -1);
                !1 !== c.grouping && (h = 0);
                h += c.groupZPadding || 1;
                a.data.forEach(function (c) {
                    c.outside3dPlot = null;
                    if (null !== c.y) {
                        var l = c.shapeArgs,
                            m = c.tooltipPos,
                            g;
                        [
                            ["x", "width"],
                            ["y", "height"],
                        ].forEach(function (b) {
                            g = l[b[0]] - e;
                            0 > g && ((l[b[1]] += l[b[0]] + e), (l[b[0]] = -e), (g = 0));
                            g + l[b[1]] > a[b[0] + "Axis"].len &&
                                0 !== l[b[1]] &&
                                (l[b[1]] = a[b[0] + "Axis"].len - l[b[0]]);
                            if (
                                0 !== l[b[1]] &&
                                (l[b[0]] >= a[b[0] + "Axis"].len || l[b[0]] + l[b[1]] <= e)
                            ) {
                                for (var d in l) l[d] = 0;
                                c.outside3dPlot = !0;
                            }
                        });
                        "rect" === c.shapeType && (c.shapeType = "cuboid");
                        l.z = h;
                        l.depth = d;
                        l.insidePlotArea = !0;
                        k = { x: l.x + l.width / 2, y: l.y, z: h + d / 2 };
                        b.inverted && ((k.x = l.height), (k.y = c.clientX));
                        c.plot3d = p([k], b, !0, !1)[0];
                        m = p([{ x: m[0], y: m[1], z: h + d / 2 }], b, !0, !1)[0];
                        c.tooltipPos = [m.x, m.y];
                    }
                });
                a.z = h;
            };
            d(b.column.prototype, "animate", function (a) {
                if (this.chart.is3d()) {
                    var b = arguments[1],
                        c = this.yAxis,
                        d = this,
                        h = this.yAxis.reversed;
                    B &&
                        (b
                            ? d.data.forEach(function (a) {
                                null !== a.y &&
                                    ((a.height = a.shapeArgs.height),
                                        (a.shapey = a.shapeArgs.y),
                                        (a.shapeArgs.height = 1),
                                        h ||
                                        (a.shapeArgs.y = a.stackY
                                            ? a.plotY + c.translate(a.stackY)
                                            : a.plotY + (a.negative ? -a.height : a.height)));
                            })
                            : (d.data.forEach(function (a) {
                                null !== a.y &&
                                    ((a.shapeArgs.height = a.height),
                                        (a.shapeArgs.y = a.shapey),
                                        a.graphic &&
                                        a.graphic.animate(a.shapeArgs, d.options.animation));
                            }),
                                this.drawDataLabels()));
                } else a.apply(this, [].slice.call(arguments, 1));
            });
            d(b.column.prototype, "plotGroup", function (a, b, c, d, h, e) {
                "dataLabelsGroup" !== b &&
                    this.chart.is3d() &&
                    (this[b] && delete this[b],
                        e &&
                        (this.chart.columnGroup ||
                            (this.chart.columnGroup = this.chart.renderer
                                .g("columnGroup")
                                .add(e)),
                            (this[b] = this.chart.columnGroup),
                            this.chart.columnGroup.attr(this.getPlotBox()),
                            (this[b].survive = !0),
                            "group" === b || "markerGroup" === b)) &&
                    (arguments[3] = "visible");
                return a.apply(this, Array.prototype.slice.call(arguments, 1));
            });
            d(b.column.prototype, "setVisible", function (a, b) {
                var c = this,
                    d;
                c.chart.is3d() &&
                    c.data.forEach(function (a) {
                        d = (a.visible =
                            a.options.visible =
                            b =
                            "undefined" === typeof b ? !h(c.visible, a.visible) : b)
                            ? "visible"
                            : "hidden";
                        c.options.data[c.data.indexOf(a)] = a.options;
                        a.graphic && a.graphic.attr({ visibility: d });
                    });
                a.apply(this, Array.prototype.slice.call(arguments, 1));
            });
            b.column.prototype.handle3dGrouping = !0;
            l(r, "afterInit", function () {
                if (this.chart.is3d() && this.handle3dGrouping) {
                    var a = this.options,
                        b = a.grouping,
                        c = a.stacking,
                        d = h(this.yAxis.options.reversedStacks, !0),
                        k = 0;
                    if ("undefined" === typeof b || b) {
                        b = m(this.chart, c);
                        k = a.stack || 0;
                        for (c = 0; c < b[k].series.length && b[k].series[c] !== this; c++);
                        k = 10 * (b.totalStacks - b[k].position) + (d ? c : -c);
                        this.xAxis.reversed || (k = 10 * b.totalStacks - k);
                    }
                    a.depth = a.depth || 25;
                    this.z = this.z || 0;
                    a.zIndex = k;
                }
            });
            d(b.column.prototype, "pointAttribs", w);
            d(b.column.prototype, "setState", k);
            d(b.column.prototype.pointClass.prototype, "hasNewShapeType", G);
            b.columnrange &&
                (d(b.columnrange.prototype, "pointAttribs", w),
                    d(b.columnrange.prototype, "setState", k),
                    d(b.columnrange.prototype.pointClass.prototype, "hasNewShapeType", G),
                    (b.columnrange.prototype.plotGroup = b.column.prototype.plotGroup),
                    (b.columnrange.prototype.setVisible = b.column.prototype.setVisible));
            d(r.prototype, "alignDataLabel", function (a, b, c, d, k) {
                var e = this.chart;
                d.outside3dPlot = b.outside3dPlot;
                if (e.is3d() && this.is("column")) {
                    var l = this.options,
                        m = h(d.inside, !!this.options.stacking),
                        n = e.options.chart.options3d,
                        q = b.pointWidth / 2 || 0;
                    l = { x: k.x + q, y: k.y, z: this.z + l.depth / 2 };
                    e.inverted &&
                        (m && ((k.width = 0), (l.x += b.shapeArgs.height / 2)),
                            90 <= n.alpha && 270 >= n.alpha && (l.y += b.shapeArgs.width));
                    l = p([l], e, !0, !1)[0];
                    k.x = l.x - q;
                    k.y = b.outside3dPlot ? -9e9 : l.y;
                }
                a.apply(this, [].slice.call(arguments, 1));
            });
            d(u.prototype, "getStackBox", function (a, d, c, h, k, e, l, m) {
                var n = a.apply(this, [].slice.call(arguments, 1));
                if (d.is3d() && c.base) {
                    var q = +c.base.split(",")[0],
                        g = d.series[q];
                    q = d.options.chart.options3d;
                    g &&
                        g instanceof b.column &&
                        ((g = {
                            x: n.x + (d.inverted ? l : e / 2),
                            y: n.y,
                            z: g.options.depth / 2,
                        }),
                            d.inverted &&
                            ((n.width = 0), 90 <= q.alpha && 270 >= q.alpha && (g.y += e)),
                            (g = p([g], d, !0, !1)[0]),
                            (n.x = g.x - e / 2),
                            (n.y = g.y));
                }
                return n;
            });
        }
    );
    B(
        a,
        "Series/Pie3DSeries.js",
        [a["Core/Globals.js"], a["Core/Utilities.js"]],
        function (a, l) {
            var u = l.pick;
            l = l.wrap;
            var d = a.deg2rad,
                m = a.seriesTypes,
                w = a.svg;
            l(m.pie.prototype, "translate", function (a) {
                a.apply(this, [].slice.call(arguments, 1));
                if (this.chart.is3d()) {
                    var k = this,
                        l = k.options,
                        h = l.depth || 0,
                        m = k.chart.options.chart.options3d,
                        b = m.alpha,
                        u = m.beta,
                        n = l.stacking ? (l.stack || 0) * h : k._i * h;
                    n += h / 2;
                    !1 !== l.grouping && (n = 0);
                    k.data.forEach(function (a) {
                        var c = a.shapeArgs;
                        a.shapeType = "arc3d";
                        c.z = n;
                        c.depth = 0.75 * h;
                        c.alpha = b;
                        c.beta = u;
                        c.center = k.center;
                        c = (c.end + c.start) / 2;
                        a.slicedTranslation = {
                            translateX: Math.round(
                                Math.cos(c) * l.slicedOffset * Math.cos(b * d)
                            ),
                            translateY: Math.round(
                                Math.sin(c) * l.slicedOffset * Math.cos(b * d)
                            ),
                        };
                    });
                }
            });
            l(m.pie.prototype.pointClass.prototype, "haloPath", function (a) {
                var d = arguments;
                return this.series.chart.is3d() ? [] : a.call(this, d[1]);
            });
            l(m.pie.prototype, "pointAttribs", function (a, d, l) {
                a = a.call(this, d, l);
                l = this.options;
                this.chart.is3d() &&
                    !this.chart.styledMode &&
                    ((a.stroke = l.edgeColor || d.color || this.color),
                        (a["stroke-width"] = u(l.edgeWidth, 1)));
                return a;
            });
            l(m.pie.prototype, "drawDataLabels", function (a) {
                if (this.chart.is3d()) {
                    var k = this.chart.options.chart.options3d;
                    this.data.forEach(function (a) {
                        var h = a.shapeArgs,
                            l = h.r,
                            b = (h.start + h.end) / 2;
                        a = a.labelPosition;
                        var m = a.connectorPosition,
                            n = -l * (1 - Math.cos((h.alpha || k.alpha) * d)) * Math.sin(b),
                            p = l * (Math.cos((h.beta || k.beta) * d) - 1) * Math.cos(b);
                        [a.natural, m.breakAt, m.touchingSliceAt].forEach(function (a) {
                            a.x += p;
                            a.y += n;
                        });
                    });
                }
                a.apply(this, [].slice.call(arguments, 1));
            });
            l(m.pie.prototype, "addPoint", function (a) {
                a.apply(this, [].slice.call(arguments, 1));
                this.chart.is3d() && this.update(this.userOptions, !0);
            });
            l(m.pie.prototype, "animate", function (a) {
                if (this.chart.is3d()) {
                    var d = arguments[1],
                        k = this.options.animation,
                        h = this.center,
                        l = this.group,
                        b = this.markerGroup;
                    w &&
                        (!0 === k && (k = {}),
                            d
                                ? ((l.oldtranslateX = u(l.oldtranslateX, l.translateX)),
                                    (l.oldtranslateY = u(l.oldtranslateY, l.translateY)),
                                    (d = {
                                        translateX: h[0],
                                        translateY: h[1],
                                        scaleX: 0.001,
                                        scaleY: 0.001,
                                    }),
                                    l.attr(d),
                                    b && ((b.attrSetters = l.attrSetters), b.attr(d)))
                                : ((d = {
                                    translateX: l.oldtranslateX,
                                    translateY: l.oldtranslateY,
                                    scaleX: 1,
                                    scaleY: 1,
                                }),
                                    l.animate(d, k),
                                    b && b.animate(d, k)));
                } else a.apply(this, [].slice.call(arguments, 1));
            });
        }
    );
    B(
        a,
        "Series/Scatter3DSeries.js",
        [
            a["Core/Globals.js"],
            a["Extensions/Math3D.js"],
            a["Core/Series/Point.js"],
            a["Core/Utilities.js"],
        ],
        function (a, l, u, d) {
            var m = l.pointCameraDistance;
            l = d.seriesType;
            var w = a.seriesTypes;
            l(
                "scatter3d",
                "scatter",
                {
                    tooltip: {
                        pointFormat:
                            "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>",
                    },
                },
                {
                    pointAttribs: function (a) {
                        var d = w.scatter.prototype.pointAttribs.apply(this, arguments);
                        this.chart.is3d() && a && (d.zIndex = m(a, this.chart));
                        return d;
                    },
                    axisTypes: ["xAxis", "yAxis", "zAxis"],
                    pointArrayMap: ["x", "y", "z"],
                    parallelArrays: ["x", "y", "z"],
                    directTouch: !0,
                },
                {
                    applyOptions: function () {
                        u.prototype.applyOptions.apply(this, arguments);
                        "undefined" === typeof this.z && (this.z = 0);
                        return this;
                    },
                }
            );
            ("");
        }
    );
    B(a, "Core/Axis/VMLAxis3D.js", [a["Core/Utilities.js"]], function (a) {
        var l = a.addEvent,
            u = (function () {
                return function (a) {
                    this.axis = a;
                };
            })();
        return (function () {
            function a() { }
            a.compose = function (d) {
                d.keepProps.push("vml");
                l(d, "init", a.onInit);
                l(d, "render", a.onRender);
            };
            a.onInit = function () {
                this.vml || (this.vml = new u(this));
            };
            a.onRender = function () {
                var a = this.vml;
                a.sideFrame &&
                    (a.sideFrame.css({ zIndex: 0 }),
                        a.sideFrame.front.attr({ fill: a.sideFrame.color }));
                a.bottomFrame &&
                    (a.bottomFrame.css({ zIndex: 1 }),
                        a.bottomFrame.front.attr({ fill: a.bottomFrame.color }));
                a.backFrame &&
                    (a.backFrame.css({ zIndex: 0 }),
                        a.backFrame.front.attr({ fill: a.backFrame.color }));
            };
            return a;
        })();
    });
    B(
        a,
        "Core/Renderer/VML/VMLRenderer3D.js",
        [
            a["Core/Axis/Axis.js"],
            a["Core/Globals.js"],
            a["Core/Renderer/SVG/SVGRenderer.js"],
            a["Core/Utilities.js"],
            a["Core/Axis/VMLAxis3D.js"],
        ],
        function (a, l, u, d, m) {
            d = d.setOptions;
            var w = l.VMLRenderer;
            w &&
                (d({ animate: !1 }),
                    (w.prototype.face3d = u.prototype.face3d),
                    (w.prototype.polyhedron = u.prototype.polyhedron),
                    (w.prototype.elements3d = u.prototype.elements3d),
                    (w.prototype.element3d = u.prototype.element3d),
                    (w.prototype.cuboid = u.prototype.cuboid),
                    (w.prototype.cuboidPath = u.prototype.cuboidPath),
                    (w.prototype.toLinePath = u.prototype.toLinePath),
                    (w.prototype.toLineSegments = u.prototype.toLineSegments),
                    (w.prototype.arc3d = function (a) {
                        a = u.prototype.arc3d.call(this, a);
                        a.css({ zIndex: a.zIndex });
                        return a;
                    }),
                    (l.VMLRenderer.prototype.arc3dPath = u.prototype.arc3dPath),
                    m.compose(a));
        }
    );
    B(a, "masters/highcharts-3d.src.js", [], function () { });
});
//# sourceMappingURL=highcharts-3d.js.map
