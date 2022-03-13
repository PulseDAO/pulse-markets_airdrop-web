import { renderHook } from "tests";
import { useEVMWalletSelectorContext } from "./useEVMWalletSelectorContext";

describe("useEVMWalletSelectorContext", () => {
  it("returns a value", async () => {
    const { result } = renderHook(() => useEVMWalletSelectorContext());

    expect(result.current).toEqual("1");
  });
});
