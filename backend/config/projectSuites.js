const projectSuites = {
  "account-opening": ["smoke", "sanity", "regression"],
  "ckyc": ["smoke", "sanity", "regression"],
  "rekyc": ["smoke", "sanity", "regression"],
  "vcip": ["smoke", "sanity", "regression"],
  "trade-finance": ["smoke", "sanity", "regression"],
  "loan-origination": ["smoke", "sanity", "regression"],
  "mobile-banking": ["smoke", "sanity", "regression"],
  "internet-banking": ["smoke", "sanity", "regression"],
  "card-management": ["smoke", "sanity", "regression"],
  "payments": ["smoke", "sanity", "regression"],
  "customer-onboarding": ["smoke", "sanity", "regression"],
  "fraud-monitoring": ["smoke", "sanity", "regression"]
};

const projects = Object.keys(projectSuites);
const suites = ["smoke", "sanity", "regression"];

module.exports = { projects, suites, projectSuites };
