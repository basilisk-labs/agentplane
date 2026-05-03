Output docs/assets/agentplane-demo.gif
Set FontSize 18
Set Width 960
Set Height 540
Type "agentplane init"
Enter
Sleep 400ms
Type "agentplane quickstart"
Enter
Sleep 400ms
Type "agentplane task new --title 'Fix parser edge case'"
Enter
Sleep 400ms
Type "agentplane verify <task-id> --ok --note 'Focused tests passed.'"
Enter
Sleep 400ms
Type "agentplane finish <task-id> --result 'Parser rejects empty labels.' --commit HEAD"
Enter
Sleep 400ms
Type "agentplane acr generate <task-id> --write"
Enter
Sleep 400ms
Type "cat .agentplane/tasks/<task-id>/acr.json"
Enter
