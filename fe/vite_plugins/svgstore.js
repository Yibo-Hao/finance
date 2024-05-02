import path from 'path'
import store from 'svgstore'
import { optimize } from 'svgo'

export const svgstore = () => {
    return {
        name: 'svgstore',

        resolveId(id) {
            if (id === 'virtual:svgstore') {
                return id;
            }
        },

        load(id) {
            if (id === 'virtual:svgstore') {
                const svgPath = path.resolve(__dirname, '../src/assets');
                const fs = require('fs');
                const sprites = store()
                const files = fs.readdirSync(svgPath, { recursive: true });
                files.forEach(file => {
                    if (file.endsWith('.svg')) {
                        sprites.add(
                            file,
                            fs.readFileSync(path.resolve(svgPath, file), 'utf-8')
                        );
                    }
                });
                const {data: code} = optimize(sprites.toString({inline: true}), {
                    plugins: [
                        'cleanupAttrs', 'removeDoctype', 'removeComments', 'removeTitle', 'removeDesc', 'removeEmptyAttrs',
                        { name: 'removeAttrs', params: { attrs: "(data-name|data-xxx)" } }
                    ]
                })
                return `const div = document.createElement('div');
                    div.innerHTML = \`${code}\`;
                    const svg = div.getElementsByTagName('svg')[0];
                    if (svg) {
                        svg.style.position = 'absolute';
                        svg.style.width = 0;
                        svg.style.height = 0;
                        svg.style.overflow = 'hidden';
                        svg.setAttribute('aria-hidden', 'true');
                    }
                    document.addEventListener('DOMContentLoaded', () => {
                        if (document.body.firstChild) {
                            document.body.insertBefore(div, document.body.firstChild);
                        } else {
                            document.body.appendChild(div);
                        }
                    });
                `;
            }
        }
    }
}