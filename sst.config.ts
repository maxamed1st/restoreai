import { SSTConfig } from "sst";
import { NextjsSite, use } from "sst/constructs";
import storageStack from "./stacks/storageStack";

export default {
  config(_input) {
    return {
      name: "restoreai",
      region: "eu-west-2",
    };
  },

  stacks(app) {
    app.stack(storageStack);

    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        bind: [use(storageStack)]
      });
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
