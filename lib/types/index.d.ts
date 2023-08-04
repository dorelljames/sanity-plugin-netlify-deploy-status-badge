declare declare namespace Tooltip {
    var propTypes: {
        text: PropTypes.Validator<string>;
        children: PropTypes.Validator<string | number | boolean | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    };
}
export interface NetlifyDeployStatusBadgeConfig {
    siteId: string;
    oauthClientId: string;
}
export const netlifyDeployStatusBadgePlugin: import("sanity").Plugin<NetlifyDeployStatusBadgeConfig>;

//# sourceMappingURL=index.d.ts.map
