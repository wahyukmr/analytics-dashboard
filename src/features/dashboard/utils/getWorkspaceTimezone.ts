export function getWorkspaceTimezone() {
  console.log("timezone");

  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
