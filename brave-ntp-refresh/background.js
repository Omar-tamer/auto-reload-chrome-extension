function isBlankTab(tab) {
  const url = tab.url || tab.pendingUrl || "";
  return (
    url === "" ||
    url === "about:blank" ||
    url.startsWith("chrome://newtab") ||
    url.startsWith("brave://newtab")
  );
}

chrome.runtime.onStartup.addListener(() => {
  setTimeout(async () => {
    const tabs = await chrome.tabs.query({});
    const blankTabs = tabs.filter(isBlankTab);

    for (const tab of blankTabs) {
      chrome.tabs.reload(tab.id);
    }
  }, 20);
});
