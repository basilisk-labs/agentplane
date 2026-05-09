import { describe, expect, it, vi } from "vitest";

import { configureCloudFetchAddressSelection } from "./cloud-backend-utils.js";

describe("cloud backend utilities", () => {
  it("raises too-low Node address-selection attempt timeout for cloud fetch transport", () => {
    const setDefaultAutoSelectFamilyAttemptTimeout = vi.fn();

    configureCloudFetchAddressSelection({
      getDefaultAutoSelectFamilyAttemptTimeout: () => 250,
      setDefaultAutoSelectFamilyAttemptTimeout,
    });

    expect(setDefaultAutoSelectFamilyAttemptTimeout).toHaveBeenCalledWith(1000);
  });

  it("preserves the target Node address-selection attempt timeout", () => {
    const setDefaultAutoSelectFamilyAttemptTimeout = vi.fn();

    configureCloudFetchAddressSelection({
      getDefaultAutoSelectFamilyAttemptTimeout: () => 1000,
      setDefaultAutoSelectFamilyAttemptTimeout,
    });

    expect(setDefaultAutoSelectFamilyAttemptTimeout).not.toHaveBeenCalled();
  });

  it("lowers the default Node address-selection attempt timeout for cloud fetch transport", () => {
    const setDefaultAutoSelectFamilyAttemptTimeout = vi.fn();

    configureCloudFetchAddressSelection({
      getDefaultAutoSelectFamilyAttemptTimeout: () => 10_000,
      setDefaultAutoSelectFamilyAttemptTimeout,
    });

    expect(setDefaultAutoSelectFamilyAttemptTimeout).toHaveBeenCalledWith(1000);
  });
});
