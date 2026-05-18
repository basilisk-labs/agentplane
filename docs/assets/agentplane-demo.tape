Output docs/assets/agentplane-demo.gif

Require agentplane
Require git
Require jq
Require python3

Set Shell bash
Set FontFamily "JetBrains Mono"
Set FontSize 18
Set Width 960
Set Height 540
Set Padding 28
Set Margin 28
Set MarginFill "#0f1117"
Set BorderRadius 16
Set WindowBar Colorful
Set Theme "TokyoNight"
Set Framerate 60
Set TypingSpeed 28ms
Set CursorBlink false

Env TERM "xterm-256color"
Env CLICOLOR_FORCE "1"
Env NO_COLOR "0"

Hide
Type 'rm -rf /tmp/agentplane-vhs-demo && mkdir -p /tmp/agentplane-vhs-demo && cd /tmp/agentplane-vhs-demo'
Enter
Sleep 200ms

Type 'git init -q'
Enter
Sleep 150ms

Type 'git config user.name "Agentplane Demo" && git config user.email demo@example.local'
Enter
Sleep 150ms

Type 'printf "baseline\n" > parser.js && git add parser.js && git commit -qm "demo baseline"'
Enter
Sleep 150ms

Type 'clear'
Enter
Show

Sleep 700ms

Type 'agentplane init --setup-profile light --workflow direct --backend local --hooks false --recipes none --yes'
Enter
Sleep 2200ms

Type 'agentplane task new --title "Fix parser edge case" --description "Reject empty labels." --owner CODER --tag code --verify "git diff --check"'
Enter
Sleep 1600ms

Hide
Type 'export TASK_ID=$(ls -t .agentplane/tasks | head -n 1)'
Enter
Sleep 150ms
Show

Type 'agentplane task plan set $TASK_ID --text "Add a guard for empty labels and verify the parser path." --updated-by CODER'
Enter
Sleep 1200ms

Type 'agentplane task plan approve $TASK_ID --by ORCHESTRATOR'
Enter
Sleep 1000ms

Type 'agentplane task start-ready $TASK_ID --author CODER --body "Start: implement parser validation with a focused empty-label guard."'
Enter
Sleep 1200ms

Hide
Type 'printf "%s\n" "export function parseLabel(value) { if (!value.trim()) throw new Error(String.fromCharCode(101,109,112,116,121,32,108,97,98,101,108)); return value.trim(); }" > parser.js'
Enter
Sleep 300ms
Show

Type 'git diff -- parser.js'
Enter
Sleep 1400ms

Type 'git diff --check'
Enter
Sleep 700ms

Type 'git add parser.js && git commit -qm "fix parser empty label handling"'
Enter
Sleep 900ms

Type 'agentplane verify $TASK_ID --ok --by REVIEWER --note "Focused parser checks passed for the empty-label guard."'
Enter
Sleep 1100ms

Type 'agentplane finish $TASK_ID --author INTEGRATOR --body "Verified: focused parser checks passed for the empty-label guard and closure commit is recorded." --result "Parser rejects empty labels." --commit HEAD'
Enter
Sleep 1600ms

Type 'jq "{task: .task.title, plan: .plan.status, verification: .verification.status, merge_ready: .result.merge_ready}" .agentplane/tasks/$TASK_ID/acr.json'
Enter
Sleep 2200ms

Type 'agentplane acr check $TASK_ID --require-plan-approved --require-verification'
Enter
Sleep 1400ms
