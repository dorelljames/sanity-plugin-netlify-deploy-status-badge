import {jsxDEV as $7XdDa$jsxDEV, Fragment as $7XdDa$Fragment} from "react/jsx-dev-runtime";
import $7XdDa$react, {useState as $7XdDa$useState} from "react";
import {createPlugin as $7XdDa$createPlugin} from "sanity";
import {isToday as $7XdDa$isToday, format as $7XdDa$format, isYesterday as $7XdDa$isYesterday, getYear as $7XdDa$getYear} from "date-fns";
import {useToast as $7XdDa$useToast, ThemeProvider as $7XdDa$ThemeProvider, studioTheme as $7XdDa$studioTheme, Container as $7XdDa$Container, Card as $7XdDa$Card, Flex as $7XdDa$Flex, Stack as $7XdDa$Stack, Heading as $7XdDa$Heading, Text as $7XdDa$Text, Button as $7XdDa$Button, Inline as $7XdDa$Inline, MenuButton as $7XdDa$MenuButton, Menu as $7XdDa$Menu, MenuItem as $7XdDa$MenuItem, Grid as $7XdDa$Grid, Box as $7XdDa$Box, Badge as $7XdDa$Badge, Tooltip as $7XdDa$Tooltip} from "@sanity/ui";
import {ArrowRightIcon as $7XdDa$ArrowRightIcon, ArrowTopRightIcon as $7XdDa$ArrowTopRightIcon} from "@sanity/icons";
import $7XdDa$proptypes from "prop-types";







const $9f26f9f7274adc0d$export$2e1428318ce90e77 = (time)=>{
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (minutes === 0 && seconds === 0) return "";
    return `Deployed in ${minutes > 0 ? `${minutes}m` : ""} ${seconds > 0 ? `${seconds}s` : ""}`;
};
const $9f26f9f7274adc0d$export$51fdeb3d5b7c53dd = (d)=>{
    if ((0, $7XdDa$isToday)(d)) return `Today at ${(0, $7XdDa$format)(d, "p")}`;
    if ((0, $7XdDa$isYesterday)(d)) return `Yesterday at ${(0, $7XdDa$format)(d, "p")}`;
    const localizedDate = (0, $7XdDa$format)(d, "PP").replace(`, ${(0, $7XdDa$getYear)(d)}`, "");
    return `${localizedDate} at ${(0, $7XdDa$format)(d, "p")}`;
};
const $9f26f9f7274adc0d$export$7909f33e9db22a6b = (siteId)=>{
    const time = new Date().getTime();
    return fetch(`https://api.netlify.com/api/v1/badges/${siteId}/deploy-status?${time}`);
};
const $9f26f9f7274adc0d$export$1b8dad9516b20df3 = (siteId, options)=>fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, options);
const $9f26f9f7274adc0d$export$5162914810bfd3ff = (siteId, options)=>fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, options);
const $9f26f9f7274adc0d$export$9147b4b5868600bc = ({ siteId: siteId , clearCache: clearCache , headers: headers  })=>{
    const options = {
        method: "POST",
        headers: headers,
        // eslint-disable-next-line camelcase
        body: JSON.stringify({
            clear_cache: clearCache
        })
    };
    return fetch(`https://api.netlify.com/api/v1/sites/${siteId}/builds`, options);
};
const $9f26f9f7274adc0d$export$52334e1698bc18cb = (deploy, publishedDeployId = "")=>{
    if (publishedDeployId === deploy?.id) return "published";
    if (deploy.state === "error" && deploy?.error_message?.toLowerCase().includes("canceled build") && deploy?.plugin_state === "failed_build") return "failed_due_to_plugin_error";
    if (deploy?.state === "error" && deploy?.error_message?.toLowerCase().includes("build script returned non-zero exit code")) return "failed";
    if (deploy?.state === "error" || deploy?.error_message?.toLowerCase().includes("canceled build")) return "canceled";
    return "";
};


