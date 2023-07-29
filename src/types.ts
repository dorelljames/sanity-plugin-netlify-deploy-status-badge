export interface NetlifySite {
  id: string;
}

export interface NetlifyDeploy {
  id: string;
  state: "ready" | "error" | "building" | "enqueued" | "processing";
  error_message: string;
  plugin_state: "failed_build";
}

export interface NetlifyStatusBadgeConfig {
  apiId: NetlifyDeploy["id"];
  auth: {
    oauthClientId?: string;
    personalAccessToken?: string;
  };
}
