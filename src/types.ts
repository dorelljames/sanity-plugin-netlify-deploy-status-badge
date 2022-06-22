export type SiteId = string;
export type DeployId = string;

export interface DeployInterface {
  id: DeployId;
  title: string;
  name: string;
  created_at: string;
  context: string;
  branch: string;
  commit_url: string;
  commit_ref: string;
  deploy_time: number;
  state: "new" | "building" | "error";
  deploy_url: string;
  error_message: string;
  plugin_state: string;
}

export interface SiteInterface {
  id: SiteId;
  published_deploy: DeployInterface;
}

export interface RequestOptions {
  headers?: { [key: string]: string };
}
