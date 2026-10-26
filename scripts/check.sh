
#!/usr/bin/env bash
set -eu

echo "Starting project checks..."

test -f index.html
test -f style.css
test -f script.js

grep -q '<title>' index.html
grep -q 'taskForm' script.js
grep -q 'saveTasks' script.js

echo "PASS: Required files exist."
echo "PASS: HTML title found."
echo "PASS: Task functionality found."
echo "All project checks passed!"

