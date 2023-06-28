import typescript from '@rollup/plugin-typescript'; // to build compact bundles
import { nodeResolve } from "@rollup/plugin-node-resolve" // to resolve imports in src
import terser from '@rollup/plugin-terser'; // to build compact bundles

export default {
    input: "src/main.ts",
    output: {
        file: "dist/bundle.js"
    },
    plugins: [
        typescript(),
        nodeResolve({ browser: true }),
        terser({
            compress: {
                passes: 2 // passes of optimisation
            }
        }),
    ]
}