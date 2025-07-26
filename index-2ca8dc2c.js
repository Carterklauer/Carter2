var v1 = Object.defineProperty
var g1 = (t, e, l) => e in t ? v1(t, e, {enumerable: !0, configurable: !0, writable: !0, value: l}) : t[e] = l
var se = (t, e, l) => (g1(t, typeof e != "symbol" ? e + "" : e, l),l)
function p1(t, e) {
    for (var l = 0; l < e.length; l++) {
        const a = e[l];
        if (typeof a != "string" && !Array.isArray(a)) {
            for (const u in a){
                if (u !== "default" && !(u in t)) {
                    const n = Object.getOwnPropertyDescriptor(a, u);
                    n && Object.defineProperty(t, u, n.get ? n : {enumerable: !0, get: () => a[u]})
                }
            }
        }
    }
    return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
    }))
}
(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload"))
        return;
    for (const u of document.querySelectorAll('link[rel="modulepreload"]'))
        a(u);
    new MutationObserver(u => {
        for (const n of u)
            if (n.type === "childList")
                for (const i of n.addedNodes)
                    i.tagName === "LINK" && i.rel === "modulepreload" && a(i)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function l(u) {
        const n = {};
        return u.integrity && (n.integrity = u.integrity),
        u.referrerpolicy && (n.referrerPolicy = u.referrerpolicy),
        u.crossorigin === "use-credentials" ? n.credentials = "include" : u.crossorigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin",
        n
    }
    function a(u) {
        if (u.ep)
            return;
        u.ep = !0;
        const n = l(u);
        fetch(u.href, n)
    }
}
)();
function b1(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
}
var b = {}, S1 = {get exports() {return b},set exports(t) {b = t}}, ni = {}
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var T1 = Symbol.for("react.transitional.element")
  , A1 = Symbol.for("react.fragment");
function Yo(t, e, l) {
    var a = null;
    if (l !== void 0 && (a = "" + l),
    e.key !== void 0 && (a = "" + e.key),
    "key"in e) {
        l = {};
        for (var u in e)
            u !== "key" && (l[u] = e[u])
    } else
        l = e;
    return e = l.ref,
    {
        $$typeof: T1,
        type: t,
        key: a,
        ref: e !== void 0 ? e : null,
        props: l
    }
}
ni.Fragment = A1;
ni.jsx = Yo;
ni.jsxs = Yo;
(function(t) {
    t.exports = ni
}
)(S1);
var R = {}, E1 = {get exports() {return R}, set exports(t) {R = t}, x = {}
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zf = Symbol.for("react.transitional.element")
  , O1 = Symbol.for("react.portal")
  , _1 = Symbol.for("react.fragment")
  , z1 = Symbol.for("react.strict_mode")
  , M1 = Symbol.for("react.profiler")
  , D1 = Symbol.for("react.consumer")
  , R1 = Symbol.for("react.context")
  , x1 = Symbol.for("react.forward_ref")
  , U1 = Symbol.for("react.suspense")
  , N1 = Symbol.for("react.memo")
  , Bo = Symbol.for("react.lazy")
  , wr = Symbol.iterator;
function H1(t) {
    return t === null || typeof t != "object" ? null : (t = wr && t[wr] || t["@@iterator"],
    typeof t == "function" ? t : null)
}
var Go = {
    isMounted: function() {
        return !1
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}
  , Qo = Object.assign
  , Xo = {};
function va(t, e, l) {
    this.props = t,
    this.context = e,
    this.refs = Xo,
    this.updater = l || Go
}
va.prototype.isReactComponent = {};
va.prototype.setState = function(t, e) {
    if (typeof t != "object" && typeof t != "function" && t != null)
        throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, t, e, "setState")
}
;
va.prototype.forceUpdate = function(t) {
    this.updater.enqueueForceUpdate(this, t, "forceUpdate")
}
;
function Vo() {}
Vo.prototype = va.prototype;
function Mf(t, e, l) {
    this.props = t,
    this.context = e,
    this.refs = Xo,
    this.updater = l || Go
}
var Df = Mf.prototype = new Vo;
Df.constructor = Mf;
Qo(Df, va.prototype);
Df.isPureReactComponent = !0;
var Lr = Array.isArray
  , W = {
    H: null,
    A: null,
    T: null,
    S: null,
    V: null
}
  , wo = Object.prototype.hasOwnProperty;
function Rf(t, e, l, a, u, n) {
    return l = n.ref,
    {
        $$typeof: zf,
        type: t,
        key: e,
        ref: l !== void 0 ? l : null,
        props: n
    }
}
function j1(t, e) {
    return Rf(t.type, e, void 0, void 0, void 0, t.props)
}
function xf(t) {
    return typeof t == "object" && t !== null && t.$$typeof === zf
}
function C1(t) {
    var e = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + t.replace(/[=:]/g, function(l) {
        return e[l]
    })
}
var Zr = /\/+/g;
function xi(t, e) {
    return typeof t == "object" && t !== null && t.key != null ? C1("" + t.key) : e.toString(36)
}
function Kr() {}
function q1(t) {
    switch (t.status) {
    case "fulfilled":
        return t.value;
    case "rejected":
        throw t.reason;
    default:
        switch (typeof t.status == "string" ? t.then(Kr, Kr) : (t.status = "pending",
        t.then(function(e) {
            t.status === "pending" && (t.status = "fulfilled",
            t.value = e)
        }, function(e) {
            t.status === "pending" && (t.status = "rejected",
            t.reason = e)
        })),
        t.status) {
        case "fulfilled":
            return t.value;
        case "rejected":
            throw t.reason
        }
    }
    throw t
}
function Ml(t, e, l, a, u) {
    var n = typeof t;
    (n === "undefined" || n === "boolean") && (t = null);
    var i = !1;
    if (t === null)
        i = !0;
    else
        switch (n) {
        case "bigint":
        case "string":
        case "number":
            i = !0;
            break;
        case "object":
            switch (t.$$typeof) {
            case zf:
            case O1:
                i = !0;
                break;
            case Bo:
                return i = t._init,
                Ml(i(t._payload), e, l, a, u)
            }
        }
    if (i)
        return u = u(t),
        i = a === "" ? "." + xi(t, 0) : a,
        Lr(u) ? (l = "",
        i != null && (l = i.replace(Zr, "$&/") + "/"),
        Ml(u, e, l, "", function(r) {
            return r
        })) : u != null && (xf(u) && (u = j1(u, l + (u.key == null || t && t.key === u.key ? "" : ("" + u.key).replace(Zr, "$&/") + "/") + i)),
        e.push(u)),
        1;
    i = 0;
    var c = a === "" ? "." : a + ":";
    if (Lr(t))
        for (var f = 0; f < t.length; f++)
            a = t[f],
            n = c + xi(a, f),
            i += Ml(a, e, l, n, u);
    else if (f = H1(t),
    typeof f == "function")
        for (t = f.call(t),
        f = 0; !(a = t.next()).done; )
            a = a.value,
            n = c + xi(a, f++),
            i += Ml(a, e, l, n, u);
    else if (n === "object") {
        if (typeof t.then == "function")
            return Ml(q1(t), e, l, a, u);
        throw e = String(t),
        Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.")
    }
    return i
}
function Xu(t, e, l) {
    if (t == null)
        return t;
    var a = []
      , u = 0;
    return Ml(t, a, "", "", function(n) {
        return e.call(l, n, u++)
    }),
    a
}
function Y1(t) {
    if (t._status === -1) {
        var e = t._result;
        e = e(),
        e.then(function(l) {
            (t._status === 0 || t._status === -1) && (t._status = 1,
            t._result = l)
        }, function(l) {
            (t._status === 0 || t._status === -1) && (t._status = 2,
            t._result = l)
        }),
        t._status === -1 && (t._status = 0,
        t._result = e)
    }
    if (t._status === 1)
        return t._result.default;
    throw t._result
}
var Jr = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var e = new window.ErrorEvent("error",{
            bubbles: !0,
            cancelable: !0,
            message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
            error: t
        });
        if (!window.dispatchEvent(e))
            return
    } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", t);
        return
    }
    console.error(t)
}
;
function B1() {}
x.Children = {
    map: Xu,
    forEach: function(t, e, l) {
        Xu(t, function() {
            e.apply(this, arguments)
        }, l)
    },
    count: function(t) {
        var e = 0;
        return Xu(t, function() {
            e++
        }),
        e
    },
    toArray: function(t) {
        return Xu(t, function(e) {
            return e
        }) || []
    },
    only: function(t) {
        if (!xf(t))
            throw Error("React.Children.only expected to receive a single React element child.");
        return t
    }
};
x.Component = va;
x.Fragment = _1;
x.Profiler = M1;
x.PureComponent = Mf;
x.StrictMode = z1;
x.Suspense = U1;
x.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = W;
x.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(t) {
        return W.H.useMemoCache(t)
    }
};
x.cache = function(t) {
    return function() {
        return t.apply(null, arguments)
    }
}
;
x.cloneElement = function(t, e, l) {
    if (t == null)
        throw Error("The argument must be a React element, but you passed " + t + ".");
    var a = Qo({}, t.props)
      , u = t.key
      , n = void 0;
    if (e != null)
        for (i in e.ref !== void 0 && (n = void 0),
        e.key !== void 0 && (u = "" + e.key),
        e)
            !wo.call(e, i) || i === "key" || i === "__self" || i === "__source" || i === "ref" && e.ref === void 0 || (a[i] = e[i]);
    var i = arguments.length - 2;
    if (i === 1)
        a.children = l;
    else if (1 < i) {
        for (var c = Array(i), f = 0; f < i; f++)
            c[f] = arguments[f + 2];
        a.children = c
    }
    return Rf(t.type, u, void 0, void 0, n, a)
}
;
x.createContext = function(t) {
    return t = {
        $$typeof: R1,
        _currentValue: t,
        _currentValue2: t,
        _threadCount: 0,
        Provider: null,
        Consumer: null
    },
    t.Provider = t,
    t.Consumer = {
        $$typeof: D1,
        _context: t
    },
    t
}
;
x.createElement = function(t, e, l) {
    var a, u = {}, n = null;
    if (e != null)
        for (a in e.key !== void 0 && (n = "" + e.key),
        e)
            wo.call(e, a) && a !== "key" && a !== "__self" && a !== "__source" && (u[a] = e[a]);
    var i = arguments.length - 2;
    if (i === 1)
        u.children = l;
    else if (1 < i) {
        for (var c = Array(i), f = 0; f < i; f++)
            c[f] = arguments[f + 2];
        u.children = c
    }
    if (t && t.defaultProps)
        for (a in i = t.defaultProps,
        i)
            u[a] === void 0 && (u[a] = i[a]);
    return Rf(t, n, void 0, void 0, null, u)
}
;
x.createRef = function() {
    return {
        current: null
    }
}
;
x.forwardRef = function(t) {
    return {
        $$typeof: x1,
        render: t
    }
}
;
x.isValidElement = xf;
x.lazy = function(t) {
    return {
        $$typeof: Bo,
        _payload: {
            _status: -1,
            _result: t
        },
        _init: Y1
    }
}
;
x.memo = function(t, e) {
    return {
        $$typeof: N1,
        type: t,
        compare: e === void 0 ? null : e
    }
}
;
x.startTransition = function(t) {
    var e = W.T
      , l = {};
    W.T = l;
    try {
        var a = t()
          , u = W.S;
        u !== null && u(l, a),
        typeof a == "object" && a !== null && typeof a.then == "function" && a.then(B1, Jr)
    } catch (n) {
        Jr(n)
    } finally {
        W.T = e
    }
}
;
x.unstable_useCacheRefresh = function() {
    return W.H.useCacheRefresh()
}
;
x.use = function(t) {
    return W.H.use(t)
}
;
x.useActionState = function(t, e, l) {
    return W.H.useActionState(t, e, l)
}
;
x.useCallback = function(t, e) {
    return W.H.useCallback(t, e)
}
;
x.useContext = function(t) {
    return W.H.useContext(t)
}
;
x.useDebugValue = function() {}
;
x.useDeferredValue = function(t, e) {
    return W.H.useDeferredValue(t, e)
}
;
x.useEffect = function(t, e, l) {
    var a = W.H;
    if (typeof l == "function")
        throw Error("useEffect CRUD overload is not enabled in this build of React.");
    return a.useEffect(t, e)
}
;
x.useId = function() {
    return W.H.useId()
}
;
x.useImperativeHandle = function(t, e, l) {
    return W.H.useImperativeHandle(t, e, l)
}
;
x.useInsertionEffect = function(t, e) {
    return W.H.useInsertionEffect(t, e)
}
;
x.useLayoutEffect = function(t, e) {
    return W.H.useLayoutEffect(t, e)
}
;
x.useMemo = function(t, e) {
    return W.H.useMemo(t, e)
}
;
x.useOptimistic = function(t, e) {
    return W.H.useOptimistic(t, e)
}
;
x.useReducer = function(t, e, l) {
    return W.H.useReducer(t, e, l)
}
;
x.useRef = function(t) {
    return W.H.useRef(t)
}
;
x.useState = function(t) {
    return W.H.useState(t)
}
;
x.useSyncExternalStore = function(t, e, l) {
    return W.H.useSyncExternalStore(t, e, l)
}
;
x.useTransition = function() {
    return W.H.useTransition()
}
;
x.version = "19.1.0";
(function(t) {
    t.exports = x
}
)(E1);
const ae = b1(R)
  , G1 = p1({
    __proto__: null,
    default: ae
}, [R]);
var An = {}
  , Q1 = {
    get exports() {
        return An
    },
    set exports(t) {
        An = t
    }
}
  , At = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var X1 = R;
