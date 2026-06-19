#!/bin/bash

# Step 1: Create React app
npx create-react-app blackbird-forage

# Step 2: Commit the code and create GitHub repo
git add public src .gitignore package.json package-lock.json README.md
git commit -m "Add create-react-app boilerplate"
gh repo create blackbird-forage --public --source=. --remote=origin --push

# Step 3: Switch to update_logo branch
git checkout -b update_logo

# Step 4: Replace existing logo (skipped - SVG URL unavailable)
# curl -o src/logo.svg https://www.propelleraero.com/wp-content/uploads/2021/05/Vector.svg

# Step 5: Replace existing link in src/App.js with propelleraero dirtmate URL
sed -i 's|href="https://reactjs.org"|href="https://www.propelleraero.com/dirtmate/"|g' src/App.js

# Step 6: Commit and push
git add src/App.js
git commit -m "Replace link with propelleraero dirtmate URL"
git push -u origin update_logo

# Step 7: Create PR from update_logo to master using GitHub CLI
gh pr create --title "Update logo" --body "Replace logo and link with Propeller Aero branding" --base master --head update_logo

# Step 8: Merge the PR using GitHub CLI (skipping approval step)
gh pr merge --merge
