export interface AuthResponse {
  access_token: string;
  token_type: string;
  scope?: string;
}

export interface NetlifyDeploy {
  id: string;
  title?: string;
  name: string;
  created_at: string; // "2021-05-09T00:35:56.108Z"
  context: string; // production | deploy-preview
  branch: string;
  commit_url: string;
  commit_ref: string;
  deploy_time: number;
  state: "ready" | "error" | "building" | "enqueued" | "processing" | "new";
  deploy_url: string;
  error_message: string;
  plugin_state: "failed_build";
}

export interface NetlifySite {
  id: string;
  site_id: string;
  published_deploy: NetlifyDeploy;
}

export interface DeployItemProps {
  deploy: NetlifyDeploy;
  publishedDeployId: NetlifyDeploy["id"];
}

export interface NetlifyStatusBadgeConfig {
  apiId: NetlifyDeploy["id"];
  auth: {
    oauthClientId?: string;
    personalAccessToken?: string;
  };
}

export interface SetupAuthButtonProps {
  isSitePrivate: boolean;
  onAuthorize: () => string;
}

export interface SetupOAuthButtonProps {
  isSitePrivate: boolean;
}

export interface HeaderButtonsProps {
  showTriggerDeployButton: boolean;
  onTriggerBuild: (clearCache?: boolean) => void;
  onLogout: () => void;
}