function Lo(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
        e += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var l = 2; l < arguments.length; l++)
            e += "&args[]=" + encodeURIComponent(arguments[l])
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
function De() {}
var Tt = {
    d: {
        f: De,
        r: function() {
            throw Error(Lo(522))
        },
        D: De,
        C: De,
        L: De,
        m: De,
        X: De,
        S: De,
        M: De
    },
    p: 0,
    findDOMNode: null
}
  , V1 = Symbol.for("react.portal");
function w1(t, e, l) {
    var a = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: V1,
        key: a == null ? null : "" + a,
        children: t,
        containerInfo: e,
        implementation: l
    }
}
var Ga = X1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function ii(t, e) {
    if (t === "font")
        return "";
    if (typeof e == "string")
        return e === "use-credentials" ? e : ""
}
At.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Tt;
At.createPortal = function(t, e) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
        throw Error(Lo(299));
    return w1(t, e, null, l)
}
;
At.flushSync = function(t) {
    var e = Ga.T
      , l = Tt.p;
    try {
        if (Ga.T = null,
        Tt.p = 2,
        t)
            return t()
    } finally {
        Ga.T = e,
        Tt.p = l,
        Tt.d.f()
    }
}
;
At.preconnect = function(t, e) {
    typeof t == "string" && (e ? (e = e.crossOrigin,
    e = typeof e == "string" ? e === "use-credentials" ? e : "" : void 0) : e = null,
    Tt.d.C(t, e))
}
;
At.prefetchDNS = function(t) {
    typeof t == "string" && Tt.d.D(t)
}
;
At.preinit = function(t, e) {
    if (typeof t == "string" && e && typeof e.as == "string") {
        var l = e.as
          , a = ii(l, e.crossOrigin)
          , u = typeof e.integrity == "string" ? e.integrity : void 0
          , n = typeof e.fetchPriority == "string" ? e.fetchPriority : void 0;
        l === "style" ? Tt.d.S(t, typeof e.precedence == "string" ? e.precedence : void 0, {
            crossOrigin: a,
            integrity: u,
            fetchPriority: n
        }) : l === "script" && Tt.d.X(t, {
            crossOrigin: a,
            integrity: u,
            fetchPriority: n,
            nonce: typeof e.nonce == "string" ? e.nonce : void 0
        })
    }
}
;
At.preinitModule = function(t, e) {
    if (typeof t == "string")
        if (typeof e == "object" && e !== null) {
            if (e.as == null || e.as === "script") {
                var l = ii(e.as, e.crossOrigin);
                Tt.d.M(t, {
                    crossOrigin: l,
                    integrity: typeof e.integrity == "string" ? e.integrity : void 0,
                    nonce: typeof e.nonce == "string" ? e.nonce : void 0
                })
            }
        } else
            e == null && Tt.d.M(t)
}
;
At.preload = function(t, e) {
    if (typeof t == "string" && typeof e == "object" && e !== null && typeof e.as == "string") {
        var l = e.as
          , a = ii(l, e.crossOrigin);
        Tt.d.L(t, l, {
            crossOrigin: a,
            integrity: typeof e.integrity == "string" ? e.integrity : void 0,
            nonce: typeof e.nonce == "string" ? e.nonce : void 0,
            type: typeof e.type == "string" ? e.type : void 0,
            fetchPriority: typeof e.fetchPriority == "string" ? e.fetchPriority : void 0,
            referrerPolicy: typeof e.referrerPolicy == "string" ? e.referrerPolicy : void 0,
            imageSrcSet: typeof e.imageSrcSet == "string" ? e.imageSrcSet : void 0,
            imageSizes: typeof e.imageSizes == "string" ? e.imageSizes : void 0,
            media: typeof e.media == "string" ? e.media : void 0
        })
    }
}
;
At.preloadModule = function(t, e) {
    if (typeof t == "string")
        if (e) {
            var l = ii(e.as, e.crossOrigin);
            Tt.d.m(t, {
                as: typeof e.as == "string" && e.as !== "script" ? e.as : void 0,
                crossOrigin: l,
                integrity: typeof e.integrity == "string" ? e.integrity : void 0
            })
        } else
            Tt.d.m(t)
}
;
At.requestFormReset = function(t) {
    Tt.d.r(t)
}
;
At.unstable_batchedUpdates = function(t, e) {
    return t(e)
}
;
At.useFormState = function(t, e, l) {
    return Ga.H.useFormState(t, e, l)
}
;
At.useFormStatus = function() {
    return Ga.H.useHostTransitionStatus()
}
;
At.version = "19.1.0";
(function(t) {
    function e() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)
            } catch (l) {
                console.error(l)
            }
    }
    e(),
    t.exports = At
}
)(Q1);
function L1(t, e) {
    if (t instanceof RegExp)
        return {
            keys: !1,
            pattern: t
        };
    var l, a, u, n, i = [], c = "", f = t.split("/");
    for (f[0] || f.shift(); u = f.shift(); )
        l = u[0],
        l === "*" ? (i.push(l),
        c += u[1] === "?" ? "(?:/(.*))?" : "/(.*)") : l === ":" ? (a = u.indexOf("?", 1),
        n = u.indexOf(".", 1),
        i.push(u.substring(1, ~a ? a : ~n ? n : u.length)),
        c += ~a && !~n ? "(?:/([^/]+?))?" : "/([^/]+?)",
        ~n && (c += (~a ? "?" : "") + "\\" + u.substring(n))) : c += "/" + u;
    return {
        keys: i,
        pattern: new RegExp("^" + c + (e ? "(?=$|/)" : "/?$"),"i")
    }
}
var Tc = {}
  , Z1 = {
    get exports() {
        return Tc
    },
    set exports(t) {
        Tc = t
    }
}
  , Zo = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ea = R;