function $2fbf39ab67896983$export$2e2bcd8739ae039(props) {
    const { siteId: siteId  } = props;
    const [icon, setIcon] = (0, $7XdDa$react).useState("");
    (0, $7XdDa$react).useEffect(()=>{
        initializeBadge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Refresh icon on every interval
    // React.useEffect(() => {
    //   const interval = setInterval(() => {
    //     initializeBadge();
    //   }, BADGE_REFRESH_INTERVAL);
    //   return () => clearInterval(interval);
    // }, []);
    function initializeBadge() {
        (0, $9f26f9f7274adc0d$export$7909f33e9db22a6b)(siteId).then((res)=>{
            if (!res.ok) throw new Error(res.statusText);
            return res.text();
        }).then(setIcon).catch(()=>setIcon(`Netlify Site 404`));
    }
    // eslint-disable-next-line react/no-danger
    return /*#__PURE__*/ (0, $7XdDa$jsxDEV)("div", {
        dangerouslySetInnerHTML: {
            __html: icon
        }
    }, void 0, false, {
        fileName: "src/components/Icon.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}













function $f81559bb61b81309$export$2e2bcd8739ae039({ text: text , children: children  }) {
    return /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Tooltip), {
        content: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Box), {
            padding: 2,
            children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Text), {
                muted: true,
                size: 1,
                children: text
            }, void 0, false, void 0, void 0)
        }, void 0, false, void 0, void 0),
        fallbackPlacements: [
            "right",
            "left"
        ],
        placement: "top",
        children: children
    }, void 0, false, {
        fileName: "src/components/Tooltip.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
$f81559bb61b81309$export$2e2bcd8739ae039.propTypes = {
    text: (0, $7XdDa$proptypes).string.isRequired,
    children: (0, $7XdDa$proptypes).node.isRequired
};



function $71e75f663391412e$export$2e2bcd8739ae039({ deploy: deploy , site: site  }) {
    return /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Card), {
        borderBottom: true,
        as: "li",
        padding: 4,
        radius: 2,
        children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Grid), {
            columns: 6,
            children: [
                /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Box), {
                    column: 4,
                    children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Stack), {
                        space: 3,
                        children: [
                            /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Flex), {
                                align: "center",
                                children: [
                                    /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Text), {
                                        weight: "semibold",
                                        children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)("a", {
                                            href: deploy?.deploy_url,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            style: {
                                                textTransform: `capitalize`
                                            },
                                            children: deploy.context.replace("-", " ")
                                        }, void 0, false, {
                                            fileName: "src/components/DeployItem.tsx",
                                            lineNumber: 22,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/DeployItem.tsx",
                                        lineNumber: 21,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Text), {
                                        weight: "semibold",
                                        children: [
                                            " ",
                                            ":",
                                            deploy?.branch,
                                            "@",
                                            /*#__PURE__*/ (0, $7XdDa$jsxDEV)("a", {
                                                href: deploy?.commit_url || "",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                children: [
                                                    deploy?.commit_ref?.substring(0, 7) || "HEAD",
                                                    " "
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/DeployItem.tsx",
                                                lineNumber: 34,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/DeployItem.tsx",
                                        lineNumber: 31,
                                        columnNumber: 15
                                    }, this),
                                    deploy.state === "new" && !deploy?.deploy_time && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Badge), {
                                        mode: "outline",
                                        tone: "caution",
                                        padding: 1,
                                        marginLeft: 1,
                                        children: "New"
                                    }, void 0, false, {
                                        fileName: "src/components/DeployItem.tsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this),
                                    deploy.state === "building" && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Badge), {
                                        mode: "outline",
                                        tone: "caution",
                                        padding: 1,
                                        marginLeft: 1,
                                        children: "Building"
                                    }, void 0, false, {
                                        fileName: "src/components/DeployItem.tsx",
                                        lineNumber: 48,
                                        columnNumber: 17
                                    }, this),
                                    (0, $9f26f9f7274adc0d$export$52334e1698bc18cb)(deploy, site?.published_deploy?.id) === "published" && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Badge), {
                                        mode: "outline",
                                        tone: "positive",
                                        padding: 1,
                                        marginLeft: 1,
                                        children: "Published"
                                    }, void 0, false, {
                                        fileName: "src/components/DeployItem.tsx",
                                        lineNumber: 54,
                                        columnNumber: 17
                                    }, this),
                                    (0, $9f26f9f7274adc0d$export$52334e1698bc18cb)(deploy) === "canceled" && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Badge), {
                                        mode: "outline",
                                        padding: 1,
                                        marginLeft: 1,
                                        children: "Canceled"
                                    }, void 0, false, {
                                        fileName: "src/components/DeployItem.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this),
                                    (0, $9f26f9f7274adc0d$export$52334e1698bc18cb)(deploy) === "failed" && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Badge), {
                                        mode: "outline",
                                        tone: "critical",
                                        padding: 1,
                                        marginLeft: 1,
                                        children: "Failed"
                                    }, void 0, false, {
                                        fileName: "src/components/DeployItem.tsx",
                                        lineNumber: 69,
                                        columnNumber: 17
                                    }, this),
                                    (0, $9f26f9f7274adc0d$export$52334e1698bc18cb)(deploy) === "failed_due_to_plugin_error" && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Badge), {
                                        mode: "outline",
                                        tone: "critical",
                                        padding: 1,
                                        marginLeft: 1,
                                        children: "Failed Due To Plugin Error"
                                    }, void 0, false, {
                                        fileName: "src/components/DeployItem.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/DeployItem.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Text), {
                                muted: true,
                                children: deploy?.title || "No deploy message"
                            }, void 0, false, {
                                fileName: "src/components/DeployItem.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/DeployItem.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/DeployItem.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Flex), {
                    column: 2,
                    justify: "flex-end",
                    align: "center",
                    style: {
                        textAlign: "right"
                    },
                    children: [
                        /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Stack), {
                            space: 3,
                            children: [
                                /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Text), {
                                    weight: "semibold",
                                    children: (0, $9f26f9f7274adc0d$export$51fdeb3d5b7c53dd)(new Date(deploy?.created_at))
                                }, void 0, false, {
                                    fileName: "src/components/DeployItem.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                deploy?.deploy_time && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Text), {
                                    muted: true,
                                    size: 1,
                                    children: (0, $9f26f9f7274adc0d$export$2e1428318ce90e77)(deploy?.deploy_time)
                                }, void 0, false, {
                                    fileName: "src/components/DeployItem.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/DeployItem.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Box), {
                            marginLeft: 2,
                            children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $f81559bb61b81309$export$2e2bcd8739ae039), {
                                text: "View Deploy",
                                children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Button), {
                                    tone: "primary",
                                    icon: (0, $7XdDa$ArrowTopRightIcon),
                                    mode: "ghost",
                                    as: "a",
                                    href: `https://app.netlify.com/sites/${deploy?.name}/deploys/${deploy?.id}`,
                                    target: "_blank",
                                    rel: "noopener noreferrer"
                                }, void 0, false, {
                                    fileName: "src/components/DeployItem.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/DeployItem.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/DeployItem.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/DeployItem.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/DeployItem.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, deploy?.id, false, {
        fileName: "src/components/DeployItem.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}



const $513a6452b1f07fd5$export$76a88f7de6507443 = "netlify-deploy-status-badge";
const $513a6452b1f07fd5$export$9ad69a5a3ec0e169 = 10000;
const $513a6452b1f07fd5$export$78b6cf0d0a02573d = 10000;


const $dbdfdfd92d947c77$var$initialAuthResponse = {
    // eslint-disable-next-line camelcase
    access_token: ""
};
function $dbdfdfd92d947c77$export$2e2bcd8739ae039({ oauthClientId: oauthClientId  }) {
    const [authResponse, setAuthResponse] = (0, $7XdDa$react).useState($dbdfdfd92d947c77$var$initialAuthResponse);
    // Process our response from authorization
    // React.useEffect(() => {
    //   if (document.location.hash) {
    //     const response = document.location.hash
    //       .replace(/^#/, "")
    //       .split("&")
    //       .reduce((result, pair) => {
    //         const keyValue = pair.split("=");
    //         result[keyValue[0]] = keyValue[1];
    //         return result;
    //       }, {});
    //     // Remove the token so it's not visible in the URL after we're done
    //     document.location.hash = "";
    //     setAuthResponse(response);
    //     window.localStorage.setItem(
    //       `${namespace}--auth`,
    //       JSON.stringify(response)
    //     );
    //   }
    // }, []);
    // Set auth token from localStorage
    (0, $7XdDa$react).useEffect(()=>{
        const authToken = window.localStorage.getItem(`${(0, $513a6452b1f07fd5$export$76a88f7de6507443)}--auth`);
        if (authToken) setAuthResponse(JSON.parse(authToken));
    }, []);
    const getAuthURL = ()=>{
        return `https://app.netlify.com/authorize?client_id=${oauthClientId}&response_type=token&redirect_uri=${window.location.href}`;
    };
    const logout = ()=>{
        return new Promise((resolve, reject)=>{
            window.localStorage.removeItem(`${(0, $513a6452b1f07fd5$export$76a88f7de6507443)}--auth`);
            if (!window.localStorage.getItem(`${(0, $513a6452b1f07fd5$export$76a88f7de6507443)}--auth`)) {
                setAuthResponse($dbdfdfd92d947c77$var$initialAuthResponse);
                resolve("OK");
            }
            reject(new Error("Unable to logout!"));
        });
    };
    const getHeaders = ()=>{
        const headers = authResponse ? {
            headers: {
                Authorization: `Bearer ${authResponse.access_token}`
            }
        } : null;
        return headers;
    };
    return {
        authResponse: authResponse,
        getAuthURL: getAuthURL,
        getHeaders: getHeaders,
        logout: logout
    };
}



function $6050b7c693ab933a$export$2e2bcd8739ae039(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = (0, $7XdDa$useState)(()=>{
        if (typeof window === "undefined") return initialValue;
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            // eslint-disable-next-line no-console
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value)=>{
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };
    return [
        storedValue,
        setValue
    ];
}








const $dde23136af83ad22$var$STATE = {
    IDLE: "idle",
    LOADING: "loading",
    READY: "ready",
    ERROR: "error",
    NEEDS_AUTH: "needs_auth",
    AUTHENTICATING: "authenticating",
    NOT_FOUND: "site_not_found"
};
function $dde23136af83ad22$export$2e2bcd8739ae039(props) {
    const { siteId: siteId , oauthClientId: oauthClientId  } = props;
    const toast = (0, $7XdDa$useToast)();
    const { getAuthURL: getAuthURL , authResponse: authResponse , logout: logout  } = (0, $dbdfdfd92d947c77$export$2e2bcd8739ae039)({
        oauthClientId: oauthClientId
    });
    const [site, setSite] = (0, $6050b7c693ab933a$export$2e2bcd8739ae039)(`${(0, $513a6452b1f07fd5$export$76a88f7de6507443)}--site`, null);
    const [deploys, setDeploys] = (0, $6050b7c693ab933a$export$2e2bcd8739ae039)(`${(0, $513a6452b1f07fd5$export$76a88f7de6507443)}--deploys`, []);
    const [isSitePrivate, setIsSitePrivate] = (0, $7XdDa$react).useState(false);
    const [state, setState] = (0, $7XdDa$react).useState("idle"); // (loading > ready | error), (loading > needs_auth > authenticating > error | ready)
    const needsSetup = !oauthClientId;
    const isLoggedIn = authResponse;
    const needsAuth = !needsSetup && !isLoggedIn;
    const requestOptions = (0, $7XdDa$react).useMemo(()=>{
        return {
            headers: {
                Authorization: `Bearer ${authResponse.access_token}`
            }
        };
    }, [
        authResponse.access_token
    ]);
    const initOrRefreshApp = (0, $7XdDa$react).useCallback(()=>{
        (0, $9f26f9f7274adc0d$export$5162914810bfd3ff)(siteId, requestOptions).then((res)=>res.json()).then(setSite);
        (0, $9f26f9f7274adc0d$export$1b8dad9516b20df3)(siteId, requestOptions).then((res)=>{
            if (!res.ok) throw new Error(res.statusText);
            return res;
        }).then((res)=>res.json()).then(setDeploys).then(()=>setTimeout(()=>setState($dde23136af83ad22$var$STATE.READY), 1000)).catch(()=>{
            if (isSitePrivate) setState($dde23136af83ad22$var$STATE.ERROR);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        siteId
    ]);
    // Check if we need auth, if not, good :)
    (0, $7XdDa$react).useEffect(()=>{
        setState($dde23136af83ad22$var$STATE.LOADING);
        (0, $9f26f9f7274adc0d$export$1b8dad9516b20df3)(siteId).then((res)=>{
            if (!res.ok && res.status === 401) throw new Error(res.statusText);
            return res;
        }).then((res)=>res.json()).then(setDeploys).then(()=>setTimeout(()=>setState($dde23136af83ad22$var$STATE.READY), 1000)).then(()=>{
            (0, $9f26f9f7274adc0d$export$5162914810bfd3ff)(siteId).then((res)=>res.json()).then(setSite);
        }).catch(()=>{
            setState($dde23136af83ad22$var$STATE.NEEDS_AUTH);
            setIsSitePrivate(true);
        });
    }, [
        setDeploys,
        setSite,
        siteId
    ]);
    // We need auth here
    (0, $7XdDa$react).useEffect(()=>{
        if (state === $dde23136af83ad22$var$STATE.NEEDS_AUTH && isSitePrivate && siteId && isLoggedIn) initOrRefreshApp();
    }, [
        isSitePrivate,
        siteId,
        isLoggedIn,
        state,
        initOrRefreshApp
    ]);
    // Refresh App on every interval
    (0, $7XdDa$react).useEffect(()=>{
        // eslint-disable-next-line no-undef
        let interval;
        if (state === $dde23136af83ad22$var$STATE.READY) interval = setInterval(()=>{
            toast.push({
                title: `Refreshing site deploys...`,
                status: "info"
            });
            initOrRefreshApp();
        }, (0, $513a6452b1f07fd5$export$9ad69a5a3ec0e169));
        return ()=>clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function handleTriggerBuild(clearCache = false) {
        (0, $9f26f9f7274adc0d$export$9147b4b5868600bc)({
            siteId: site.id,
            clearCache: clearCache,
            headers: requestOptions.headers
        }).then((res)=>{
            if (!res.ok) throw new Error(res.statusText);
            return res;
        }).then(()=>{
            toast.push({
                title: `Successfully triggered new build ${clearCache ? "without cache" : ""}!`,
                status: "success"
            });
            initOrRefreshApp();
        }).catch(()=>{
            toast.push({
                title: `Oops, unable to trigger new build`,
                status: "warning"
            });
        });
    }
    function handleClickAuthorize() {
        return window.location.href = getAuthURL();
    }
    function handleClickLogout() {
        return logout().then(()=>{
            if (isSitePrivate) {
                setDeploys([]);
                window.localStorage.removeItem(`${(0, $513a6452b1f07fd5$export$76a88f7de6507443)}--site`);
                window.localStorage.removeItem(`${(0, $513a6452b1f07fd5$export$76a88f7de6507443)}--deploys`);
            }
            setState($dde23136af83ad22$var$STATE.IDLE);
        });
    }
    return /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$ThemeProvider), {
        theme: (0, $7XdDa$studioTheme),
        children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Container), {
            children: [
                /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Card), {
                    margin: 2,
                    padding: 4,
                    radius: 2,
                    children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Flex), {
                        justify: "space-between",
                        align: "center",
                        children: [
                            /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Stack), {
                                space: 4,
                                children: [
                                    /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Heading), {
                                        size: 3,
                                        as: "h2",
                                        children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Flex), {
                                            marginRight: 5,
                                            align: "center",
                                            children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)("span", {
                                                style: {
                                                    marginRight: 10
                                                },
                                                children: "Site Deploys (Changes)"
                                            }, void 0, false, {
                                                fileName: "src/components/App.tsx",
                                                lineNumber: 180,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/App.tsx",
                                            lineNumber: 179,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/App.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Text), {
                                        muted: true,
                                        children: "Displaying your recent site deploys."
                                    }, void 0, false, {
                                        fileName: "src/components/App.tsx",
                                        lineNumber: 185,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/App.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Stack), {
                                space: 3,
                                children: [
                                    needsSetup && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Fragment), {
                                        children: [
                                            /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Button), {
                                                as: "a",
                                                text: "Click here to setup OAuth",
                                                href: "https://github.com/dorelljames/sanity-plugin-netlify-deploy-status-badge#configuration",
                                                target: "_blank",
                                                rel: "noopener noreferrer"
                                            }, void 0, false, {
                                                fileName: "src/components/App.tsx",
                                                lineNumber: 190,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Text), {
                                                muted: true,
                                                size: 1,
                                                children: isSitePrivate ? "Setup Netlify's OAuth and login to view site deploys, etc." : "Setup OAuth to trigger a new build."
                                            }, void 0, false, {
                                                fileName: "src/components/App.tsx",
                                                lineNumber: 197,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    needsAuth && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Fragment), {
                                        children: [
                                            /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Button), {
                                                text: "Login at Netlify",
                                                onClick: handleClickAuthorize,
                                                tone: "positive"
                                            }, void 0, false, {
                                                fileName: "src/components/App.tsx",
                                                lineNumber: 206,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Text), {
                                                muted: true,
                                                size: 1,
                                                children: isSitePrivate ? "Login in order to view site's deploy log and trigger a new build" : "Login in order to trigger a new build"
                                            }, void 0, false, {
                                                fileName: "src/components/App.tsx",
                                                lineNumber: 211,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    isLoggedIn && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Flex), {
                                        children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Inline), {
                                            space: 2,
                                            children: [
                                                state === "ready" && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$MenuButton), {
                                                    button: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Button), {
                                                        text: "Trigger Deploy"
                                                    }, void 0, false, void 0, void 0),
                                                    id: "menu-button-example",
                                                    menu: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Menu), {
                                                        children: [
                                                            /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$MenuItem), {
                                                                text: "Deploy site",
                                                                onClick: ()=>handleTriggerBuild()
                                                            }, void 0, false, void 0, void 0),
                                                            /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$MenuItem), {
                                                                text: "Clear cache and deploy site",
                                                                onClick: ()=>handleTriggerBuild(true)
                                                            }, void 0, false, void 0, void 0)
                                                        ]
                                                    }, void 0, true, void 0, void 0)
                                                }, void 0, false, {
                                                    fileName: "src/components/App.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Button), {
                                                    text: "Logout",
                                                    onClick: handleClickLogout,
                                                    icon: (0, $7XdDa$ArrowRightIcon)
                                                }, void 0, false, {
                                                    fileName: "src/components/App.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/App.tsx",
                                            lineNumber: 220,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/App.tsx",
                                        lineNumber: 219,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/App.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/App.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/App.tsx",
                    lineNumber: 175,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Card), {
                    margin: 4,
                    children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Stack), {
                        as: "ul",
                        children: [
                            state === "error" && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Card), {
                                padding: 4,
                                radius: 2,
                                tone: "critical",
                                children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Stack), {
                                    space: 4,
                                    children: [
                                        /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Heading), {
                                            children: "Oh nooo! Something went wrong here..."
                                        }, void 0, false, {
                                            fileName: "src/components/App.tsx",
                                            lineNumber: 256,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Text), {
                                            children: [
                                                "Please make sure you have access to the site configured. Try refreshing this page. If error still persists, please contact plugin author",
                                                /*#__PURE__*/ (0, $7XdDa$jsxDEV)("a", {
                                                    href: "mailto:netlify-deploy-status-badge+galangdj@gmail.com",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    children: "@dorelljames"
                                                }, void 0, false, {
                                                    fileName: "src/components/App.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 21
                                                }, this),
                                                " ",
                                                "or your developer."
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/App.tsx",
                                            lineNumber: 257,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "src/components/App.tsx",
                                    lineNumber: 255,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/App.tsx",
                                lineNumber: 254,
                                columnNumber: 15
                            }, this),
                            (state === "loading" || state === "needs_auth" && isLoggedIn) && /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Card), {
                                borderBottom: true,
                                as: "li",
                                padding: 4,
                                radius: 2,
                                children: /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $7XdDa$Text), {
                                    as: "em",
                                    children: "Getting things ready..."
                                }, void 0, false, {
                                    fileName: "src/components/App.tsx",
                                    lineNumber: 277,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/App.tsx",
                                lineNumber: 276,
                                columnNumber: 15
                            }, this),
                            deploys?.map((deploy)=>/*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $71e75f663391412e$export$2e2bcd8739ae039), {
                                    deploy: deploy,
                                    site: site
                                }, deploy.id, false, {
                                    fileName: "src/components/App.tsx",
                                    lineNumber: 282,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "src/components/App.tsx",
                        lineNumber: 252,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/App.tsx",
                    lineNumber: 251,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/App.tsx",
            lineNumber: 174,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "src/components/App.tsx",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}


const $357f50a17451fe9f$export$31048b4c0f77ddeb = (0, $7XdDa$createPlugin)((config)=>{
    return {
        name: "netlify-deploy-status-badge",
        tools: (prev)=>{
            return [
                ...prev,
                {
                    name: "netlify-badge",
                    title: "\u200E",
                    // eslint-disable-next-line func-name-matching
                    icon: function component() {
                        return /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $2fbf39ab67896983$export$2e2bcd8739ae039), {
                            ...config
                        }, void 0, false, {
                            fileName: "src/index.tsx",
                            lineNumber: 23,
                            columnNumber: 22
                        }, this);
                    },
                    component: function component() {
                        return /*#__PURE__*/ (0, $7XdDa$jsxDEV)((0, $dde23136af83ad22$export$2e2bcd8739ae039), {
                            ...config
                        }, void 0, false, {
                            fileName: "src/index.tsx",
                            lineNumber: 26,
                            columnNumber: 22
                        }, this);
                    }
                }, 
            ];
        }
    };
});


export {$357f50a17451fe9f$export$31048b4c0f77ddeb as netlifyDeployStatusBadgePlugin};
//# sourceMappingURL=index.js.map
