export declare const COMMAND_SNIPPETS: {
    readonly core: {
        readonly configShow: string;
        readonly incidentsAdvise: string;
        readonly incidentsCollect: string;
        readonly taskList: string;
        readonly taskShow: string;
        readonly taskNew: string;
        readonly taskPlanSet: string;
        readonly taskPlanApprove: string;
        readonly taskVerifyShow: string;
        readonly startTask: string;
        readonly verifyTask: string;
        readonly finishTask: string;
        readonly quickstart: string;
        readonly role: string;
    };
    readonly sync: {
        readonly pullConfigured: "agentplane sync --direction pull";
        readonly pushConfiguredWithYes: "agentplane sync --direction push --yes";
        readonly pullRedmineExplicit: "agentplane sync redmine --direction pull";
        readonly pushRedmineExplicitWithYes: "agentplane sync redmine --direction push --yes";
    };
    readonly backendSync: {
        readonly pullLocal: "agentplane backend sync local --direction pull";
        readonly pullRedmine: "agentplane backend sync redmine --direction pull";
        readonly pushRedmineWithYes: "agentplane backend sync redmine --direction push --yes";
    };
};
//# sourceMappingURL=command-snippets.d.ts.map