function K1(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e
}
var J1 = typeof Object.is == "function" ? Object.is : K1
  , $1 = ea.useState
  , k1 = ea.useEffect
  , W1 = ea.useLayoutEffect
  , F1 = ea.useDebugValue;
function P1(t, e) {
    var l = e()
      , a = $1({
        inst: {
            value: l,
            getSnapshot: e
        }
    })
      , u = a[0].inst
      , n = a[1];
    return W1(function() {
        u.value = l,
        u.getSnapshot = e,
        Ui(u) && n({
            inst: u
        })
    }, [t, l, e]),
    k1(function() {
        return Ui(u) && n({
            inst: u
        }),
        t(function() {
            Ui(u) && n({
                inst: u
            })
        })
    }, [t]),
    F1(l),
    l
}
function Ui(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
        var l = e();
        return !J1(t, l)
    } catch {
        return !0
    }
}
function I1(t, e) {
    return e()
}
var ty = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? I1 : P1;
Zo.useSyncExternalStore = ea.useSyncExternalStore !== void 0 ? ea.useSyncExternalStore : ty;
(function(t) {
    t.exports = Zo
}
)(Z1);
const ey = G1["useInsertionEffect"]
  , ly = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u"
  , ay = ly ? R.useLayoutEffect : R.useEffect
  , uy = ey || ay
  , Ko = t => {
    const e = R.useRef([t, (...l) => e[0](...l)]).current;
    return uy( () => {
        e[0] = t
    }
    ),
    e[1]
}
  , ny = "popstate"
  , Uf = "pushState"
  , Nf = "replaceState"
  , iy = "hashchange"
  , $r = [ny, Uf, Nf, iy]
  , cy = t => {
    for (const e of $r)
        addEventListener(e, t);
    return () => {
        for (const e of $r)
            removeEventListener(e, t)
    }
}
  , Jo = (t, e) => Tc.useSyncExternalStore(cy, t, e)
  , fy = () => location.search
  , ry = ({ssrSearch: t=""}={}) => Jo(fy, () => t)
  , kr = () => location.pathname
  , sy = ({ssrPath: t}={}) => Jo(kr, t ? () => t : kr)
  , oy = (t, {replace: e=!1, state: l=null}={}) => history[e ? Nf : Uf](l, "", t)
  , dy = (t={}) => [sy(t), oy]
  , Wr = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Wr] > "u") {
    for (const t of [Uf, Nf]) {
        const e = history[t];
        history[t] = function() {
            const l = e.apply(this, arguments)
              , a = new Event(t);
            return a.arguments = arguments,
            dispatchEvent(a),
            l
        }
    }
    Object.defineProperty(window, Wr, {
        value: !0
    })
}
const hy = (t, e) => e.toLowerCase().indexOf(t.toLowerCase()) ? "~" + e : e.slice(t.length) || "/"
  , $o = (t="") => t === "/" ? "" : t
  , yy = (t, e) => t[0] === "~" ? t.slice(1) : $o(e) + t
  , my = (t="", e) => hy(Fr($o(t)), Fr(e))
  , Fr = t => {
    try {
        return decodeURI(t)
    } catch {
        return t
    }
}
  , ko = {
    hook: dy,
    searchHook: ry,
    parser: L1,
    base: "",
    ssrPath: void 0,
    ssrSearch: void 0,
    ssrContext: void 0,
    hrefs: t => t
}
  , Wo = R.createContext(ko)
  , ci = () => R.useContext(Wo)
  , Fo = {}
  , Po = R.createContext(Fo)
  , vy = () => R.useContext(Po)
  , Hf = t => {
    const [e,l] = t.hook(t);
    return [my(t.base, e), Ko( (a, u) => l(yy(a, t.base), u))]
}
  , Io = (t, e, l, a) => {
    const {pattern: u, keys: n} = e instanceof RegExp ? {
        keys: !1,
        pattern: e
    } : t(e || "*", a)
      , i = u.exec(l) || []
      , [c,...f] = i;
    return c !== void 0 ? [!0, ( () => {
        const r = n !== !1 ? Object.fromEntries(n.map( (v, s) => [v, f[s]])) : i.groups;
        let y = {
            ...f
        };
        return r && Object.assign(y, r),
        y
    }
    )(), ...a ? [c] : []] : [!1, null]
}
  , td = ({children: t, ...e}) => {
    var y, v;
    const l = ci()
      , a = e.hook ? ko : l;
    let u = a;
    const [n,i] = ((y = e.ssrPath) == null ? void 0 : y.split("?")) ?? [];
    i && (e.ssrSearch = i,
    e.ssrPath = n),
    e.hrefs = e.hrefs ?? ((v = e.hook) == null ? void 0 : v.hrefs);
    let c = R.useRef({})
      , f = c.current
      , r = f;
    for (let s in a) {
        const h = s === "base" ? a[s] + (e[s] || "") : e[s] || a[s];
        f === r && h !== r[s] && (c.current = r = {
            ...r
        }),
        r[s] = h,
        (h !== a[s] || h !== u[s]) && (u = r)
    }
    return R.createElement(Wo.Provider, {
        value: u,
        children: t
    })
}
  , Pr = ({children: t, component: e}, l) => e ? R.createElement(e, {
    params: l
}) : typeof t == "function" ? t(l) : t
  , gy = t => {
    let e = R.useRef(Fo);
    const l = e.current;
    return e.current = Object.keys(t).length !== Object.keys(l).length || Object.entries(t).some( ([a,u]) => u !== l[a]) ? t : l
}
  , Ir = ({path: t, nest: e, match: l, ...a}) => {
    const u = ci()
      , [n] = Hf(u)
      , [i,c,f] = l ?? Io(u.parser, t, n, e)
      , r = gy({
        ...vy(),
        ...c
    });
    if (!i)
        return null;
    const y = f ? R.createElement(td, {
        base: f
    }, Pr(a, r)) : Pr(a, r);
    return R.createElement(Po.Provider, {
        value: r,
        children: y
    })
}
;
R.forwardRef( (t, e) => {
    const l = ci()
      , [a,u] = Hf(l)
      , {to: n="", href: i=n, onClick: c, asChild: f, children: r, className: y, replace: v, state: s, ...h} = t
      , S = Ko(M => {
        M.ctrlKey || M.metaKey || M.altKey || M.shiftKey || M.button !== 0 || (c == null || c(M),
        M.defaultPrevented || (M.preventDefault(),
        u(i, t)))
    }
    )
      , A = l.hrefs(i[0] === "~" ? i.slice(1) : l.base + i, l);
    return f && R.isValidElement(r) ? R.cloneElement(r, {
        onClick: S,
        href: A
    }) : R.createElement("a", {
        ...h,
        onClick: S,
        href: A,
        className: y != null && y.call ? y(a === i) : y,
        children: r,
        ref: e
    })
}
);
const ed = t => Array.isArray(t) ? t.flatMap(e => ed(e && e.type === R.Fragment ? e.props.children : e)) : [t]
  , py = ({children: t, location: e}) => {
    const l = ci()
      , [a] = Hf(l);
    for (const u of ed(t)) {
        let n = 0;
        if (R.isValidElement(u) && (n = Io(l.parser, u.props.path, e || a, u.props.nest))[0])
            return R.cloneElement(u, {
                match: n
            })
    }
    return null
}
;
var jf = Tu()
  , B = t => Su(t, jf)
  , Cf = Tu();
