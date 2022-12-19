import { withCustomConfig } from "react-docgen-typescript";
import * as path from "path";
import glob from "glob";
import fs from "fs/promises";

// this will actually be passed in

const files: string[] = await new Promise((resolve) => glob("**/*.tsx", {}, (_, files) => resolve(files)));

const tsconfigPath = path.join(process.cwd(), "tsconfig.json");
const parser = withCustomConfig(tsconfigPath, {
  propFilter: (prop) => !/@types[\\/]react[\\/]/.test(prop.parent?.fileName || ""),
});

let out: any = [];

for (const file of files) {
  const components = parser.parse(file);
  if (components.length === 1) {
  } else {
    // 0 or multiple possible components found in file
    // either add heuristic to see which is real, or error
  }

  out = [...out, ...components];
}

await fs.writeFile("docs.json", JSON.stringify(out, null, 2));
