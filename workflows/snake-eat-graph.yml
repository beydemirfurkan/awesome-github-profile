name: Generate Snake

on:
  schedule:
    - cron: "23 6 * * *"     # daily at 06:23 UTC
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - name: generate snake game from contribution graph
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: {{username}}
          outputs: |
            dist/snake.svg
            dist/snake-dark.svg?palette=github-dark
            dist/snake.gif?color_snake=orange&color_dots=#bfd744,#64a338,#30903f,#1f6e2e,#0a4208

      - name: push to output branch
        uses: crazy-max/ghaction-github-pages@v4
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