B.write = t => Su(t, Cf);
var fi = Tu();
B.onStart = t => Su(t, fi);
var qf = Tu();
B.onFrame = t => Su(t, qf);
var Yf = Tu();
B.onFinish = t => Su(t, Yf);
var wl = [];
B.setTimeout = (t, e) => {
    const l = B.now() + e
      , a = () => {
        const n = wl.findIndex(i => i.cancel == a);
        ~n && wl.splice(n, 1),
        Be -= ~n ? 1 : 0
    }
      , u = {
        time: l,
        handler: t,
        cancel: a
    };
    return wl.splice(ld(l), 0, u),
    Be += 1,
    ad(),
    u
}
;
var ld = t => ~(~wl.findIndex(e => e.time > t) || ~wl.length);
B.cancel = t => {
    fi.delete(t),
    qf.delete(t),
    Yf.delete(t),
    jf.delete(t),
    Cf.delete(t)
}
;
B.sync = t => {
    Ac = !0,
    B.batchedUpdates(t),
    Ac = !1
}
;
B.throttle = t => {
    let e;
    function l() {
        try {
            t(...e)
        } finally {
            e = null
        }
    }
    function a(...u) {
        e = u,
        B.onStart(l)
    }
    return a.handler = t,
    a.cancel = () => {
        fi.delete(l),
        e = null
    }
    ,
    a
}
;
var Bf = typeof window < "u" ? window.requestAnimationFrame : () => {}
;
B.use = t => Bf = t;
B.now = typeof performance < "u" ? () => performance.now() : Date.now;
B.batchedUpdates = t => t();
B.catch = console.error;
B.frameLoop = "always";
B.advance = () => {
    B.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : nd()
}
;
var Ye = -1
  , Be = 0
  , Ac = !1;
function Su(t, e) {
    Ac ? (e.delete(t),
    t(0)) : (e.add(t),
    ad())
}
function ad() {
    Ye < 0 && (Ye = 0,
    B.frameLoop !== "demand" && Bf(ud))
}
function by() {
    Ye = -1
}
function ud() {
    ~Ye && (Bf(ud),
    B.batchedUpdates(nd))
}
function nd() {
    const t = Ye;
    Ye = B.now();
    const e = ld(Ye);
    if (e && (id(wl.splice(0, e), l => l.handler()),
    Be -= e),
    !Be) {
        by();
        return
    }
    fi.flush(),
    jf.flush(t ? Math.min(64, Ye - t) : 16.667),
    qf.flush(),
    Cf.flush(),
    Yf.flush()
}
function Tu() {
    let t = new Set
      , e = t;
    return {
        add(l) {
            Be += e == t && !t.has(l) ? 1 : 0,
            t.add(l)
        },
        delete(l) {
            return Be -= e == t && t.has(l) ? 1 : 0,
            t.delete(l)
        },
        flush(l) {
            e.size && (t = new Set,
            Be -= e.size,
            id(e, a => a(l) && t.add(a)),
            Be += t.size,
            e = t)
        }
    }
}
function id(t, e) {
    t.forEach(l => {
        try {
            e(l)
        } catch (a) {
            B.catch(a)
        }
    }
    )
}
var Sy = Object.defineProperty
  , Ty = (t, e) => {
    for (var l in e)
        Sy(t, l, {
            get: e[l],
            enumerable: !0
        })
}
  , la = {};
Ty(la, {
    assign: () => _y,
    colors: () => we,
    createStringInterpolator: () => Qf,
    skipAnimation: () => fd,
    to: () => cd,
    willAdvance: () => Xf
});
function Ay() {}
var Ey = (t, e, l) => Object.defineProperty(t, e, {
    value: l,
    writable: !0,
    configurable: !0
})
  , K = {
    arr: Array.isArray,
    obj: t => !!t && t.constructor.name === "Object",
    fun: t => typeof t == "function",
    str: t => typeof t == "string",
    num: t => typeof t == "number",
    und: t => t === void 0
};
function Oy(t, e) {
    if (K.arr(t)) {
        if (!K.arr(e) || t.length !== e.length)
            return !1;
        for (let l = 0; l < t.length; l++)
            if (t[l] !== e[l])
                return !1;
        return !0
    }
    return t === e
}
var zt = (t, e) => t.forEach(e);
function En(t, e, l) {
    if (K.arr(t)) {
        for (let a = 0; a < t.length; a++)
            e.call(l, t[a], `${a}`);
        return
    }
    for (const a in t)
        t.hasOwnProperty(a) && e.call(l, t[a], a)
}
var ja = t => K.und(t) ? [] : K.arr(t) ? t : [t], Gf = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent), Qf, cd, we = null, fd = !1, Xf = Ay, _y = t => {
    t.to && (cd = t.to),
    t.now && (B.now = t.now),
    t.colors !== void 0 && (we = t.colors),
    t.skipAnimation != null && (fd = t.skipAnimation),
    t.createStringInterpolator && (Qf = t.createStringInterpolator),
    t.requestAnimationFrame && B.use(t.requestAnimationFrame),
    t.batchedUpdates && (B.batchedUpdates = t.batchedUpdates),
    t.willAdvance && (Xf = t.willAdvance),
    t.frameLoop && (B.frameLoop = t.frameLoop)
}
, Qa = new Set, Lt = [], Ni = [], On = 0, Vf = {
    get idle() {
        return !Qa.size && !Lt.length
    },
    start(t) {
        On > t.priority ? (Qa.add(t),
        B.onStart(zy)) : (rd(t),
        B(Ec))
    },
    advance: Ec,
    sort(t) {
        if (On)
            B.onFrame( () => Vf.sort(t));
        else {
            const e = Lt.indexOf(t);
            ~e && (Lt.splice(e, 1),
            sd(t))
        }
    },
    clear() {
        Lt = [],
        Qa.clear()
    }
};
function zy() {
    Qa.forEach(rd),
    Qa.clear(),
    B(Ec)
}
function rd(t) {
